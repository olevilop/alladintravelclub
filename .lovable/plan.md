## Задача
Добавить блоки «Стоимость тура на 1 человека» (hotelPricing) и «Стоимость доп. экскурсий» (excursionPricing) на страницы всех туров по Японии — теми же значениями, что в туре «Япония с востока на запад 2» (`japan-sakura-kyoto`).

## Затрагиваемые туры (`src/data/tours.ts`, массив `japanTours`)
- `japan-fuji-lakes` — есть свой hotelPricing, нет excursionPricing → добавить только excursionPricing.
- `japan-onsen-trail` — нет ни одного → добавить оба.
- `japan-spiritual-path` — нет ни одного → добавить оба.
- `japan-hokkaido-winter` — нет ни одного → добавить оба.
- `japan-grand-tour` — оба уже есть → не трогать.
- `japan-sakura-kyoto` — эталон, не трогать.

## Реализация
1. В `src/data/tours.ts` вынести значения `hotelPricing` и `excursionPricing` из тура `japan-sakura-kyoto` в две общие константы перед массивом `japanTours`:
   - `japanHotelPricing` (categories + 3 ряда отелей 2–3*/3*комфорт/4*).
   - `japanExcursionPricing` (Вечерний Токио, Традиции Токио, Нара и Осака).
   Это аналогично шаблону `koreaOccupancyPricing`.
2. Заменить инлайн-объекты в туре `japan-sakura-kyoto` ссылками на эти константы (для единого источника правды).
3. В четыре тура из списка добавить недостающие поля, ссылающиеся на те же константы.

## Технические детали
- Никаких изменений в UI не требуется: `TourDetail.tsx` уже рендерит оба блока при наличии полей (`hotelPricing` → блок «Стоимость тура на 1 человека» с селектором отелей; `excursionPricing` → блок «Стоимость доп. экскурсий» с селектором экскурсий).
- Порядок и стилизация блоков сохранятся автоматически.
- Обновить мемори: расширить запись о hotel/excursion pricing, упомянув константы `japanHotelPricing` / `japanExcursionPricing` для японских туров (по аналогии с `koreaOccupancyPricing`).
