"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { HERO_POSTER, HERO_VIDEO } from "@/lib/site-config";
import { useLang } from "./LanguageContext";

export default function Hero() {
  const { t } = useLang();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Visitors who ask for less motion keep the still poster frame.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.removeAttribute("autoplay");
      video.pause();
      return;
    }

    // Some mobile browsers reject the initial autoplay attempt; retry once
    // the file is buffered so the hero never sits frozen on the poster.
    const tryPlay = () => {
      video.play().catch(() => {});
    };
    tryPlay();
    video.addEventListener("loadeddata", tryPlay);
    return () => video.removeEventListener("loadeddata", tryPlay);
  }, []);

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-navy-deep"
    >
      {/* Full-bleed background video — muted + playsInline are required for
          autoplay on iOS and Android. */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src={HERO_VIDEO}
        poster={HERO_POSTER}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden
        tabIndex={-1}
      />

      {/* Readability veil */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/40 to-navy-deep/45" />

      {/* ---- Content ---- */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-24 pt-36 sm:px-8 sm:pb-28">
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

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="relative z-10 mx-auto mb-8 flex w-full max-w-6xl justify-center px-5 sm:mb-10"
      >
        <span className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-white/40 p-1.5">
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="block h-1.5 w-1 rounded-full bg-white/70"
          />
        </span>
      </motion.div>

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

function ArrowIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M5 12h14m0 0-6-6m6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
