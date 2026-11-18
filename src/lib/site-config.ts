/**
 * Central site configuration — everything the owner may want to tweak
 * lives here: contact details, pricing, availability.
 *
 * Phase 2 (Airbnb sync): the `blockedRanges` list below will be replaced
 * by dates pulled from the Airbnb iCal feed.
 */

export const INSTAGRAM_URL = "https://www.instagram.com/jouiderbay";
export const WHATSAPP_NUMBER = "32465595693"; // international format, no "+"
export const GOOGLE_MAPS_URL = "https://maps.google.com/?q=Sidi+Rahal+Plage+Maroc";

/* ---------- Pricing (TODO: Abdellah — confirme tes vrais tarifs) ---------- */
export const PRICING = {
  currency: "MAD",
  nightly: 800, // prix par nuit — PLACEHOLDER à confirmer
  minNights: 2,
};

/* ---------- Availability ----------
 * Ranges are [checkIn, checkOut) — the checkout day itself is free again.
 * Dates in ISO format YYYY-MM-DD.
 */
export const BLOCKED_RANGES: { from: string; to: string }[] = [
  // exemple : { from: "2026-08-01", to: "2026-08-15" },
];

/* ---------- Photo manifest ----------
 * Every image lives in /public/photos/<slug>.jpg — replace the placeholder
 * files with the real professional photos, keeping the same file names.
 */
/** Hero background video (autoplays muted + looped) and its poster frame.
 *  Two cuts of the same slow-motion montage: 16:9 for landscape screens
 *  (computers, tablets turned sideways) and 9:16 for portrait screens (phones). */
export const HERO_VIDEO = "/videos/hero.mp4";
export const HERO_VIDEO_PORTRAIT = "/videos/hero-portrait.mp4";
export const HERO_POSTER = "/photos/hero-1.jpg";

/** Full-bleed mosaic gallery further down the page. */
export const GALLERY_SLUGS = [
  "terrasse",
  "piscine",
  "salon",
  "plage",
  "chambre-principale",
  "jardins",
  "accueil",
  "piscine-jour",
  "cafe-plage",
  "terrain-sport",
  "aire-de-jeux",
  "acces-plage",
] as const;

export const ROOM_SLUGS = [
  "salon",
  "salle-a-manger",
  "cuisine",
  "coin-cafe",
  "chambre-principale",
  "chambre-double",
  "salle-de-bain",
  "terrasse",
] as const;

export const RESIDENCE_SLUGS = ["piscine", "jardins", "entree", "plage"] as const;

/* ---------- Videos section ("En vidéo") ----------
 * CLIPS: our own short vertical videos (public/videos/<slug>.mp4, muted loop)
 *        with their poster frame in public/photos/<slug>.jpg.
 * INSTAGRAM_REELS: reel IDs from instagram.com/jouiderbay/reel/<ID>/ — shown
 *        with Instagram's official embed, loaded only when the visitor taps
 *        (no Meta cookies before that). Add / remove IDs here.
 */
export const VIDEO_CLIP_SLUGS = ["panorama-jardins", "vue-piscine-balcon"] as const;
export const video = (slug: string) => `/videos/${slug}.mp4`;

export const INSTAGRAM_REELS = [
  "Df0ZaQkg_vd",
  "Dfs3R0ggAbA",
  "DfqEkYHAo_c",
  "Dfm6dd5AM0P",
  "DflAAc-ADwL",
  "DfgA8Ogo-uS",
  "Dff8wlJIGVn",
  "DfbbMb2gqaL",
  "DfTTGLEows5",
] as const;

export type RoomSlug = (typeof ROOM_SLUGS)[number];
export type ResidenceSlug = (typeof RESIDENCE_SLUGS)[number];

export const photo = (slug: string) => `/photos/${slug}.jpg`;
