"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { GALLERY_SLUGS, photo } from "@/lib/site-config";
import Accent from "./Accent";
import { useLang } from "./LanguageContext";

/** Two 3×3 mosaics: one 2×2 feature tile + five square tiles each.
 *  The second block mirrors the first (feature tile on the right). */
const SPANS = [
  "col-span-2 row-span-2",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
  "col-span-2 row-span-2",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
];

export default function Gallery() {
  const { t } = useLang();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-sand to-sand-warm py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mb-10 flex flex-wrap items-end justify-between gap-4"
        >
          <div>
            <p className="text-sunset text-xs font-bold uppercase tracking-[0.3em]">
              {t.gallery.kicker}
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-[2rem] font-semibold leading-[1.1] tracking-tight text-navy sm:text-5xl">
              <Accent text={t.gallery.title} className="font-normal italic text-coral" />
            </h2>
          </div>
          <a
            href="#appartement"
            className="inline-flex items-center gap-2 rounded-full border border-navy/25 px-5 py-2.5 text-sm font-semibold text-navy transition-colors hover:bg-navy/5"
          >
            {t.gallery.cta} →
          </a>
        </motion.div>

        <div className="grid grid-flow-row-dense auto-rows-[130px] grid-cols-3 gap-2.5 sm:auto-rows-[190px] sm:gap-4">
          {GALLERY_SLUGS.map((slug, i) => (
            <motion.div
              key={slug}
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: (i % 6) * 0.07 }}
              whileHover={{ rotate: i % 2 === 0 ? -1.2 : 1.2, transition: { duration: 0.3 } }}
              className={`group relative overflow-hidden rounded-2xl shadow-md transition-shadow duration-500 hover:z-10 hover:shadow-2xl hover:shadow-coral/25 ${SPANS[i % SPANS.length]}`}
            >
              <Image
                src={photo(slug)}
                alt=""
                fill
                sizes="(min-width: 640px) 33vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-navy-deep/10 transition-colors group-hover:bg-navy-deep/0" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
