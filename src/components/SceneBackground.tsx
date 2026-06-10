"use client";

/**
 * Light, airy beach scene. The page is mostly WHITE/cream so navy content
 * stays perfectly readable; the sun sits softly at the top and the colored
 * sea waves live at the very bottom as a decorative band.
 */
export default function SceneBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Mostly white background with a faint warm sand wash */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#ffffff_0%,#fffdf8_42%,#fdf4e6_72%,#f7ecd8_100%)]" />

      {/* Soft sun halo, top — subtle so it never fights the text */}
      <div className="absolute left-1/2 top-[-6%] -translate-x-1/2 sm:top-[-8%]">
        <div className="h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(247,169,72,0.28)_0%,rgba(247,169,72,0.10)_45%,transparent_70%)] sm:h-[34rem] sm:w-[34rem]" />
      </div>
      <div className="sun-glow absolute left-1/2 top-[8%] -translate-x-1/2 sm:top-[5%]">
        <div className="h-14 w-14 rounded-full bg-[radial-gradient(circle_at_50%_45%,#ffd27a_0%,#f7a948_50%,#f2901c_80%)] opacity-90 sm:h-24 sm:w-24" />
      </div>

      {/* Birds */}
      {[
        { top: "10%", delay: "0s", dur: "30s", scale: 0.9 },
        { top: "16%", delay: "9s", dur: "34s", scale: 0.65 },
      ].map((b, i) => (
        <svg
          key={i}
          className="absolute left-0 text-navy/40"
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

      {/* Sea waves — decorative band pinned to the very bottom */}
      <div className="absolute inset-x-0 bottom-0 h-[34%] sm:h-[30%]">
        <WaveBand color="#cdeaf6" opacity={0.9} height={150} dur="16s" bottom={92} />
        <WaveBand color="#46b4dd" opacity={0.85} height={150} dur="13s" bottom={56} />
        <WaveBand color="#1e7ba8" opacity={0.92} height={155} dur="10s" bottom={24} />
        <WaveBand color="#16294f" opacity={1} height={160} dur="8s" bottom={-8} />
      </div>

      {/* A few floating light particles over the sea */}
      {Array.from({ length: 8 }).map((_, i) => {
        const left = (i * 71) % 100;
        const size = 3 + ((i * 7) % 5);
        const dur = 6 + ((i * 5) % 8);
        const delay = (i % 6) * 1.2;
        return (
          <span
            key={i}
            className="absolute rounded-full bg-white/70"
            style={{
              left: `${left}%`,
              bottom: `${4 + ((i * 11) % 22)}%`,
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
    <div className="absolute inset-x-0" style={{ bottom, height, opacity }}>
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
