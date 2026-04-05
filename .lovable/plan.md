

## Исправить блок «Похожие экспедиционные круизы» на странице категории

**Проблема:** На строке 19 `SimilarTours.tsx` переменная `isCruise` определяется через `tours.some(t => t.id === currentTour.id)`. Когда компонент вызывается из `CategoryToursPage` с `id: ""`, ни один тур не совпадает → `isCruise = false` → фильтрация идёт по `region` (тоже пустой) → результат пуст.

**Решение:** Изменить определение `isCruise` — считать круизом также когда передан `category`.

**Файл: `src/components/SimilarTours.tsx`**

Строка 19 — заменить:
```tsx
const isCruise = tours.some(t => t.id === currentTour.id);
```
на:
```tsx
const isCruise = !!currentTour.category || tours.some(t => t.id === currentTour.id);
```

Одна строка, одно изменение. Если `category` задан (как при вызове из `CategoryToursPage`), `isCruise` будет `true`, и фильтрация пойдёт по категории, показывая все экспедиционные круизы.

