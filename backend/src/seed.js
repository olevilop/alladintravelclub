// Первичное наполнение БД: программы/лайнеры/маршруты из backend/src/data/*.json
// + создание первого администратора. Идемпотентно: существующие записи НЕ перезаписывает
// (ON CONFLICT DO NOTHING), поэтому правки из админки не затираются при повторном запуске.
//   npm run seed
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import bcrypt from "bcryptjs";
import crypto from "node:crypto";
import { pool } from "./db.js";
import { config } from "./config.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA = path.join(__dirname, "data");

const readJson = (f) => JSON.parse(fs.readFileSync(path.join(DATA, f), "utf8"));

// Поля тура, которые лежат отдельными колонками (остальное — в data JSONB)
const PROMOTED = new Set([
  "id", "name", "region", "continent", "subRegion", "category", "days", "price",
  "image", "subtitle", "description", "difficulty", "groupSize", "shipName",
  "shipImage", "extras", "badge", "specialOfferTag", "russianGroup", "isActive",
  "isAuthor", "isCorporate", "isWellness", "isSafari", "isDiving", "__source", "__order",
]);

function tourRest(t) {
  const rest = {};
  for (const [k, v] of Object.entries(t)) if (!PROMOTED.has(k)) rest[k] = v;
  return rest;
}

async function seedTours() {
  const tours = readJson("tours.json");
  let inserted = 0;
  for (const t of tours) {
    const res = await pool.query(
      `INSERT INTO tours (
         id, name, region, continent, sub_region, category, source, days, price,
         image, subtitle, description, difficulty, group_size, ship_name, ship_image,
         extras, badge, special_offer_tag, russian_group, is_active, is_author,
         is_corporate, is_wellness, is_safari, is_diving, sort_order, data
       ) VALUES (
         $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,
         $21,$22,$23,$24,$25,$26,$27,$28
       )
       ON CONFLICT (id) DO NOTHING`,
      [
        t.id, t.name, t.region ?? null, t.continent ?? null, t.subRegion ?? null,
        t.category ?? null, t.__source ?? "tours", t.days ?? null, t.price ?? null,
        t.image ?? null, t.subtitle ?? null, t.description ?? null, t.difficulty ?? null,
        t.groupSize ?? null, t.shipName ?? null, t.shipImage ?? null, t.extras ?? null,
        t.badge ?? null, t.specialOfferTag ?? null, !!t.russianGroup,
        t.isActive !== false, !!t.isAuthor, !!t.isCorporate, !!t.isWellness,
        !!t.isSafari, !!t.isDiving, t.__order ?? 0, JSON.stringify(tourRest(t)),
      ]
    );
    inserted += res.rowCount;
  }
  console.log(`✓ Туры: добавлено ${inserted}, всего в файле ${tours.length}`);
}

async function seedLiners() {
  const liners = readJson("liners.json");
  let inserted = 0, i = 0;
  for (const l of liners) {
    const { slug, name, image, shortDescription, ...rest } = l;
    const res = await pool.query(
      `INSERT INTO liners (slug, name, image, short_description, sort_order, data)
       VALUES ($1,$2,$3,$4,$5,$6) ON CONFLICT (slug) DO NOTHING`,
      [slug, name, image ?? null, shortDescription ?? null, i++, JSON.stringify(rest)]
    );
    inserted += res.rowCount;
  }
  console.log(`✓ Лайнеры: добавлено ${inserted}, всего в файле ${liners.length}`);
}

async function seedRoutes() {
  const routes = readJson("tourRoutes.json");
  let inserted = 0;
  for (const [tourId, points] of Object.entries(routes)) {
    const res = await pool.query(
      `INSERT INTO tour_routes (tour_id, points) VALUES ($1,$2)
       ON CONFLICT (tour_id) DO NOTHING`,
      [tourId, JSON.stringify(points)]
    );
    inserted += res.rowCount;
  }
  console.log(`✓ Маршруты: добавлено ${inserted}, всего в файле ${Object.keys(routes).length}`);
}

async function seedAdmin() {
  const { email, name } = config.admin;
  const exists = await pool.query("SELECT 1 FROM admin_users WHERE email=$1", [email]);
  if (exists.rowCount > 0) {
    console.log(`✓ Администратор ${email} уже существует — пропускаю`);
    return;
  }
  let password = config.admin.password;
  let generated = false;
  if (!password) {
    password = crypto.randomBytes(6).toString("hex");
    generated = true;
  }
  const hash = await bcrypt.hash(password, 10);
  await pool.query(
    "INSERT INTO admin_users (email, password_hash, name) VALUES ($1,$2,$3)",
    [email, hash, name]
  );
  console.log(`✓ Создан администратор: ${email}`);
  if (generated) console.log(`  ПАРОЛЬ (сгенерирован, сохрани!): ${password}`);
}

async function main() {
  await seedTours();
  await seedLiners();
  await seedRoutes();
  await seedAdmin();
  await pool.end();
  console.log("Готово.");
}

main().catch((err) => {
  console.error("Ошибка сидинга:", err);
  process.exit(1);
});
