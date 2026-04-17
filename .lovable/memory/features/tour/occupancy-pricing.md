---
name: Occupancy Pricing Block
description: Compact per-occupancy price block in tour sidebar between RouteMap and TourBookingForm, used for South Korea tours
type: feature
---
Поле `tour.occupancyPricing` (опциональное) задаёт компактный прайс «Стоимость тура на 1 человека» по типу размещения (1/2/3 чел. в номере). Рендерится в `TourDetail.tsx` в боковой панели между картой маршрута (`RouteMap`) и формой бронирования (`TourBookingForm`), стилизовано как `bg-card border border-border p-4` с `flex justify-between` строками.

Для туров по Южной Корее цены идентичны и вынесены в общую константу `koreaOccupancyPricing` в `src/data/tours.ts`. Применяется ко всем 5 турам с `region === "Южная Корея"`.
