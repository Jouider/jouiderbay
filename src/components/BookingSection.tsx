"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { PRICING, WHATSAPP_NUMBER } from "@/lib/site-config";
import {
  formatDate,
  formatPrice,
  isSelectable,
  monthGrid,
  nightsBetween,
  rangeIsFree,
  totalPrice,
} from "@/lib/booking";
import SectionHeading from "./SectionHeading";
import { useLang } from "./LanguageContext";

const DAY_LABELS = {
  fr: ["Lu", "Ma", "Me", "Je", "Ve", "Sa", "Di"],
  en: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
};

export default function BookingSection() {
  const { t, lang } = useLang();
  const [checkIn, setCheckIn] = useState<string | null>(null);
  const [checkOut, setCheckOut] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [guests, setGuests] = useState(2);

  const nights = checkIn && checkOut ? nightsBetween(checkIn, checkOut) : 0;
  const total = checkIn && checkOut ? totalPrice(checkIn, checkOut) : 0;
  const tooShort = nights > 0 && nights < PRICING.minNights;
  const ready = nights >= PRICING.minNights;

  function pickDay(iso: string) {
    if (!checkIn || (checkIn && checkOut)) {
      // start a fresh selection
      setCheckIn(iso);
      setCheckOut(null);
      return;
    }
    if (iso <= checkIn) {
      setCheckIn(iso);
      return;
    }
    // candidate checkout — every night in between must be free
    if (rangeIsFree(checkIn, iso)) {
      setCheckOut(iso);
    } else {
      setCheckIn(iso);
      setCheckOut(null);
    }
  }

  const waText = ready
    ? encodeURIComponent(
        [
          t.booking.waIntro,
          `${t.booking.waFrom}: ${formatDate(checkIn!, lang)}`,
          `${t.booking.waTo}: ${formatDate(checkOut!, lang)} (${t.booking.nights(nights)})`,
          `${t.booking.waGuests}: ${guests}`,
          name.trim() ? `${t.booking.waName}: ${name.trim()}` : null,
          `${t.booking.waTotal}: ${formatPrice(total)}`,
        ]
          .filter(Boolean)
          .join("\n"),
      )
    : "";

  return (
    <section id="reservation" className="scroll-mt-20 bg-cream">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <SectionHeading kicker={t.booking.kicker} title={t.booking.title} intro={t.booking.intro} />

        <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:mt-16 md:grid-cols-[1fr_1.15fr] md:gap-8">
          {/* ---- Left: price + request form ---- */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7 }}
            className="flex flex-col rounded-3xl bg-navy p-6 text-white shadow-[0_24px_60px_-24px_rgba(13,43,78,0.5)] sm:p-8"
          >
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-extrabold tracking-tight text-sun-soft sm:text-[2.6rem]">
                {formatPrice(PRICING.nightly)}
              </span>
              <span className="text-sm text-white/70">{t.booking.perNight}</span>
            </div>
            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
              {t.booking.minStay(PRICING.minNights)}
            </p>

            <div className="mt-6 space-y-3 border-t border-white/15 pt-6 text-sm">
              <div className="flex justify-between">
                <span className="text-white/70">{t.booking.checkIn}</span>
                <span className="font-semibold">{checkIn ? formatDate(checkIn, lang) : "—"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/70">{t.booking.checkOut}</span>
                <span className="font-semibold">{checkOut ? formatDate(checkOut, lang) : "—"}</span>
              </div>
              {ready ? (
                <div className="flex justify-between border-t border-white/15 pt-3 text-base">
                  <span className="text-white/80">
                    {t.booking.total} · {t.booking.nights(nights)}
                  </span>
                  <span className="font-bold text-sun-soft">{formatPrice(total)}</span>
                </div>
              ) : (
                <p className="border-t border-white/15 pt-3 text-white/60">
                  {tooShort ? t.booking.tooShort(PRICING.minNights) : t.booking.selectDates}
                </p>
              )}
            </div>

            <div className="mt-6 space-y-3">
              <label className="block">
                <span className="mb-1 block text-xs font-semibold uppercase tracking-[0.15em] text-white/60">
                  {t.booking.name}
                </span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t.booking.namePlaceholder}
                  className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/40 outline-none transition-colors focus:border-lagoon"
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-xs font-semibold uppercase tracking-[0.15em] text-white/60">
                  {t.booking.guests}
                </span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setGuests((g) => Math.max(1, g - 1))}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-lg font-bold transition-colors hover:bg-white/10"
                    aria-label="-"
                  >
                    −
                  </button>
                  <span className="w-8 text-center text-lg font-bold">{guests}</span>
                  <button
                    type="button"
                    onClick={() => setGuests((g) => Math.min(8, g + 1))}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-lg font-bold transition-colors hover:bg-white/10"
                    aria-label="+"
                  >
                    +
                  </button>
                </div>
              </label>
            </div>

            <a
              href={ready ? `https://wa.me/${WHATSAPP_NUMBER}?text=${waText}` : undefined}
              target="_blank"
              rel="noopener noreferrer"
              aria-disabled={!ready}
              className={`mt-7 inline-flex items-center justify-center gap-2.5 rounded-full px-6 py-4 text-base font-bold transition-transform ${
                ready
                  ? "bg-[#25d366] text-white shadow-lg shadow-[#25d366]/25 hover:scale-[1.03]"
                  : "cursor-not-allowed bg-white/10 text-white/40"
              }`}
            >
              <WhatsAppIcon />
              {t.booking.send}
            </a>
            <p className="mt-3 text-center text-xs text-white/50">{t.booking.hint}</p>
          </motion.div>

          {/* ---- Right: availability calendar ---- */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.12 }}
            className="rounded-3xl border border-navy/10 bg-white p-5 shadow-[0_18px_44px_-20px_rgba(13,43,78,0.25)] sm:p-6"
          >
            <Calendar
              lang={lang}
              checkIn={checkIn}
              checkOut={checkOut}
              onPick={pickDay}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ================= Calendar ================= */

