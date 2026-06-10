export type Lang = "fr" | "en" | "ar";

export const LANGS: { code: Lang; label: string }[] = [
  { code: "fr", label: "FR" },
  { code: "en", label: "EN" },
  { code: "ar", label: "ع" },
];

type Dict = {
  dir: "ltr" | "rtl";
  badge: string;
  comingSoon: string;
  brand: string;
  location: string;
  tagline: string;
  intro: string;
  teasers: string[];
  notify: string;
  follow: string;
  whatsapp: string;
  footer: string;
};

export const translations: Record<Lang, Dict> = {
  fr: {
    dir: "ltr",
    badge: "Bientôt disponible",
    comingSoon: "Site en construction",
    brand: "Jouider Bay",
    location: "Sidi Rahal · Maroc",
    tagline: "Les pieds dans l'eau, le luxe en plus.",
    intro:
      "Un appartement d'exception en bord de mer — piscine, verdure et plage à votre porte. La réservation directe arrive très bientôt.",
    teasers: ["Pieds dans l'eau", "Piscine privée", "Plage à 2 pas", "Verdure & calme", "Couchers de soleil"],
    notify: "Bientôt en ligne",
    follow: "Suivez-nous",
    whatsapp: "Nous contacter",
    footer: "Réservation directe — sans intermédiaire.",
  },
  en: {
    dir: "ltr",
    badge: "Coming soon",
    comingSoon: "Under construction",
    brand: "Jouider Bay",
    location: "Sidi Rahal · Morocco",
    tagline: "Steps from the sea, a touch of luxury.",
    intro:
      "An exceptional seafront apartment — pool, greenery and beach at your doorstep. Direct booking is coming very soon.",
    teasers: ["Right on the water", "Private pool", "Beach steps away", "Green & peaceful", "Golden sunsets"],
    notify: "Launching soon",
    follow: "Follow us",
    whatsapp: "Contact us",
    footer: "Book directly — no middleman.",
  },
  ar: {
    dir: "rtl",
    badge: "قريباً",
    comingSoon: "الموقع قيد الإنشاء",
    brand: "Jouider Bay",
    location: "سيدي رحال · المغرب",
    tagline: "على ضفاف البحر، مع لمسة من الفخامة.",
    intro:
      "شقة استثنائية على شاطئ البحر — مسبح وخضرة وشاطئ على بُعد خطوات. الحجز المباشر قريباً جداً.",
    teasers: ["على حافة الماء", "مسبح خاص", "الشاطئ على بُعد خطوات", "خضرة وهدوء", "غروب ذهبي"],
    notify: "الإطلاق قريباً",
    follow: "تابعنا",
    whatsapp: "تواصل معنا",
    footer: "احجز مباشرة — دون وسيط.",
  },
};

export const INSTAGRAM_URL = "https://www.instagram.com/jouiderbay";
export const WHATSAPP_NUMBER = "32465595693";
