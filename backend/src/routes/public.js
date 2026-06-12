// Публичные эндпоинты (без авторизации). Отдаём только АКТИВНЫЕ программы/лайнеры —
// неактивные просто отсутствуют в ответе, поэтому на сайте сетка смыкается без пустот.
import { Router } from "express";
import { pool } from "../db.js";
import { rowToTour, rowToLiner } from "../serialize.js";
import { sendLeadToUon } from "../uon.js";

export const publicRouter = Router();

// Список программ. Фильтры: ?source=japanTours&region=Япония&category=expedition
publicRouter.get("/tours", async (req, res, next) => {
  try {
    const where = ["is_active = true"];
    const params = [];
    for (const [key, col] of [["source", "source"], ["region", "region"], ["category", "category"]]) {
      if (req.query[key]) {
        params.push(req.query[key]);
        where.push(`${col} = $${params.length}`);
      }
    }
    const sql = `SELECT * FROM tours WHERE ${where.join(" AND ")} ORDER BY sort_order, name`;
    const { rows } = await pool.query(sql, params);
    res.json(rows.map(rowToTour));
  } catch (e) { next(e); }
});

// Одна программа по id (только активная)
publicRouter.get("/tours/:id", async (req, res, next) => {
  try {
    const { rows } = await pool.query("SELECT * FROM tours WHERE id=$1 AND is_active=true", [req.params.id]);
    if (!rows.length) return res.status(404).json({ error: "Программа не найдена" });
    res.json(rowToTour(rows[0]));
  } catch (e) { next(e); }
});

// Лайнеры
publicRouter.get("/liners", async (_req, res, next) => {
  try {
    const { rows } = await pool.query("SELECT * FROM liners WHERE is_active=true ORDER BY sort_order, name");
    res.json(rows.map(rowToLiner));
  } catch (e) { next(e); }
});

publicRouter.get("/liners/:slug", async (req, res, next) => {
  try {
    const { rows } = await pool.query("SELECT * FROM liners WHERE slug=$1 AND is_active=true", [req.params.slug]);
    if (!rows.length) return res.status(404).json({ error: "Лайнер не найден" });
    res.json(rowToLiner(rows[0]));
  } catch (e) { next(e); }
});

// Hero-слайды (активные, по порядку)
publicRouter.get("/hero", async (_req, res, next) => {
  try {
    const { rows } = await pool.query(
      "SELECT id, image, title, target_tour_id, target_url FROM hero_slides WHERE is_active=true ORDER BY sort_order, id");
    res.json(rows);
  } catch (e) { next(e); }
});

// Разделы главной (активные, по порядку)
publicRouter.get("/sections", async (_req, res, next) => {
  try {
    const { rows } = await pool.query(
      "SELECT id, title, filter_type, filter_value, tour_ids, link FROM home_sections WHERE is_active=true ORDER BY sort_order, id");
    res.json(rows);
  } catch (e) { next(e); }
});

// Маршрут тура (точки на карте)
publicRouter.get("/routes/:tourId", async (req, res, next) => {
  try {
    const { rows } = await pool.query("SELECT points FROM tour_routes WHERE tour_id=$1", [req.params.tourId]);
    res.json(rows.length ? rows[0].points : []);
  } catch (e) { next(e); }
});

// Приём заявки с любой формы (контакты/подписка/бронь/отели)
publicRouter.post("/leads", async (req, res, next) => {
  try {
    const b = req.body || {};
    const { type, name, phone, email, messenger, source, ...payload } = b;
    await pool.query(
      `INSERT INTO leads (type, name, phone, email, messenger, source, payload)
       VALUES ($1,$2,$3,$4,$5,$6,$7)`,
      [type || "contact", name || null, phone || null, email || null,
       messenger || null, source || null, JSON.stringify(payload)]
    );
    // Отправляем в CRM U-ON (не блокируем ответ — заявка уже сохранена в БД)
    sendLeadToUon({ type, name, phone, email, messenger, source, ...payload }).catch(() => {});
    res.status(201).json({ ok: true });
  } catch (e) { next(e); }
});
