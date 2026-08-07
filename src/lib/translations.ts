import type { ResidenceSlug, RoomSlug } from "./site-config";

export type Lang = "fr" | "en";

export const LANGS: { code: Lang; label: string }[] = [
  { code: "fr", label: "FR" },
  { code: "en", label: "EN" },
];

type RoomText = { slug: RoomSlug; name: string; desc: string; tags: string[] };
type ResidenceText = { slug: ResidenceSlug; name: string; desc: string };

export type Dict = {
  nav: { rooms: string; residence: string; rates: string; contact: string; book: string };
  hero: {
    kicker: string;
    tagline: string;
    sub: string;
    cta: string;
    scroll: string;
  };
  gallery: { kicker: string; title: string; cta: string };
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
      rates: "Tarifs",
      contact: "Contact",
      book: "Réserver",
    },
    hero: {
      kicker: "Sidi Rahal · Maroc",
      tagline: "Votre échappée belle en bord de mer.",
      sub: "Appartement de standing les pieds dans l'eau — piscine, jardins et plage à votre porte.",
      cta: "Réserver vos dates",
      scroll: "Découvrir",
    },
    gallery: {
      kicker: "En images",
      title: "Un avant-goût de votre séjour",
      cta: "Voir l'appartement",
    },
    values: [
      { name: "Sérénité", desc: "Le calme du bord de mer" },
      { name: "Évasion", desc: "Déconnectez du quotidien" },
      { name: "Hospitalité", desc: "Un accueil aux petits soins" },
      { name: "Nature", desc: "Verdure, sable et océan" },
    ],
    rooms: {
      kicker: "Vivez l'expérience",
      title: "Un appartement pensé pour vous",
      intro:
        "Chaque espace a été soigné pour que vous vous sentiez chez vous — en mieux. Lumière naturelle, vues sur la résidence et l'océan à deux pas.",
      items: [
        {
          slug: "salon",
          name: "Le salon",
          desc: "Spacieux et baigné de lumière, parfait pour se retrouver après la plage.",
          tags: ["Lumineux", "TV", "Convivial"],
        },
        {
          slug: "salle-a-manger",
          name: "La salle à manger",
          desc: "De grands repas en famille ou entre amis, comme en vacances.",
          tags: ["6+ couverts"],
        },
        {
          slug: "cuisine",
          name: "La cuisine équipée",
          desc: "Tout le nécessaire pour cuisiner comme à la maison.",
          tags: ["Équipée", "Moderne"],
        },
        {
          slug: "coin-cafe",
          name: "Le coin café",
          desc: "Votre rituel du matin, avec vue et sans se presser.",
          tags: ["Machine à café"],
        },
        {
          slug: "chambre-principale",
          name: "La chambre principale",
          desc: "Un grand lit, un balcon privé — les réveils face à la brise marine.",
          tags: ["Balcon", "Lit double"],
        },
        {
          slug: "chambre-double",
          name: "La chambre deux lits",
          desc: "Deux lits confortables et un balcon, idéale pour enfants ou amis.",
          tags: ["Balcon", "2 lits"],
        },
        {
          slug: "salle-de-bain",
          name: "Les salles d'eau",
          desc: "Deux salles d'eau modernes et impeccables.",
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
      title: "Un cadre verdoyant, sécurisé, pieds dans l'eau",
      intro:
        "Une résidence de standing avec piscine, jardins entretenus et accès direct à la plage de Sidi Rahal.",
      items: [
        { slug: "piscine", name: "La piscine", desc: "À quelques pas de l'appartement" },
        { slug: "jardins", name: "Les jardins", desc: "Verdure et allées ombragées" },
        { slug: "entree", name: "L'entrée", desc: "Résidence sécurisée" },
        { slug: "plage", name: "La plage", desc: "Directement au bord de l'eau" },
      ],
    },
    amenities: {
      kicker: "Équipements",
      title: "Tout est prévu",
      items: [
        "Wifi",
        "Climatisation",
        "TV",
        "Machine à laver",
        "Cuisine équipée",
        "Parking",
        "Piscine",
        "Accès plage direct",
        "Résidence sécurisée",
      ],
    },
    booking: {
      kicker: "Tarifs & réservation",
      title: "Réservez vos dates",
      intro:
        "Choisissez vos dates, envoyez votre demande — nous confirmons rapidement par WhatsApp. Sans intermédiaire, sans commission.",
      perNight: "par nuit",
      minStay: (n) => `Séjour minimum : ${n} nuits`,
      checkIn: "Arrivée",
      checkOut: "Départ",
      selectDates: "Sélectionnez vos dates sur le calendrier",
      nights: (n) => `${n} nuit${n > 1 ? "s" : ""}`,
      total: "Total estimé",
      name: "Votre nom",
      namePlaceholder: "Prénom et nom",
      guests: "Voyageurs",
      send: "Envoyer la demande WhatsApp",
      hint: "Votre demande s'ouvre dans WhatsApp — rien n'est payé en ligne.",
      tooShort: (n) => `Le séjour minimum est de ${n} nuits.`,
      waIntro: "Bonjour ! Je souhaite réserver Jouider Bay 🌊",
      waFrom: "Arrivée",
      waTo: "Départ",
      waGuests: "Voyageurs",
      waName: "Nom",
      waTotal: "Total estimé",
    },
    location: {
      kicker: "Localisation",
      title: "Sidi Rahal, le littoral à l'état pur",
      intro:
        "Une station balnéaire paisible sur la côte atlantique, à moins d'une heure de Casablanca.",
      address: "Résidence en bord de mer · Sidi Rahal · Maroc",
      distances: [
        { label: "La plage", value: "Accès direct" },
        { label: "Casablanca", value: "≈ 45 min" },
        { label: "Aéroport CMN", value: "≈ 50 min" },
      ],
      maps: "Ouvrir dans Google Maps",
    },
    footer: {
      tagline: "Votre échappée belle en bord de mer.",
      contact: "Contact",
      follow: "Suivez-nous",
      rights: "Tous droits réservés.",
    },
  },
  en: {
    nav: {
      rooms: "The apartment",
      residence: "The residence",
      rates: "Rates",
      contact: "Contact",
      book: "Book now",
    },
    hero: {
      kicker: "Sidi Rahal · Morocco",
      tagline: "Your beautiful seaside escape.",
      sub: "Premium apartment right on the water — pool, gardens and beach at your doorstep.",
      cta: "Book your dates",
      scroll: "Discover",
    },
    gallery: {
      kicker: "In pictures",
      title: "A taste of your stay",
      cta: "See the apartment",
    },
    values: [
      { name: "Serenity", desc: "The calm of the seaside" },
      { name: "Escape", desc: "Disconnect from the daily grind" },
      { name: "Hospitality", desc: "A warm, attentive welcome" },
      { name: "Nature", desc: "Greenery, sand and ocean" },
    ],
    rooms: {
      kicker: "Live the experience",
      title: "An apartment designed around you",
      intro:
        "Every space has been carefully thought out so you feel at home — only better. Natural light, residence views, and the ocean steps away.",
      items: [
        {
          slug: "salon",
          name: "The living room",
          desc: "Spacious and full of light — perfect for gathering after the beach.",
          tags: ["Bright", "TV", "Cosy"],
        },
        {
          slug: "salle-a-manger",
          name: "The dining room",
          desc: "Long meals with family or friends, holiday style.",
          tags: ["Seats 6+"],
        },
        {
          slug: "cuisine",
          name: "The fitted kitchen",
          desc: "Everything you need to cook just like at home.",
          tags: ["Fully equipped", "Modern"],
        },
        {
          slug: "coin-cafe",
          name: "The coffee corner",
          desc: "Your morning ritual, with a view and no rush.",
          tags: ["Coffee machine"],
        },
        {
          slug: "chambre-principale",
          name: "The master bedroom",
          desc: "A large bed and a private balcony — wake up to the sea breeze.",
          tags: ["Balcony", "Double bed"],
        },
        {
          slug: "chambre-double",
          name: "The twin bedroom",
          desc: "Two comfortable beds and a balcony — ideal for kids or friends.",
          tags: ["Balcony", "2 beds"],
        },
        {
          slug: "salle-de-bain",
          name: "The bathrooms",
          desc: "Two modern, spotless shower rooms.",
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
      title: "Green, secure, right on the water",
      intro:
        "A premium residence with a pool, landscaped gardens and direct access to Sidi Rahal beach.",
      items: [
        { slug: "piscine", name: "The pool", desc: "Steps from the apartment" },
        { slug: "jardins", name: "The gardens", desc: "Greenery and shaded paths" },
        { slug: "entree", name: "The entrance", desc: "Secure residence" },
        { slug: "plage", name: "The beach", desc: "Right at the water's edge" },
      ],
    },
    amenities: {
      kicker: "Amenities",
      title: "Everything is taken care of",
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
      title: "Book your dates",
      intro:
        "Pick your dates and send your request — we confirm quickly on WhatsApp. No middleman, no commission.",
      perNight: "per night",
      minStay: (n) => `Minimum stay: ${n} nights`,
      checkIn: "Check-in",
      checkOut: "Check-out",
      selectDates: "Select your dates on the calendar",
      nights: (n) => `${n} night${n > 1 ? "s" : ""}`,
      total: "Estimated total",
      name: "Your name",
      namePlaceholder: "First and last name",
      guests: "Guests",
      send: "Send WhatsApp request",
      hint: "Your request opens in WhatsApp — nothing is paid online.",
      tooShort: (n) => `Minimum stay is ${n} nights.`,
      waIntro: "Hello! I'd like to book Jouider Bay 🌊",
      waFrom: "Check-in",
      waTo: "Check-out",
      waGuests: "Guests",
      waName: "Name",
      waTotal: "Estimated total",
    },
    location: {
      kicker: "Location",
      title: "Sidi Rahal, the coastline at its purest",
      intro:
        "A peaceful seaside resort on the Atlantic coast, less than an hour from Casablanca.",
      address: "Seafront residence · Sidi Rahal · Morocco",
      distances: [
        { label: "The beach", value: "Direct access" },
        { label: "Casablanca", value: "≈ 45 min" },
        { label: "CMN Airport", value: "≈ 50 min" },
      ],
      maps: "Open in Google Maps",
    },
    footer: {
      tagline: "Your beautiful seaside escape.",
      contact: "Contact",
      follow: "Follow us",
      rights: "All rights reserved.",
    },
  },
};
