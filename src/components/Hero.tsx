"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { HERO_SLUGS, photo } from "@/lib/site-config";
import { useLang } from "./LanguageContext";

const AUTOPLAY_MS = 6000;
const SWIPE_THRESHOLD = 50;

export default function Hero() {
  const { t } = useLang();
  const [index, setIndex] = useState(0);
  // Two independent reasons to stop autoplay: the visitor took control,
  // or the tab is in the background. Neither must clear the other.
  const [userPaused, setUserPaused] = useState(false);
  const [hidden, setHidden] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const count = HERO_SLUGS.length;
  const go = useCallback(
    (delta: number) => setIndex((i) => (i + delta + count) % count),
    [count],
  );

  // Autoplay — pauses on interaction and while the tab is hidden
  useEffect(() => {
    if (userPaused || hidden) return;
    const id = setInterval(() => go(1), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [userPaused, hidden, go]);

  useEffect(() => {
    const onVisibility = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }
  function onTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > SWIPE_THRESHOLD) {
      go(dx < 0 ? 1 : -1);
      setUserPaused(true);
    }
    touchStartX.current = null;
  }

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-navy-deep"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* ---- Slides: all mounted, crossfaded by index (no flash, no DOM growth) ---- */}
      {HERO_SLUGS.map((slug, i) => (
        <motion.div
          key={slug}
          animate={{ opacity: i === index ? 1 : 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
          style={{ opacity: i === 0 ? 1 : 0 }}
          aria-hidden={i !== index}
        >
          {/* Ken Burns drift keeps the still photo feeling alive */}
          <motion.div
            animate={{ scale: i === index ? 1 : 1.12 }}
            transition={{ duration: i === index ? AUTOPLAY_MS / 1000 + 2 : 0.4, ease: "linear" }}
            className="absolute inset-0"
          >
            <Image
              src={photo(slug)}
              alt={i === index ? (t.hero.slides[i] ?? "Jouider Bay") : ""}
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
        </motion.div>
      ))}

      {/* Readability veil */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/35 to-navy-deep/40" />

      {/* ---- Content ---- */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-28 pt-36 sm:px-8 sm:pb-32">
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-xs font-bold uppercase tracking-[0.35em] text-sun-soft sm:text-sm"
        >
          {t.hero.kicker}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25 }}
          className="mt-4 max-w-3xl font-[family-name:var(--font-script)] text-5xl leading-[1.1] text-white sm:text-7xl"
        >
          {t.hero.tagline}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-5 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg"
        >
          {t.hero.sub}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
        >
          <a
            href="#reservation"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-sun px-8 py-4 text-base font-bold text-white shadow-xl shadow-sun/30 transition-transform hover:scale-[1.04]"
          >
            {t.hero.cta}
            <ArrowIcon />
          </a>
          <a
            href="#appartement"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/20"
          >
            {t.hero.scroll}
          </a>
        </motion.div>
      </div>

      {/* ---- Carousel controls ---- */}
      <div className="relative z-20 mx-auto mb-10 flex w-full max-w-6xl items-center justify-between gap-4 px-5 sm:mb-14 sm:px-8">
        <div className="flex items-center gap-2.5">
          {HERO_SLUGS.map((slug, i) => (
            <button
              key={slug}
              onClick={() => {
                setIndex(i);
                setUserPaused(true);
              }}
              aria-label={t.hero.slides[i] ?? `Photo ${i + 1}`}
              aria-current={i === index}
              className="group py-2"
            >
              <span
                className={`block h-1 rounded-full transition-all duration-500 ${
                  i === index ? "w-10 bg-sun" : "w-5 bg-white/45 group-hover:bg-white/70"
                }`}
              />
            </button>
          ))}
          <span className="ml-2 hidden text-xs font-semibold uppercase tracking-[0.2em] text-white/70 sm:block">
            {t.hero.slides[index]}
          </span>
        </div>

        <div className="hidden items-center gap-2 sm:flex">
          <CarouselButton label="Précédent" onClick={() => { go(-1); setUserPaused(true); }}>
            ‹
          </CarouselButton>
          <CarouselButton label="Suivant" onClick={() => { go(1); setUserPaused(true); }}>
            ›
          </CarouselButton>
        </div>
      </div>

      {/* Bottom wave transition into the page */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10">
        <svg viewBox="0 0 1440 70" preserveAspectRatio="none" className="block h-[46px] w-full sm:h-[70px]">
          <path
            d="M0,40 C240,75 480,5 720,40 C960,75 1200,5 1440,40 L1440,70 L0,70 Z"
            fill="var(--color-cream)"
          />
        </svg>
      </div>
    </section>
  );
}

function CarouselButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-white/35 bg-white/10 pb-1 text-2xl text-white backdrop-blur-md transition-colors hover:bg-white/25"
    >
      {children}
    </button>
  );
}

function ArrowIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M5 12h14m0 0-6-6m6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
