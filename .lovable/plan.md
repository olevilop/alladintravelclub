

## Move similar tours block outside container for full-width layout

### Problem
The similar tours carousel sits inside `container mx-auto px-6` (line 78-323), which limits its width. The user wants 4 cards spanning the full page width.

### Solution
Move the similar tours block **outside** the `</div>` closing the container (line 323), wrapping it in its own full-width section with internal padding.

### Changes in `src/pages/TourDetail.tsx`

1. Close the container `</div>` **before** the similar tours block (after line 254 where the grid ends).
2. Wrap the similar tours block in its own `<div className="container mx-auto px-6">` but place it outside the current container's `py-16 md:py-24` padding — or better, move the entire IIFE block after the closing `</div>` of the container on line 323, and wrap it with `<div className="px-6 md:px-12 pb-16 md:pb-24">` for edge-to-edge cards with minimal padding.

Concretely:
- Cut lines 256-322 (the similar tours IIFE)
- Move them **after** line 323 (`</div>` closing container), **before** `<Footer />`
- Wrap in `<div className="container mx-auto px-6 pb-16 md:pb-24">` so cards get max container width without being constrained by the grid's column layout

Actually — looking again, the block is already outside the grid (line 254 closes it). It's inside the container which is fine for max-width. The `lg:basis-1/4` should already give 4 cards. The issue is likely the viewport (820px) hitting the `sm:basis-1/2` breakpoint instead of `lg:basis-1/4`. The cards ARE full-width at `lg` breakpoint. No structural change needed — this is working as designed on desktop.

But wait — the user is on 820px viewport and says "4 tours across full page." They may want the block to break out of the container for a wider feel, or they may just want to confirm it works on desktop. Let me re-read: "сделай в этом блоке также по 4 тура на всю страницу" — they want 4 tours full page width, same as expedition cruises.

The block is already identical to expedition cruises (it IS the same code). The issue is that on 820px, `lg:basis-1/4` doesn't apply (lg = 1024px). This is expected responsive behavior. No code change needed unless they want to force 4 columns at smaller screens.

Let me reconsider — maybe they're comparing to a different page where it looks different. The code is the same for all categories now. Perhaps the block simply isn't appearing on this specific tour page. Let me check the tour data.

The user is on `/tour/japan-sakura-kyoto`. This should match `japanTours`. The code should work. Maybe there's an issue with the tour ID not being found in `japanTours`.

I should check the data to verify.

