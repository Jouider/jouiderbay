"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { photo } from "@/lib/site-config";
import SectionHeading from "./SectionHeading";
import { useLang } from "./LanguageContext";

export default function Residence() {
  const { t } = useLang();

  return (
    <section id="residence" className="scroll-mt-20 relative overflow-hidden bg-navy">
      {/* subtle wave texture */}
      <svg
        className="pointer-events-none absolute -top-6 left-0 w-[140%] text-lagoon/10"
        viewBox="0 0 1440 200"
        fill="none"
        aria-hidden
      >
        <path d="M0,80 C240,160 480,0 720,80 C960,160 1200,0 1440,80" stroke="currentColor" strokeWidth="40" />
      </svg>

      <div className="relative mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <SectionHeading
          light
          kicker={t.residence.kicker}
          title={t.residence.title}
          intro={t.residence.intro}
        />

        {/* Mobile: swipeable strip · Desktop: 4-col grid */}
        <div className="mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [scrollbar-width:none] sm:mt-16 md:grid md:grid-cols-4 md:overflow-visible md:pb-0">
          {t.residence.items.map((item, i) => (
            <motion.figure
              key={item.slug}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, delay: i * 0.1 }}
              className="w-[76%] shrink-0 snap-center sm:w-[46%] md:w-auto"
            >
              <div className="relative h-80 overflow-hidden rounded-3xl sm:h-96">
                <Image
                  src={photo(item.slug)}
                  alt={item.name}
                  fill
                  sizes="(min-width: 768px) 24vw, 76vw"
                  className="object-cover transition-transform duration-700 hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/70 via-transparent to-transparent" />
                <figcaption className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="font-[family-name:var(--font-script)] text-2xl text-white">{item.name}</h3>
                  <p className="mt-0.5 text-sm text-white/75">{item.desc}</p>
                </figcaption>
              </div>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
