// Админские эндпоинты (требуют JWT, кроме /login). Полный CRUD программ и лайнеров,
// управление активностью/порядком, просмотр заявок, загрузка фото.
import { Router } from "express";
import path from "node:path";
import fs from "node:fs";
import multer from "multer";
import bcrypt from "bcryptjs";
import { pool } from "../db.js";
import { config } from "../config.js";
import { signToken, requireAuth } from "../auth.js";
import { rowToTour, tourToRow, rowToLiner, linerToRow } from "../serialize.js";

export const adminRouter = Router();

// ── Авторизация ──────────────────────────────────────────────────────────────
adminRouter.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ error: "Укажите email и пароль" });
    const { rows } = await pool.query("SELECT * FROM admin_users WHERE email=$1", [email]);
    if (!rows.length) return res.status(401).json({ error: "Неверный email или пароль" });
    const ok = await bcrypt.compare(password, rows[0].password_hash);
    if (!ok) return res.status(401).json({ error: "Неверный email или пароль" });
    const user = { id: rows[0].id, email: rows[0].email, name: rows[0].name };
    res.json({ token: signToken(user), user });
  } catch (e) { next(e); }
});

adminRouter.get("/me", requireAuth, (req, res) => {
  res.json({ user: { id: req.user.sub, email: req.user.email, name: req.user.name } });
});

// Всё ниже — только авторизованным
adminRouter.use(requireAuth);

// ── Программы (туры/круизы) ──────────────────────────────────────────────────
adminRouter.get("/tours", async (_req, res, next) => {
  try {
    const { rows } = await pool.query("SELECT * FROM tours ORDER BY sort_order, name");
    res.json(rows.map(rowToTour));
  } catch (e) { next(e); }
});

adminRouter.get("/tours/:id", async (req, res, next) => {
  try {
    const { rows } = await pool.query("SELECT * FROM tours WHERE id=$1", [req.params.id]);
    if (!rows.length) return res.status(404).json({ error: "Не найдено" });
    res.json(rowToTour(rows[0]));
  } catch (e) { next(e); }
});

adminRouter.post("/tours", async (req, res, next) => {
  try {
    const { columns, data } = tourToRow(req.body || {});
    if (!columns.id || !columns.name) return res.status(400).json({ error: "Нужны id и name" });
    const cols = Object.keys(columns);
    const vals = Object.values(columns);
    cols.push("data");
    vals.push(JSON.stringify(data));
    const placeholders = vals.map((_, i) => `$${i + 1}`);
    const sql = `INSERT INTO tours (${cols.join(",")}) VALUES (${placeholders.join(",")}) RETURNING *`;
    const { rows } = await pool.query(sql, vals);
    res.status(201).json(rowToTour(rows[0]));
  } catch (e) {
    if (e.code === "23505") return res.status(409).json({ error: "Программа с таким id уже есть" });
    next(e);
  }
});

adminRouter.put("/tours/:id", async (req, res, next) => {
  try {
    const { columns, data } = tourToRow(req.body || {});
    delete columns.id; // id не меняем
    const sets = [];
    const vals = [];
    for (const [col, v] of Object.entries(columns)) { vals.push(v); sets.push(`${col}=$${vals.length}`); }
    vals.push(JSON.stringify(data)); sets.push(`data=$${vals.length}`);
    vals.push(req.params.id);
    const sql = `UPDATE tours SET ${sets.join(",")} WHERE id=$${vals.length} RETURNING *`;
    const { rows } = await pool.query(sql, vals);
    if (!rows.length) return res.status(404).json({ error: "Не найдено" });
    res.json(rowToTour(rows[0]));
  } catch (e) { next(e); }
});

adminRouter.patch("/tours/:id/active", async (req, res, next) => {
  try {
    const { rows } = await pool.query(
      "UPDATE tours SET is_active=$1 WHERE id=$2 RETURNING *",
      [!!req.body.isActive, req.params.id]
    );
    if (!rows.length) return res.status(404).json({ error: "Не найдено" });
    res.json(rowToTour(rows[0]));
  } catch (e) { next(e); }
});

// Порядок вывода: тело { ids: ["id1","id2",...] } в нужном порядке
adminRouter.put("/tours/reorder", async (req, res, next) => {
  const client = await pool.connect();
  try {
    const ids = Array.isArray(req.body.ids) ? req.body.ids : [];
    await client.query("BEGIN");
    for (let i = 0; i < ids.length; i++) {
      await client.query("UPDATE tours SET sort_order=$1 WHERE id=$2", [i, ids[i]]);
    }
    await client.query("COMMIT");
    res.json({ ok: true });
  } catch (e) { await client.query("ROLLBACK"); next(e); }
  finally { client.release(); }
});

