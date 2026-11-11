import type { Metadata, Viewport } from "next";
import { JouiderBayGuide } from "@/components/jouider-bay-guide";

export const metadata: Metadata = {
  title: "Jouider Bay · Guide de la maison",
  description:
    "Arrivée, vidéos de chaque équipement et départ : le guide de séjour de l'appartement Jouider Bay à Sidi Rahal.",
  // Guest-only page, opened from the QR/NFC plaque in the apartment.
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  // Full screen on phones with a notch (the guide pads itself with the safe areas).
  viewportFit: "cover",
  themeColor: "#0F1B33",
};

export default function GuidePage() {
  return <JouiderBayGuide />;
}