function Calendar({
  lang,
  checkIn,
  checkOut,
  onPick,
}: {
  lang: "fr" | "en";
  checkIn: string | null;
  checkOut: string | null;
  onPick: (iso: string) => void;
}) {
  const now = new Date();
  const [view, setView] = useState({ year: now.getFullYear(), month: now.getMonth() });

  const cells = monthGrid(view.year, view.month);
  const monthName = new Date(view.year, view.month, 1).toLocaleDateString(
    lang === "fr" ? "fr-FR" : "en-GB",
    { month: "long", year: "numeric" },
  );
  const atCurrentMonth = view.year === now.getFullYear() && view.month === now.getMonth();

  function shift(delta: number) {
    setView((v) => {
      const d = new Date(v.year, v.month + delta, 1);
      return { year: d.getFullYear(), month: d.getMonth() };
    });
  }

  function dayClasses(iso: string): string {
    const selectable = isSelectable(iso);
    const isIn = iso === checkIn;
    const isOut = iso === checkOut;
    const inRange = checkIn && checkOut && iso > checkIn && iso < checkOut;

    if (isIn || isOut)
      return "bg-sun text-white font-bold shadow-md shadow-sun/30";
    if (inRange) return "bg-sun/15 text-navy font-semibold";
    if (!selectable) return "text-navy/25 line-through cursor-not-allowed";
    return "text-navy hover:bg-lagoon/15";
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => shift(-1)}
          disabled={atCurrentMonth}
          aria-label="previous month"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-navy/15 text-navy transition-colors hover:bg-navy/5 disabled:opacity-30"
        >
          ‹
        </button>
        <span className="text-sm font-bold capitalize tracking-wide text-navy">{monthName}</span>
        <button
          type="button"
          onClick={() => shift(1)}
          aria-label="next month"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-navy/15 text-navy transition-colors hover:bg-navy/5"
        >
          ›
        </button>
      </div>

      <div className="mt-4 grid grid-cols-7 gap-1 text-center">
        {DAY_LABELS[lang].map((d) => (
          <span key={d} className="pb-1 text-[11px] font-bold uppercase tracking-wide text-navy/40">
            {d}
          </span>
        ))}
        {cells.map((iso, i) =>
          iso === null ? (
            <span key={`pad-${i}`} />
          ) : (
            <button
              key={iso}
              type="button"
              onClick={() => isSelectable(iso) && onPick(iso)}
              className={`aspect-square rounded-xl text-sm transition-colors ${dayClasses(iso)}`}
            >
              {Number(iso.slice(8))}
            </button>
          ),
        )}
      </div>

      <div className="mt-4 flex items-center justify-center gap-5 border-t border-navy/10 pt-4 text-xs text-navy/60">
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-sun" /> {lang === "fr" ? "Sélection" : "Selected"}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full border border-navy/20 bg-white" />{" "}
          {lang === "fr" ? "Disponible" : "Available"}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-navy/15" />{" "}
          {lang === "fr" ? "Indisponible" : "Unavailable"}
        </span>
      </div>
    </div>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 1.8c2.16 0 4.18.84 5.71 2.37a8.06 8.06 0 0 1 2.37 5.74c0 4.46-3.63 8.09-8.1 8.09a8.1 8.1 0 0 1-4.13-1.13l-.3-.18-3.06.8.82-2.98-.2-.31a8.03 8.03 0 0 1-1.24-4.29c0-4.46 3.63-8.09 8.1-8.09Zm-4.6 4.32c-.16 0-.42.06-.64.3-.22.24-.85.83-.85 2.02s.87 2.34 1 2.5c.12.16 1.7 2.6 4.12 3.64.58.25 1.03.4 1.38.51.58.18 1.1.16 1.52.1.46-.07 1.43-.58 1.63-1.15.2-.56.2-1.05.14-1.15-.06-.1-.22-.16-.46-.28-.24-.12-1.43-.7-1.65-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.43-1.34-1.67-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.47-.4-.4-.54-.41-.14-.01-.3-.01-.46-.01Z" />
    </svg>
  );
}
