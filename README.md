# Maus Caminhos

Walking trails in Porto: a map (OpenStreetMap via Leaflet, free, no API key) and a grid of trail cards.

## Run

```
npm install
npm run dev
```

## Add a trail

Edit `src/data/trails.ts`. Each trail has a name, start, end, landmarks and a
`position` (latitude, longitude) where its pin goes on the map.

## Add photos

Each trail has a folder in `src/photos/`, named after the trail's id
(for example `src/photos/hills-of-porto/`). Drop images in it (jpg, png,
webp or avif) and they appear on that trail's card with arrows to flip
through them. No code changes needed.

- Photos show in file-name order: name them `01.jpg`, `02.jpg`, ...
- The first one is the cover.
- Shrink them first: about 1600 px wide and under ~300 KB each.
- Delete the folder's `.gitkeep` once it has a photo (optional).
