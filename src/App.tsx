import { useState } from 'react';
import { TrailCard } from './components/TrailCard';
import { TrailMap } from './components/TrailMap';
import { trails } from './data/trails';
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
      </header>

      <main>
        <section aria-label="Map of trails">
          <TrailMap trails={trails} selectedId={selectedId} onSelect={selectFromMap} />
        </section>

        <section aria-labelledby="trails-heading">
          <h2 id="trails-heading">Trails</h2>
          <div className="trail-grid">
            {trails.map((trail) => (
              <TrailCard
                key={trail.id}
                trail={trail}
                selected={trail.id === selectedId}
                onSelect={setSelectedId}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
