"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { GOOGLE_MAPS_URL, photo } from "@/lib/site-config";
import SectionHeading from "./SectionHeading";
import { useLang } from "./LanguageContext";

export default function Location() {
  const { t } = useLang();

  return (
    <section className="bg-sand">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <SectionHeading kicker={t.location.kicker} title={t.location.title} intro={t.location.intro} />

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="relative mx-auto mt-12 max-w-4xl overflow-hidden rounded-3xl shadow-[0_24px_60px_-24px_rgba(13,43,78,0.4)] sm:mt-16"
        >
          <div className="relative h-64 sm:h-96">
            <Image
              src={photo("plage")}
              alt={t.location.address}
              fill
              sizes="(min-width: 896px) 896px, 92vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 via-navy-deep/20 to-transparent" />
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8">
            <p className="text-sm font-semibold text-white/90 sm:text-base">{t.location.address}</p>
            <div className="mt-4 flex flex-wrap items-center gap-2.5">
              {t.location.distances.map((d) => (
                <span
                  key={d.label}
                  className="rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold text-white backdrop-blur-md sm:text-sm"
                >
                  {d.label} · <span className="text-sun-soft">{d.value}</span>
                </span>
              ))}
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-sun px-4 py-1.5 text-xs font-bold text-white shadow-lg shadow-sun/30 transition-transform hover:scale-[1.04] sm:text-sm"
              >
                <PinIcon />
                {t.location.maps}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function PinIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 21s-7-5.5-7-11a7 7 0 1 1 14 0c0 5.5-7 11-7 11Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
