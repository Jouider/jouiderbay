import type { ResidenceSlug, RoomSlug } from "./site-config";

export type Lang = "fr" | "en";

export const LANGS: { code: Lang; label: string }[] = [
  { code: "fr", label: "FR" },
  { code: "en", label: "EN" },
];

type RoomText = { slug: RoomSlug; name: string; desc: string; tags: string[] };
type ResidenceText = { slug: ResidenceSlug; name: string; desc: string };

/**
 * In titles (hero tagline and section titles), words wrapped in *asterisks*
 * are rendered as an italic accent — see components/Accent.tsx.
 */
export type Dict = {
  nav: {
    rooms: string;
    residence: string;
    videos: string;
    rates: string;
    contact: string;
    book: string;
  };
  hero: {
    kicker: string;
    tagline: string;
    sub: string;
    cta: string;
    scroll: string;
    play: string;
  };
  gallery: { kicker: string; title: string; cta: string };
  videos: {
    kicker: string;
    title: string;
    intro: string;
    clips: string[];
    reel: string;
    play: string;
    notice: string;
    follow: string;
    prev: string;
    next: string;
  };
  values: { name: string; desc: string }[];
  rooms: { kicker: string; title: string; intro: string; items: RoomText[] };
  residence: { kicker: string; title: string; intro: string; items: ResidenceText[] };
  amenities: { kicker: string; title: string; items: string[] };
  booking: {
    kicker: string;
    title: string;
    intro: string;
    perNight: string;
    minStay: (n: number) => string;
    checkIn: string;
    checkOut: string;
    selectDates: string;
    nights: (n: number) => string;
    total: string;
    name: string;
    namePlaceholder: string;
    guests: string;
    send: string;
    hint: string;
    tooShort: (n: number) => string;
    waIntro: string;
    waFrom: string;
    waTo: string;
    waGuests: string;
    waName: string;
    waTotal: string;
  };
  location: {
    kicker: string;
    title: string;
    intro: string;
    address: string;
    distances: { label: string; value: string }[];
    maps: string;
  };
  footer: { tagline: string; contact: string; follow: string; rights: string };
};