adminRouter.delete("/tours/:id", async (req, res, next) => {
  try {
    const { rowCount } = await pool.query("DELETE FROM tours WHERE id=$1", [req.params.id]);
    if (!rowCount) return res.status(404).json({ error: "Не найдено" });
    res.json({ ok: true });
  } catch (e) { next(e); }
});

// ── Лайнеры ──────────────────────────────────────────────────────────────────
adminRouter.get("/liners", async (_req, res, next) => {
  try {
    const { rows } = await pool.query("SELECT * FROM liners ORDER BY sort_order, name");
    res.json(rows.map(rowToLiner));
  } catch (e) { next(e); }
});

adminRouter.post("/liners", async (req, res, next) => {
  try {
    const { columns, data } = linerToRow(req.body || {});
    if (!columns.slug || !columns.name) return res.status(400).json({ error: "Нужны slug и name" });
    const cols = Object.keys(columns); const vals = Object.values(columns);
    cols.push("data"); vals.push(JSON.stringify(data));
    const ph = vals.map((_, i) => `$${i + 1}`);
    const { rows } = await pool.query(
      `INSERT INTO liners (${cols.join(",")}) VALUES (${ph.join(",")}) RETURNING *`, vals);
    res.status(201).json(rowToLiner(rows[0]));
  } catch (e) {
    if (e.code === "23505") return res.status(409).json({ error: "Лайнер с таким slug уже есть" });
    next(e);
  }
});

adminRouter.put("/liners/:slug", async (req, res, next) => {
  try {
    const { columns, data } = linerToRow(req.body || {});
    delete columns.slug;
    const sets = []; const vals = [];
    for (const [col, v] of Object.entries(columns)) { vals.push(v); sets.push(`${col}=$${vals.length}`); }
    vals.push(JSON.stringify(data)); sets.push(`data=$${vals.length}`);
    vals.push(req.params.slug);
    const { rows } = await pool.query(
      `UPDATE liners SET ${sets.join(",")} WHERE slug=$${vals.length} RETURNING *`, vals);
    if (!rows.length) return res.status(404).json({ error: "Не найдено" });
    res.json(rowToLiner(rows[0]));
  } catch (e) { next(e); }
});

adminRouter.delete("/liners/:slug", async (req, res, next) => {
  try {
    const { rowCount } = await pool.query("DELETE FROM liners WHERE slug=$1", [req.params.slug]);
    if (!rowCount) return res.status(404).json({ error: "Не найдено" });
    res.json({ ok: true });
  } catch (e) { next(e); }
});

// ── Заявки ───────────────────────────────────────────────────────────────────
adminRouter.get("/leads", async (req, res, next) => {
  try {
    const params = []; let where = "";
    if (req.query.type) { params.push(req.query.type); where = "WHERE type=$1"; }
    const { rows } = await pool.query(
      `SELECT * FROM leads ${where} ORDER BY created_at DESC LIMIT 500`, params);
    res.json(rows);
  } catch (e) { next(e); }
});

adminRouter.patch("/leads/:id/read", async (req, res, next) => {
  try {
    await pool.query("UPDATE leads SET is_read=$1 WHERE id=$2", [req.body.isRead !== false, req.params.id]);
    res.json({ ok: true });
  } catch (e) { next(e); }
});

adminRouter.delete("/leads/:id", async (req, res, next) => {
  try {
    await pool.query("DELETE FROM leads WHERE id=$1", [req.params.id]);
    res.json({ ok: true });
  } catch (e) { next(e); }
});

// ── Загрузка фото ────────────────────────────────────────────────────────────
fs.mkdirSync(config.uploadDir, { recursive: true });
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, config.uploadDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase().replace(/[^.a-z0-9]/g, "");
    const safe = Date.now() + "-" + Math.random().toString(36).slice(2, 8) + ext;
    cb(null, safe);
  },
});
const upload = multer({
  storage,
  limits: { fileSize: config.maxUploadMb * 1024 * 1024 },
  fileFilter: (_req, file, cb) => cb(null, /^image\//.test(file.mimetype)),
});

adminRouter.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "Файл не получен (нужно изображение)" });
  res.status(201).json({ url: `/uploads/${req.file.filename}` });
});
