## Цель
Полностью удалить верхний бейдж (`tour.badge` — «🇷🇺 РУССКАЯ ГРУППА» / «🎄 НОВЫЙ ГОД») из карточек на категорийных страницах туров. Не скрыть условием, а вырезать JSX и связанный проп.

## Изменения

1. **`src/pages/CategoryToursPage.tsx`**
   - Удалить блок:
     ```tsx
     {!hideBadge && tour.badge && (
       <span className="text-xs text-primary font-sans uppercase tracking-[0.25em] mb-2">
         {tour.badge}
       </span>
     )}
     ```
   - Убрать поле `hideBadge?: boolean` из `CategoryToursPageProps` и из деструктуризации пропсов.

2. **`src/pages/ExpeditionCruisesPage.tsx`**
   - Убрать проп `hideBadge` из вызова `<CategoryToursPage />`.

## Эффект
Верхний бейдж больше не будет рендериться ни на одной категорийной странице (Экспедиционные круизы, Классические, Япония, Корея и т. д.). Поле `tour.badge` в данных оставляем как есть — оно ещё используется в `TourCarousel` (домашняя) и в `TourDetail`.
