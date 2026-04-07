import { useMemo } from "react";
import { MapPin } from "lucide-react";
import { tourRoutes } from "@/data/tourRoutes";

interface RouteMapProps {
  tourId: string;
}

// Mercator helpers
function latToY(lat: number): number {
  const sinLat = Math.sin((lat * Math.PI) / 180);
  return 0.5 - Math.log((1 + sinLat) / (1 - sinLat)) / (4 * Math.PI);
}

function lngToX(lng: number): number {
  return (lng + 180) / 360;
}

function getBoundsZoom(
  minLat: number,
  maxLat: number,
  minLng: number,
  maxLng: number,
  mapW: number,
  mapH: number
): number {
  for (let z = 18; z >= 1; z--) {
    const scale = 256 * Math.pow(2, z);
    const x1 = lngToX(minLng) * scale;
    const x2 = lngToX(maxLng) * scale;
    const y1 = latToY(maxLat) * scale;
    const y2 = latToY(minLat) * scale;
    if (x2 - x1 <= mapW * 0.85 && y2 - y1 <= mapH * 0.85) return z;
  }
  return 1;
}

function latLngToPixel(
  lat: number,
  lng: number,
  zoom: number,
  originX: number,
  originY: number
): { x: number; y: number } {
  const scale = 256 * Math.pow(2, zoom);
  return {
    x: lngToX(lng) * scale - originX,
    y: latToY(lat) * scale - originY,
  };
}

const MAP_W = 400;
const MAP_H = 280;

const RouteMap = ({ tourId }: RouteMapProps) => {
  const points = tourRoutes[tourId];

  const mapData = useMemo(() => {
    if (!points || points.length === 0) return null;
    const lats = points.map((p) => p.lat);
    const lngs = points.map((p) => p.lng);
    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const minLng = Math.min(...lngs);
    const maxLng = Math.max(...lngs);

    const padLat = (maxLat - minLat) * 0.15 || 0.5;
    const padLng = (maxLng - minLng) * 0.15 || 0.5;

    const zoom = getBoundsZoom(
      minLat - padLat,
      maxLat + padLat,
      minLng - padLng,
      maxLng + padLng,
      MAP_W,
      MAP_H
    );

    const scale = 256 * Math.pow(2, zoom);
    const centerX = lngToX((minLng + maxLng) / 2) * scale;
    const centerY = latToY((minLat + maxLat) / 2) * scale;
    const originX = centerX - MAP_W / 2;
    const originY = centerY - MAP_H / 2;

    // Tile grid
    const tileSize = 256;
    const startTileX = Math.floor(originX / tileSize);
    const startTileY = Math.floor(originY / tileSize);
    const endTileX = Math.floor((originX + MAP_W) / tileSize);
    const endTileY = Math.floor((originY + MAP_H) / tileSize);

    const tiles: { x: number; y: number; url: string; left: number; top: number }[] = [];
    for (let ty = startTileY; ty <= endTileY; ty++) {
      for (let tx = startTileX; tx <= endTileX; tx++) {
        tiles.push({
          x: tx,
          y: ty,
          url: `https://tile.openstreetmap.org/${zoom}/${tx}/${ty}.png`,
          left: tx * tileSize - originX,
          top: ty * tileSize - originY,
        });
      }
    }

    // Project route points and apply offset for duplicates
    const raw = points.map((p) => latLngToPixel(p.lat, p.lng, zoom, originX, originY));
    const seen: Record<string, number[]> = {};
    raw.forEach((p, i) => {
      const key = `${Math.round(p.x)},${Math.round(p.y)}`;
      if (!seen[key]) seen[key] = [];
      seen[key].push(i);
    });
    const projected = raw.map((p, i) => {
      const key = `${Math.round(p.x)},${Math.round(p.y)}`;
      const group = seen[key];
      if (group.length <= 1) return p;
      const idx = group.indexOf(i);
      const offsetX = idx === 0 ? -10 : 10;
      const offsetY = idx === 0 ? -6 : 6;
      return { x: p.x + offsetX, y: p.y + offsetY };
    });

    return { tiles, projected, zoom };
  }, [points]);

  if (!mapData) return null;

  const routeLabels = (points || []).filter((p) => p.label);
  const polylineStr = mapData.projected.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <div className="bg-card border border-border p-4 space-y-3">
      <h4 className="text-xs font-sans uppercase tracking-widest text-muted-foreground flex items-center gap-2">
        <MapPin className="w-3.5 h-3.5 text-primary" />
        Карта маршрута
      </h4>

      <div
        className="relative overflow-hidden rounded-sm border border-border"
        style={{ width: "100%", aspectRatio: `${MAP_W}/${MAP_H}` }}
      >
        <div className="absolute inset-0" style={{ width: MAP_W, height: MAP_H }}>
          {/* Tiles */}
          {mapData.tiles.map((t) => (
            <img
              key={`${t.x}-${t.y}`}
              src={t.url}
              alt=""
              loading="lazy"
              draggable={false}
              className="absolute select-none"
              style={{
                left: t.left,
                top: t.top,
                width: 256,
                height: 256,
              }}
            />
          ))}

          {/* SVG overlay */}
          <svg
            className="absolute inset-0"
            width={MAP_W}
            height={MAP_H}
            viewBox={`0 0 ${MAP_W} ${MAP_H}`}
            style={{ pointerEvents: "none" }}
          >
            {/* Route line */}
            <polyline
              points={polylineStr}
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth={2.5}
              strokeLinejoin="round"
              strokeLinecap="round"
              opacity={0.9}
            />

            {/* Markers (grouped by same coordinates) */}
            {(() => {
              const groups: Record<string, { x: number; y: number; labels: number[] }> = {};
              mapData.projected.forEach((p, i) => {
                const key = `${Math.round(p.x)},${Math.round(p.y)}`;
                if (!groups[key]) groups[key] = { x: p.x, y: p.y, labels: [] };
                groups[key].labels.push(i + 1);
              });
              return Object.values(groups).map((g, i) => {
                const text = g.labels.join(",");
                const r = g.labels.length > 1 ? 12 : 9;
                const fontSize = g.labels.length > 1 ? 7 : 8;
                return (
                  <g key={i}>
                    <circle
                      cx={g.x}
                      cy={g.y}
                      r={r}
                      fill="hsl(var(--primary))"
                      stroke="hsl(var(--primary-foreground))"
                      strokeWidth={1.5}
                    />
                    <text
                      x={g.x}
                      y={g.y + 0.5}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fill="hsl(var(--primary-foreground))"
                      fontSize={fontSize}
                      fontWeight={700}
                      fontFamily="sans-serif"
                    >
                      {text}
                    </text>
                  </g>
                );
              });
            })()}
          </svg>
        </div>
      </div>

      <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
        {routeLabels.map((p, i) => (
          <span key={i} className="flex items-center gap-1">
            <span className="text-primary font-medium">{i + 1}.</span> {p.label}
          </span>
        ))}
      </div>
    </div>
  );
};

export default RouteMap;
