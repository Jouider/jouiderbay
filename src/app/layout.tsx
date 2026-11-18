import type { Metadata, Viewport } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

/** Body text — modern, very readable on phones (variable font). */
const sans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

/** Titles — warm display serif with an italic for accent words (variable font). */
const display = Fraunces({
  variable: "--font-display",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jouiderbay.com"),
  title: "Jouider Bay · Location d'appartement pieds dans l'eau à Sidi Rahal",
  description:
    "Jouider Bay — appartement lumineux avec vue sur la piscine, dans une résidence sécurisée avec accès direct à la plage de Sidi Rahal (Maroc). Réservation directe, sans commission.",
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
    title: "Jouider Bay · Sidi Rahal — Vos vacances, les pieds dans l'eau",
    description:
      "Appartement lumineux avec vue sur la piscine, jardins et plage en accès direct à Sidi Rahal. Réservation directe, sans commission.",
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
      className={`${sans.variable} ${display.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
