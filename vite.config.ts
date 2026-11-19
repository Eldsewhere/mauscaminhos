import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command, isPreview }) => ({
  plugins: [react()],
  // GitHub Pages serves the site from eldsewhere.github.io/mauscaminhos/;
  // the dev server stays at the root.
  base: command === 'build' || isPreview ? '/mauscaminhos/' : '/',
}))
