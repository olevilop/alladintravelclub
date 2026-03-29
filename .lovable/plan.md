

## Move "Similar Tours" block to full page width

### Problem
The similar tours carousel is currently inside the 2-column content area (`lg:col-span-2`), constrained by the grid. The user wants it to span the full page width.

### Solution
Move the similar tours block **outside** the `grid-cols-3` div, placing it after the grid closes but still inside the `container mx-auto px-6` wrapper. This gives it the full container width instead of being limited to the 2/3 content column.

### Changes in `src/pages/TourDetail.tsx`

1. **Cut** the entire similar tours block (lines 193-250) from inside `lg:col-span-2`.
2. **Paste** it after the closing `</div>` of the `grid` div (after line 251), still within the `container` section.
3. The carousel items keep `lg:basis-1/4` so 4 cards fit across the full width.

### Files changed
- `src/pages/TourDetail.tsx`

