## Шаги

1. **`src/components/TourBookingForm.tsx`**:
   - Добавить prop `cabins?: string[]`.
   - В state добавить `cabin: ""` и сбрасывать его при submit.
   - После Select с датой добавить условный Select «Желаемая каюта» (если `cabins?.length`), список — имена кают без цен.

2. **`src/pages/TourDetail.tsx`** — передать в `TourBookingForm` пропс:
   ```tsx
   cabins={tour.cabinPricing?.cabins.map(c => c.name)}
   ```
