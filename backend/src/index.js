// Точка входа REST API. Слушает 127.0.0.1:3101, наружу проксирует Nginx по /api.
import express from "express";
import cors from "cors";
import { config } from "./config.js";
import { pool } from "./db.js";
import { publicRouter } from "./routes/public.js";
import { adminRouter } from "./routes/admin.js";

const app = express();
app.use(cors()); // на проде фронт и API на одном домене; CORS нужен для локальной разработки
app.use(express.json({ limit: "5mb" }));

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
