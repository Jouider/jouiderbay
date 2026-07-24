"use client";

import { motion } from "motion/react";
import SectionHeading from "./SectionHeading";
import { useLang } from "./LanguageContext";

/* Icon order matches the amenities list order in translations. */
const ICONS = [
  WifiIcon,
  SnowIcon,
  TvIcon,
  WasherIcon,
  KitchenIcon,
  ParkingIcon,
  PoolIcon,
  BeachIcon,
  ShieldIcon,
];

export default function Amenities() {
  const { t } = useLang();

  return (
    <section className="bg-sand">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <SectionHeading kicker={t.amenities.kicker} title={t.amenities.title} />

        <div className="mx-auto mt-10 grid max-w-3xl grid-cols-3 gap-3 sm:mt-12 sm:gap-4">
          {t.amenities.items.map((item, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="flex flex-col items-center gap-2 rounded-2xl border border-navy/10 bg-white/80 px-2 py-4 text-center sm:py-5"
              >
                <span className="text-ocean">
                  <Icon />
                </span>
                <span className="text-xs font-semibold text-navy sm:text-sm">{item}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function WifiIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M2.5 9a14 14 0 0 1 19 0M5.5 12.5a9.5 9.5 0 0 1 13 0M8.5 16a5 5 0 0 1 7 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="12" cy="19.2" r="1.4" fill="currentColor" />
    </svg>
  );
}
function SnowIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 2v20M4 6l16 12M20 6 4 18M12 5.5 9.5 3M12 5.5 14.5 3M12 18.5 9.5 21M12 18.5l2.5 2.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
function TvIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="2.5" y="6" width="19" height="12.5" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 21.5h8M9 2.5l3 3 3-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function WasherIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="4" y="2.5" width="16" height="19" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="13" r="4.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 6h.01M11 6h.01" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}
function KitchenIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M5 2.5v8M8.5 2.5v8M5 6.5h3.5M6.75 10.5v11M15 2.5c-2 2.5-2 6.5 0 9v10M15 2.5c2 2.5 2 6.5 0 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
function ParkingIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="1.8" />
      <path d="M9.5 17V7h4a3 3 0 0 1 0 6h-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function PoolIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M2.5 18q2.4-2.5 4.75 0t4.75 0 4.75 0 4.75 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M9 15V5.5a2 2 0 0 1 4 0V7M9 8h4M9 11.5h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
function BeachIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="17" cy="6" r="2.8" stroke="currentColor" strokeWidth="1.8" />
      <path d="M2.5 19q2.4-2.5 4.75 0t4.75 0 4.75 0 4.75 0M3 14.5q4-4 9-3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
function ShieldIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 2.5 4.5 5.5v6c0 4.5 3 8.5 7.5 10 4.5-1.5 7.5-5.5 7.5-10v-6L12 2.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
