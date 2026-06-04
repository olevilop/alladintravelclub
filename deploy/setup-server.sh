#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# Первичная настройка сайта alladintravelclub на ТОМ ЖЕ VPS Timeweb,
# где уже работает docstoalladin.ru. Поднимает ОТДЕЛЬНО, без пересечений:
#   • статический фронтенд (Vite build -> dist/), его отдаёт Nginx
#   • бэкенд REST API (Express + PostgreSQL) на порту 3101
#   • отдельную базу PostgreSQL и системного пользователя
#   • отдельный server-блок Nginx (текущий сайт не трогается)
#
# Запускать ОДИН РАЗ, от root:
#     sudo DOMAIN=club.твойдомен.ru bash deploy/setup-server.sh
# Можно сразу задать логин/пароль администратора админки:
#     sudo DOMAIN=club.твойдомен.ru ADMIN_EMAIL=me@club.ru ADMIN_PASSWORD='Пароль123' \
#       bash deploy/setup-server.sh
# ─────────────────────────────────────────────────────────────────────────────
set -euo pipefail

# ── НАСТРОЙКИ (можно переопределить через окружение) ─────────────────────────
REPO_URL="${REPO_URL:-https://github.com/olevilop/alladintravelclub.git}"
DOMAIN="${DOMAIN:-example.com}"          # напр. club.aladdin.ru (без http://)
# ─────────────────────────────────────────────────────────────────────────────

APP_USER="alladinclub"
APP_DIR="/var/www/alladintravelclub"
ENV_FILE="$APP_DIR/backend/.env"
FRONT_ENV="$APP_DIR/.env.production"
NODE_MAJOR="22"
DB_NAME="alladinclub"
DB_USER="alladinclub"
SVC_BACK="alladinclub-backend"
BACK_PORT="3101"
GENERATED_ADMIN=0

log() { echo -e "\n\033[1;32m==> $*\033[0m"; }
run_user() { sudo -u "$APP_USER" -H "$@"; }

[[ $EUID -eq 0 ]] || { echo "Запусти от root:  sudo bash deploy/setup-server.sh" >&2; exit 1; }
if [[ "$DOMAIN" == "example.com" ]]; then
  echo "!! Укажи домен:  sudo DOMAIN=club.твойдомен.ru bash deploy/setup-server.sh" >&2
  exit 1
fi

# Проверка, что порт 3101 ещё не занят другим сайтом (изоляция).
if ss -ltn 2>/dev/null | grep -q ":${BACK_PORT}\b"; then
  echo "!! Порт ${BACK_PORT} уже занят. Поменяй BACK_PORT в этом скрипте, nginx.conf и .service." >&2
  exit 1
fi

log "Ставлю системные пакеты (nginx, postgresql, git, curl) — если их ещё нет"
export DEBIAN_FRONTEND=noninteractive
apt-get update -y
apt-get install -y ca-certificates curl git gnupg nginx postgresql openssl iproute2

log "Запускаю PostgreSQL"
systemctl enable --now postgresql

log "Ставлю Node.js ${NODE_MAJOR} LTS (если нужной версии нет)"
if ! command -v node >/dev/null || [[ "$(node -p 'process.versions.node.split(".")[0]' 2>/dev/null)" != "$NODE_MAJOR" ]]; then
  curl -fsSL "https://deb.nodesource.com/setup_${NODE_MAJOR}.x" | bash -
  apt-get install -y nodejs
fi
node --version

log "Создаю системного пользователя $APP_USER (если нужно)"
id -u "$APP_USER" >/dev/null 2>&1 || useradd --system --create-home --shell /usr/sbin/nologin "$APP_USER"

log "Клонирую/обновляю репозиторий в $APP_DIR"
mkdir -p "$APP_DIR"
git config --global --add safe.directory "$APP_DIR" 2>/dev/null || true
if [[ -d "$APP_DIR/.git" ]]; then
  git -C "$APP_DIR" fetch --all
  git -C "$APP_DIR" reset --hard origin/HEAD
else
  git clone "$REPO_URL" "$APP_DIR"
fi

# ── PostgreSQL: отдельная роль и база (не пересекается с другими сайтами) ─────
if [[ -f "$ENV_FILE" ]]; then
  log "backend/.env уже есть — секреты и пользователь БД сохраняю как есть"
else
  log "Создаю отдельного пользователя БД, базу и backend/.env"
  DB_PASS="$(openssl rand -hex 16)"
  JWT_SECRET="$(openssl rand -hex 32)"
  ADMIN_EMAIL="${ADMIN_EMAIL:-admin@alladin.club}"
  if [[ -z "${ADMIN_PASSWORD:-}" ]]; then
    ADMIN_PASSWORD="$(openssl rand -hex 8)"
    GENERATED_ADMIN=1
  fi

  if sudo -u postgres psql -tAc "SELECT 1 FROM pg_roles WHERE rolname='$DB_USER'" | grep -q 1; then
    sudo -u postgres psql -c "ALTER ROLE $DB_USER LOGIN PASSWORD '$DB_PASS';"
  else
    sudo -u postgres psql -c "CREATE ROLE $DB_USER LOGIN PASSWORD '$DB_PASS';"
  fi
  sudo -u postgres psql -tAc "SELECT 1 FROM pg_database WHERE datname='$DB_NAME'" | grep -q 1 \
    || sudo -u postgres psql -c "CREATE DATABASE $DB_NAME OWNER $DB_USER;"

  mkdir -p "$APP_DIR/backend"
  cat > "$ENV_FILE" <<EOF
