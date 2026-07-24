"use client";

import { motion } from "motion/react";
import { useLang } from "./LanguageContext";

const ICONS = [WaveIcon, SunIcon, HeartIcon, LeafIcon];

export default function Values() {
  const { t } = useLang();

  return (
    <section className="bg-cream">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-4 gap-y-8 px-5 py-14 sm:px-8 sm:py-16 md:grid-cols-4">
        {t.values.map((v, i) => {
          const Icon = ICONS[i % ICONS.length];
          return (
            <motion.div
              key={v.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="flex flex-col items-center text-center"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-lagoon/15 text-ocean">
                <Icon />
              </span>
              <h3 className="mt-3 text-sm font-bold uppercase tracking-[0.18em] text-navy">{v.name}</h3>
              <p className="mt-1 text-sm text-navy/60">{v.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

function WaveIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M2 12q2.5-3 5 0t5 0 5 0 5 0M2 17q2.5-3 5 0t5 0 5 0 5 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
function SunIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
function HeartIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 20.5C7 16.5 3 13 3 9a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 4-4 7.5-9 11.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}
function LeafIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M5 19C5 9 11 4 20 4c0 9-5 15-15 15Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M5 19c3-5 7-9 11-11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
