import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig(({ command, isPreview }) => ({
  plugins: [
    react(),
    // Installable app (manifest + service worker). Icons are made by `npm run images`.
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'apple-touch-icon.png'],
      manifest: {
        name: 'Maus Caminhos',
        short_name: 'Maus Caminhos',
        description: 'Walking trails in and around Porto, with a map and photos.',
        lang: 'en',
        display: 'standalone',
        theme_color: '#1d5f8a',
        background_color: '#f6f3ee',
        icons: [
          { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        // Pre-download the app itself (small). Photos (~45 MB) and map tiles are cached
        // as they're viewed instead, so visited trails still show offline.
        globPatterns: ['**/*.{js,css,html,svg,png,webmanifest}'],
        runtimeCaching: [
          {
            urlPattern: ({ request, sameOrigin }) => sameOrigin && request.destination === 'image',
            handler: 'CacheFirst',
            options: {
              cacheName: 'trail-photos',
              expiration: { maxEntries: 400, maxAgeSeconds: 60 * 60 * 24 * 60 },
            },
          },
          {
            urlPattern: /^https:\/\/[abc]\.tile\.openstreetmap\.org\//,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'map-tiles',
              expiration: { maxEntries: 600, maxAgeSeconds: 60 * 60 * 24 * 30 },
            },
          },
        ],
      },
    }),
  ],
  // GitHub Pages serves the site from eldsewhere.github.io/mauscaminhos/;
  // the dev server stays at the root.
  base: command === 'build' || isPreview ? '/mauscaminhos/' : '/',
}))