export const translations: Record<Lang, Dict> = {
  fr: {
    nav: {
      rooms: "L'appartement",
      residence: "La résidence",
      videos: "Vidéos",
      rates: "Tarifs",
      contact: "Contact",
      book: "Réserver",
    },
    hero: {
      kicker: "Sidi Rahal · Maroc",
      tagline: "Vos vacances, *les pieds dans l'eau*.",
      sub: "Un appartement lumineux avec vue sur la piscine, dans une résidence sécurisée avec accès direct à la plage.",
      cta: "Voir les disponibilités",
      scroll: "Visiter l'appartement",
      play: "Lancer la vidéo",
    },
    gallery: {
      kicker: "Galerie",
      title: "Avant même d'arriver, *vous y êtes*",
      cta: "Visiter les pièces",
    },
    videos: {
      kicker: "En vidéo",
      title: "Jouider Bay *en mouvement*",
      intro: "Le balcon, la piscine, la plage… Laissez-vous porter avant même de boucler vos valises.",
      clips: ["Panorama sur les jardins et la piscine", "La piscine vue du balcon"],
      reel: "Reel Instagram",
      play: "Regarder",
      notice: "La vidéo se charge depuis Instagram",
      follow: "Suivre @jouiderbay",
      prev: "Vidéo précédente",
      next: "Vidéo suivante",
    },
    values: [
      { name: "Pieds dans l'eau", desc: "Accès direct à la plage" },
      { name: "Piscine & soleil", desc: "Vue sur la piscine depuis le balcon" },
      { name: "Accueil soigné", desc: "Peignoirs, linge et plateau de bienvenue" },
      { name: "Calme & verdure", desc: "Jardins, palmiers et allées paisibles" },
    ],
    rooms: {
      kicker: "L'appartement",
      title: "Chez vous, *en mieux*",
      intro:
        "Lumineux, décoré avec soin et équipé de tout le nécessaire : il ne vous reste qu'à poser vos valises.",
      items: [
        {
          slug: "salon",
          name: "Le salon",
          desc: "Un grand canapé, la TV et la lumière du jour : le QG des soirées après la plage.",
          tags: ["Lumineux", "TV", "Grand canapé"],
        },
        {
          slug: "salle-a-manger",
          name: "La salle à manger",
          desc: "Une grande table pour les dîners qui s'éternisent, en famille ou entre amis.",
          tags: ["6+ couverts"],
        },
        {
          slug: "cuisine",
          name: "La cuisine équipée",
          desc: "Plaques, four, lave-linge… tout est là pour cuisiner comme à la maison.",
          tags: ["Équipée", "Moderne"],
        },
        {
          slug: "coin-cafe",
          name: "Le coin café",
          desc: "Machine à café et jolies tasses : le rituel du matin, sans se presser.",
          tags: ["Machine à café"],
        },
        {
          slug: "chambre-principale",
          name: "La chambre principale",
          desc: "Un grand lit douillet et un balcon privé pour des réveils tout en douceur.",
          tags: ["Balcon", "Lit double"],
        },
        {
          slug: "chambre-double",
          name: "La chambre deux lits",
          desc: "Deux lits et vue sur la piscine : le repaire préféré des enfants… et des amis.",
          tags: ["Balcon", "2 lits"],
        },
        {
          slug: "salle-de-bain",
          name: "Les salles d'eau",
          desc: "Deux salles d'eau modernes, avec serviettes et peignoirs fournis.",
          tags: ["×2", "Douche"],
        },
        {
          slug: "terrasse",
          name: "La terrasse",
          desc: "Le cœur de la maison : apéros au coucher du soleil et petits-déjeuners au grand air.",
          tags: ["Plein air", "Coucher de soleil"],
        },
      ],
    },
    residence: {
      kicker: "La résidence",
      title: "Verdoyante, sécurisée, *au bord de l'eau*",
      intro:
        "Piscine, jardins, terrains de sport et aire de jeux pour les enfants… avec la plage de Sidi Rahal en accès direct.",
      items: [
        { slug: "piscine", name: "La piscine", desc: "Sous les palmiers, à quelques pas" },
        { slug: "jardins", name: "Les jardins", desc: "Pelouses, palmiers et allées ombragées" },
        { slug: "entree", name: "L'entrée", desc: "Résidence sécurisée" },
        { slug: "plage", name: "La plage", desc: "En accès direct depuis la résidence" },
      ],
    },
    amenities: {
      kicker: "Équipements",
      title: "Tout est prévu, *profitez*",
      items: [
        "Wifi",
        "Climatisation",
        "TV",
        "Lave-linge",
        "Cuisine équipée",
        "Parking",
        "Piscine",
        "Plage en accès direct",
        "Résidence sécurisée",
      ],
    },
    booking: {
      kicker: "Tarifs & réservation",
      title: "Réservez *en direct*",
      intro:
        "Choisissez vos dates sur le calendrier et envoyez votre demande : on vous répond vite sur WhatsApp. Sans intermédiaire, sans commission.",
      perNight: "par nuit",
      minStay: (n) => `Séjour minimum : ${n} nuits`,
      checkIn: "Arrivée",
      checkOut: "Départ",
      selectDates: "Choisissez votre date d'arrivée, puis celle de départ",
      nights: (n) => `${n} nuit${n > 1 ? "s" : ""}`,
      total: "Total estimé",
      name: "Votre nom",
      namePlaceholder: "Prénom et nom",
      guests: "Voyageurs",
      send: "Envoyer ma demande sur WhatsApp",
      hint: "La demande s'ouvre dans WhatsApp — aucun paiement en ligne.",
      tooShort: (n) => `Le séjour minimum est de ${n} nuits.`,
      waIntro: "Bonjour ! Je souhaite réserver l'appartement Jouider Bay 🌊",
      waFrom: "Arrivée",
      waTo: "Départ",
      waGuests: "Voyageurs",
      waName: "Nom",
      waTotal: "Total estimé",
    },
    location: {
      kicker: "Localisation",
      title: "Sidi Rahal, *l'Atlantique à l'état pur*",
      intro:
        "Une station balnéaire paisible de la côte atlantique, à moins d'une heure de Casablanca et de son aéroport.",
      address: "Résidence en bord de mer · Sidi Rahal · Maroc",
      distances: [
        { label: "La plage", value: "Accès direct" },
        { label: "Casablanca", value: "≈ 45 min" },
        { label: "Aéroport CMN", value: "≈ 50 min" },
      ],
      maps: "Ouvrir dans Google Maps",
    },
    footer: {
      tagline: "Vos vacances, les pieds dans l'eau.",
      contact: "Contact",
      follow: "Suivez-nous",
      rights: "Tous droits réservés.",
    },
  },
  en: {
    nav: {
      rooms: "The apartment",
      residence: "The residence",
      videos: "Videos",
      rates: "Rates",
      contact: "Contact",
      book: "Book now",
    },
    hero: {
      kicker: "Sidi Rahal · Morocco",
      tagline: "Your holiday, *right on the water*.",
      sub: "A bright apartment overlooking the pool, in a secure residence with direct beach access.",
      cta: "Check availability",
      scroll: "Take the tour",
      play: "Play video",
    },
    gallery: {
      kicker: "Gallery",
      title: "Before you arrive, *you're already there*",
      cta: "Explore the rooms",
    },
    videos: {
      kicker: "On video",
      title: "Jouider Bay *in motion*",
      intro: "The balcony, the pool, the beach… Drift away before you've even packed.",
      clips: ["Panorama over the gardens and pool", "The pool from the balcony"],
      reel: "Instagram reel",
      play: "Watch",
      notice: "The video loads from Instagram",
      follow: "Follow @jouiderbay",
      prev: "Previous video",
      next: "Next video",
    },
    values: [
      { name: "On the water", desc: "Direct beach access" },
      { name: "Pool & sunshine", desc: "Pool views from the balcony" },
      { name: "Warm welcome", desc: "Bathrobes, linen and a welcome tray" },
      { name: "Calm & greenery", desc: "Gardens, palm trees and quiet paths" },
    ],
    rooms: {
      kicker: "The apartment",
      title: "Home, *only better*",
      intro:
        "Bright, lovingly decorated and fully equipped: all that's left is to drop your bags.",
      items: [
        {
          slug: "salon",
          name: "The living room",
          desc: "A big sofa, the TV and lots of daylight: your evening HQ after the beach.",
          tags: ["Bright", "TV", "Big sofa"],
        },
        {
          slug: "salle-a-manger",
          name: "The dining room",
          desc: "A big table for long, lingering dinners with family or friends.",
          tags: ["Seats 6+"],
        },
        {
          slug: "cuisine",
          name: "The fitted kitchen",
          desc: "Hob, oven, washing machine… everything you need to cook just like at home.",
          tags: ["Fully equipped", "Modern"],
        },
        {
          slug: "coin-cafe",
          name: "The coffee corner",
          desc: "A coffee machine and pretty mugs: your unhurried morning ritual.",
          tags: ["Coffee machine"],
        },
        {
          slug: "chambre-principale",
          name: "The master bedroom",
          desc: "A big, cosy bed and a private balcony for the gentlest wake-ups.",
          tags: ["Balcony", "Double bed"],
        },
        {
          slug: "chambre-double",
          name: "The twin bedroom",
          desc: "Two beds and a pool view: the kids' favourite hideout… and friends' too.",
          tags: ["Balcony", "2 beds"],
        },
        {
          slug: "salle-de-bain",
          name: "The bathrooms",
          desc: "Two modern shower rooms, with towels and bathrobes provided.",
          tags: ["×2", "Shower"],
        },
        {
          slug: "terrasse",
          name: "The terrace",
          desc: "The heart of the home: sunset drinks and open-air breakfasts.",
          tags: ["Open air", "Sunset"],
        },
      ],
    },
    residence: {
      kicker: "The residence",
      title: "Green, secure, *by the water*",
      intro:
        "Pool, gardens, sports courts and a children's playground… with direct access to Sidi Rahal beach.",
      items: [
        { slug: "piscine", name: "The pool", desc: "Under the palms, steps away" },
        { slug: "jardins", name: "The gardens", desc: "Lawns, palm trees and shaded paths" },
        { slug: "entree", name: "The entrance", desc: "Secure residence" },
        { slug: "plage", name: "The beach", desc: "Direct access from the residence" },
      ],
    },
    amenities: {
      kicker: "Amenities",
      title: "All set, *just enjoy*",
      items: [
        "Wifi",
        "Air conditioning",
        "TV",
        "Washing machine",
        "Fitted kitchen",
        "Parking",
        "Swimming pool",
        "Direct beach access",
        "Secure residence",
      ],
    },
    booking: {
      kicker: "Rates & booking",
      title: "Book *direct*",
      intro:
        "Pick your dates on the calendar and send your request: we'll reply quickly on WhatsApp. No middleman, no commission.",
      perNight: "per night",
      minStay: (n) => `Minimum stay: ${n} nights`,
      checkIn: "Check-in",
      checkOut: "Check-out",
      selectDates: "Pick your check-in date, then your check-out date",
      nights: (n) => `${n} night${n > 1 ? "s" : ""}`,
      total: "Estimated total",
      name: "Your name",
      namePlaceholder: "First and last name",
      guests: "Guests",
      send: "Send my request on WhatsApp",
      hint: "Your request opens in WhatsApp — no online payment.",
      tooShort: (n) => `Minimum stay is ${n} nights.`,
      waIntro: "Hello! I'd like to book the Jouider Bay apartment 🌊",
      waFrom: "Check-in",
      waTo: "Check-out",
      waGuests: "Guests",
      waName: "Name",
      waTotal: "Estimated total",
    },
    location: {
      kicker: "Location",
      title: "Sidi Rahal, *the Atlantic at its purest*",
      intro:
        "A peaceful seaside resort on the Atlantic coast, less than an hour from Casablanca and its airport.",
      address: "Seafront residence · Sidi Rahal · Morocco",
      distances: [
        { label: "The beach", value: "Direct access" },
        { label: "Casablanca", value: "≈ 45 min" },
        { label: "CMN Airport", value: "≈ 50 min" },
      ],
      maps: "Open in Google Maps",
    },
    footer: {
      tagline: "Your holiday, right on the water.",
      contact: "Contact",
      follow: "Follow us",
      rights: "All rights reserved.",
    },
  },
};
