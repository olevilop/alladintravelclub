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

// Смена email / пароля своего аккаунта (нужен текущий пароль для подтверждения)
adminRouter.put("/account", async (req, res, next) => {
  try {
    const { email, name, currentPassword, newPassword } = req.body || {};
    const { rows } = await pool.query("SELECT * FROM admin_users WHERE id=$1", [req.user.sub]);
    if (!rows.length) return res.status(404).json({ error: "Аккаунт не найден" });
    const ok = await bcrypt.compare(currentPassword || "", rows[0].password_hash);
    if (!ok) return res.status(400).json({ error: "Неверный текущий пароль" });

    const sets = [];
    const vals = [];
    if (email && email !== rows[0].email) { vals.push(email); sets.push(`email=$${vals.length}`); }
    if (name) { vals.push(name); sets.push(`name=$${vals.length}`); }
    if (newPassword) { vals.push(await bcrypt.hash(newPassword, 10)); sets.push(`password_hash=$${vals.length}`); }
    if (!sets.length) return res.json({ ok: true, token: signToken({ id: rows[0].id, email: rows[0].email, name: rows[0].name }) });

    vals.push(req.user.sub);
    const upd = await pool.query(
      `UPDATE admin_users SET ${sets.join(",")} WHERE id=$${vals.length} RETURNING id, email, name`, vals);
    const u = upd.rows[0];
    res.json({ ok: true, token: signToken({ id: u.id, email: u.email, name: u.name }), user: u });
  } catch (e) {
    if (e.code === "23505") return res.status(409).json({ error: "Этот email уже занят" });
    next(e);
  }
});

// ── Пользователи админки ─────────────────────────────────────────────────────
adminRouter.get("/users", async (_req, res, next) => {
  try {
    const { rows } = await pool.query("SELECT id, email, name, created_at FROM admin_users ORDER BY id");
    res.json(rows);
  } catch (e) { next(e); }
});

adminRouter.post("/users", async (req, res, next) => {
  try {
    const { email, password, name } = req.body || {};
    if (!email || !password) return res.status(400).json({ error: "Нужны email и пароль" });
    const hash = await bcrypt.hash(password, 10);
    const { rows } = await pool.query(
      "INSERT INTO admin_users (email, password_hash, name) VALUES ($1,$2,$3) RETURNING id, email, name, created_at",
      [email, hash, name || "Сотрудник"]
    );
    res.status(201).json(rows[0]);
  } catch (e) {
    if (e.code === "23505") return res.status(409).json({ error: "Пользователь с таким email уже есть" });
    next(e);
  }
});

// Изменить имя / сбросить пароль другому пользователю (привилегия админа)
adminRouter.put("/users/:id", async (req, res, next) => {
  try {
    const { name, newPassword } = req.body || {};
    const sets = []; const vals = [];
    if (name) { vals.push(name); sets.push(`name=$${vals.length}`); }
    if (newPassword) { vals.push(await bcrypt.hash(newPassword, 10)); sets.push(`password_hash=$${vals.length}`); }
    if (!sets.length) return res.status(400).json({ error: "Нечего менять" });
    vals.push(req.params.id);
    const { rows } = await pool.query(
      `UPDATE admin_users SET ${sets.join(",")} WHERE id=$${vals.length} RETURNING id, email, name`, vals);
    if (!rows.length) return res.status(404).json({ error: "Пользователь не найден" });
    res.json(rows[0]);
  } catch (e) { next(e); }
});

adminRouter.delete("/users/:id", async (req, res, next) => {
  try {
    if (String(req.user.sub) === String(req.params.id))
      return res.status(400).json({ error: "Нельзя удалить самого себя" });
    const { rows: cnt } = await pool.query("SELECT count(*)::int AS n FROM admin_users");
    if (cnt[0].n <= 1) return res.status(400).json({ error: "Нельзя удалить последнего пользователя" });
    const { rowCount } = await pool.query("DELETE FROM admin_users WHERE id=$1", [req.params.id]);
    if (!rowCount) return res.status(404).json({ error: "Пользователь не найден" });
    res.json({ ok: true });
  } catch (e) { next(e); }
});

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

