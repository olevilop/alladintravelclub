## Страница "Подбор отеля на Мальдивах" (/hotels/maldives)

### 1. Меню сайта (`src/components/Navbar.tsx`)
- Добавить новый прямой пункт меню **"Подбор отеля"** (без выпадающего списка) → `/hotels/maldives`.
- Позиция: после "Туры" и "Круизы", до "Спецпредложения".
- Аналогично — в мобильном меню.

### 2. Маршрут (`src/App.tsx`)
- Добавить `<Route path="/hotels/maldives" element={<HotelsMaldivesPage />} />` выше catch-all.

### 3. Новая страница `src/pages/hotels/MaldivesHotelsPage.tsx`
Структура (сверху вниз), в той же дизайн-системе, что и страницы туров (cream-фон, Cormorant Garamond, золото `#a87f39`, без Framer Motion на основных блоках):

1. `<Navbar />`
2. **Breadcrumbs**: Главная / Подбор отеля / Мальдивы
3. **HotelHero** — full-width фото виллы над водой (placehold.co `Maldives overwater villa`), заголовок "Один отель из 180. Под вас.", подзаголовок, bronze-кнопка "Подобрать отель →" (скролл к `#hotel-quiz`).
4. **HotelClubAdvantage** — 3 колонки с lucide-иконками (`BadgePercent`, `Lock`, `MessageCircle`).
5. **HotelDestinationMaldives** — фото-карта атоллов слева, текст справа, ниже 5 мини-карточек атоллов (Северный Мале, Баа, Раа, Ари, Лавияни).
6. **HotelScenarios** — сетка 4×2 (md:grid-cols-4), 8 карточек. Каждая: иконка + название + описание + кнопка "Подобрать в этом стиле →", которая скроллит к квизу и предзаполняет `scenario` (через state в родительском компоненте).
7. **HotelQuiz** (`id="hotel-quiz"`) — отдельный компонент `src/components/hotels/HotelQuiz.tsx`. 6 шагов, прогресс-бар сверху, навигация Назад/Далее, валидация обязательных полей, финальный экран благодарности с фото Виктории и телефоном.
8. **HotelClubPerks** — список с иконками (6 пунктов).
9. **HotelManager** — карточка Виктории (формат как `TourManagerCard`, телефон +7 (914) 705-17-05, WhatsApp/Telegram).
10. `<NewsletterSocial />`
11. `<Footer />`

### 4. Компонент квиза `src/components/hotels/HotelQuiz.tsx`
- Локальный state: `step` (1-6), `answers`, `submitting`, `submitted`.
- Принимает prop `presetScenario?: string`, при изменении сбрасывает в шаг 4 (приоритеты) с подсветкой соответствующих чекбоксов.
- Шаги: даты, состав, бюджет, приоритеты (multi 1–3), стиль, контакты + согласие.
- Валидация zod на шаге 6 (имя, мессенджер обязательны; email опционален).
- Прогресс-бар: `Progress` из shadcn.
- Сабмит → вызов helper `submitHotelLead(payload)`.

### 5. Интеграция с U-on Travel CRM
**Проблема CORS**: API U-on не позволяет прямые запросы из браузера. Решение — Edge Function.

- Включить **Lovable Cloud** (если ещё не включён) для edge functions и secrets.
- Создать edge function `supabase/functions/submit-hotel-lead/index.ts`:
  - Принимает JSON квиза.
  - Формирует читаемый `u_text` со всеми ответами.
  - POST на `https://api.u-on.ru/${UON_API_TOKEN}/lead/create.json` с полями `u_name`, `u_phone`, `u_email`, `u_source="Сайт — Подбор отеля Мальдивы"`, `u_country="Мальдивы"`, `u_text`.
  - Параллельно отправляет дубль на email Олега (через тот же механизм, что у форм туров — нужно проверить, как реализовано сейчас; если через Resend — переиспользовать).
  - CORS-заголовки, обработка ошибок, возврат `{ok: true}`.
- Секрет **`UON_API_TOKEN`** — запросить у пользователя через secrets tool (НЕ `VITE_UON_API_TOKEN`, т.к. ключ должен быть серверным, не в бандле фронта).
- Фронт вызывает функцию через `supabase.functions.invoke('submit-hotel-lead', { body })`.

### 6. SEO
В странице через `<Helmet>` (если уже используется) или прямой `useEffect` на `document.title`:
- Title: "Подбор отеля на Мальдивах — Travel Club Alladin"
- Meta description: согласно ТЗ
- Canonical: `/hotels/maldives`

### 7. Картинки
Все — `placehold.co/<size>?text=<подпись>` согласно ТЗ.

### Технические детали
- Папка `src/pages/hotels/` и `src/components/hotels/` — новые.
- `bronze`-кнопка — переиспользовать существующий вариант кнопки из дизайн-системы (Tailwind класс `bg-primary` + золотая палитра).
- Иконки сценариев — lucide (`Heart`, `Users`, `Fish`, `Sparkles`, `Gem`, `UsersRound`, `Palmtree`, `Crown`).

### Что НЕ трогаю
- Туры (Сейшелы, Бразилия), круизы, главную, спецпредложения, дизайн-токены.

### Вопросы для уточнения
1. **Lovable Cloud сейчас включён?** Если нет — нужно включить для edge function + secrets. Альтернатива: оставить только email-дубль (без U-on) и подключить U-on позже.
2. **Email Олега для дубля** — какой адрес и через какой сервис сейчас отправляются заявки с форм туров (Resend / SMTP / другое)? Нужно посмотреть существующую реализацию, чтобы переиспользовать.
3. **`VITE_UON_API_TOKEN` vs серверный `UON_API_TOKEN`**: ты написал `VITE_UON_API_TOKEN`, но любая `VITE_*` переменная попадает в публичный бандл — токен U-on утечёт. Предлагаю хранить как серверный секрет `UON_API_TOKEN` и обращаться только из edge function. Согласен?
