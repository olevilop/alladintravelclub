## Plan: Remove "Экскурсионный тур" badge from China tour cards on the home page

### Goal
Remove the "Экскурсионный тур" label that appears on the cards in the **Туры по Китаю** section on the home page.

### Where it appears
The label comes from the `badge` field on each tour object. In `src/data/tours.ts`, all 6 tours inside `chinaTours` currently have:
```ts
badge: "Экскурсионный тур",
```

### What will change
In `src/data/tours.ts`, remove the `badge: "Экскурсионный тур"` line from the following 6 tours:
1. `china-grand-tour-2026` (line ~2055)
2. `china-zhangjiajie-2026` (line ~2149)
3. `china-avatar-mountains-2026` (line ~2244)
4. `china-beijing-xian-luoyang-2026` (line ~2345)
5. `china-shanghai-fenghuang-2026` (line ~2435)
6. `china-shanghai-disney-2026` (line ~2505)

### Side effects
- The badge will also disappear from the tour detail pages (`TourDetail.tsx`) for these 6 tours. The remaining "Групповой тур" line will stay.
- No other tours or sections are affected.

### Files changed
- `src/data/tours.ts`