import { useState } from 'react';
import { photosFor } from '../data/photos';
import { PhotoViewer } from './PhotoViewer';
import { trailText, type Trail } from '../data/trails';
import { operatorOf } from '../data/transport';
import { useLang } from '../i18n/context';
import { TransportBadge } from './TransportBadge';

const SHOW_LANDMARKS = false;

type Props = {
  trail: Trail;
  selected: boolean;
  onSelect: (id: string) => void;
};

function PhotoSlider({ photos, name }: { photos: string[]; name: string }) {
  // Each page load starts on a random photo; the arrows still go through all of them in order.
  const [index, setIndex] = useState(() => Math.floor(Math.random() * photos.length));
  const [viewing, setViewing] = useState(false);
  const { t } = useLang();

  if (!photos.length) {
    return (
      <div className="trail-photo">
        <span className="trail-photo-empty">{t.photoComingSoon}</span>
      </div>
    );
  }

  const step = (by: number) => setIndex((i) => (i + by + photos.length) % photos.length);

  return (
    <div className="trail-photo">
      <button type="button" className="photo-open" aria-label={t.openPhotos(name)} onClick={() => setViewing(true)}>
        <img src={photos[index]} alt={t.photoAlt(name, index + 1, photos.length)} loading="lazy" />
      </button>
      {viewing && (
        <PhotoViewer photos={photos} index={index} name={name} onStep={step} onClose={() => setViewing(false)} />
      )}
      {photos.length > 1 && (
        <>
          <button type="button" className="photo-nav prev" aria-label={t.previousPhoto} onClick={() => step(-1)}>
            ‹
          </button>
          <button type="button" className="photo-nav next" aria-label={t.nextPhoto} onClick={() => step(1)}>
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
  const { lang, t } = useLang();
  const text = trailText(trail, lang);
  return (
    <article id={`trail-${trail.id}`} className={selected ? 'trail-card selected' : 'trail-card'}>
      <PhotoSlider photos={photosFor(trail.id)} name={text.name} />
      <button type="button" className="trail-card-button" onClick={() => onSelect(trail.id)}>
        <div className="trail-body">
          <h4>{text.name}</h4>
          <dl>
            <dt>{trail.circular ? t.circular : t.start}</dt>
            <dd>
              <TransportBadge operator={operatorOf(trail.start)} />
              {text.start ?? '—'}
            </dd>
            {!trail.circular && (
              <>
                <dt>{t.end}</dt>
                <dd>
                  <TransportBadge operator={operatorOf(trail.end)} />
                  {text.end ?? '—'}
                </dd>
              </>
            )}
            {/* Landmarks are hidden for now; set SHOW_LANDMARKS to true to bring them back. */}
            {SHOW_LANDMARKS && (
              <>
                <dt>{t.landmarks}</dt>
                <dd>{trail.landmarks.length ? trail.landmarks.join(', ') : '—'}</dd>
              </>
            )}
          </dl>
        </div>
      </button>
    </article>
  );
}
