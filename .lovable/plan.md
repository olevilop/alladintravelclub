

## Replace interactive map with static route image

### What changes
Replace the `<iframe>` OpenStreetMap embed in `RouteMap.tsx` with a static map image generated via a free tile-based static map API.

### Approach
Use **OpenStreetMap static map images** via the free `staticmap.openstreetmap.de` service, which supports drawing paths and markers directly in the URL:

```
https://staticmap.openstreetmap.de/staticmap.php?center={lat},{lng}&zoom={z}&size={w}x{h}&markers={markers}&path={path}
```

This renders a static PNG image of the route with:
- A polyline path connecting all waypoints
- Numbered markers at each point
- No iframe, no interactivity — just an `<img>` tag

### File: `src/components/RouteMap.tsx`

1. Remove `useState` for iframe error — replace with `<img>` `onError` fallback
2. Build the static map URL from route coordinates:
   - Calculate center point and appropriate zoom level from the bounding box
   - Encode path coordinates as a polyline parameter
   - Add markers for key stops
3. Render as `<img src={staticMapUrl} />` with `loading="lazy"`
4. Keep the labeled waypoint list below unchanged

### Result
- Lightweight static image instead of heavy iframe
- Visually shows the route path on the map
- No external dependencies
- Graceful fallback if image fails to load

