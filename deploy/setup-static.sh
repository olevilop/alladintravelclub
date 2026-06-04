#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# ТЕСТ-ДЕПЛОЙ СТАТИКИ сайта alladintravelclub на тот же VPS Timeweb,
# где работает docstoalladin.ru. Цель — быстро проверить домен и хостинг.
#
# Что делает:
#   • ставит nginx, node, git (если их нет);
#   • клонирует репозиторий, собирает фронтенд (vite build -> dist/);
#   • поднимает ОТДЕЛЬНЫЙ server-блок Nginx (чужие сайты не трогает).
# Чего НЕ делает (это придёт в основном деплое позже):
#   • НЕ ставит PostgreSQL, backend, systemd, админку.
#
# ВНИМАНИЕ: на этом этапе форма-квиз по отелям всё ещё обращается к Supabase
# (как в исходном коде). Это временно и только для проверки хостинга;
# Supabase убирается на этапе backend (требование «данные только в РФ»).
#
# Запуск (один раз, от root):
#     sudo DOMAIN=club.твойдомен.ru bash deploy/setup-static.sh
# ─────────────────────────────────────────────────────────────────────────────
set -euo pipefail

REPO_URL="${REPO_URL:-https://github.com/olevilop/alladintravelclub.git}"
DOMAIN="${DOMAIN:-example.com}"
APP_USER="alladinclub"
APP_DIR="/var/www/alladintravelclub"
NODE_MAJOR="22"
SITE_NAME="alladinclub-static"

log() { echo -e "\n\033[1;32m==> $*\033[0m"; }
run_user() { sudo -u "$APP_USER" -H "$@"; }

[[ $EUID -eq 0 ]] || { echo "Запусти от root:  sudo bash deploy/setup-static.sh" >&2; exit 1; }
if [[ "$DOMAIN" == "example.com" ]]; then
  echo "!! Укажи домен:  sudo DOMAIN=club.твойдомен.ru bash deploy/setup-static.sh" >&2
  exit 1
fi

log "Ставлю nginx, git, curl (если их ещё нет)"
export DEBIAN_FRONTEND=noninteractive
apt-get update -y
apt-get install -y ca-certificates curl git gnupg nginx

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
chown -R "$APP_USER:$APP_USER" "$APP_DIR"
chmod 755 /var/www "$APP_DIR"

log "Сборка фронтенда (npm install && npm run build)"
# npm install (а не ci): Lovable собирает через bun, и npm-lock бывает рассинхронизирован.
( cd "$APP_DIR" && run_user npm install --no-audit --no-fund && run_user npm run build )
[[ -f "$APP_DIR/dist/index.html" ]] || { echo "!! Сборка не создала dist/index.html" >&2; exit 1; }

log "Настраиваю Nginx для домена $DOMAIN (отдельный server-блок)"
# Конфиг вписываем прямо здесь, чтобы скрипт был самодостаточным
# (не зависел от наличия папки deploy/ в репозитории).
cat > "/etc/nginx/sites-available/${SITE_NAME}" <<NGINX
server {
    listen 80;
    listen [::]:80;
    server_name ${DOMAIN};

    root ${APP_DIR}/dist;
    index index.html;

    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    location / {
        try_files \$uri \$uri/ /index.html;
    }
}
NGINX
ln -sf "/etc/nginx/sites-available/${SITE_NAME}" "/etc/nginx/sites-enabled/${SITE_NAME}"
# НЕ удаляем default и чужие сайты — docstoalladin.ru остаётся как был.
nginx -t
systemctl reload nginx

log "Проверки"
# Nginx перезагружается асинхронно — даём ему секунду и пробуем несколько раз,
# чтобы не получить ложный 404 сразу после reload.
OK=0
for i in 1 2 3 4 5; do
  CODE="$(curl -s -o /dev/null -H "Host: ${DOMAIN}" -w '%{http_code}' "http://127.0.0.1/" || true)"
  if [[ "$CODE" == "200" ]]; then OK=1; echo "Сайт через Nginx: HTTP 200"; break; fi
  sleep 1
done
[[ "$OK" == "1" ]] || { echo "!! Nginx отдаёт HTTP ${CODE:-?} (ожидался 200). Логи: tail -n 50 /var/log/nginx/error.log" >&2; exit 1; }

cat <<EOF

================ ГОТОВО (тест-деплой статики) ================
Открой: http://${DOMAIN}

Текущий сайт docstoalladin.ru НЕ затронут.

HTTPS (когда домен уже указывает на этот сервер):
    apt-get install -y certbot python3-certbot-nginx
    certbot --nginx -d ${DOMAIN}

Когда подтвердишь, что хостинг и домен работают — переходим к backend+админке
и полному деплою через deploy/setup-server.sh.
EOF
