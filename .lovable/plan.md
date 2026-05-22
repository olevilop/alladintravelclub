## План

### 1. Меню — добавить Тайланд

`src/components/Navbar.tsx`: в массив `hotelSubLinks` добавить `{ label: "Тайланд", path: "/hotels/thailand" }`. Выпадашка и мобильное меню уже реализованы — структурно ничего менять не нужно.

### 2. Новая страница `/hotels/thailand`

- `src/App.tsx` — добавить импорт `ThailandHotelsPage` и роут `/hotels/thailand`.
- `src/pages/hotels/ThailandHotelsPage.tsx` — клон `MaldivesHotelsPage` с тайским контентом:
  - **Hero**: фото longtail у скал Краби, заголовок «Тайланд — это не одна страна, а семь.», подзаголовок и кнопка «Подобрать отель →».
  - **Breadcrumbs**: Подбор отеля / Тайланд.
  - **ClubAdvantage** (3 колонки): «Цена не выше публичной», «Доступ к закрытым предложениям», «Личный куратор 24/7 в WhatsApp».
  - **DestinationThailand**: вступление + сетка регионов `sm:grid-cols-2 md:grid-cols-3` (6 регионов: Пхукет, Краби, Самуи, Као Лак, Бангкок, Паттайя) — каждая карточка с мини-картинкой `placehold.co` и описанием.
  - **Scenarios**: 8 карточек по ТЗ (Медовый месяц, Семья, Дайвинг, Wellness, Бангкок+пляж, Бутик-минимализм, Острова без толпы, Премиум в разумной цене) — те же иконки lucide, кнопка «Подобрать в этом стиле →».
  - **HotelQuiz** — переиспользуем существующий компонент с пропом `variant="thailand"` (см. ниже).
  - **ClubPerks** (6 пунктов из ТЗ).
  - **Manager** — Виктория, телефон, WhatsApp, Telegram.
  - **NewsletterSocial + Footer**.
- SEO через `useEffect`: title и meta description по ТЗ, canonical `/hotels/thailand`.

### 3. Квиз — тайская вариация

В `src/components/hotels/HotelQuiz.tsx` добавить проп `variant?: "maldives" | "thailand"` (default `maldives`) и `onSubmitOverride?` для перехвата сабмита:

- Шаг 1: для `thailand` — radio «Ближайшие 3 месяца / 3–6 / 6+ / Гибко» + опц. поле «Конкретные даты».
- Шаг 2: для `thailand` — radio «Вдвоём / Семьёй с детьми (возраст) / С друзьями / Один(на) / Большая компания».
- Шаг 3: бюджеты по ТЗ Тайланда.
- Шаг 4: приоритеты по ТЗ Тайланда (9 чекбоксов, 1–3 выбора).
- Шаг 5: стили по ТЗ Тайланда.
- Шаг 6: контакты (Имя*, WhatsApp/Telegram*, Email опц., textarea, чекбокс согласия). Маппинг сценариев → приоритетов делается локально внутри страницы Тайланда.

Маппинги (PRIORITIES/STYLES/BUDGETS/DURATIONS, маппинг scenario→priority) выносятся в объект `VARIANTS[variant]` внутри `HotelQuiz.tsx`, чтобы не дублировать логику.

### 4. Сабмит без сервера (только для Тайланда)

Для `variant="thailand"` сабмит:
- НЕ вызывает `supabase.from('hotel_leads').insert`;
- делает `console.log("[hotel-quiz/thailand] lead", payload)`;
- показывает финальный экран: «Спасибо! Виктория подготовит для вас 3 варианта под этот запрос и пришлёт в течение 2 часов в WhatsApp или Telegram.» + фото Виктории + кнопка телефона +7 (914) 705-17-05 + WhatsApp.

Мальдивская ветка остаётся без изменений (продолжает писать в Supabase).

### 5. Что НЕ трогаем

- `MaldivesHotelsPage.tsx`, таблицу `hotel_leads`, туры, круизы, главную, дизайн-токены.

### Файлы

```text
edit   src/components/Navbar.tsx          (+1 строка в hotelSubLinks)
edit   src/App.tsx                        (импорт + роут)
edit   src/components/hotels/HotelQuiz.tsx (variant prop + thailand вариант + локальный сабмит)
new    src/pages/hotels/ThailandHotelsPage.tsx
```
