

## Remove cross-category filling in "Similar Tours" block

### Problem
Currently, when a category has fewer than 4 tours (after excluding the current one), the block fills remaining slots with tours from other categories. The user wants only same-region tours displayed.

### Changes in `src/pages/TourDetail.tsx`

Remove lines 270-275 (the fallback logic that supplements with other categories). Keep only `sameCategoryTours`:

```ts
const category = categoryMap.find(c => c.list.some(t => t.id === tour.id));
const sameCategoryTours = category ? category.list.filter(t => t.id !== tour.id) : [];
// Use sameCategoryTours directly — no cross-category filling
return sameCategoryTours.length > 0 && category ? (
```

The grid will show 3 cards (or however many exist in the same category) without padding from unrelated regions.

### Files changed
- `src/pages/TourDetail.tsx` — remove lines 269-275, use `sameCategoryTours` directly

