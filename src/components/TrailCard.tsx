import { useState } from 'react';
import { photosFor } from '../data/photos';
import { PhotoViewer } from './PhotoViewer';
import type { Trail } from '../data/trails';

type Props = {
  trail: Trail;
  selected: boolean;
  onSelect: (id: string) => void;
};

function PhotoSlider({ photos, name }: { photos: string[]; name: string }) {
  // Each page load starts on a random photo; the arrows still go through all of them in order.
  const [index, setIndex] = useState(() => Math.floor(Math.random() * photos.length));
  const [viewing, setViewing] = useState(false);

  if (!photos.length) {
    return (
      <div className="trail-photo">
        <span className="trail-photo-empty">Photo coming soon</span>
      </div>
    );
  }

  const step = (by: number) => setIndex((i) => (i + by + photos.length) % photos.length);

  return (
    <div className="trail-photo">
      <button type="button" className="photo-open" aria-label={`Open ${name} photos`} onClick={() => setViewing(true)}>
        <img src={photos[index]} alt={`${name}, photo ${index + 1} of ${photos.length}`} loading="lazy" />
      </button>
      {viewing && (
        <PhotoViewer photos={photos} index={index} name={name} onStep={step} onClose={() => setViewing(false)} />
      )}
      {photos.length > 1 && (
        <>
          <button type="button" className="photo-nav prev" aria-label="Previous photo" onClick={() => step(-1)}>
            ‹
          </button>
          <button type="button" className="photo-nav next" aria-label="Next photo" onClick={() => step(1)}>
            ›
          </button>
          <span className="photo-count">
            {index + 1} / {photos.length}
          </span>
        </>
      )}
    </div>
  );
}

export function TrailCard({ trail, selected, onSelect }: Props) {
  return (
    <article id={`trail-${trail.id}`} className={selected ? 'trail-card selected' : 'trail-card'}>
      <PhotoSlider photos={photosFor(trail.id)} name={trail.name} />
      <button type="button" className="trail-card-button" onClick={() => onSelect(trail.id)}>
        <div className="trail-body">
          <h3>{trail.name}</h3>
          <dl>
            <dt>Start</dt>
            <dd>{trail.start ?? '—'}</dd>
            <dt>End</dt>
            <dd>{trail.circular ? 'Circular (back to the start)' : (trail.end ?? '—')}</dd>
            <dt>Landmarks</dt>
            <dd>{trail.landmarks.length ? trail.landmarks.join(', ') : '—'}</dd>
          </dl>
        </div>
      </button>
    </article>
  );
}
