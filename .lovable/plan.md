## План: Страница «Круизы на Ближний Восток»

Маршрут `/cruises/middle-east` уже существует. Привести страницу к шаблону Арктики.

### Шаги

1. **Hero-изображение** — сгенерировать `src/assets/middle-east-hero.jpg` (Дубай/Оман/Красное море, роскошный круиз, NatGeo-стиль).

2. **`src/pages/cruises/MiddleEastCruisesPage.tsx`** — переписать по образцу `ArcticCruisesPage`:
   - фильтрация: `tours.filter(t => t.region === "Ближний Восток")`
   - `fallbackHeroImage={middleEastHero}`
   - `hideSpecialOfferTag`
   - title/subtitle/breadcrumb сохранить.

### Не меняется
- Маршрут в `App.tsx`, шаблон `CategoryToursPage`, маппинг `regionToContinent` (там уже есть `"Ближний Восток": "Азия"` — оставляем как есть, фильтрация идёт по точному региону, как в Арктике).
