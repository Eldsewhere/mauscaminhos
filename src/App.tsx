import { useState, type CSSProperties } from "react";
import { TrailCard } from "./components/TrailCard";
import { LanguageSwitch } from "./components/LanguageSwitch";
import { TrailMap } from "./components/TrailMap";
import { AREA_COLORS, areas, trails, type Trail } from "./data/trails";
import { useLang } from "./i18n/context";
import "./App.css";

export default function App() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { t } = useLang();

  // Picking a trail on the map scrolls its card into view.
  const selectFromMap = (id: string) => {
    setSelectedId(id);
    document
      .getElementById(`trail-${id}`)
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const grid = (list: Trail[]) => (
    <div className="trail-grid">
      {list.map((trail) => (
        <TrailCard
          key={trail.id}
          trail={trail}
          selected={trail.id === selectedId}
          onSelect={setSelectedId}
        />
      ))}
    </div>
  );

  // Trails are split by location (Porto, Matosinhos, ...); any without an area go last.
  const trailList = (list: Trail[]) => {
    if (!list.length) return <p className="section-empty">{t.comingSoon}</p>;
    const noArea = list.filter((t) => !t.area);
    return (
      <>
        {areas.map((area) => {
          const inArea = list.filter((t) => t.area === area);
          if (!inArea.length) return null;
          const headingId = `area-${area.toLowerCase().replace(/\s+/g, "-")}`;
          return (
            <section
              key={area}
              className="area"
              aria-labelledby={headingId}
              style={{ "--area": AREA_COLORS[area] } as CSSProperties}
            >
              <h3 id={headingId} className="area-heading">
                {area}
              </h3>
              {grid(inArea)}
            </section>
          );
        })}
        {noArea.length > 0 && <div className="area">{grid(noArea)}</div>}
      </>
    );
  };

  return (
    <div className="page">
      <header className="site-header">
        <h1>Maus Caminhos</h1>
        <div className="header-row">
        <a
          className="instagram-link"
          href="https://www.instagram.com/mauscaminhos.porto/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <rect
              x="3"
              y="3"
              width="18"
              height="18"
              rx="5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <circle
              cx="12"
              cy="12"
              r="4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
          </svg>
          @mauscaminhos.porto
        </a>
        <LanguageSwitch />
        </div>
      </header>

      <main>
        <section aria-label={t.mapLabel}>
          <TrailMap
            trails={trails}
            selectedId={selectedId}
            onSelect={selectFromMap}
          />
        </section>

        <section className="trail-list" aria-label={t.trailsLabel}>
          {trailList(trails)}
        </section>
      </main>
    </div>
  );
}
