import type { Metadata, Viewport } from "next";
import { Playfair_Display, Montserrat, Great_Vibes, Tajawal } from "next/font/google";
import "./globals.css";

const display = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const sans = Montserrat({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const script = Great_Vibes({
  variable: "--font-script",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const arabic = Tajawal({
  variable: "--font-arabic",
  weight: ["400", "500", "700"],
  subsets: ["arabic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jouiderbay.com"),
  title: "Jouider Bay · Sidi Rahal — Bientôt disponible",
  description:
    "Jouider Bay — appartement de luxe les pieds dans l'eau à Sidi Rahal, Maroc. Piscine, verdure et plage. Réservation directe bientôt disponible.",
  keywords: ["Jouider Bay", "Sidi Rahal", "location appartement", "bord de mer", "Maroc", "luxe"],
  openGraph: {
    title: "Jouider Bay · Sidi Rahal — Bientôt disponible",
    description:
      "Appartement de luxe les pieds dans l'eau à Sidi Rahal. Piscine, verdure et plage. Réservation directe bientôt.",
    url: "https://jouiderbay.com",
    siteName: "Jouider Bay",
    locale: "fr_MA",
    type: "website",
  },
  icons: { icon: "/favicon.ico" },
};

export const viewport: Viewport = {
  themeColor: "#16294f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fr"
      className={`${display.variable} ${sans.variable} ${script.variable} ${arabic.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
