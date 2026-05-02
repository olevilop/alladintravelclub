---
name: Japan Tour Pricing Constants
description: Shared japanHotelPricing and japanExcursionPricing constants applied to all Japan tours
type: feature
---
В `src/data/tours.ts` определены константы `japanHotelPricing` (категории ½ TWIN / SGL / доп. кровать / дети + 3 ряда: Отели 2–3*, 3* комфорт, 4*) и `japanExcursionPricing` (Вечерний Токио, Традиции Токио, Нара и Осака). Все 5 туров массива `japanTours` используют их через `hotelPricing: japanHotelPricing` и `excursionPricing: japanExcursionPricing`. Исключение: `japan-fuji-lakes` сохраняет собственный `hotelPricing` (другие цены), но получает общий `excursionPricing`. Шаблон аналогичен `koreaOccupancyPricing` для Кореи.
