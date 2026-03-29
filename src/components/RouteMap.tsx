import { useState } from "react";
import { MapPin } from "lucide-react";
import { tourRoutes } from "@/data/tourRoutes";

interface RouteMapProps {
  tourId: string;
}

const RouteMap = ({ tourId }: RouteMapProps) => {
  const [iframeError, setIframeError] = useState(false);
  const points = tourRoutes[tourId];

  if (!points || points.length === 0) return null;

  const minLat = Math.min(...points.map((p) => p.lat));
  const maxLat = Math.max(...points.map((p) => p.lat));
  const minLng = Math.min(...points.map((p) => p.lng));
  const maxLng = Math.max(...points.map((p) => p.lng));

  const padLat = (maxLat - minLat) * 0.15 || 0.5;
  const padLng = (maxLng - minLng) * 0.15 || 0.5;

  const embedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${minLng - padLng},${minLat - padLat},${maxLng + padLng},${maxLat + padLat}&layer=mapnik`;

  const uniqueLabels = points.filter(
    (p, i, arr) => p.label && arr.findIndex((a) => a.label === p.label) === i
  );

  return (
    <div className="bg-card border border-border p-4 space-y-3">
      <h4 className="text-xs font-sans uppercase tracking-widest text-muted-foreground flex items-center gap-2">
        <MapPin className="w-3.5 h-3.5 text-primary" />
        Карта маршрута
      </h4>

      {iframeError ? (
        <div className="aspect-square bg-muted rounded-sm flex items-center justify-center text-sm text-muted-foreground">
          Карта временно недоступна
        </div>
      ) : (
        <div className="aspect-square overflow-hidden rounded-sm border border-border">
          <iframe
            src={embedUrl}
            style={{ height: "100%", width: "100%", border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setIframeError(true)}
            title="Карта маршрута"
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
