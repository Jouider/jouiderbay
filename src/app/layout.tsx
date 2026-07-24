import type { Metadata, Viewport } from "next";
import { Montserrat, Great_Vibes } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://jouiderbay.com"),
  title: "Jouider Bay · Location d'appartement pieds dans l'eau à Sidi Rahal",
  description:
    "Jouider Bay — appartement de standing les pieds dans l'eau à Sidi Rahal, Maroc. Piscine, jardins, plage à votre porte. Réservation directe sans commission.",
  keywords: [
    "Jouider Bay",
    "Sidi Rahal",
    "location appartement",
    "bord de mer",
    "pieds dans l'eau",
    "Maroc",
    "location vacances",
  ],
  openGraph: {
    title: "Jouider Bay · Sidi Rahal — Votre échappée belle en bord de mer",
    description:
      "Appartement de standing les pieds dans l'eau : piscine, jardins et plage à votre porte. Réservation directe sans commission.",
    url: "https://jouiderbay.com",
    siteName: "Jouider Bay",
    locale: "fr_MA",
    type: "website",
    images: [{ url: "/photos/hero.jpg", width: 1600, height: 1200 }],
  },
  icons: { icon: "/favicon.ico" },
};

export const viewport: Viewport = {
  themeColor: "#0d2b4e",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fr"
      className={`${sans.variable} ${script.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
