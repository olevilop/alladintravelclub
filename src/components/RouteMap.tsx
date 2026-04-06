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

    // Project route points
    const projected = points.map((p) => latLngToPixel(p.lat, p.lng, zoom, originX, originY));

    return { tiles, projected, zoom };
  }, [points]);

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

            {/* Markers */}
            {mapData.projected.map((p, i) => (
              <g key={i}>
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={9}
                  fill="hsl(var(--primary))"
                  stroke="hsl(var(--primary-foreground))"
                  strokeWidth={1.5}
                />
                <text
                  x={p.x}
                  y={p.y + 0.5}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="hsl(var(--primary-foreground))"
                  fontSize={8}
                  fontWeight={700}
                  fontFamily="sans-serif"
                >
                  {i + 1}
                </text>
              </g>
            ))}
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
