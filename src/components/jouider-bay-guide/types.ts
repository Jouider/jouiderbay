/** Content model of the Jouider Bay guide. */

export type Lang = 'fr' | 'en';

/** A text in both languages. */
export interface Localized {
  fr: string;
  en: string;
}

/** Rooms used to group the appliance videos. */
export type RoomId = 'cuisine' | 'salon' | 'balcon' | 'pratique';

/**
 * Path of a file in `public/jouider-bay`, relative to the `assetBase` prop
 * (e.g. "videos/four.mp4"). A root-relative path ("/x.jpg") or a full URL is used as is.
 */
export type AssetPath = string;

export interface GuideImage {
  src: AssetPath;
  /** Intrinsic size in pixels, used by next/image to reserve space. */
  width: number;
  height: number;
}

export interface GuideVideo {
  src: AssetPath;
  /** Length in seconds, shown on the cover badge. */
  duration: number;
}

export interface GuideStep extends Localized {
  /** Photos shown under the step; tapping one opens it full screen. */
  photos?: GuideImage[] | undefined;
}

export interface GuideMap {
  image: GuideImage;
  title: Localized;
  /** CSS object-position of the cropped preview card, e.g. "50% 47%". */
  position?: string | undefined;
}

export interface GuideItem {
  /** Unique id. Also the URL hash that opens this video directly, e.g. /guide#four. */
  id: string;
  room: RoomId;
  title: Localized;
  steps: Localized[];
  tips: Localized[];
  video?: GuideVideo | undefined;
  /** 9:16 cover image, also used as the video poster. */
  poster?: GuideImage | undefined;
  /** Optional external link (YouTube…) shown under the steps. */
  link?: string | undefined;
  /** Icon drawn on the cover when there is no poster. */
  icon?: 'lock' | 'box' | undefined;
}

export interface GuideArrival {
  steps: GuideStep[];
  tips: Localized[];
  video?: GuideVideo | undefined;
  poster?: GuideImage | undefined;
  maps: GuideMap[];
}

export interface GuideContent {
  /** Background photo of the hero. */
  hero?: GuideImage | undefined;
  /** Colour logo (footer, light theme). */
  logo?: GuideImage | undefined;
  /** White logo (hero, footer in dark theme). */
  logoWhite?: GuideImage | undefined;
  /** Welcome message shown in the hero. Empty hides it. */
  welcome?: Localized | undefined;
  /** WhatsApp number in international format, e.g. "+32 470 00 00 00". Empty hides the contact card. */
  whatsapp?: string | undefined;
  /** Wi-Fi network and password. Empty hides the Wi-Fi card. */
  wifi?: { name?: string | undefined; password?: string | undefined } | undefined;
  arrival: GuideArrival;
  items: GuideItem[];
  departure: { steps: Localized[] };
}
