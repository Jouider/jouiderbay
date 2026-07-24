"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { photo } from "@/lib/site-config";
import SectionHeading from "./SectionHeading";
import { useLang } from "./LanguageContext";

export default function Rooms() {
  const { t } = useLang();

  return (
    <section id="appartement" className="scroll-mt-20 bg-cream">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <SectionHeading kicker={t.rooms.kicker} title={t.rooms.title} intro={t.rooms.intro} />

        <div className="mt-12 grid gap-6 sm:mt-16 sm:gap-10 md:grid-cols-2">
          {t.rooms.items.map((room, i) => (
            <motion.figure
              key={room.slug}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: (i % 2) * 0.12 }}
              className={`group ${i % 4 === 0 || i % 4 === 3 ? "md:mt-10" : ""}`}
            >
              <div className="relative h-64 overflow-hidden rounded-3xl shadow-[0_18px_44px_-18px_rgba(13,43,78,0.35)] sm:h-80">
                <Image
                  src={photo(room.slug)}
                  alt={room.name}
                  fill
                  sizes="(min-width: 768px) 46vw, 92vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/55 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-5 right-5 flex flex-wrap items-center gap-2">
                  {room.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <figcaption className="px-1 pt-4">
                <h3 className="font-[family-name:var(--font-script)] text-3xl text-navy">{room.name}</h3>
                <p className="mt-1 text-sm leading-relaxed text-navy/65 sm:text-base">{room.desc}</p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
