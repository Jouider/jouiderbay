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

export type RoomSlug = (typeof ROOM_SLUGS)[number];
export type ResidenceSlug = (typeof RESIDENCE_SLUGS)[number];

export const photo = (slug: string) => `/photos/${slug}.jpg`;
