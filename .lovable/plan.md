
## Replace date text input with Select dropdown in booking form

### What changes
In `TourBookingForm.tsx`, replace the plain text `<input>` for "Желаемая дата" with a `<Select>` dropdown populated with the same `startDates` array used in the info block.

### How
1. **Pass `startDates` as prop** — update `TourBookingFormProps` to include `startDates: string[]`, pass it from `TourDetail.tsx`.

2. **Replace input with Select** — swap the date `<input>` (lines 61-67) with a `Select` / `SelectTrigger` / `SelectContent` / `SelectItem` using the same pattern as in the info block. Style the trigger to match the other form inputs (`inputClass`).

3. **In `TourDetail.tsx`** — add `startDates={tour.startDates}` to the `<TourBookingForm>` component call.

### Files changed
- `src/components/TourBookingForm.tsx` — add prop, replace input with Select
- `src/pages/TourDetail.tsx` — pass `startDates` prop
