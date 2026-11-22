// Generates the app icons and the social share image into public/.
// Run after changing public/favicon.svg or the share photo:  npm run images
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const PUBLIC = new URL('../public/', import.meta.url);
const BLUE = '#1d5f8a';
const out = (name) => fileURLToPath(new URL(name, PUBLIC));

// Photo used behind the title on link previews (WhatsApp, Facebook, X, ...).
const SHARE_PHOTO = new URL('../src/photos/tgv-could-have-been/20251026_114603.jpg', import.meta.url);

const logo = await readFile(new URL('favicon.svg', PUBLIC));

/** The logo on its own square (rounded corners, transparent outside). */
const icon = (size, name) => sharp(logo, { density: 600 }).resize(size, size).png().toFile(out(name));

/**
 * The logo shrunk onto a full-bleed blue square, for icons the system crops
 * (Android "maskable" icons are cut to a circle/squircle; iOS rounds its own corners).
 */
async function fullBleed(size, name, logoShare) {
  const inner = Math.round(size * logoShare);
  const art = await sharp(logo, { density: 600 }).resize(inner, inner).png().toBuffer();
  await sharp({ create: { width: size, height: size, channels: 4, background: BLUE } })
    .composite([{ input: art, gravity: 'center' }])
    .png()
    .toFile(out(name));
}

async function shareImage() {
  const W = 1200;
  const H = 630;
  const photo = await sharp(await readFile(SHARE_PHOTO)).resize(W, H, { fit: 'cover', position: 'centre' }).toBuffer();
  const mark = await sharp(logo, { density: 600 }).resize(132, 132).png().toBuffer();
  const text = Buffer.from(`
    <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="shade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#000" stop-opacity="0.55"/>
          <stop offset="0.55" stop-color="#000" stop-opacity="0.1"/>
          <stop offset="1" stop-color="#000" stop-opacity="0.45"/>
        </linearGradient>
      </defs>
      <rect width="${W}" height="${H}" fill="url(#shade)"/>
      <text x="236" y="128" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="84" font-weight="700" fill="#fff">Maus Caminhos</text>
      <text x="240" y="186" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="40" fill="#fff" fill-opacity="0.92">Walking trails in and around Porto</text>
      <text x="72" y="580" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="30" fill="#fff" fill-opacity="0.9">Urban walks and trails further out</text>
    </svg>`);
  await sharp(photo)
    .composite([
      { input: text, top: 0, left: 0 },
      { input: mark, top: 66, left: 72 },
    ])
    .jpeg({ quality: 84, mozjpeg: true })
    .toFile(out('og-image.jpg'));
}

await Promise.all([
  icon(192, 'icon-192.png'),
  icon(512, 'icon-512.png'),
  fullBleed(512, 'icon-maskable-512.png', 0.62),
  fullBleed(180, 'apple-touch-icon.png', 0.78),
  shareImage(),
]);
console.log('Wrote icons and og-image.jpg to public/');
