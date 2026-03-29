import { useState } from "react";
import { MapPin } from "lucide-react";
import { tourRoutes } from "@/data/tourRoutes";

interface RouteMapProps {
  tourId: string;
}

const RouteMap = ({ tourId }: RouteMapProps) => {
  const [imgError, setImgError] = useState(false);
  const points = tourRoutes[tourId];

  if (!points || points.length === 0) return null;

  const minLat = Math.min(...points.map((p) => p.lat));
  const maxLat = Math.max(...points.map((p) => p.lat));
  const minLng = Math.min(...points.map((p) => p.lng));
  const maxLng = Math.max(...points.map((p) => p.lng));

  const centerLat = (minLat + maxLat) / 2;
  const centerLng = (minLng + maxLng) / 2;

  // Calculate zoom from bounding box span
  const latSpan = maxLat - minLat;
  const lngSpan = maxLng - minLng;
  const maxSpan = Math.max(latSpan, lngSpan);
  let zoom = 5;
  if (maxSpan < 0.5) zoom = 10;
  else if (maxSpan < 1) zoom = 9;
  else if (maxSpan < 2) zoom = 8;
  else if (maxSpan < 4) zoom = 7;
  else if (maxSpan < 8) zoom = 6;
  else if (maxSpan < 16) zoom = 5;
  else if (maxSpan < 30) zoom = 4;
  else zoom = 3;

  const uniqueLabels = points.filter(
    (p, i, arr) => p.label && arr.findIndex((a) => a.label === p.label) === i
  );

  // Build path param: color,weight,lat,lng,lat,lng,...
  const pathCoords = points.map((p) => `${p.lat},${p.lng}`).join(",");
  const pathParam = `rgba(59,130,246,0.8),3,${pathCoords}`;

  // Build markers: lat,lng,icon
  const markerParams = uniqueLabels
    .map((p) => `${p.lat},${p.lng},ol-marker`)
    .join("|");

  const staticMapUrl = `https://staticmap.openstreetmap.de/staticmap.php?center=${centerLat},${centerLng}&zoom=${zoom}&size=600x400&markers=${markerParams}&path=${pathParam}`;

  return (
    <div className="bg-card border border-border p-4 space-y-3">
      <h4 className="text-xs font-sans uppercase tracking-widest text-muted-foreground flex items-center gap-2">
        <MapPin className="w-3.5 h-3.5 text-primary" />
        Карта маршрута
      </h4>

      {imgError ? (
        <div className="aspect-[3/2] bg-muted rounded-sm flex items-center justify-center text-sm text-muted-foreground">
          Карта временно недоступна
        </div>
      ) : (
        <div className="aspect-[3/2] overflow-hidden rounded-sm border border-border">
          <img
            src={staticMapUrl}
            alt="Схема маршрута"
            className="w-full h-full object-cover"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        </div>
      )}

      <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
        {uniqueLabels.map((p, i) => (
          <span key={p.label} className="flex items-center gap-1">
            <span className="text-primary font-medium">{i + 1}.</span> {p.label}
          </span>
        ))}
      </div>
    </div>
  );
};

export default RouteMap;