DATABASE_URL=postgres://$DB_USER:$DB_PASS@127.0.0.1:5432/$DB_NAME
JWT_SECRET=$JWT_SECRET
JWT_EXPIRES=7d
HOST=127.0.0.1
PORT=$BACK_PORT
UPLOAD_DIR=$APP_DIR/backend/uploads
MAX_UPLOAD_MB=25
ADMIN_EMAIL=$ADMIN_EMAIL
ADMIN_PASSWORD=$ADMIN_PASSWORD
ADMIN_NAME=Администратор
EOF
fi

log "Прописываю фронтенду адрес API (VITE_API_URL=/api)"
echo "VITE_API_URL=/api" > "$FRONT_ENV"

log "Готовлю каталог загрузок и права"
mkdir -p "$APP_DIR/backend/uploads"
chown -R "$APP_USER:$APP_USER" "$APP_DIR"
chmod 600 "$ENV_FILE"
# Nginx (www-data) должен читать dist/ и uploads/ — даём проходимость по пути.
chmod 755 /var/www "$APP_DIR"

# ── Бэкенд: зависимости, схема БД, администратор ─────────────────────────────
log "Бэкенд: установка зависимостей"
( cd "$APP_DIR/backend" && run_user npm ci )
log "Бэкенд: применяю схему БД (migrate) — перенос программ туров/круизов в БД"
( cd "$APP_DIR/backend" && run_user npm run migrate )
log "Бэкенд: первичное наполнение (seed: админ + программы из исходных данных)"
( cd "$APP_DIR/backend" && run_user npm run seed )

# ── Фронтенд: зависимости и сборка статики ───────────────────────────────────
log "Фронтенд: установка зависимостей и сборка (dist/)"
# npm install (а не ci): Lovable собирает через bun, и npm-lock бывает рассинхронизирован.
( cd "$APP_DIR" && run_user npm install --no-audit --no-fund && run_user npm run build )

# ── systemd-сервис только для бэкенда (фронт — статика, своего процесса нет) ──
log "Устанавливаю systemd-сервис бэкенда"
install -m 0644 "$APP_DIR/deploy/${SVC_BACK}.service" "/etc/systemd/system/${SVC_BACK}.service"
systemctl daemon-reload
systemctl enable "$SVC_BACK"
systemctl restart "$SVC_BACK"

# ── Nginx: ДОБАВЛЯЕМ отдельный сайт, ничего чужого не удаляем ─────────────────
log "Настраиваю Nginx для домена $DOMAIN (отдельный server-блок)"
sed "s/__DOMAIN__/${DOMAIN}/g" "$APP_DIR/deploy/nginx.conf" > "/etc/nginx/sites-available/${SVC_BACK}"
ln -sf "/etc/nginx/sites-available/${SVC_BACK}" "/etc/nginx/sites-enabled/${SVC_BACK}"
# ВНИМАНИЕ: НЕ трогаем default и другие сайты (docstoalladin.ru остаётся как был).
nginx -t
systemctl reload nginx

# ── Проверки ─────────────────────────────────────────────────────────────────
log "Проверки работоспособности"
sleep 2
curl -fsS -o /dev/null -w "Бэкенд /health:    HTTP %{http_code}\n" "http://127.0.0.1:${BACK_PORT}/health" \
  || { echo "!! Бэкенд не отвечает. Логи: journalctl -u ${SVC_BACK} -n 50 --no-pager" >&2; exit 1; }
curl -fsS -o /dev/null -w "Публичные туры:    HTTP %{http_code}\n" "http://127.0.0.1:${BACK_PORT}/tours" \
  || echo "!! /tours не ответил (проверь миграции/seed)."
curl -fsS -o /dev/null -H "Host: ${DOMAIN}" -w "Сайт через Nginx:  HTTP %{http_code}\n" "http://127.0.0.1/" \
  || { echo "!! Nginx не отдаёт сайт. Логи: tail -n 50 /var/log/nginx/error.log" >&2; exit 1; }

TEST_EMAIL="$(grep -E '^ADMIN_EMAIL=' "$ENV_FILE" | cut -d= -f2-)"
TEST_PASS="$(grep -E '^ADMIN_PASSWORD=' "$ENV_FILE" | cut -d= -f2-)"

cat <<EOF

================ ГОТОВО (HTTP) ================
Сайт доступен по http://${DOMAIN}
Админка:        http://${DOMAIN}/admin

Данные администратора:
  email:  ${TEST_EMAIL}
EOF
if [[ "$GENERATED_ADMIN" == "1" ]]; then
  echo "  пароль: ${TEST_PASS}"
  echo "  (пароль сгенерирован автоматически — сохрани его и смени в админке)"
else
  echo "  пароль: тот, что задан в ADMIN_PASSWORD (хранится в ${ENV_FILE})"
fi
cat <<EOF

Дальше — бесплатный HTTPS (когда домен ${DOMAIN} уже указывает на этот сервер):
    apt-get install -y certbot python3-certbot-nginx
    certbot --nginx -d ${DOMAIN}

Полезное:
    systemctl status ${SVC_BACK}
    journalctl -u ${SVC_BACK} -f          # логи API
    bash ${APP_DIR}/deploy/deploy.sh      # выкатить обновление из GitHub
EOF
