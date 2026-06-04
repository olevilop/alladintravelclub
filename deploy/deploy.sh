#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# Выкатка обновления сайта alladintravelclub: подтянуть код из GitHub,
# пересобрать фронтенд, применить миграции БД (идемпотентно) и перезапустить API.
# Запускать на сервере от root:
#     sudo bash deploy/deploy.sh
# ─────────────────────────────────────────────────────────────────────────────
set -euo pipefail

APP_USER="alladinclub"
APP_DIR="/var/www/alladintravelclub"
SVC_BACK="alladinclub-backend"
BACK_PORT="3101"

log() { echo -e "\n\033[1;32m==> $*\033[0m"; }
run_user() { sudo -u "$APP_USER" -H "$@"; }

[[ $EUID -eq 0 ]] || { echo "Запусти от root:  sudo bash deploy/deploy.sh" >&2; exit 1; }

cd "$APP_DIR"
git config --global --add safe.directory "$APP_DIR" 2>/dev/null || true

log "Подтягиваю свежий код из GitHub"
git fetch --all
git reset --hard origin/HEAD
chown -R "$APP_USER:$APP_USER" "$APP_DIR"

# .env-файлы не в репозитории — git reset их не трогает; восстанавливаем при пропаже.
[[ -f "$APP_DIR/.env.production" ]] || echo "VITE_API_URL=/api" > "$APP_DIR/.env.production"

log "Бэкенд: зависимости + миграции"
( cd "$APP_DIR/backend" && run_user npm ci && run_user npm run migrate )

log "Фронтенд: зависимости + сборка статики (dist/)"
# npm install (а не ci): Lovable собирает через bun, и npm-lock бывает рассинхронизирован.
run_user npm install --no-audit --no-fund
run_user npm run build

log "Перезапускаю API и перечитываю Nginx"
systemctl restart "$SVC_BACK"
systemctl reload nginx

log "Проверки"
sleep 2
curl -fsS -o /dev/null -w "Бэкенд /health:  HTTP %{http_code}\n" "http://127.0.0.1:${BACK_PORT}/health" \
  || { echo "!! Бэкенд не отвечает. Логи: journalctl -u ${SVC_BACK} -n 50 --no-pager" >&2; exit 1; }

log "Готово — обновление выкачено."
