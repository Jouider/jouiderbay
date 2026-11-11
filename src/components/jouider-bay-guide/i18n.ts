/** Interface texts (French and English). Guide content lives in content.ts. */
import type { Lang, Localized, RoomId } from './types';

const FR_NUMBERS = ['zéro', 'une', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf', 'dix'];
const EN_NUMBERS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];

export interface UiStrings {
  eyebrow: string;
  eyebrowLogo: string;
  lede: string;
  jumpArrival: string;
  jumpApartment: string;
  jumpDeparture: string;
  arrivalKicker: string;
  arrivalTitle: string;
  arrivalLede: (steps: number) => string;
  watchArrival: string;
  watchArrivalSub: string;
  apartmentKicker: string;
  apartmentTitle: string;
  apartmentLede: string;
  departureKicker: string;
  departureTitle: string;
  departureLede: string;
  contactKicker: string;
  contactTitle: string;
  all: string;
  close: string;
  zoom: string;
  whatsappHelp: string;
  whatsappButton: string;
  wifi: string;
  wifiName: string;
  wifiPassword: string;
  copy: string;
  copied: string;
  videoError: string;
  openVideo: string;
  externalLink: string;
  enjoyStay: string;
  videoCount: (n: number) => string;
  instructions: string;
  languageGroup: string;
  sectionsNav: string;
  roomsGroup: string;
  pagerNav: string;
}

/** Non-breaking space: French puts one before « : », « ? », « ! ». */
const NBSP = '\u00a0';

export const UI: Record<Lang, UiStrings> = {
  fr: {
    eyebrow: 'Résidence Casabay · Sidi Rahal',
    eyebrowLogo: 'Résidence Casabay · Guide de séjour',
    lede: `Le guide de votre séjour${NBSP}: l’arrivée, chaque équipement en vidéo et le départ.`,
    jumpArrival: 'Arrivée',
    jumpApartment: 'L’appartement',
    jumpDeparture: 'Départ',
    arrivalKicker: 'Avant d’entrer',
    arrivalTitle: 'Votre arrivée',
    arrivalLede: (n) =>
      n > 0
        ? `Du portail jusqu’à votre porte, en ${FR_NUMBERS[n] ?? n} étape${n > 1 ? 's' : ''}.`
        : 'Du portail jusqu’à votre porte.',
    watchArrival: 'La vidéo de l’arrivée',
    watchArrivalSub: 'Le trajet en images',
    apartmentKicker: 'Pendant le séjour',
    apartmentTitle: 'L’appartement en vidéo',
    apartmentLede: 'Touchez un équipement pour voir comment il fonctionne.',
    departureKicker: 'Avant de partir',
    departureTitle: 'Votre départ',
    departureLede: 'Merci de vérifier ces points avant de quitter l’appartement.',
    contactKicker: `Une question${NBSP}?`,
    contactTitle: 'Nous joindre',
    all: 'Tout',
    close: 'Fermer',
    zoom: 'Agrandir la photo',
    whatsappHelp: `Écrivez-nous sur WhatsApp${NBSP}:`,
    whatsappButton: 'Écrire sur WhatsApp',
    wifi: 'Wi-Fi',
    wifiName: 'Réseau',
    wifiPassword: 'Mot de passe',
    copy: 'Copier',
    copied: 'Copié',
    videoError: 'La vidéo ne peut pas être lue ici.',
    openVideo: 'Ouvrir la vidéo',
    externalLink: 'Voir aussi la vidéo en ligne',
    enjoyStay: 'Bon séjour',
    videoCount: (n) => `${n} vidéo${n > 1 ? 's' : ''}`,
    instructions: 'Instructions',
    languageGroup: 'Langue / Language',
    sectionsNav: 'Sections',
    roomsGroup: 'Pièces',
    pagerNav: 'Équipement précédent ou suivant',
  },
  en: {
    eyebrow: 'Casabay residence · Sidi Rahal',
    eyebrowLogo: 'Casabay residence · Stay guide',
    lede: 'Your stay guide: getting here, every appliance on video, and check-out.',
    jumpArrival: 'Arrival',
    jumpApartment: 'The apartment',
    jumpDeparture: 'Check-out',
    arrivalKicker: 'Before you come in',
    arrivalTitle: 'Your arrival',
    arrivalLede: (n) =>
      n > 0
        ? `From the gate to your door, in ${EN_NUMBERS[n] ?? n} step${n > 1 ? 's' : ''}.`
        : 'From the gate to your door.',
    watchArrival: 'The arrival video',
    watchArrivalSub: 'The way in, on video',
    apartmentKicker: 'During your stay',
    apartmentTitle: 'The apartment on video',
    apartmentLede: 'Tap an appliance to see how it works.',
    departureKicker: 'Before you leave',
    departureTitle: 'Check-out',
    departureLede: 'Please check these points before you leave the apartment.',
    contactKicker: 'Any question?',
    contactTitle: 'Get in touch',
    all: 'All',
    close: 'Close',
    zoom: 'Enlarge the photo',
    whatsappHelp: 'Message us on WhatsApp:',
    whatsappButton: 'Message on WhatsApp',
    wifi: 'Wi-Fi',
    wifiName: 'Network',
    wifiPassword: 'Password',
    copy: 'Copy',
    copied: 'Copied',
    videoError: 'This video can’t play here.',
    openVideo: 'Open the video',
    externalLink: 'Also watch it online',
    enjoyStay: 'Enjoy your stay',
    videoCount: (n) => `${n} video${n > 1 ? 's' : ''}`,
    instructions: 'Instructions',
    languageGroup: 'Langue / Language',
    sectionsNav: 'Sections',
    roomsGroup: 'Rooms',
    pagerNav: 'Previous or next appliance',
  },
};

/** Room labels, in display order. "arrivee" labels the arrival video in the viewer. */
export const ROOMS: ReadonlyArray<{ id: RoomId | 'arrivee'; label: Localized }> = [
  { id: 'arrivee', label: { fr: 'Arrivée', en: 'Arrival' } },
  { id: 'cuisine', label: { fr: 'Cuisine', en: 'Kitchen' } },
  { id: 'salon', label: { fr: 'Salon', en: 'Living room' } },
  { id: 'balcon', label: { fr: 'Balcon', en: 'Balcony' } },
  { id: 'pratique', label: { fr: 'Pratique', en: 'Essentials' } },
];

/** Title of the arrival video in the viewer. */
export const ARRIVAL_TITLE: Localized = { fr: 'Votre arrivée', en: 'Your arrival' };
