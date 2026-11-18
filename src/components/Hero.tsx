"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { HERO_POSTER, HERO_VIDEO, HERO_VIDEO_PORTRAIT } from "@/lib/site-config";
import Accent from "./Accent";
import { useLang } from "./LanguageContext";

export default function Hero() {
  const { t } = useLang();
  const videoRef = useRef<HTMLVideoElement>(null);
  /** True when the browser refuses autoplay (e.g. iPhone Low Power Mode). */
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Visitors who ask for less motion keep the still poster frame
    // (no source is attached, so nothing is downloaded either).
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.removeAttribute("autoplay");
      video.pause();
      return;
    }

    // Some mobile browsers reject the initial autoplay attempt; retry once
    // the file is buffered so the hero never sits frozen on the poster.
    // If autoplay is refused outright, offer a "play" button instead.
    const tryPlay = () => {
      video.play().catch((err: unknown) => {
        if (err instanceof DOMException && err.name === "NotAllowedError") setBlocked(true);
      });
    };

    // Pick the cut that fits the screen: 9:16 on portrait screens (phones),
    // 16:9 otherwise — and switch again if the device is rotated.
    const portrait = window.matchMedia("(orientation: portrait)");
    const setSource = () => {
      const src = portrait.matches ? HERO_VIDEO_PORTRAIT : HERO_VIDEO;
      if (video.getAttribute("src") !== src) {
        video.src = src;
        tryPlay();
      }
    };

    const onPlaying = () => setBlocked(false);
    setSource();
    portrait.addEventListener("change", setSource);
    video.addEventListener("loadeddata", tryPlay);
    video.addEventListener("playing", onPlaying);
    return () => {
      portrait.removeEventListener("change", setSource);
      video.removeEventListener("loadeddata", tryPlay);
      video.removeEventListener("playing", onPlaying);
    };
  }, []);

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-navy-deep"
    >
      {/* Full-bleed background video — muted + playsInline are required for
          autoplay on iOS and Android. Its source (16:9 or 9:16 cut) is set
          on the client in the effect above, according to the screen. */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
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

      {/* Fallback when the device refuses autoplay */}
      {blocked ? (
        <button
          type="button"
          onClick={() => videoRef.current?.play().catch(() => {})}
          className="absolute right-5 top-24 z-20 inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/15 px-4 py-2 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/25 sm:right-8 sm:top-28"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M8 5.5v13a1 1 0 0 0 1.53.85l10.4-6.5a1 1 0 0 0 0-1.7L9.53 4.65A1 1 0 0 0 8 5.5Z" />
          </svg>
          {t.hero.play}
        </button>
      ) : null}

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
          className="mt-4 max-w-3xl font-[family-name:var(--font-display)] text-[2.6rem] font-semibold leading-[1.05] tracking-tight text-white [text-shadow:0_2px_18px_rgba(8,28,53,0.45)] sm:text-6xl lg:text-7xl"
        >
          <Accent text={t.hero.tagline} className="font-normal italic text-sun-soft" />
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-5 max-w-xl text-base leading-relaxed text-white/90 [text-shadow:0_1px_12px_rgba(8,28,53,0.55)] sm:text-lg"
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
            className="btn-sunset inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-bold text-white shadow-xl shadow-coral/35 transition-transform hover:scale-[1.04]"
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
