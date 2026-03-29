import { useEffect, useState, lazy, Suspense } from "react";
import { MapPin } from "lucide-react";
import { tourRoutes } from "@/data/tourRoutes";

interface RouteMapProps {
  tourId: string;
}

const RouteMapInner = ({ tourId }: RouteMapProps) => {
  const [mapReady, setMapReady] = useState(false);
  const [modules, setModules] = useState<any>(null);

  const points = tourRoutes[tourId];

  useEffect(() => {
    let cancelled = false;
    Promise.all([
      import("react-leaflet"),
      import("leaflet"),
      import("leaflet/dist/leaflet.css"),
    ]).then(([rl, L]) => {
      if (cancelled) return;

      delete (L.default.Icon.Default.prototype as any)._getIconUrl;
      L.default.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
        iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
      });

      setModules({ rl, L: L.default });
      setMapReady(true);
    });
    return () => { cancelled = true; };
  }, []);

  if (!points || points.length === 0) return null;
  if (!mapReady || !modules) {
    return (
      <div className="bg-card border border-border p-4 space-y-3">
        <h4 className="text-xs font-sans uppercase tracking-widest text-muted-foreground flex items-center gap-2">
          <MapPin className="w-3.5 h-3.5 text-primary" />
          Карта маршрута
        </h4>
        <div className="aspect-square bg-muted animate-pulse rounded-sm" />
      </div>
    );
  }

  const { MapContainer, TileLayer, Polyline, Marker, Popup, useMap } = modules.rl;
  const L = modules.L;

  const center: [number, number] = [
    points.reduce((s: number, p: any) => s + p.lat, 0) / points.length,
    points.reduce((s: number, p: any) => s + p.lng, 0) / points.length,
  ];

  const polylinePositions: [number, number][] = points.map((p) => [p.lat, p.lng]);

  const createCustomIcon = (isEndpoint: boolean) =>
    L.divIcon({
      className: "custom-marker",
      html: `<div style="
        width: ${isEndpoint ? "12px" : "8px"};
        height: ${isEndpoint ? "12px" : "8px"};
        background: hsl(43, 74%, 49%);
        border: 2px solid hsl(43, 74%, 35%);
        border-radius: 50%;
        box-shadow: 0 0 6px rgba(0,0,0,0.3);
      "></div>`,
      iconSize: [isEndpoint ? 12 : 8, isEndpoint ? 12 : 8],
      iconAnchor: [isEndpoint ? 6 : 4, isEndpoint ? 6 : 4],
    });

  const FitBounds = () => {
    const map = useMap();
    useEffect(() => {
      if (points.length > 0) {
        const bounds = L.latLngBounds(points.map((p: any) => [p.lat, p.lng]));
        map.fitBounds(bounds, { padding: [30, 30] });
      }
    }, [map]);
    return null;
  };

  return (
    <div className="bg-card border border-border p-4 space-y-3">
      <h4 className="text-xs font-sans uppercase tracking-widest text-muted-foreground flex items-center gap-2">
        <MapPin className="w-3.5 h-3.5 text-primary" />
        Карта маршрута
      </h4>
      <div className="aspect-square overflow-hidden rounded-sm border border-border">
        <MapContainer
          center={center}
          zoom={4}
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%" }}
          attributionControl={false}
          zoomControl={false}
        >
          <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
          <FitBounds />
          <Polyline
            positions={polylinePositions}
            pathOptions={{
              color: "hsl(43, 74%, 49%)",
              weight: 2.5,
              opacity: 0.8,
              dashArray: "8, 6",
            }}
          />
          {points.map((point, i) => (
            <Marker
              key={`${point.lat}-${point.lng}-${i}`}
              position={[point.lat, point.lng]}
              icon={createCustomIcon(i === 0 || i === points.length - 1)}
            >
              {point.label && (
                <Popup className="route-popup">
                  <span className="text-xs font-sans">{point.label}</span>
                </Popup>
              )}
            </Marker>
          ))}
        </MapContainer>
      </div>
      <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
        {points
          .filter((p, i, arr) => p.label && arr.findIndex((a) => a.label === p.label) === i)
          .map((p, i) => (
            <span key={p.label} className="flex items-center gap-1">
              <span className="text-primary font-medium">{i + 1}.</span> {p.label}
            </span>
          ))}
      </div>
    </div>
  );
};

const RouteMap = ({ tourId }: RouteMapProps) => {
  return <RouteMapInner tourId={tourId} />;
};

export default RouteMap;
