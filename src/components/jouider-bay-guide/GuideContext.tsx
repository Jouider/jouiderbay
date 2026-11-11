import { createContext, useContext } from 'react';
import type { UiStrings } from './i18n';
import type { Lang, Localized } from './types';

export interface GuideContextValue {
  lang: Lang;
  t: UiStrings;
  /** Resolves a content path against the asset base. */
  asset: (path: string) => string;
  /** Text for the current language. */
  pick: (text: Localized | undefined) => string;
  /** Theme + font classes, applied to overlays rendered in a portal. */
  themeClassName: string;
}

export const GuideContext = createContext<GuideContextValue | null>(null);

export function useGuide(): GuideContextValue {
  const value = useContext(GuideContext);
  if (!value) throw new Error('Jouider Bay guide parts must be rendered inside <JouiderBayGuide>.');
  return value;
}
