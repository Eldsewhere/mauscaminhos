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

For a photo, put the image in `public/trails/` and set `image: '/trails/<file>.jpg'`.
