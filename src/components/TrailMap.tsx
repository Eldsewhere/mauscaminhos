import { useEffect, useMemo, useRef, useState } from 'react';
import L from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer, Tooltip, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import type { Trail } from '../data/trails';

const pinIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [14, -28],
  shadowSize: [41, 41],
});

type Props = {
  trails: Trail[];
  selectedId: string | null;
  onSelect: (id: string) => void;
};

/** Trails that start at the same spot share one pin. */
type Pin = { key: string; position: [number, number]; trails: Trail[] };

function groupByStart(trails: Trail[]): Pin[] {
  const pins = new Map<string, Pin>();
  for (const trail of trails) {
    const key = trail.position.join(',');
    const pin = pins.get(key) ?? { key, position: trail.position, trails: [] };
    pin.trails.push(trail);
    pins.set(key, pin);
  }
  return [...pins.values()];
}

function FitAllPins({ pins }: { pins: Pin[] }) {
  const map = useMap();
  useEffect(() => {
    if (pins.length) map.fitBounds(L.latLngBounds(pins.map((p) => p.position)), { padding: [40, 40] });
  }, [map, pins]);
  return null;
}

/** Names stay on screen only from this zoom; below it they show on hover, so central Porto doesn't pile up. */
const LABEL_ZOOM = 14;

function WatchZoom({ onZoom }: { onZoom: (zoom: number) => void }) {
  const map = useMapEvents({ zoomend: () => onZoom(map.getZoom()) });
  return null;
}

function FlyToSelected({ trail }: { trail: Trail | undefined }) {
  const map = useMap();
  useEffect(() => {
    if (trail) map.flyTo(trail.position, Math.max(map.getZoom(), 15), { duration: 0.8 });
  }, [map, trail]);
  return null;
}

export function TrailMap({ trails, selectedId, onSelect }: Props) {
  const pins = useMemo(() => groupByStart(trails), [trails]);
  const markers = useRef<Record<string, L.Marker | null>>({});
  const selected = trails.find((t) => t.id === selectedId);
  const [zoom, setZoom] = useState(12);
  const showLabels = zoom >= LABEL_ZOOM;

  useEffect(() => {
    if (selected) markers.current[selected.position.join(',')]?.openPopup();
  }, [selected]);

  return (
    <MapContainer center={[41.17, -8.6]} zoom={12} scrollWheelZoom={false} className="trail-map">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {pins.map((pin) => (
        <Marker
          key={pin.key}
          position={pin.position}
          icon={pinIcon}
          ref={(m) => {
            markers.current[pin.key] = m;
          }}
        >
          <Tooltip
            key={showLabels ? 'shown' : 'hover'}
            direction="right"
            permanent={showLabels}
            className="pin-label"
          >
            {pin.trails.map((t) => (
              <div key={t.id}>{t.name}</div>
            ))}
          </Tooltip>
          <Popup>
            <div className="pin-popup">
              <div className="pin-popup-start">Start: {pin.trails[0].start}</div>
              {pin.trails.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  className={t.id === selectedId ? 'pin-popup-trail selected' : 'pin-popup-trail'}
                  onClick={() => onSelect(t.id)}
                >
                  {t.name}
                </button>
              ))}
            </div>
          </Popup>
        </Marker>
      ))}
      <WatchZoom onZoom={setZoom} />
      <FitAllPins pins={pins} />
      <FlyToSelected trail={selected} />
    </MapContainer>
  );
}
