"use client";

/**
 * Full-bleed animated beach scene built behind the content.
 * Layers (back -> front): sky gradient, glowing sun, drifting clouds,
 * flying birds, layered scrolling sea waves, floating light particles.
 * Pure CSS animation so it stays light on mobile.
 */
export default function SceneBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Sky: warm sand at top fading to lagoon near the sea */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#fdf6e9_0%,#fbe9cf_28%,#f7d9a6_46%,#7cc4dd_70%,#1e7ba8_100%)]" />

      {/* Sun */}
      <div className="sun-glow absolute left-1/2 top-[8%] -translate-x-1/2 sm:top-[12%]">
        <div className="h-24 w-24 rounded-full bg-[radial-gradient(circle_at_50%_45%,#ffd27a_0%,#f7a948_45%,#f2901c_75%)] sm:h-40 sm:w-40" />
      </div>

      {/* soft sun halo */}
      <div className="absolute left-1/2 top-[8%] -translate-x-1/2 sm:top-[12%]">
        <div className="h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(247,169,72,0.32)_0%,transparent_65%)] sm:h-[26rem] sm:w-[26rem]" />
      </div>

      {/* Birds */}
      {[
        { top: "16%", delay: "0s", dur: "26s", scale: 1 },
        { top: "22%", delay: "6s", dur: "32s", scale: 0.8 },
        { top: "12%", delay: "13s", dur: "29s", scale: 0.65 },
      ].map((b, i) => (
        <svg
          key={i}
          className="absolute left-0 text-navy/70"
          style={{
            top: b.top,
            animation: `fly ${b.dur} linear ${b.delay} infinite`,
            transform: `scale(${b.scale})`,
          }}
          width="46"
          height="20"
          viewBox="0 0 46 20"
          fill="none"
        >
          <path d="M2 14 Q11 2 21 12" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M21 12 Q31 2 44 13" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        </svg>
      ))}

      {/* Clouds */}
      <div
        className="absolute left-[10%] top-[30%] h-10 w-32 rounded-full bg-white/55 blur-md"
        style={{ animation: "drift 18s ease-in-out infinite" }}
      />
      <div
        className="absolute right-[12%] top-[24%] h-8 w-24 rounded-full bg-white/45 blur-md"
        style={{ animation: "drift 24s ease-in-out 3s infinite" }}
      />

      {/* Sea waves — three layered scrolling bands */}
      <div className="absolute inset-x-0 bottom-0 h-[42%]">
        <WaveBand color="#46b4dd" opacity={0.55} height={140} dur="14s" bottom={60} />
        <WaveBand color="#1e7ba8" opacity={0.8} height={150} dur="11s" bottom={26} />
        <WaveBand color="#16294f" opacity={0.95} height={160} dur="8s" bottom={-6} />
      </div>

      {/* Floating light particles */}
      {Array.from({ length: 14 }).map((_, i) => {
        const left = (i * 67) % 100;
        const size = 3 + ((i * 7) % 6);
        const dur = 6 + ((i * 5) % 9);
        const delay = (i % 7) * 1.3;
        return (
          <span
            key={i}
            className="absolute rounded-full bg-white/70"
            style={{
              left: `${left}%`,
              bottom: `${8 + ((i * 13) % 40)}%`,
              width: size,
              height: size,
              animation: `float ${dur}s ease-in-out ${delay}s infinite`,
            }}
          />
        );
      })}
    </div>
  );
}

function WaveBand({
  color,
  opacity,
  height,
  dur,
  bottom,
}: {
  color: string;
  opacity: number;
  height: number;
  dur: string;
  bottom: number;
}) {
  return (
    <div
      className="absolute inset-x-0"
      style={{ bottom, height, opacity }}
    >
      <svg
        className="h-full w-[200%]"
        viewBox="0 0 2880 160"
        preserveAspectRatio="none"
        style={{ animation: `wave-x ${dur} linear infinite` }}
      >
        <path
          fill={color}
          d="M0,64 C240,128 480,0 720,64 C960,128 1200,0 1440,64 C1680,128 1920,0 2160,64 C2400,128 2640,0 2880,64 L2880,160 L0,160 Z"
        />
      </svg>
    </div>
  );
}
