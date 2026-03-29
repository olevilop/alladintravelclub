

## Carousel for similar tours, 4 per row, expedition-only filtering

### What
Replace the current 2-column grid in the "Similar Tours" block with a horizontal carousel showing 4 cards per row, with left/right scroll arrows. On expedition cruise pages, only show other expedition cruises (from `tours` array). The block should NOT appear on non-expedition pages (Japan, Korea, etc.).

### How

**`src/pages/TourDetail.tsx`**:

1. Import `Carousel`, `CarouselContent`, `CarouselItem`, `CarouselPrevious`, `CarouselNext` from `@/components/ui/carousel`.

2. Keep the existing filtering: `tours.filter(t => t.id !== tour.id)` — this already only uses the expedition `tours` array.

3. Replace the `grid grid-cols-1 sm:grid-cols-2 gap-6` div with a Carousel component:
   - `CarouselContent` wraps the items
   - Each `CarouselItem` gets `basis-full sm:basis-1/2 lg:basis-1/4` (so 4 per row on large screens, 2 on tablet, 1 on mobile)
   - `CarouselPrevious` and `CarouselNext` buttons for navigation
   - Carousel opts: `{ align: "start", loop: true }`

4. Keep the same card markup inside each carousel item.

### Files changed
- `src/pages/TourDetail.tsx` — replace grid with Carousel, add imports

