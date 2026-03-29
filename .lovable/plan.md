

## Redesign sidebar info card

### What changes

In the sidebar "Quick info card" on `TourDetail.tsx`, replace/modify the info rows:

1. **Days → Days/Nights**: Change `{tour.days} дней` to `{tour.days} дней / {tour.days - 1} ночей`. Replace `Calendar` icon with `Moon` (from lucide-react).

2. **Group size → Region**: Replace the `Users` + `{tour.groupSize}` row with `MapPin` + `{tour.region}` (region data already exists on every tour).

3. **Add ship name row (cruises only)**: Show `Ship` icon + ship name when `isCruise` is true. Since `Tour` interface has no `shipName` field, add an optional `shipName?: string` to the interface and populate it for cruise tours in `tours.ts`.

4. **Add price row**: Show `Banknote` icon + `Стоимость от {tour.price}` (price data already exists, format is "от €12 500" etc.).

5. **Add route row**: Show `Route` icon + route points joined with ` → ` arrows. Pull point labels from `tourRoutes` data (already exists in `tourRoutes.ts`). Import `tourRoutes` and render `points.map(p => p.label).join(" → ")`.

6. **Remove the standalone price line** (`<div className="font-serif text-2xl text-primary">{tour.price}</div>`) since price moves into the info rows.

### Data model change: `src/data/tours.ts`

Add `shipName?: string` to `Tour` interface. Set it on cruise tours:
- `arctic-spitsbergen`: `"Ocean Explorer"`
- `norway-fjords`: `"Nordic Voyager"`  
- Any other cruise tours — add appropriate names.

### File: `src/pages/TourDetail.tsx`

- Import `Moon, MapPin, Ship, Banknote, Route` from lucide-react (remove `Users, Mountain, Calendar` from the info rows import if unused elsewhere — `Calendar` is still used for date select).
- Import `tourRoutes` from `@/data/tourRoutes`.
- Replace the `<div className="space-y-3 text-sm">` block with new rows.
- Remove standalone price div.

### Files changed
- `src/data/tours.ts` — add `shipName` to interface + cruise tour data
- `src/pages/TourDetail.tsx` — rewrite info rows in sidebar

