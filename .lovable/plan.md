

## Show 4 cards in the "Similar Tours" block

### Problem
The block "Похожие туры в Японию" shows only 3 cards, because each category has 4 tours total — filtering out the current tour leaves 3. The user wants 4 cards.

### Solution
When a category has fewer than 4 similar tours, supplement the list with tours from other categories (excluding the current tour) to always show exactly 4 cards.

### Changes in `src/pages/TourDetail.tsx`

Update the similar tours logic (lines 258-268):

```ts
const category = categoryMap.find(c => c.list.some(t => t.id === tour.id));
const sameCategoryTours = category ? category.list.filter(t => t.id !== tour.id) : [];

// If fewer than 4, fill with tours from other categories
let similarTours = [...sameCategoryTours];
if (similarTours.length < 4) {
  const allOtherTours = categoryMap
    .flatMap(c => c.list)
    .filter(t => t.id !== tour.id && !similarTours.some(s => s.id === t.id));
  similarTours = [...similarTours, ...allOtherTours].slice(0, 4);
}
```

This ensures exactly 4 cards are always displayed.

### Files changed
- `src/pages/TourDetail.tsx` — update similar tours filtering logic

