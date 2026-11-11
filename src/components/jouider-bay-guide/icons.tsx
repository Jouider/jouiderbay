/** Inline SVG icons (decorative: hidden from screen readers). */

export function PlayIcon() {
  return (
    <svg viewBox="0 0 12 12" aria-hidden="true">
      <path d="M3 1.8v8.4L10 6z" fill="currentColor" />
    </svg>
  );
}

export function CloseIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

export function CheckIcon() {
  return (
    <svg viewBox="0 0 26 26" aria-hidden="true">
      <circle cx="13" cy="13" r="12" fill="none" stroke="currentColor" strokeWidth="2" />
      <path
        d="M8 13.5l3.4 3.4L18.5 9.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function LockIcon() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <rect x="9" y="21" width="30" height="21" rx="5" fill="currentColor" />
      <path d="M15 21v-6a9 9 0 0 1 18 0v6" stroke="currentColor" strokeWidth="4" fill="none" />
      <circle cx="24" cy="31" r="3" fill="#fff" />
    </svg>
  );
}

export function BoxIcon() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <rect x="8" y="8" width="32" height="32" rx="8" fill="none" stroke="currentColor" strokeWidth="4" />
      <path d="M17 24h14M24 17v14" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

/** Sun-over-waves mark, used only when the content has no logo images. */
export function BrandMark({ className }: { className?: string | undefined }) {
  return (
    <svg className={className} viewBox="0 0 116 76" aria-hidden="true">
      <path d="M30 44a28 28 0 0 1 56 0z" fill="#E9581F" />
      <path
        d="M4 50c12-7 22 7 34 0s22-7 34 0 22 7 40 0"
        stroke="currentColor"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M4 61c12-7 22 7 34 0s22-7 34 0 22 7 40 0"
        stroke="#4FA3DD"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
      />
      <path d="M80 14q4-4 8 0q4-4 8 0" stroke="currentColor" strokeWidth="2.4" fill="none" strokeLinecap="round" />
    </svg>
  );
}
