## Страница "Подбор отеля на Мальдивах"

### 1. Меню (`src/components/Navbar.tsx`)
Новый dropdown **"Подбор отеля"** после "Круизы", до "Спецпредложения". Один пункт списка: "Мальдивы" → `/hotels/maldives`. Аналогично в мобильном меню (раскрывающийся блок как у "Туры"/"Круизы").

### 2. Маршрут (`src/App.tsx`)
`<Route path="/hotels/maldives" element={<MaldivesHotelsPage />} />` выше catch-all.

### 3. Страница `src/pages/hotels/MaldivesHotelsPage.tsx`
В дизайн-системе страниц туров (cream фон, Cormorant Garamond, золото `#a87f39`, без Framer Motion). Структура:

1. `<Navbar />`
2. Breadcrumbs: Главная / Подбор отеля / Мальдивы
3. **HotelHero** — full-width фото (`placehold.co` Maldives overwater villa), заголовок «Один отель из 180. Под вас.», подзаголовок, золотая кнопка «Подобрать отель →» (скролл к `#hotel-quiz`).
4. **HotelClubAdvantage** — 3 колонки с иконками lucide (`BadgePercent`, `Lock`, `MessageCircle`).
5. **HotelDestinationMaldives** — фото-карта атоллов + текст, ниже 5 мини-карточек (Северный Мале, Баа, Раа, Ари, Лавияни).
6. **HotelScenarios** — сетка `md:grid-cols-4` (2 ряда × 4), 8 карточек с иконками (`Heart`, `Users`, `Fish`, `Sparkles`, `Gem`, `UsersRound`, `Palmtree`, `Crown`). Кнопка «Подобрать в этом стиле →» — скроллит к квизу и предзаполняет приоритеты.
7. **HotelQuiz** (`id="hotel-quiz"`) — отдельный компонент (см. ниже).
8. **HotelClubPerks** — 6 пунктов с иконками.
9. **HotelManager** — карточка Виктории (визуал как `TourManagerCard`), телефон +7 (914) 705-17-05, WhatsApp/Telegram.
10. `<NewsletterSocial />`
11. `<Footer />`

SEO через `useEffect`: `document.title` + `meta description` + canonical (без новых зависимостей).

### 4. Компонент `src/components/hotels/HotelQuiz.tsx`
- State: `step` (1–6), `answers`, `submitting`, `submitted`.
- Prop `presetScenario?: string`: при изменении прыжок на шаг 4 (приоритеты) с предзаполнением соответствующих чекбоксов.
- Шаги:
  1. Даты поездки (период + длительность)
  2. Состав (взрослые / дети с возрастами)
  3. Бюджет (диапазон)
  4. Приоритеты (multi, 1–3)
  5. Стиль отеля
  6. Контакты + согласие на 152-ФЗ
- Прогресс-бар: shadcn `Progress`.
- Навигация Назад/Далее, валидация обязательных полей на каждом шаге; zod на финальном (имя, телефон/мессенджер обязательны, email опционален).
- Submit → `supabase.from('hotel_leads').insert(payload)` + toast «Заявка отправлена», переход на финальный экран с фото Виктории и кнопками «Позвонить» / «WhatsApp».

### 5. Backend — только сохранение заявки (миграция)
Таблица `public.hotel_leads`:
- `id uuid pk default gen_random_uuid()`
- `created_at timestamptz default now()`
- `name text not null`
- `phone text`
- `messenger text` (whatsapp/telegram/phone)
- `email text`
- `dates jsonb`, `composition jsonb`, `budget jsonb`
- `priorities text[]`, `style text`
- `scenario text` (из карточки сценария, если был)
- `consent boolean default false`
- `source text default 'hotels-maldives'`
- `raw jsonb` (полный payload на всякий)

RLS:
- ENABLE RLS
- Policy `Anyone can insert hotel leads` FOR INSERT TO anon, authenticated WITH CHECK (true)
- SELECT/UPDATE/DELETE — без публичных политик (приватно). Чтение позже через сервисную роль / админку.

U-on API + email-дубль — отложено. Edge function добавим следующей итерацией поверх этой же таблицы.

### 6. Что НЕ трогаю
Туры, круизы, главная, спецпредложения, дизайн-токены, существующие компоненты.

### Технические детали
- Папки `src/pages/hotels/` и `src/components/hotels/` — новые.
- Картинки — `placehold.co/<size>?text=...` согласно ТЗ.
- Кнопки — существующий вариант `Button` с золотой палитрой (как на страницах туров).
- Toast — `sonner` (`import { toast } from "sonner"`).
