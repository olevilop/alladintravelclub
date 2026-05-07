## Цель
Убрать нижний бейдж «спецпредложение» (`getSpecialOfferLabel(tour.specialOfferTag)`) в карточках только на странице «Экспедиционные круизы». На остальных категорийных страницах бейдж остаётся.

## Изменения

1. **`src/pages/CategoryToursPage.tsx`**
   - Добавить опциональный проп `hideSpecialOfferTag?: boolean` в `CategoryToursPageProps` и в деструктуризацию.
   - Обернуть рендер блока спецпредложения условием: `{!hideSpecialOfferTag && getSpecialOfferLabel(tour.specialOfferTag) && (...)}`.

2. **`src/pages/ExpeditionCruisesPage.tsx`**
   - Передать `hideSpecialOfferTag` в `<CategoryToursPage />`.

## Эффект
На карточках страницы «Экспедиционные круизы» нижняя строка-бейдж со спецпредложением не отображается. Блок «Спецпредложения» (карусель внизу страницы) и другие категории не затронуты.
