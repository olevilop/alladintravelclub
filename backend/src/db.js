// Пул подключений к PostgreSQL (управляемая БД Timeweb, SSL verify-full).
import pg from "pg";
import fs from "node:fs";
import { config } from "./config.js";

const { Pool } = pg;

// Timeweb требует SSL. Если указан CA-сертификат — проверяем цепочку (verify-full),
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
  connectionString: config.databaseUrl,
  ssl,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

pool.on("error", (err) => {
  console.error("Ошибка пула PostgreSQL:", err.message);
});

export const query = (text, params) => pool.query(text, params);
