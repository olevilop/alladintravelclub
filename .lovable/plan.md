

## Add tour name to the sidebar info card

In `src/pages/TourDetail.tsx`, add the tour name as the first element inside the sidebar card (the `bg-card border border-border p-6` div), before the price line.

### Change

Add a styled heading with the tour name at the top of the card:

```tsx
<div className="bg-card border border-border p-6 space-y-5">
  <h3 className="font-serif text-lg md:text-xl font-light leading-snug">{tour.name}</h3>
  <div className="font-serif text-2xl text-primary">{tour.price}</div>
  ...
</div>
```

Single file edit: `src/pages/TourDetail.tsx`, one line addition.

