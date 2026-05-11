## План: «Круизы по Азии» — корректный фильтр

### Шаги

1. **Hero-изображение** — сгенерировать `src/assets/asia-cruises-hero.jpg` (азиатский морской пейзаж, экспедиционный лайнер у берегов Японии/Индонезии, NatGeo-стиль, 1920×1088).

2. **`src/pages/cruises/AsiaCruisesPage.tsx`** — переписать по образцу Арктики:
   - Фильтрация:
     ```ts
     tours.filter(t =>
       regionToContinent[t.region] === "Азия"
       && (t.category === "expedition" || t.category === "classic")
       && t.region !== "Россия"
       && t.region !== "Ближний Восток"
     )
     ```
     (исключаем Россию и Ближний Восток — у них свои страницы)
   - `fallbackHeroImage={asiaHero}`
   - `hideSpecialOfferTag`
   - title/subtitle/breadcrumb сохранить.

### Результат
На странице будут показаны все экспедиционные и классические круизы по Японии, Южной Корее, Китаю, Северной Корее, Индонезии, Мальдивам и общему региону «Азия».

### Не меняется
- Маршрут `/cruises/asia` в `App.tsx`.
- Шаблон `CategoryToursPage`.
- `regionToContinent` в `src/data/tours.ts`.