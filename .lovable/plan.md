

## Horizontal scroll carousel for tour category blocks

### Problem
Each tour category block on the main page displays all tours in a grid. Now that there are 5+ tours per category, the user wants each block to show exactly 4 cards at a time with left/right scroll arrows to reveal more.

### Solution
Create a reusable `TourCarousel` component that wraps tour cards in a horizontally scrollable container with navigation arrows. Replace all 6 grid blocks in `ToursSection.tsx` with this carousel.

### New file: `src/components/TourCarousel.tsx`
- Accepts `tours` array as prop
- Renders a horizontal scroll container (`overflow-x-auto`, `scroll-snap-type: x mandatory`) showing 4 cards at a time on desktop (2 on tablet, 1 on mobile)
- Left/right arrow buttons on sides (styled like existing UI — outline, rounded, with `ArrowLeft`/`ArrowRight` icons)
- Clicking arrows scrolls by one card width using `scrollBy` with smooth behavior
- Cards use `scroll-snap-align: start`, `flex-shrink-0`, width `calc(25% - gap)` on lg
- Hide scrollbar with CSS (`scrollbar-width: none`, `-webkit-scrollbar: none`)
- Hide left arrow when scrolled to start, right arrow when scrolled to end

### Changes in `src/components/ToursSection.tsx`
Replace each `<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">` block with `<TourCarousel tours={...} />`. This affects 6 blocks:
1. Expeditionary cruises (`filtered.slice(0, 4)` → pass full `filtered.slice(0, 4)` or more)
2. Classic cruises (`filtered.slice(4)`)
3. Japan (`japanTours`)
4. Korea (`koreaTours`)
5. China (`chinaTours`)
6. North Korea (`northKoreaTours`)
7. Russia (`russiaTours`)

The tour card markup (image, title, days, price, link) moves into `TourCarousel` to eliminate duplication across all 7 blocks.

### Files changed
- `src/components/TourCarousel.tsx` — new reusable carousel component
- `src/components/ToursSection.tsx` — replace grid blocks with `<TourCarousel />`

