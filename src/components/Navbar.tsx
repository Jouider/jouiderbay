"use client";

import { useEffect, useState } from "react";
import { LANGS } from "@/lib/translations";
import { useLang } from "./LanguageContext";

export default function Navbar() {
  const { t, lang, setLang } = useLang();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const next = LANGS[(LANGS.findIndex((l) => l.code === lang) + 1) % LANGS.length];

  const links = [
    { href: "#appartement", label: t.nav.rooms },
    { href: "#residence", label: t.nav.residence },
    { href: "#reservation", label: t.nav.rates },
    { href: "#contact", label: t.nav.contact },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-cream/90 shadow-[0_1px_20px_rgba(13,43,78,0.10)] backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:h-20 sm:px-8">
        <a href="#top" className="flex items-center gap-2" aria-label="Jouider Bay — accueil">
          <BrandIcon className="h-8 w-8 sm:h-9 sm:w-9" />
          <span
            className={`font-[family-name:var(--font-script)] text-2xl leading-none sm:text-[1.7rem] ${
              scrolled ? "text-navy" : "text-white drop-shadow-[0_1px_8px_rgba(8,28,53,0.6)]"
            }`}
          >
            Jouider&nbsp;Bay
          </span>
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`text-sm font-semibold tracking-wide transition-colors ${
                scrolled
                  ? "text-navy/75 hover:text-navy"
                  : "text-white/85 hover:text-white drop-shadow-[0_1px_6px_rgba(8,28,53,0.5)]"
              }`}
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setLang(next.code)}
            aria-label={`Switch language to ${next.label}`}
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold backdrop-blur-md transition-colors ${
              scrolled
                ? "border border-navy/15 bg-white/70 text-navy hover:bg-white"
                : "border border-white/30 bg-white/15 text-white hover:bg-white/25"
            }`}
          >
            <GlobeIcon />
            {LANGS.find((l) => l.code === lang)?.label}
          </button>
          <a
            href="#reservation"
            className="hidden rounded-full bg-sun px-5 py-2 text-sm font-bold text-white shadow-lg shadow-sun/30 transition-transform hover:scale-[1.05] sm:inline-flex"
          >
            {t.nav.book}
          </a>
        </div>
      </nav>
    </header>
  );
}

export function BrandIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden className={className}>
      <circle cx="40" cy="24" r="12" fill="#ff8a00" />
      <path d="M6 38 Q18 28 30 38 T58 38" stroke="#0d2b4e" strokeWidth="4.5" fill="none" strokeLinecap="round" />
      <path d="M8 48 Q20 39 32 48 T58 48" stroke="#4ac0d6" strokeWidth="4.5" fill="none" strokeLinecap="round" />
      <path d="M14 16 q4 -5 8 0 M24 12 q3.5 -4.5 7 0" stroke="#0d2b4e" strokeWidth="2.4" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" />
      <path d="M3 12h18M12 3c2.5 2.6 2.5 15.4 0 18M12 3c-2.5 2.6-2.5 15.4 0 18" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}
