

## Fix: Site completely broken due to dependency conflicts

### Problem
When `react-leaflet` was installed, the package manager upgraded Radix UI and other dependencies to versions requiring **React 19**, while the project runs **React 18.3.1**. The fatal error `render2 is not a function` at `updateContextConsumer` crashes the entire app — not just the map page.

### Solution: Remove react-leaflet, replace map with iframe approach

The safest and fastest fix is to **remove `react-leaflet` and `leaflet` entirely** and replace the map with a lightweight **iframe embed** using OpenStreetMap. This:
- Eliminates the dependency that triggered the conflict
- Requires zero extra npm packages
- Still shows the route on a real map

### Steps

1. **Remove dependencies**: Uninstall `react-leaflet`, `leaflet`, and `@types/leaflet` from `package.json`

2. **Rewrite `src/components/RouteMap.tsx`**: Replace the Leaflet-based implementation with a simple component that:
   - Renders an `<iframe>` pointing to OpenStreetMap embed URL centered on the route's midpoint
   - Shows the same labeled point list below the map (from `tourRoutes` data)
   - No external dependencies needed
   - Graceful fallback if iframe fails to load

3. **Keep `src/data/tourRoutes.ts` unchanged** — the route data is still used for the point list

### Technical details

The new RouteMap will use:
```
https://www.openstreetmap.org/export/embed.html?bbox={bounds}&layer=mapnik
```
computed from the route points' bounding box. Markers won't appear on the embedded map, but the labeled waypoint list below compensates. Alternatively, a static map image API could be used.

### Files changed
- `package.json` — remove 3 packages
- `src/components/RouteMap.tsx` — rewrite (iframe + waypoint list)

