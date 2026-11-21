import { useEffect, useMemo, useRef, useState } from 'react';
import L from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer, Tooltip, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { sectionText, sections, trailText, type SectionId, type Trail } from '../data/trails';
import { useLang } from '../i18n/context';

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

/** A pin the same shape and size as the default, in the given colour. */
const colouredPin = (colour: string) =>
  L.divIcon({
    className: 'pin-coloured',
    html: `<svg width="25" height="41" viewBox="0 0 25 41" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.5 0C5.6 0 0 5.6 0 12.5 0 21.9 12.5 41 12.5 41S25 21.9 25 12.5C25 5.6 19.4 0 12.5 0z"
        fill="${colour}" stroke="rgb(0 0 0 / 0.35)" stroke-width="1"/>
      <circle cx="12.5" cy="12.5" r="5" fill="#fff"/>
    </svg>`,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [14, -28],
  });

/** Main trails keep Leaflet's blue pin; other sections get their own colour. */
const pinIcons: Record<SectionId, L.Icon | L.DivIcon> = {
  trails: pinIcon,
  limited: colouredPin(sections[1].pin),
  outside: colouredPin(sections[2].pin),
};

const sectionOf = (t: Trail): SectionId => t.section ?? 'trails';

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
    if (!trail.position) continue; // no location yet: card only, no pin
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
    if (trail?.position) map.flyTo(trail.position, Math.max(map.getZoom(), 15), { duration: 0.8 });
  }, [map, trail]);
  return null;
}

export function TrailMap({ trails, selectedId, onSelect }: Props) {
  const pins = useMemo(() => groupByStart(trails), [trails]);
  const markers = useRef<Record<string, L.Marker | null>>({});
  const selected = trails.find((t) => t.id === selectedId);
  const [zoom, setZoom] = useState(12);
  const showLabels = zoom >= LABEL_ZOOM;
  const { lang, t } = useLang();
  const name = (trail: Trail) => trailText(trail, lang).name;
  const sectionTitle = (id: SectionId) => sectionText(sections.find((s) => s.id === id)!, lang).title;

  useEffect(() => {
    if (selected?.position) markers.current[selected.position.join(',')]?.openPopup();
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
          icon={pinIcons[sectionOf(pin.trails[0])]}
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
            {pin.trails.map((trail) => (
              <div key={trail.id}>{name(trail)}</div>
            ))}
          </Tooltip>
          <Popup>
            <div className="pin-popup">
              {pin.trails[0].start && (
                <div className="pin-popup-start">
                  {t.start}: {trailText(pin.trails[0], lang).start}
                </div>
              )}
              {pin.trails[0].section && (
                <div className="pin-popup-start">{sectionTitle(pin.trails[0].section)}</div>
              )}
              {pin.trails.map((trail) => (
                <button
                  key={trail.id}
                  type="button"
                  className={trail.id === selectedId ? 'pin-popup-trail selected' : 'pin-popup-trail'}
                  onClick={() => onSelect(trail.id)}
                >
                  {name(trail)}
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
