import { useState } from 'react';
import { TrailCard } from './components/TrailCard';
import { LanguageSwitch } from './components/LanguageSwitch';
import { TrailMap } from './components/TrailMap';
import { areas, sectionText, sections, trails, type Trail } from './data/trails';
import { useLang } from './i18n/context';
import './App.css';

export default function App() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { lang, t } = useLang();

  // Picking a trail on the map scrolls its card into view.
  const selectFromMap = (id: string) => {
    setSelectedId(id);
    document.getElementById(`trail-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const grid = (list: Trail[]) => (
    <div className="trail-grid">
      {list.map((trail) => (
        <TrailCard key={trail.id} trail={trail} selected={trail.id === selectedId} onSelect={setSelectedId} />
      ))}
    </div>
  );

  // A section whose trails have an area is split by location (Porto, Matosinhos, ...); others are one grid.
  const sectionBody = (sectionId: string, list: Trail[]) => {
    if (!list.length) return <p className="section-empty">{t.comingSoon}</p>;
    if (!list.some((t) => t.area)) return grid(list);
    const noArea = list.filter((t) => !t.area);
    return (
      <>
        {areas.map((area) => {
          const inArea = list.filter((t) => t.area === area);
          if (!inArea.length) return null;
          const headingId = `area-${sectionId}-${area.toLowerCase().replace(/\s+/g, '-')}`;
          return (
            <section key={area} className="area" aria-labelledby={headingId}>
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
        <LanguageSwitch />
        <h1>Maus Caminhos</h1>
        <p>{t.tagline}</p>
        <a
          className="instagram-link"
          href="https://www.instagram.com/mauscaminhos.porto/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
            <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
            <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
          </svg>
          @mauscaminhos.porto
        </a>
      </header>

      <main>
        <section aria-label={t.mapLabel}>
          <TrailMap trails={trails} selectedId={selectedId} onSelect={selectFromMap} />
        </section>

        {sections.map((section) => {
          const list = trails.filter((trail) => (trail.section ?? 'trails') === section.id);
          const text = sectionText(section, lang);
          return (
            <section key={section.id} aria-labelledby={`${section.id}-heading`}>
              <h2 id={`${section.id}-heading`}>
                <span className="section-dot" style={{ background: section.pin }} aria-hidden="true" />
                {text.title}
              </h2>
              <p className="section-description">{text.description}</p>
              {sectionBody(section.id, list)}
            </section>
          );
        })}
      </main>
    </div>
  );
}
