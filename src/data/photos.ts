// Every image in src/photos/<trail-id>/ is picked up at build time.
// Photos show in file-name order, so name them 01.jpg, 02.jpg, ... to set the order.
const files = import.meta.glob<string>(
  '../photos/*/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP,AVIF}',
  { eager: true, query: '?url', import: 'default' },
);

const byTrail: Record<string, string[]> = {};
for (const path of Object.keys(files).sort()) {
  const parts = path.split('/');
  const trailId = parts[parts.length - 2];
  (byTrail[trailId] ??= []).push(files[path]);
}

export function photosFor(trailId: string): string[] {
  return byTrail[trailId] ?? [];
}
