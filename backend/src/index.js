// Точка входа REST API. Слушает 127.0.0.1:3101, наружу проксирует Nginx по /api.
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { config } from "./config.js";
import { pool } from "./db.js";
import { publicRouter } from "./routes/public.js";
import { adminRouter } from "./routes/admin.js";

const app = express();

// Доверяем заголовкам от Nginx (нужно для корректного определения IP в rate-limit)
app.set("trust proxy", 1);

// Заголовки безопасности
app.use(helmet());

// CORS: по умолчанию только собственный домен (сайт и API на одном домене).
const allowed = (process.env.CORS_ORIGIN ||
  "https://alladintravelclub.ru,https://www.alladintravelclub.ru").split(",").map((s) => s.trim());
app.use(cors({ origin: (origin, cb) => cb(null, !origin || allowed.includes(origin)) }));

app.use(express.json({ limit: "5mb" }));

// Анти-перебор пароля: не более 10 попыток входа за 15 минут с одного IP
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, max: 10, standardHeaders: true, legacyHeaders: false,
  message: { error: "Слишком много попыток входа. Попробуйте позже." },
});
app.use("/admin/login", loginLimiter);

// Анти-спам форм: не более 20 заявок за час с одного IP
const leadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, max: 20, standardHeaders: true, legacyHeaders: false,
  message: { error: "Слишком много заявок. Попробуйте позже." },
});
app.use("/leads", leadLimiter);

// Проверка живости (используется деплой-скриптами)
app.get("/health", async (_req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({ ok: true, db: "up" });
  } catch (e) {
    res.status(500).json({ ok: false, db: "down", error: e.message });
  }
});

app.use("/", publicRouter);     // /tours, /liners, /routes, /leads
app.use("/admin", adminRouter); // /admin/login, /admin/tours, ...

// 404
app.use((_req, res) => res.status(404).json({ error: "Не найдено" }));

// Обработчик ошибок
app.use((err, _req, res, _next) => {
  console.error("API error:", err);
  res.status(500).json({ error: "Внутренняя ошибка сервера" });
});

app.listen(config.port, config.host, () => {
  console.log(`API слушает http://${config.host}:${config.port}`);
});
