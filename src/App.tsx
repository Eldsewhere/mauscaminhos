import { useState } from 'react';
import { TrailCard } from './components/TrailCard';
import { TrailMap } from './components/TrailMap';
import { sections, trails } from './data/trails';
import './App.css';

export default function App() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Picking a trail on the map scrolls its card into view.
  const selectFromMap = (id: string) => {
    setSelectedId(id);
    document.getElementById(`trail-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };


  return (
    <div className="page">
      <header className="site-header">
        <h1>Maus Caminhos</h1>
        <p>Walking trails in Porto</p>
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
        <section aria-label="Map of trails">
          <TrailMap trails={trails} selectedId={selectedId} onSelect={selectFromMap} />
        </section>

        {sections.map((section) => {
          const list = trails.filter((t) => (t.section ?? 'trails') === section.id);
          return (
            <section key={section.id} aria-labelledby={`${section.id}-heading`}>
              <h2 id={`${section.id}-heading`}>
                <span className="section-dot" style={{ background: section.pin }} aria-hidden="true" />
                {section.title}
              </h2>
              {list.length ? (
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
              ) : (
                <p className="section-empty">Coming soon.</p>
              )}
            </section>
          );
        })}
      </main>
    </div>
  );
}
