import { Fraunces, Plus_Jakarta_Sans } from 'next/font/google';

/**
 * Same type pairing as the rest of the site (see app/layout.tsx).
 * Display serif (italic titles). Exposed to the CSS as --jb-font-display.
 */
export const displayFont = Fraunces({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--jb-font-display',
});

/** Interface sans-serif. Exposed to the CSS as --jb-font-ui. */
export const uiFont = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--jb-font-ui',
});
