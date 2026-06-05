// Загрузка конфигурации из окружения (backend/.env).
import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../.env") });

function required(name) {
  const v = process.env[name];
  if (!v) {
    console.error(`!! Не задана переменная окружения ${name} (см. backend/.env.example)`);
    process.exit(1);
  }
  return v;
}

export const config = {
  databaseUrl: required("DATABASE_URL"),
  caCertPath: process.env.CA_CERT_PATH || "",
  host: process.env.HOST || "127.0.0.1",
  port: parseInt(process.env.PORT || "3101", 10),
  jwtSecret: process.env.JWT_SECRET || "dev-insecure-secret",
  jwtExpires: process.env.JWT_EXPIRES || "7d",
  admin: {
    email: process.env.ADMIN_EMAIL || "admin@alladin.club",
    password: process.env.ADMIN_PASSWORD || "",
    name: process.env.ADMIN_NAME || "Администратор",
  },
  uploadDir: process.env.UPLOAD_DIR || path.resolve(__dirname, "../uploads"),
  maxUploadMb: parseInt(process.env.MAX_UPLOAD_MB || "25", 10),
};
