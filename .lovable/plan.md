

## Добавить блок «Похожие экспедиционные круизы» на страницу категории

**Проблема:** На странице «Экспедиционные круизы» (`ExpeditionCruisesPage`) нет блока «Похожие экспедиционные круизы» — компонент `CategoryToursPage` его не рендерит.

**Решение:** Добавить компонент `SimilarTours` в `CategoryToursPage`, передавая ему данные о категории.

**Файл: `src/pages/CategoryToursPage.tsx`**

1. Добавить необязательный проп `category?: string` в интерфейс `CategoryToursPageProps`
2. Импортировать `SimilarTours`
3. Если `category` задан — рендерить `<SimilarTours currentTour={{ id: "", region: "", category }} />` перед `SpecialOffers`. Пустой `id` гарантирует, что ни один тур не будет исключён (все туры категории покажутся)

**Файл: `src/pages/ExpeditionCruisesPage.tsx`**

1. Передать проп `category="expedition"` в `CategoryToursPage`

**Файл: `src/pages/ClassicCruisesPage.tsx`**

1. Аналогично передать `category="classic"` (для единообразия)

Остальные страницы категорий (региональные туры) не затрагиваются — для них блок похожих туров не нужен.

