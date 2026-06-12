#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# Разворачивает backend (Express + внешняя PostgreSQL Timeweb) и проверяет его.
# НЕ трогает Nginx, SSL и собранный фронтенд — только backend + БД.
# Безопасно запускать на сервере, где уже работает статика сайта.
#
# Запуск (от root). DATABASE_URL обязателен:
#   sudo DATABASE_URL='postgresql://gen_user:Alladin%402026@d239769d31fdcb814862ad4e.twc1.net:5432/default_db?sslmode=verify-full' \
#        ADMIN_EMAIL='admin@alladin.club' ADMIN_PASSWORD='надёжный-пароль' \
#        bash deploy/setup-backend.sh
# ─────────────────────────────────────────────────────────────────────────────
set -euo pipefail

APP_USER="alladinclub"
APP_DIR="/var/www/alladintravelclub"
BE_DIR="$APP_DIR/backend"
ENV_FILE="$BE_DIR/.env"
CERT_DIR="$BE_DIR/certs"
SVC_BACK="alladinclub-backend"
BACK_PORT="3101"
CA_URL="https://st.timeweb.com/cloud-static/ca.crt"

log() { echo -e "\n\033[1;32m==> $*\033[0m"; }
run_user() { sudo -u "$APP_USER" -H "$@"; }

[[ $EUID -eq 0 ]] || { echo "Запусти от root" >&2; exit 1; }
[[ -n "${DATABASE_URL:-}" ]] || { echo "!! Передай DATABASE_URL (см. шапку скрипта)" >&2; exit 1; }
[[ -d "$APP_DIR/.git" ]] || { echo "!! Сначала разверни статику (setup-static.sh) — нет $APP_DIR" >&2; exit 1; }

log "Подтягиваю свежий код из GitHub"
git config --global --add safe.directory "$APP_DIR" 2>/dev/null || true
git -C "$APP_DIR" fetch --all
git -C "$APP_DIR" reset --hard origin/HEAD

log "Скачиваю CA-сертификат Timeweb"
mkdir -p "$CERT_DIR"
curl -fsSL "$CA_URL" -o "$CERT_DIR/root.crt"
[[ -s "$CERT_DIR/root.crt" ]] || { echo "!! Сертификат не скачался" >&2; exit 1; }

if [[ -f "$ENV_FILE" ]]; then
  log "backend/.env уже есть — оставляю как есть (секреты не трогаю)"
else
  log "Создаю backend/.env"
  JWT_SECRET="$(openssl rand -hex 32)"
  cat > "$ENV_FILE" <<EOF
DATABASE_URL=${DATABASE_URL}
CA_CERT_PATH=${CERT_DIR}/root.crt
HOST=127.0.0.1
PORT=${BACK_PORT}
JWT_SECRET=${JWT_SECRET}
JWT_EXPIRES=7d
ADMIN_EMAIL=${ADMIN_EMAIL:-admin@alladin.club}
ADMIN_PASSWORD=${ADMIN_PASSWORD:-}
ADMIN_NAME=${ADMIN_NAME:-Администратор}
UPLOAD_DIR=${BE_DIR}/uploads
MAX_UPLOAD_MB=25
UON_API_KEY=${UON_API_KEY:-}
EOF
fi

log "Готовлю права и каталоги"
mkdir -p "$BE_DIR/uploads"
chown -R "$APP_USER:$APP_USER" "$APP_DIR"
chmod 600 "$ENV_FILE"

log "Backend: установка зависимостей"
( cd "$BE_DIR" && run_user npm install --no-audit --no-fund )

log "Backend: схема БД (migrate)"
( cd "$BE_DIR" && run_user npm run migrate )

log "Backend: перенос программ/лайнеров/маршрутов + админ (seed)"
( cd "$BE_DIR" && run_user npm run seed )

log "Устанавливаю и запускаю systemd-сервис"
install -m 0644 "$APP_DIR/deploy/${SVC_BACK}.service" "/etc/systemd/system/${SVC_BACK}.service"
systemctl daemon-reload
systemctl enable "$SVC_BACK"
systemctl restart "$SVC_BACK"

log "Проверки"
sleep 2
curl -fsS -w "\n/health:  HTTP %{http_code}\n" "http://127.0.0.1:${BACK_PORT}/health" \
  || { echo "!! API не отвечает. Логи: journalctl -u ${SVC_BACK} -n 50 --no-pager" >&2; exit 1; }
echo "--- первые программы из БД через API: ---"
curl -fsS "http://127.0.0.1:${BACK_PORT}/tours" -o /tmp/atc_tours.json || true
head -c 400 /tmp/atc_tours.json 2>/dev/null; echo " ..."
COUNT="$(grep -o '"id"' /tmp/atc_tours.json 2>/dev/null | wc -l | tr -d ' ')"
rm -f /tmp/atc_tours.json
echo

cat <<EOF

================ BACKEND ГОТОВ ================
API работает на 127.0.0.1:${BACK_PORT} (наружу пока не открыт — это нормально).
Программ отдаётся через API: ~${COUNT}

Проверка вручную:
    curl http://127.0.0.1:${BACK_PORT}/tours | head
    journalctl -u ${SVC_BACK} -f       # логи API

Дальше: подключим API к сайту (nginx /api) и переведём фронтенд на API — на этапе фронтенда.
EOF
