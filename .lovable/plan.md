## План: добавить тур «Бразилия — Scenic Eclipse 2027»

Создаём новый тур в существующей структуре `src/data/tours.ts` без изменения Сейшельского тура и общих компонентов. Все имеющиеся компоненты (TourDetail, TourCarousel, TourBookingForm, ExpeditionManagerCard, RouteMap, SpecialOffers) уже умеют рендерить нужные блоки — достаточно добавить данные.

### 1. `src/data/tours.ts`
- Добавить новый объект в массив `tours` сразу после Сейшельского (id: `seychelles-tropical-rhythms`):
  - `id: "brazil-scenic-eclipse-2027"`
  - `name: "Ритмы бразильского побережья на мега-яхте Scenic Eclipse"`
  - `subtitle: "12-дневная экспедиция по сокровищам Южной Америки на борту 6-звёздочной яхты"`
  - `region: "Бразилия"` (для бейджа страны на карточке и в сайдбаре)
  - `category: "expedition"`
  - `days: 12`, `price: "от €9 435"`, `badge: "🇷🇺 РУССКАЯ ГРУППА"`
  - `startDates: ["17.03.2027 — 28.03.2027"]`
  - `shipName: "Scenic Eclipse 6*"`, `shipImage` — placehold.co
  - `image` + `gallery` (5 шт.) — placehold.co с подписями (Rio, Paraty, Ilhabela, Buzios, Scenic Eclipse)
  - `description` — 3 абзаца из ТЗ
  - `itinerary` — 11 пунктов (день 4–5 одной строкой «Дни в море»)
  - `included`, `notIncluded` — списки из ТЗ
  - `paymentTerms`, `cancellationTerms` — из ТЗ
  - `cabinPricing` — 10 кают, `defaultCabin: "Делюкс Веранда CA, 5 палуба (32 м²)"`, note и footnote как у Сейшел
  - `extras` — короткое описание судна Scenic Eclipse 6* (использует существующий блок «Дополнительно»)

- Добавить в `regionToContinent`: `"Бразилия": "Южная Америка"`.

- (Опционально) Расширить `interface Tour` полем `specialOfferTag?: string` и проставить его — на будущее. Текущий `SpecialOffers` выбирает 8 случайных туров (не фильтрует по тегу), поэтому новый тур и так уже попадёт в выдачу. Логику выборки не трогаем, чтобы не сломать.

### 2. Главная страница / карусель «Экспедиционные круизы»
Никаких правок в `ToursSection.tsx` / `ExpeditionCruisesPage.tsx` не нужно — обе страницы уже рендерят `tours.filter(t => t.category === "expedition")`, новый тур появится автоматически рядом с Сейшельским.

### 3. Страница тура `/tour/brazil-scenic-eclipse-2027`
Используется существующая страница `TourDetail.tsx`. Дополнительно проверим:
- Бейдж `🇷🇺 РУССКАЯ ГРУППА` уже выводится в сайдбаре (поле `badge`).
- Континент «Южная Америка» отдельной строкой — обеспечивается через `regionToContinent["Бразилия"]`.
- Менеджер: т.к. `region !== "Япония"/"Южная Корея"`, автоматически отрендерится `ExpeditionManagerCard` (Виктория, тот же телефон/Telegram/WhatsApp). Карточку Сейшельского тура и менеджера НЕ трогаем.

### Что НЕ меняем
- Сейшельский тур и его данные.
- `ExpeditionManagerCard`, `TourBookingForm`, `TourCarousel`, `SpecialOffers`, `ToursSection`.
- Стили, шрифты, цвета.

### Файлы к правке
- `src/data/tours.ts` — добавление объекта тура + строка в `regionToContinent` (+ опционально поле в интерфейсе).
