// Схема БД. Идемпотентно (CREATE TABLE IF NOT EXISTS) — можно запускать многократно.
//   npm run migrate
import { pool } from "./db.js";

const SQL = `
-- Администраторы админки
CREATE TABLE IF NOT EXISTS admin_users (
  id            SERIAL PRIMARY KEY,
  email         TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  name          TEXT NOT NULL DEFAULT 'Администратор',
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Программы: туры и круизы.
-- Частые/фильтруемые поля — отдельными колонками; вся остальная богатая структура
-- (gallery, itinerary, included, notIncluded, startDates, *Pricing, faq, ...) — в data (JSONB).
CREATE TABLE IF NOT EXISTS tours (
  id               TEXT PRIMARY KEY,           -- slug, напр. "seychelles-tropical-rhythms"
  name             TEXT NOT NULL,
  region           TEXT,
  continent        TEXT,
  sub_region       TEXT,
  category         TEXT,                        -- "expedition" | "classic" | ...
  source           TEXT NOT NULL DEFAULT 'tours', -- из какого набора: tours/japanTours/koreaTours/...
  days             INTEGER,
  price            TEXT,
  image            TEXT,
  subtitle         TEXT,
  description      TEXT,
  difficulty       TEXT,
  group_size       TEXT,
  ship_name        TEXT,
  ship_image       TEXT,
  extras           TEXT,
  badge            TEXT,
  special_offer_tag TEXT,
  russian_group    BOOLEAN NOT NULL DEFAULT false,
  is_active        BOOLEAN NOT NULL DEFAULT true,
  is_author        BOOLEAN NOT NULL DEFAULT false,
  is_corporate     BOOLEAN NOT NULL DEFAULT false,
  is_wellness      BOOLEAN NOT NULL DEFAULT false,
  is_safari        BOOLEAN NOT NULL DEFAULT false,
  is_diving        BOOLEAN NOT NULL DEFAULT false,
  sort_order       INTEGER NOT NULL DEFAULT 0,
  data             JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS tours_active_idx   ON tours (is_active);
CREATE INDEX IF NOT EXISTS tours_source_idx   ON tours (source);
CREATE INDEX IF NOT EXISTS tours_region_idx   ON tours (region);
CREATE INDEX IF NOT EXISTS tours_category_idx ON tours (category);
CREATE INDEX IF NOT EXISTS tours_sort_idx     ON tours (sort_order);

-- Лайнеры (круизные суда)
CREATE TABLE IF NOT EXISTS liners (
  slug              TEXT PRIMARY KEY,
  name              TEXT NOT NULL,
  image             TEXT,
  short_description TEXT,
  is_active         BOOLEAN NOT NULL DEFAULT true,
  sort_order        INTEGER NOT NULL DEFAULT 0,
  data              JSONB NOT NULL DEFAULT '{}'::jsonb, -- longDescription, specs, cabins, deckPlanImage, gallery
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Маршруты туров на карте (RoutePoint[])
CREATE TABLE IF NOT EXISTS tour_routes (
  tour_id  TEXT PRIMARY KEY,
  points   JSONB NOT NULL DEFAULT '[]'::jsonb
);

-- Заявки со всех форм (отели/контакты/подписка/бронирование)
CREATE TABLE IF NOT EXISTS leads (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type       TEXT NOT NULL DEFAULT 'contact',   -- hotel | contact | newsletter | booking
  name       TEXT,
  phone      TEXT,
  email      TEXT,
  messenger  TEXT,
  source     TEXT,
  payload    JSONB NOT NULL DEFAULT '{}'::jsonb,
  is_read    BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS leads_type_idx    ON leads (type);
CREATE INDEX IF NOT EXISTS leads_created_idx ON leads (created_at DESC);

-- Триггер обновления updated_at
CREATE OR REPLACE FUNCTION set_updated_at() RETURNS trigger AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS tours_updated_at ON tours;
CREATE TRIGGER tours_updated_at BEFORE UPDATE ON tours
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS liners_updated_at ON liners;
CREATE TRIGGER liners_updated_at BEFORE UPDATE ON liners
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();
`;

async function main() {
  console.log("Применяю схему БД...");
  await pool.query(SQL);
  console.log("✓ Схема готова (таблицы: admin_users, tours, liners, tour_routes, leads).");
  await pool.end();
}

main().catch((err) => {
  console.error("Ошибка миграции:", err);
  process.exit(1);
});
