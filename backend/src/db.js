// Пул подключений к PostgreSQL (управляемая БД Timeweb, SSL с CA-сертификатом).
import pg from "pg";
import fs from "node:fs";
import { config } from "./config.js";

const { Pool } = pg;

// Важно: НЕ оставляем ?sslmode=... в строке подключения — иначе node-postgres
// конфигурирует SSL по-своему и игнорирует переданный CA (ошибка
// SELF_SIGNED_CERT_IN_CHAIN). SSL задаём только объектом ssl ниже.
function stripSslParams(url) {
  try {
    const u = new URL(url);
    u.searchParams.delete("sslmode");
    u.searchParams.delete("ssl");
    return u.toString();
  } catch {
    return url.replace(/[?&]sslmode=[^&]*/g, "").replace(/[?&]ssl=[^&]*/g, "");
  }
}

// Timeweb требует SSL. С CA-сертификатом — полная проверка цепочки (как verify-full),
// иначе шифруем без проверки (как sslmode=require).
let ssl;
if (config.caCertPath && fs.existsSync(config.caCertPath)) {
  ssl = { ca: fs.readFileSync(config.caCertPath, "utf8"), rejectUnauthorized: true };
} else {
  ssl = { rejectUnauthorized: false };
  if (config.caCertPath) {
    console.warn(`!! CA-сертификат не найден по пути ${config.caCertPath} — подключаюсь без проверки сертификата.`);
  }
}

export const pool = new Pool({
  connectionString: stripSslParams(config.databaseUrl),
  ssl,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

pool.on("error", (err) => {
  console.error("Ошибка пула PostgreSQL:", err.message);
});

export const query = (text, params) => pool.query(text, params);
