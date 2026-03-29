

## Add missing ship names to cruise tours

### Problem
Two tours that involve sea vessels are missing the `shipName` field, so the ship name row doesn't appear on their detail pages.

### Tours to update in `src/data/tours.ts`

| Tour ID | Tour Name | Ship Name to Add |
|---|---|---|
| `antarctic-penguins` | Королевские пингвины Антарктиды | `"Antarctic Dream"` |
| `galapagos-islands` | Галапагосские острова | `"Galápagos Explorer"` |

### Additional fix
Currently `isCruise` only checks for "круиз" in the tour name, but these tours don't contain that word. The ship name row in `TourDetail.tsx` is gated by `isCruise && tour.shipName`. We should change the condition to just `tour.shipName` — if a ship name exists, show it regardless of tour type.

### Files changed
- `src/data/tours.ts` — add `shipName` to two tours
- `src/pages/TourDetail.tsx` — change `{isCruise && tour.shipName && ...}` to `{tour.shipName && ...}`

