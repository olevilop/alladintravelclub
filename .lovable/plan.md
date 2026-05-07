## План: тур «Шанхай, Чжанцзяцзе и Фэнхуан» (china-shanghai-fenghuang-2026)

Структура и UI берутся от `china-grand-tour-2026` / `china-zhangjiajie-2026` — повторно используем `Tour` из `src/data/tours.ts`, существующий `TourDetail.tsx`, `SimilarTours`, `ToursSection`, `ChinaToursPage`. Нужен один новый блок UI — двойной селектор (размер группы + категория отеля).

## 1. Расширить модель Tour — `src/data/tours.ts`

Добавить опциональное поле в интерфейс `Tour` (рядом с `groupPricing`):

```ts
groupHotelPricing?: {
  title?: string;
  defaultGroup?: string;
  defaultHotel?: string;          // напр. "4★"
  hotels: string[];               // ["4★", "5★"]
  twinLabel?: string;             // "Двухместный (½ TWIN)"
  sglLabel?: string;              // "Доплата за SGL"
  sglByHotel: Record<string, string>; // { "4★": "+1 575 ¥", "5★": "+2 725 ¥" }
  groups: {
    label: string;                // "3-6 человек"
    twinByHotel: Record<string, string>; // { "4★": "9 450 ¥", "5★": "10 700 ¥" }
  }[];
};
```

Это новое поле, чтобы не ломать существующий `groupPricing` (один селектор) — он остаётся как есть для других туров.

## 2. Новый объект тура в `chinaTours`

Вставить в конец массива `chinaTours` (как делали с предыдущим китайским туром):

- `id: "china-shanghai-fenghuang-2026"`
- `name: "Шанхай, Чжанцзяцзе и Фэнхуан"`
- `region: "Китай"`, `category: "Групповой тур"`, `badge: "Экскурсионный тур"`
- `days: 8`, `price: "от 6 290 ¥"`
- `image` + `gallery` — placehold.co (5 картинок)
- `subtitle: "Идеальное сочетание мегаполиса, парящих гор и древнего города на воде"`
- `description` — 4 абзаца из ТЗ (Шанхай / Чжанцзяцзе / Фэнхуан / общий)
- `itinerary` — 8 дней из ТЗ
- `included` — 9 пунктов (включая VIP-проходы списком)
- `notIncluded` — 5 пунктов
- `extras` — две доплаты:
  - «✈ Авиабилеты Шанхай ↔ Чжанцзяцзе: базовая 2 940 ¥/чел; со скидкой обычно 1 800–2 300 ¥/чел в зависимости от даты. Точная цена при подтверждении.»
  - «🛏 Ранний заезд в Шанхае: 4★ — +300 ¥/чел, 5★ — +500 ¥/чел (двухместный номер)»
- `groupSize: "от 2 до 15 человек"`, `startDates: ["По запросу — 2026"]`
- `groupHotelPricing` с 7 группами (2, 3-6, 7-9, 10, 10+1, 15, 15+1) × {4★, 5★} по таблице из ТЗ; `defaultGroup: "3-6 человек"`, `defaultHotel: "4★"`, SGL: 4★ +1 575 ¥, 5★ +2 725 ¥.

## 3. Маршрут — `src/data/tourRoutes.ts`

Добавить ключ:
```ts
"china-shanghai-fenghuang-2026": [
  { lat: 31.23, lng: 121.47, label: "Шанхай" },
  { lat: 29.12, lng: 110.48, label: "Чжанцзяцзе" },
  { lat: 28.72, lng: 109.74, label: "Фурун" },
  { lat: 27.95, lng: 109.60, label: "Фэнхуан" },
  { lat: 31.23, lng: 121.47, label: "Шанхай" },
],
```

## 4. Двойной селектор в `src/pages/TourDetail.tsx`

В сайдбаре после блока `groupPricing` (строка ~497) добавить новый блок, отрисовывающий `tour.groupHotelPricing`:

- два состояния: `selectedGroup2` и `selectedHotel2` (новые `useState`, чтобы не конфликтовать с уже существующими `selectedGroup`/`selectedHotel`)
- стилистика 1:1 с существующим блоком `groupPricing` (`bg-card border border-border p-4`, тот же заголовок-крошка)
- сверху `<Select>` «Размер группы» (как сейчас)
- ниже — toggle-кнопки «4★ / 5★» (две `<button>` с активным состоянием через `cn(...)`, цвет primary для активной — паттерн уже используется в проекте)
- ниже — две строки таблицы:
  - «Двухместный (½ TWIN)» → `group.twinByHotel[hotel]`
  - «Доплата за SGL» → `sglByHotel[hotel]`

## 5. Что заработает автоматически

- Карточка в `/china-tours` (через `chinaTours` → `ChinaToursPage`).
- Карточка на главной в блоке «Туры по Китаю» (через `ToursSection`).
- Страница тура `/tour/china-shanghai-fenghuang-2026` (общий route `/tour/:id`).
- Хлебные крошки «Главная → Туры по Китаю → …» по `region`.
- TourInfo сайдбар, RouteMap, accordion «Доплаты», менеджер Виктория.
- `SimilarTours` — текущий тур исключается, показываются остальные китайские; новый автоматически появится на других китайских турах.

## Замечание про URL

ТЗ указывает `/china-shanghai-fenghuang-2026`, но проект использует `/tour/:id`. Тур будет доступен по `/tour/china-shanghai-fenghuang-2026`. Если нужен короткий URL без `/tour/` — добавлю отдельный редирект-роут в `App.tsx`, скажите.
