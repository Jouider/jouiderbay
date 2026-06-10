"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { LanguageProvider, useLang } from "./LanguageContext";
import SceneBackground from "./SceneBackground";
import { LANGS, INSTAGRAM_URL, WHATSAPP_NUMBER } from "@/lib/translations";

export default function ComingSoon() {
  return (
    <LanguageProvider>
      <Page />
    </LanguageProvider>
  );
}

function Page() {
  const { t, lang, setLang } = useLang();

  return (
    <main className="relative flex min-h-[100svh] flex-col overflow-hidden">
      <SceneBackground />

      {/* ---------- Top bar ---------- */}
      <header className="relative z-20 flex items-center justify-between px-5 pt-5 sm:px-10 sm:pt-7">
        <BrandMark />
        <div className="flex gap-1 rounded-full border border-navy/10 bg-cream/60 p-1 backdrop-blur-md">
          {LANGS.map((l) => (
            <button
              key={l.code}
              onClick={() => setLang(l.code)}
              aria-label={l.label}
              className={`min-w-9 rounded-full px-3 py-1 text-sm font-semibold transition-colors ${
                lang === l.code
                  ? "bg-sun text-white shadow"
                  : "text-navy/70 hover:text-navy"
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      </header>

      {/* ---------- Hero ---------- */}
      <section className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 text-center">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-5 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-cream"
        >
          <span className="h-2 w-2 animate-pulse rounded-full bg-sun" />
          {t.badge}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="font-[family-name:var(--font-script)] text-6xl leading-none text-cream drop-shadow-[0_4px_20px_rgba(13,27,56,0.45)] sm:text-8xl"
        >
          {t.brand}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.35 }}
          className="mt-3 text-sm font-semibold uppercase tracking-[0.35em] text-shimmer"
        >
          {t.location}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-6 max-w-2xl font-[family-name:var(--font-display)] text-2xl font-medium text-cream sm:text-4xl"
        >
          {t.tagline}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="mt-4 max-w-xl text-base leading-relaxed text-cream/90 sm:text-lg"
        >
          {t.intro}
        </motion.p>

        <TeaserRotator items={t.teasers} />

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85 }}
          className="mt-9 flex flex-col items-center gap-3 sm:flex-row"
        >
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-sun px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-sun/30 transition-transform hover:scale-[1.04] sm:w-auto"
          >
            <WhatsAppIcon />
            {t.whatsapp}
          </a>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex w-full items-center justify-center gap-2.5 rounded-full glass px-7 py-3.5 text-base font-semibold text-cream transition-transform hover:scale-[1.04] sm:w-auto"
          >
            <InstagramIcon />
            {t.follow}
          </a>
        </motion.div>
      </section>

      {/* ---------- Footer ---------- */}
      <footer className="relative z-10 px-6 pb-6 text-center text-xs tracking-wide text-cream/80">
        <p className="font-[family-name:var(--font-display)] italic">{t.footer}</p>
        <p className="mt-1">
          © {new Date().getFullYear()} Jouider Bay · jouiderbay.com
        </p>
      </footer>
    </main>
  );
}

/* ---------- Brand mark (sun + waves + wordmark) ---------- */
function BrandMark() {
  return (
    <div className="flex items-center gap-2.5">
      <svg width="40" height="40" viewBox="0 0 64 64" fill="none" aria-hidden>
        <circle cx="40" cy="26" r="13" fill="#f2901c" />
        <path d="M6 40 Q18 30 30 40 T58 40" stroke="#16294f" strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M8 49 Q20 40 32 49 T58 49" stroke="#46b4dd" strokeWidth="4" fill="none" strokeLinecap="round" />
      </svg>
      <span className="font-[family-name:var(--font-script)] text-2xl leading-none text-navy sm:text-3xl">
        Jouider&nbsp;Bay
      </span>
    </div>
  );
}

/* ---------- Rotating teaser keywords ---------- */
function TeaserRotator({ items }: { items: string[] }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % items.length), 2200);
    return () => clearInterval(id);
  }, [items.length]);

  return (
    <div className="mt-8 flex h-9 items-center gap-3">
      <span className="h-px w-8 bg-cream/50" />
      <div className="relative flex h-9 min-w-[10rem] items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.span
            key={items[i]}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4 }}
            className="whitespace-nowrap font-[family-name:var(--font-display)] text-lg font-semibold text-sun-soft sm:text-xl"
          >
            {items[i]}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="h-px w-8 bg-cream/50" />
    </div>
  );
}

/* ---------- Icons ---------- */
function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 1.8c2.16 0 4.18.84 5.71 2.37a8.06 8.06 0 0 1 2.37 5.74c0 4.46-3.63 8.09-8.1 8.09a8.1 8.1 0 0 1-4.13-1.13l-.3-.18-3.06.8.82-2.98-.2-.31a8.03 8.03 0 0 1-1.24-4.29c0-4.46 3.63-8.09 8.1-8.09Zm-4.6 4.32c-.16 0-.42.06-.64.3-.22.24-.85.83-.85 2.02s.87 2.34 1 2.5c.12.16 1.7 2.6 4.12 3.64.58.25 1.03.4 1.38.51.58.18 1.1.16 1.52.1.46-.07 1.43-.58 1.63-1.15.2-.56.2-1.05.14-1.15-.06-.1-.22-.16-.46-.28-.24-.12-1.43-.7-1.65-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.43-1.34-1.67-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.47-.4-.4-.54-.41-.14-.01-.3-.01-.46-.01Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" />
    </svg>
  );
}
