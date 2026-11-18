"use client";

import { motion, useScroll, useSpring } from "motion/react";

/** Thin sunset-coloured bar at the very top that fills as the visitor scrolls. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-1 origin-left bg-gradient-to-r from-sun via-[#ff7a2f] to-coral"
    />
  );
}
