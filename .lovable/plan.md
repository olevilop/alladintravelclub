## Проблема

Карточка яхты не отображается, потому что:
1. У тура `seychelles-tropical-rhythms` есть `shipName: "Яхта Emerald Kaia"`, но **отсутствует `shipImage`** — а условие рендера `tour.shipName && tour.shipImage`.
2. Сам блок находится в самом низу сайдбара (после extras), а не под «Стоимостью кают», как просили.

## Шаги

1. **Скопировать фото** `user-uploads://Снимок_экрана_2026-05-03_в_11.19.41.png` → `src/assets/yacht-emerald-kaia.jpg`.

2. **`src/data/tours.ts`**:
   - Импортировать ассет: `import emeraldKaiaShip from "@/assets/yacht-emerald-kaia.jpg";`
   - У тура `seychelles-tropical-rhythms` (строка ~240) добавить `shipImage: emeraldKaiaShip`.

3. **`src/pages/TourDetail.tsx`**:
   - Вырезать блок карточки яхты (строки 433–443) и вставить сразу после блока `cabinPricing` (после строки 349), перед `occupancyPricing` и `BookingForm`.

В итоге порядок в сайдбаре: RouteMap → Cabin Pricing → **Яхта Emerald Kaia (с фото)** → Occupancy → Booking form.
