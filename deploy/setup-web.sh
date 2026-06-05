#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# Пересобирает фронтенд (с админкой) и переключает Nginx на полную конфигурацию:
# статика + проксирование /api на backend (3101) + раздача /uploads и /tour-assets.
# Сохраняет HTTPS (использует уже выпущенный сертификат Let's Encrypt).
# Требует, чтобы backend был уже развёрнут (deploy/setup-backend.sh).
#
#   sudo DOMAIN=alladintravelclub.ru bash deploy/setup-web.sh
# ─────────────────────────────────────────────────────────────────────────────
set -euo pipefail

DOMAIN="${DOMAIN:-alladintravelclub.ru}"
APP_USER="alladinclub"
APP_DIR="/var/www/alladintravelclub"
SITE_NAME="alladinclub-static"   # имя файла конфига (его же трогал certbot)
BACK_PORT="3101"

log() { echo -e "\n\033[1;32m==> $*\033[0m"; }
run_user() { sudo -u "$APP_USER" -H "$@"; }

[[ $EUID -eq 0 ]] || { echo "Запусти от root" >&2; exit 1; }

log "Подтягиваю свежий код"
git config --global --add safe.directory "$APP_DIR" 2>/dev/null || true
git -C "$APP_DIR" fetch --all
git -C "$APP_DIR" reset --hard origin/HEAD
chown -R "$APP_USER:$APP_USER" "$APP_DIR"

log "Сборка фронтенда (с админкой)"
( cd "$APP_DIR" && run_user npm install --no-audit --no-fund && run_user npm run build )
[[ -f "$APP_DIR/dist/index.html" ]] || { echo "!! Нет dist/index.html" >&2; exit 1; }

log "Копирую картинки программ в раздаваемую папку (/tour-assets)"
mkdir -p "$APP_DIR/dist/tour-assets"
cp -rf "$APP_DIR/src/assets/." "$APP_DIR/dist/tour-assets/"
chown -R "$APP_USER:$APP_USER" "$APP_DIR/dist"

CERT="/etc/letsencrypt/live/${DOMAIN}/fullchain.pem"
CONF="/etc/nginx/sites-available/${SITE_NAME}"

if [[ -f "$CERT" ]]; then
  log "Пишу конфиг Nginx с HTTPS + /api + /uploads"
  cat > "$CONF" <<NGINX
server {
    listen 80;
    listen [::]:80;
    server_name ${DOMAIN} www.${DOMAIN};
    return 301 https://\$host\$request_uri;
}
server {
    listen 443 ssl;
    listen [::]:443 ssl;
    http2 on;
    server_name ${DOMAIN} www.${DOMAIN};

    ssl_certificate     /etc/letsencrypt/live/${DOMAIN}/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/${DOMAIN}/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    root ${APP_DIR}/dist;
    index index.html;
    client_max_body_size 25m;

    location /api/ {
        proxy_pass http://127.0.0.1:${BACK_PORT}/;
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_read_timeout 120s;
    }
    location /uploads/ {
        alias ${APP_DIR}/backend/uploads/;
        expires 30d; add_header Cache-Control "public"; access_log off;
    }
    location /assets/ { expires 1y; add_header Cache-Control "public, immutable"; access_log off; }
    location /tour-assets/ { expires 30d; add_header Cache-Control "public"; access_log off; }
    location / { try_files \$uri \$uri/ /index.html; }
}
NGINX
else
  log "Сертификат не найден — пишу конфиг только на HTTP (потом запусти certbot)"
  cat > "$CONF" <<NGINX
server {
    listen 80;
    listen [::]:80;
    server_name ${DOMAIN} www.${DOMAIN};

    root ${APP_DIR}/dist;
    index index.html;
    client_max_body_size 25m;

    location /api/ {
        proxy_pass http://127.0.0.1:${BACK_PORT}/;
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
    location /uploads/ { alias ${APP_DIR}/backend/uploads/; expires 30d; access_log off; }
    location /tour-assets/ { expires 30d; access_log off; }
    location / { try_files \$uri \$uri/ /index.html; }
}
NGINX
fi

ln -sf "$CONF" "/etc/nginx/sites-enabled/${SITE_NAME}"
nginx -t
systemctl reload nginx

log "Проверки"
sleep 1
curl -fsS -o /dev/null -w "API через сайт (/api/tours): HTTP %{http_code}\n" "http://127.0.0.1:${BACK_PORT}/tours" || true
echo "Готово. Открой https://${DOMAIN}/admin и войди (admin@alladin.club + твой пароль)."
