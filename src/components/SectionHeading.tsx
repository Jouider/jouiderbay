"use client";

import { motion } from "motion/react";

export default function SectionHeading({
  kicker,
  title,
  intro,
  light = false,
}: {
  kicker: string;
  title: string;
  intro?: string;
  light?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7 }}
      className="mx-auto max-w-2xl text-center"
    >
      <p className={`text-xs font-bold uppercase tracking-[0.3em] ${light ? "text-sun-soft" : "text-sun"}`}>
        {kicker}
      </p>
      <h2
        className={`mt-3 font-[family-name:var(--font-script)] text-4xl leading-tight sm:text-5xl ${
          light ? "text-white" : "text-navy"
        }`}
      >
        {title}
      </h2>
      {intro ? (
        <p className={`mt-4 text-base leading-relaxed sm:text-lg ${light ? "text-white/80" : "text-navy/70"}`}>
          {intro}
        </p>
      ) : null}
    </motion.div>
  );
}
