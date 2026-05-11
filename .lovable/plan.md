## План: Страница «Круизы по России»

Маршрут `/cruises/russia` уже существует. Привести страницу к шаблону Арктики.

### Шаги

1. **Hero-изображение** — сгенерировать `src/assets/russia-cruises-hero.jpg` (Байкал/Камчатка/Алтай, экспедиционный лайнер или дикая природа, NatGeo-стиль, 1920×1080).

2. **`src/pages/cruises/RussiaCruisesPage.tsx`** — переписать по образцу Арктики:
   - использовать `russiaTours` из `@/data/tours`
   - `fallbackHeroImage={russiaHero}`
   - `hideSpecialOfferTag`
   - title/subtitle/breadcrumb сохранить.

### Не меняется
- Маршрут в `App.tsx`, шаблон `CategoryToursPage`.
- Массив `russiaTours` уже экспортирован из `src/data/tours.ts`.