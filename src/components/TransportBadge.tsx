import type { ReactNode } from 'react';
import type { Operator } from '../data/transport';

// Plain pictograms. To use an operator's official logo instead, put the image in src/assets/
// and swap its icon below for <img src={...} alt="" />.
const metro = (
  <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
    <path d="M8 1v2M5 3h6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none" />
    <rect x="3" y="4" width="10" height="9" rx="2.5" fill="currentColor" />
    <rect x="4.6" y="5.6" width="6.8" height="3.2" rx="0.8" fill="var(--surface)" />
    <circle cx="5.6" cy="11" r="0.9" fill="var(--surface)" />
    <circle cx="10.4" cy="11" r="0.9" fill="var(--surface)" />
    <path d="M5 13l-1.5 2M11 13l1.5 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

const train = (
  <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
    <rect x="3" y="1.5" width="10" height="11" rx="3" fill="currentColor" />
    <rect x="4.6" y="3.4" width="6.8" height="3.6" rx="0.8" fill="var(--surface)" />
    <circle cx="5.6" cy="10" r="0.9" fill="var(--surface)" />
    <circle cx="10.4" cy="10" r="0.9" fill="var(--surface)" />
    <path d="M5 12.5L3 15M11 12.5l2 2.5M4 15h8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

const bus = (
  <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
    <rect x="2.5" y="1.5" width="11" height="11.5" rx="2" fill="currentColor" />
    <rect x="4" y="3.2" width="8" height="4.6" rx="0.6" fill="var(--surface)" />
    <circle cx="5.2" cy="10.4" r="0.9" fill="var(--surface)" />
    <circle cx="10.8" cy="10.4" r="0.9" fill="var(--surface)" />
    <path d="M4.5 13v1.5M11.5 13v1.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const badges: Record<Operator, { icon: ReactNode; label?: string; name: string }> = {
  metro: { icon: metro, label: 'Metro', name: 'Metro do Porto' },
  cp: { icon: train, label: 'CP', name: 'CP – Comboios de Portugal' },
  stcp: { icon: bus, label: 'STCP', name: 'STCP' },
  unir: { icon: bus, label: 'UNIR', name: 'UNIR' },
  bus: { icon: bus, name: 'Bus' },
};

/** A small operator badge shown before a start or end point. */
export function TransportBadge({ operator }: { operator: Operator | undefined }) {
  if (!operator) return null;
  const b = badges[operator];
  return (
    <span className={`transport-badge transport-${operator}`} title={b.name}>
      {b.icon}
      {b.label && <span className="transport-label">{b.label}</span>}
    </span>
  );
}
