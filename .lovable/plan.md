## Цель
На странице «Экспедиционные круизы» убрать бейдж спецпредложения (например, «Русская группа») из карточки тура.

## Контекст
Карточки рендерит общий компонент `src/pages/CategoryToursPage.tsx`. В правой колонке (под ценой) выводится блок:

```tsx
{getSpecialOfferLabel(tour.specialOfferTag) && (
  <div className="pt-3 mt-1 border-t border-primary/20 ...">
    {getSpecialOfferLabel(tour.specialOfferTag)}
  </div>
)}
```

Этот же компонент используется и на других категорийных страницах (Япония, Корея, Китай, Россия и т. д.), поэтому удалять блок безусловно нельзя — нужно скрыть только для экспедиционных круизов.

## Изменения

1. **`src/pages/CategoryToursPage.tsx`**
   - Добавить в `CategoryToursPageProps` опциональный флаг `hideSpecialOfferTag?: boolean`.
   - Обернуть рендер блока спецпредложения условием `!hideSpecialOfferTag && getSpecialOfferLabel(...)`.

2. **`src/pages/ExpeditionCruisesPage.tsx`**
   - Передать `hideSpecialOfferTag` в `<CategoryToursPage />`.

Никаких других страниц это не затронет — бейджи спецпредложений на остальных категорийных страницах сохранятся.
