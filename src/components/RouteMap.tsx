import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Polyline, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { tourRoutes, type RoutePoint } from "@/data/tourRoutes";
import { MapPin } from "lucide-react";

// Fix default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

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

function FitBounds({ points }: { points: RoutePoint[] }) {
  const map = useMap();
  useEffect(() => {
    if (points.length > 0) {
      const bounds = L.latLngBounds(points.map((p) => [p.lat, p.lng]));
      map.fitBounds(bounds, { padding: [30, 30] });
    }
  }, [points, map]);
  return null;
}

interface RouteMapProps {
  tourId: string;
}

const RouteMap = ({ tourId }: RouteMapProps) => {
  const points = tourRoutes[tourId];

  if (!points || points.length === 0) {
    return null;
  }

  const center: [number, number] = [
    points.reduce((s, p) => s + p.lat, 0) / points.length,
    points.reduce((s, p) => s + p.lng, 0) / points.length,
  ];

  const polylinePositions: [number, number][] = points.map((p) => [p.lat, p.lng]);

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
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />
          <FitBounds points={points} />
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

export default RouteMap;
