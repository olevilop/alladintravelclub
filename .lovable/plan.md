## План: Страница «Круизы в Северную Америку»

Маршрут `/cruises/north-america` уже существует. Привести страницу к шаблону Арктики.

### Шаги

1. **Hero-изображение** — сгенерировать `src/assets/north-america-hero.jpg` (Аляска/фьорды/Карибы, экспедиционный лайнер, NatGeo-стиль).

2. **`src/pages/cruises/NorthAmericaCruisesPage.tsx`** — переписать по образцу Арктики:
   - фильтрация: `tours.filter(t => regionToContinent[t.region] === "Северная Америка")` (на будущее, когда туры появятся)
   - `fallbackHeroImage={northAmericaHero}`
   - `hideSpecialOfferTag`
   - title/subtitle/breadcrumb сохранить.

3. **`src/data/tours.ts`** — добавить `"Северная Америка": "Северная Америка"` в маппинг `regionToContinent`.

### Не меняется
- Маршрут в `App.tsx`, шаблон `CategoryToursPage`.
