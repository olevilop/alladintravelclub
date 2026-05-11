## План: Страница «Круизы в Южную Америку»

Маршрут `/cruises/south-america` уже существует. Привести страницу к шаблону Арктики.

### Шаги

1. **Hero-изображение** — сгенерировать `src/assets/south-america-hero.jpg` (Патагония/Галапагосы/Амазонка, экспедиционный лайнер, NatGeo-стиль, 1920×1080).

2. **`src/pages/cruises/SouthAmericaCruisesPage.tsx`** — переписать по образцу Арктики:
   - фильтрация: `tours.filter(t => regionToContinent[t.region] === "Южная Америка")`
   - `fallbackHeroImage={southAmericaHero}`
   - `hideSpecialOfferTag`
   - title/subtitle/breadcrumb сохранить.

### Не меняется
- Маппинг `regionToContinent` в `src/data/tours.ts` уже содержит `"Южная Америка": "Южная Америка"`.
- Маршрут в `App.tsx`, шаблон `CategoryToursPage`.
