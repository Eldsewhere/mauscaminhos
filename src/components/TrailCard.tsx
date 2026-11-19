import type { Trail } from '../data/trails';

type Props = {
  trail: Trail;
  selected: boolean;
  onSelect: (id: string) => void;
};

export function TrailCard({ trail, selected, onSelect }: Props) {
  return (
    <article id={`trail-${trail.id}`} className={selected ? 'trail-card selected' : 'trail-card'}>
      <button type="button" className="trail-card-button" onClick={() => onSelect(trail.id)}>
        <div className="trail-photo">
          {trail.image ? (
            <img src={trail.image} alt={trail.name} loading="lazy" />
          ) : (
            <span className="trail-photo-empty">Photo coming soon</span>
          )}
        </div>
        <div className="trail-body">
          <h3>{trail.name}</h3>
          <dl>
            <dt>Start</dt>
            <dd>{trail.start}</dd>
            <dt>End</dt>
            <dd>{trail.circular ? 'Circular (back to the start)' : trail.end}</dd>
            <dt>Landmarks</dt>
            <dd>{trail.landmarks.length ? trail.landmarks.join(', ') : '—'}</dd>
          </dl>
        </div>
      </button>
    </article>
  );
}
