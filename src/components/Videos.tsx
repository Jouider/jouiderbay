"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import {
  INSTAGRAM_REELS,
  INSTAGRAM_URL,
  VIDEO_CLIP_SLUGS,
  photo,
  video,
} from "@/lib/site-config";
import SectionHeading from "./SectionHeading";
import { useLang } from "./LanguageContext";

/** Shared card size: vertical 9:16, like a phone screen.
 *  326px is the minimum width Instagram recommends for its embeds. */
const CARD = "relative aspect-[9/16] w-[80vw] max-w-[326px] shrink-0 snap-center overflow-hidden rounded-3xl sm:w-[326px]";

export default function Videos() {
  const { t } = useLang();
  const stripRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 1 | -1) => {
    const el = stripRef.current;
    if (el) el.scrollBy({ left: dir * 300, behavior: "smooth" });
  };

  return (
    <section id="videos" className="scroll-mt-20 relative overflow-hidden bg-cream py-16 sm:py-24">
      {/* warm glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-coral/15 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading kicker={t.videos.kicker} title={t.videos.title} intro={t.videos.intro} />

        <div className="mt-10 flex items-center justify-between gap-4 sm:mt-12">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-navy/20 px-5 py-2.5 text-sm font-semibold text-navy transition-colors hover:bg-navy/5"
          >
            <InstagramIcon />
            {t.videos.follow}
          </a>
          <div className="hidden gap-2 sm:flex">
            <ArrowButton label={t.videos.prev} onClick={() => scroll(-1)} flip />
            <ArrowButton label={t.videos.next} onClick={() => scroll(1)} />
          </div>
        </div>
      </div>

      {/* Swipeable strip — full width so cards can peek past the edges */}
      <div
        ref={stripRef}
        className="relative mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] sm:gap-5 sm:px-8 lg:px-[max(2rem,calc((100vw-72rem)/2+2rem))]"
      >
        {VIDEO_CLIP_SLUGS.map((slug, i) => (
          <Clip key={slug} slug={slug} label={t.videos.clips[i] ?? ""} index={i} />
        ))}
        {INSTAGRAM_REELS.map((id, i) => (
          <Reel key={id} id={id} index={i + VIDEO_CLIP_SLUGS.length} />
        ))}
      </div>
    </section>
  );
}

/** Our own muted slow-motion loop — plays only while visible.
 *  If the device refuses autoplay (e.g. iPhone Low Power Mode) a play button
 *  appears; visitors who prefer reduced motion get the native controls instead. */
function Clip({ slug, label, index }: { slug: string; label: string; index: number }) {
  const { t } = useLang();
  const ref = useRef<HTMLVideoElement>(null);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.controls = true;
      return;
    }
    const onPlaying = () => setBlocked(false);
    el.addEventListener("playing", onPlaying);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().catch((err: unknown) => {
            if (err instanceof DOMException && err.name === "NotAllowedError") setBlocked(true);
          });
        } else el.pause();
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      el.removeEventListener("playing", onPlaying);
    };
  }, []);

  return (
    <motion.figure
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: Math.min(index, 4) * 0.08 }}
      className={`${CARD} shadow-[0_18px_44px_-18px_rgba(13,43,78,0.45)]`}
    >
      <video
        ref={ref}
        className="absolute inset-0 h-full w-full object-cover"
        src={video(slug)}
        poster={photo(slug)}
        muted
        loop
        playsInline
        preload="none"
        aria-label={label}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-deep/70 via-transparent to-transparent" />
      <figcaption className="pointer-events-none absolute bottom-0 left-0 right-0 p-5 font-[family-name:var(--font-display)] text-xl font-semibold leading-snug tracking-tight text-white">
        {label}
      </figcaption>
      {blocked ? (
        <button
          type="button"
          onClick={() => ref.current?.play().catch(() => {})}
          aria-label={`${t.videos.play} — ${label}`}
          className="absolute inset-0 z-10 flex items-center justify-center"
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/25 text-white backdrop-blur-md transition-transform duration-300 hover:scale-110">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M8 5.5v13a1 1 0 0 0 1.53.85l10.4-6.5a1 1 0 0 0 0-1.7L9.53 4.65A1 1 0 0 0 8 5.5Z" />
            </svg>
          </span>
        </button>
      ) : null}
    </motion.figure>
  );
}

/** Instagram reel — official embed, loaded only after the visitor taps. */
function Reel({ id, index }: { id: string; index: number }) {
  const { t } = useLang();
  const [loaded, setLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: Math.min(index, 4) * 0.08 }}
      className={`${CARD} bg-white shadow-[0_18px_44px_-18px_rgba(13,43,78,0.45)]`}
    >
      {loaded ? (
        <iframe
          src={`https://www.instagram.com/reel/${id}/embed/`}
          title={`${t.videos.reel} ${index - VIDEO_CLIP_SLUGS.length + 1}`}
          className="absolute inset-0 h-full w-full border-0"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setLoaded(true)}
          className="group absolute inset-0 flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-sun via-[#ff7a2f] to-coral p-6 text-center text-white"
        >
          <span className="absolute left-5 top-5 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-white/90">
            <InstagramIcon />
            {t.videos.reel}
          </span>
          <Image
            src="/logo-light.png"
            alt="Jouider Bay"
            width={150}
            height={40}
            className="h-10 w-auto opacity-95"
          />
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/25 backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M8 5.5v13a1 1 0 0 0 1.53.85l10.4-6.5a1 1 0 0 0 0-1.7L9.53 4.65A1 1 0 0 0 8 5.5Z" />
            </svg>
          </span>
          <span className="text-base font-bold">{t.videos.play}</span>
          <span className="absolute bottom-5 left-5 right-5 text-[11px] text-white/80">{t.videos.notice}</span>
        </button>
      )}
    </motion.div>
  );
}

function ArrowButton({ label, onClick, flip }: { label: string; onClick: () => void; flip?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-navy/20 text-navy transition-colors hover:bg-navy/5"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden className={flip ? "rotate-180" : ""}>
        <path d="M5 12h14m0 0-6-6m6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" />
    </svg>
  );
}
