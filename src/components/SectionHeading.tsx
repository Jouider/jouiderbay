"use client";

import { motion } from "motion/react";
import Accent from "./Accent";

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
      <p className={`text-xs font-bold uppercase tracking-[0.3em] ${light ? "text-sun-soft" : "text-sunset"}`}>
        {kicker}
      </p>
      <h2
        className={`mt-3 font-[family-name:var(--font-display)] text-[2rem] font-semibold leading-[1.1] tracking-tight sm:text-5xl ${
          light ? "text-white" : "text-navy"
        }`}
      >
        <Accent text={title} className={`font-normal italic ${light ? "text-sun-soft" : "text-coral"}`} />
      </h2>
      {/* Little animated wave under the title */}
      <svg viewBox="0 0 120 14" className="mx-auto mt-3 h-3.5 w-28" fill="none" aria-hidden>
        <motion.path
          d="M2 7 Q17 -1 32 7 T62 7 T92 7 T118 7"
          stroke={light ? "var(--color-lagoon)" : "var(--color-sun)"}
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, delay: 0.3, ease: "easeInOut" }}
        />
      </svg>
      {intro ? (
        <p className={`mt-4 text-base leading-relaxed sm:text-lg ${light ? "text-white/80" : "text-navy/70"}`}>
          {intro}
        </p>
      ) : null}
    </motion.div>
  );
}