// Порядок вывода: тело { ids: ["id1","id2",...] } в нужном порядке.
// Путь без "/tours/" — иначе бы конфликтовал с PUT /tours/:id.
adminRouter.put("/tours-reorder", async (req, res, next) => {
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

// ── Hero-слайды ──────────────────────────────────────────────────────────────
adminRouter.get("/hero", async (_req, res, next) => {
  try {
    const { rows } = await pool.query("SELECT * FROM hero_slides ORDER BY sort_order, id");
    res.json(rows);
  } catch (e) { next(e); }
});

adminRouter.post("/hero", async (req, res, next) => {
  try {
    const { image, title, targetTourId, targetUrl, isActive } = req.body || {};
    const { rows } = await pool.query(
      `INSERT INTO hero_slides (image, title, target_tour_id, target_url, is_active,
         sort_order) VALUES ($1,$2,$3,$4,$5, COALESCE((SELECT max(sort_order)+1 FROM hero_slides),0))
       RETURNING *`,
      [image || null, title || null, targetTourId || null, targetUrl || null, isActive !== false]
    );
    res.status(201).json(rows[0]);
  } catch (e) { next(e); }
});

adminRouter.put("/hero/:id", async (req, res, next) => {
  try {
    const { image, title, targetTourId, targetUrl, isActive } = req.body || {};
    const { rows } = await pool.query(
      `UPDATE hero_slides SET image=$1, title=$2, target_tour_id=$3, target_url=$4, is_active=$5
       WHERE id=$6 RETURNING *`,
      [image || null, title || null, targetTourId || null, targetUrl || null, isActive !== false, req.params.id]
    );
    if (!rows.length) return res.status(404).json({ error: "Не найдено" });
    res.json(rows[0]);
  } catch (e) { next(e); }
});

adminRouter.delete("/hero/:id", async (req, res, next) => {
  try {
    await pool.query("DELETE FROM hero_slides WHERE id=$1", [req.params.id]);
    res.json({ ok: true });
  } catch (e) { next(e); }
});

adminRouter.put("/hero-reorder", async (req, res, next) => {
  const client = await pool.connect();
  try {
    const ids = Array.isArray(req.body.ids) ? req.body.ids : [];
    await client.query("BEGIN");
    for (let i = 0; i < ids.length; i++)
      await client.query("UPDATE hero_slides SET sort_order=$1 WHERE id=$2", [i, ids[i]]);
    await client.query("COMMIT");
    res.json({ ok: true });
  } catch (e) { await client.query("ROLLBACK"); next(e); } finally { client.release(); }
});

// ── Разделы главной ──────────────────────────────────────────────────────────
adminRouter.get("/sections", async (_req, res, next) => {
  try {
    const { rows } = await pool.query("SELECT * FROM home_sections ORDER BY sort_order, id");
    res.json(rows);
  } catch (e) { next(e); }
});

adminRouter.post("/sections", async (req, res, next) => {
  try {
    const { title, filterType, filterValue, tourIds, link, isActive } = req.body || {};
    if (!title) return res.status(400).json({ error: "Нужно название" });
    const { rows } = await pool.query(
      `INSERT INTO home_sections (title, filter_type, filter_value, tour_ids, link, is_active,
         sort_order) VALUES ($1,$2,$3,$4,$5,$6, COALESCE((SELECT max(sort_order)+1 FROM home_sections),0))
       RETURNING *`,
      [title, filterType || "source", filterValue || null,
       JSON.stringify(Array.isArray(tourIds) ? tourIds : []), link || null, isActive !== false]
    );
    res.status(201).json(rows[0]);
  } catch (e) { next(e); }
});

adminRouter.put("/sections/:id", async (req, res, next) => {
  try {
    const { title, filterType, filterValue, tourIds, link, isActive } = req.body || {};
    const { rows } = await pool.query(
      `UPDATE home_sections SET title=$1, filter_type=$2, filter_value=$3, tour_ids=$4,
         link=$5, is_active=$6 WHERE id=$7 RETURNING *`,
      [title, filterType || "source", filterValue || null,
       JSON.stringify(Array.isArray(tourIds) ? tourIds : []), link || null, isActive !== false, req.params.id]
    );
    if (!rows.length) return res.status(404).json({ error: "Не найдено" });
    res.json(rows[0]);
  } catch (e) { next(e); }
});

adminRouter.delete("/sections/:id", async (req, res, next) => {
  try {
    await pool.query("DELETE FROM home_sections WHERE id=$1", [req.params.id]);
    res.json({ ok: true });
  } catch (e) { next(e); }
});

adminRouter.put("/sections-reorder", async (req, res, next) => {
  const client = await pool.connect();
  try {
    const ids = Array.isArray(req.body.ids) ? req.body.ids : [];
    await client.query("BEGIN");
    for (let i = 0; i < ids.length; i++)
      await client.query("UPDATE home_sections SET sort_order=$1 WHERE id=$2", [i, ids[i]]);
    await client.query("COMMIT");
    res.json({ ok: true });
  } catch (e) { await client.query("ROLLBACK"); next(e); } finally { client.release(); }
});

// ── Настройки (переключатели) ────────────────────────────────────────────────
adminRouter.get("/settings", async (_req, res, next) => {
  try {
    const { rows } = await pool.query("SELECT key, value FROM settings");
    const obj = {};
    rows.forEach((r) => { obj[r.key] = r.value; });
    res.json(obj);
  } catch (e) { next(e); }
});

adminRouter.put("/settings", async (req, res, next) => {
  try {
    const { key, value } = req.body || {};
    if (!key) return res.status(400).json({ error: "Нужен key" });
    await pool.query(
      `INSERT INTO settings (key, value) VALUES ($1,$2)
       ON CONFLICT (key) DO UPDATE SET value=$2, updated_at=now()`,
      [key, value == null ? null : String(value)]
    );
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
