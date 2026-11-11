import { Lora, Poppins } from 'next/font/google';

/** Display serif (italic titles). Exposed to the CSS as --jb-font-display. */
export const displayFont = Lora({
  subsets: ['latin'],
  weight: ['500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--jb-font-display',
});

/** Interface sans-serif. Exposed to the CSS as --jb-font-ui. */
export const uiFont = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--jb-font-ui',
});
