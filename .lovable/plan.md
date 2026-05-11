## План

Страница `AfricaCruisesPage.tsx` уже существует, но передаёт пустой массив и не имеет hero-заглушки. Приведём её к тому же виду, что и «Круизы по Антарктиде» / «Круизы по Арктике».

### Шаги

1. **Сгенерировать заглушку** `src/assets/africa-hero.jpg` — атмосферное побережье Африки в стиле NatGeo luxury (например, океан + дюны/баобабы или Кейптаун с Столовой горой), 1920×1080.

2. **`src/pages/cruises/AfricaCruisesPage.tsx`** — переписать по образцу Арктики:
   - `tours={tours.filter(t => t.region === "Африка")}` (фильтр по региону, без срезов)
   - `title={<>Круизы по <span className="italic">Африке</span></>}`
   - `subtitle="Вдоль побережья чёрного континента"`
   - `breadcrumbLabel="Круизы по Африке"`
   - `fallbackHeroImage={africaHero}`
   - `hideSpecialOfferTag`

### Что не меняется

- `CategoryToursPage.tsx` уже поддерживает `fallbackHeroImage` — править не нужно.
- Маршрут `/cruises/africa` и ссылки в Navbar/Footer уже существуют.
- При появлении туров с `region: "Африка"` они автоматически отрисуются и hero возьмёт их фото.
