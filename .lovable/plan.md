

## Scroll to top on tour page navigation

### Problem
When clicking a tour/cruise link, the page opens scrolled to the bottom instead of the top, because `scroll-behavior: smooth` in CSS and no explicit scroll reset on route change.

### Fix
Add `useEffect` with `window.scrollTo(0, 0)` in `src/pages/TourDetail.tsx`, triggered on route param change:

```tsx
useEffect(() => {
  window.scrollTo(0, 0);
}, [id]);
```

One line of logic added near the top of the component. No other files changed.

