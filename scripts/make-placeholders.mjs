/**
 * Generates elegant placeholder JPEGs for every photo slot.
 * Replace any file in public/photos/ with the real professional photo
 * (same filename) — nothing else to change.
 *
 * Run: node scripts/make-placeholders.mjs
 */
import { mkdir, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const sharp = require("sharp");

const OUT = new URL("../public/photos/", import.meta.url).pathname;

const GRADIENTS = {
  ocean: ["#0d2b4e", "#0ea5c6"],
  lagoon: ["#0ea5c6", "#4ac0d6"],
  sunset: ["#0d2b4e", "#ff8a00"],
  sand: ["#ffc17a", "#fdf4e7"],
  dusk: ["#081c35", "#4ac0d6"],
};

const PHOTOS = [
  // --- Hero carousel: put your 5 best wide shots here ---
  ["hero-1", "VUE MER", "dusk"],
  ["hero-2", "LA TERRASSE", "sunset"],
  ["hero-3", "LA PISCINE", "lagoon"],
  ["hero-4", "LE SALON", "ocean"],
  ["hero-5", "LA PLAGE", "sand"],
  ["hero", "VUE MER / RÉSIDENCE", "dusk"],
  ["salon", "SALON", "ocean"],
  ["salle-a-manger", "SALLE À MANGER", "lagoon"],
  ["cuisine", "CUISINE", "sand"],
  ["coin-cafe", "COIN CAFÉ", "sunset"],
  ["chambre-principale", "CHAMBRE PRINCIPALE", "ocean"],
  ["chambre-double", "CHAMBRE 2 LITS", "lagoon"],
  ["salle-de-bain", "SALLES D'EAU", "sand"],
  ["terrasse", "TERRASSE", "sunset"],
  ["piscine", "PISCINE", "lagoon"],
  ["jardins", "JARDINS", "ocean"],
  ["entree", "ENTRÉE RÉSIDENCE", "dusk"],
  ["plage", "PLAGE", "sunset"],
];

const svg = (label, [c1, c2]) => `
<svg width="1600" height="1200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${c1}"/>
      <stop offset="1" stop-color="${c2}"/>
    </linearGradient>
  </defs>
  <rect width="1600" height="1200" fill="url(#g)"/>
  <g stroke="#ffffff" stroke-opacity="0.35" stroke-width="10" fill="none" stroke-linecap="round">
    <path d="M420 640 Q560 560 700 640 T980 640"/>
    <path d="M460 720 Q600 640 740 720 T1020 720"/>
  </g>
  <circle cx="1050" cy="480" r="90" fill="#ff8a00" fill-opacity="0.85"/>
  <text x="800" y="880" text-anchor="middle" font-family="Helvetica, Arial, sans-serif"
        font-size="64" font-weight="700" letter-spacing="14" fill="#ffffff" fill-opacity="0.92">${label}</text>
  <text x="800" y="950" text-anchor="middle" font-family="Helvetica, Arial, sans-serif"
        font-size="30" letter-spacing="6" fill="#ffffff" fill-opacity="0.6">PHOTO PRO À VENIR</text>
</svg>`;

await mkdir(OUT, { recursive: true });
for (const [slug, label, grad] of PHOTOS) {
  const buf = await sharp(Buffer.from(svg(label, GRADIENTS[grad])))
    .jpeg({ quality: 82 })
    .toBuffer();
  await writeFile(`${OUT}${slug}.jpg`, buf);
  console.log(`✓ ${slug}.jpg`);
}
console.log(`\n${PHOTOS.length} placeholders written to public/photos/`);
