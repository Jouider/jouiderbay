"use client";

import { LanguageProvider } from "./LanguageContext";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Values from "./Values";
import Rooms from "./Rooms";
import Residence from "./Residence";
import Amenities from "./Amenities";
import BookingSection from "./BookingSection";
import Location from "./Location";
import Footer from "./Footer";
import { WHATSAPP_NUMBER } from "@/lib/site-config";

export default function HomePage() {
  return (
    <LanguageProvider>
      <Navbar />
      <main>
        <Hero />
        <Values />
        <Rooms />
        <Residence />
        <Amenities />
        <BookingSection />
        <Location />
      </main>
      <Footer />

      {/* Floating WhatsApp button — always one tap away on mobile */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-xl shadow-[#25d366]/35 transition-transform hover:scale-110"
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 1.8c2.16 0 4.18.84 5.71 2.37a8.06 8.06 0 0 1 2.37 5.74c0 4.46-3.63 8.09-8.1 8.09a8.1 8.1 0 0 1-4.13-1.13l-.3-.18-3.06.8.82-2.98-.2-.31a8.03 8.03 0 0 1-1.24-4.29c0-4.46 3.63-8.09 8.1-8.09Zm-4.6 4.32c-.16 0-.42.06-.64.3-.22.24-.85.83-.85 2.02s.87 2.34 1 2.5c.12.16 1.7 2.6 4.12 3.64.58.25 1.03.4 1.38.51.58.18 1.1.16 1.52.1.46-.07 1.43-.58 1.63-1.15.2-.56.2-1.05.14-1.15-.06-.1-.22-.16-.46-.28-.24-.12-1.43-.7-1.65-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.43-1.34-1.67-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.47-.4-.4-.54-.41-.14-.01-.3-.01-.46-.01Z" />
        </svg>
      </a>
    </LanguageProvider>
  );
}
