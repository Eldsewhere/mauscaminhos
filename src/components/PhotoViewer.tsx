import { useEffect, useRef } from 'react';

type Props = {
  photos: string[];
  index: number;
  name: string;
  onStep: (by: number) => void;
  onClose: () => void;
};

/** Full-screen view of one trail photo, shown at the size of the original file. */
export function PhotoViewer({ photos, index, name, onStep, onClose }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);

  // A native <dialog> gives us the dark backdrop, focus trapping and Esc to close.
  // No close() on cleanup: its async "close" event would shut the viewer right after it opens
  // when React re-runs effects in dev; unmounting removes the dialog anyway.
  useEffect(() => {
    const d = dialog.current;
    if (d && !d.open) d.showModal();
  }, []);

  const many = photos.length > 1;

  return (
    <dialog
      ref={dialog}
      className="photo-viewer"
      aria-label={`${name} photos`}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose(); // click on the backdrop
      }}
      onCancel={(e) => {
        e.preventDefault(); // Esc: close through React state, below
        onClose();
      }}
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          e.preventDefault();
          onClose();
          return;
        }
        if (!many) return;
        if (e.key === 'ArrowLeft') onStep(-1);
        if (e.key === 'ArrowRight') onStep(1);
      }}
    >
      <img src={photos[index]} alt={`${name}, photo ${index + 1} of ${photos.length}`} />
      <button type="button" className="viewer-close" aria-label="Close" onClick={onClose}>
        ×
      </button>
      {many && (
        <>
          <button type="button" className="viewer-nav prev" aria-label="Previous photo" onClick={() => onStep(-1)}>
            ‹
          </button>
          <button type="button" className="viewer-nav next" aria-label="Next photo" onClick={() => onStep(1)}>
            ›
          </button>
        </>
      )}
      <div className="viewer-caption">
        {name}
        {many && ` · ${index + 1} / ${photos.length}`}
      </div>
    </dialog>
  );
}
