

## Add "Similar Tours" block on expedition cruise pages

### What
After the "What's included" section on expedition cruise detail pages, add a "Похожие туры" (Similar Tours) block showing other expedition cruises (excluding the current one). Use the same card design as on the main page.

### How

**`src/pages/TourDetail.tsx`**:
1. Import `tours` from `@/data/tours` and `Calendar, ArrowRight` from lucide-react (ArrowRight needs adding).
2. Determine if current tour is an expedition cruise: `const isExpeditionCruise = tours.some(t => t.id === tour.id)`.
3. Compute similar tours: `const similarTours = tours.filter(t => t.id !== tour.id)`.
4. After the "Included / Not Included" block (inside `lg:col-span-2`), conditionally render the similar tours section when `isExpeditionCruise` is true.
5. Section includes:
   - Heading with gold decorative lines matching main page style: "Похожие *круизы*"
   - Grid of tour cards (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`) — same card markup as `ToursSection`: image with region badge, title, days, price, "Подробнее" link.

### Card design (copied from ToursSection)
- Card: `bg-card border border-border/50 overflow-hidden hover:border-primary/30`
- Image: `aspect-[16/10]` with region badge top-right
- Info: tour name, days with Calendar icon, price + "Подробнее" link with ArrowRight

### Files changed
- `src/pages/TourDetail.tsx` — add similar tours block

