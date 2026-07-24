import { BLOCKED_RANGES, PRICING } from "./site-config";

/** All dates are handled as ISO strings YYYY-MM-DD in local time. */

export function toISO(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function fromISO(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function todayISO(): string {
  return toISO(new Date());
}

export function addDays(iso: string, n: number): string {
  const d = fromISO(iso);
  d.setDate(d.getDate() + n);
  return toISO(d);
}

export function nightsBetween(from: string, to: string): number {
  const ms = fromISO(to).getTime() - fromISO(from).getTime();
  return Math.round(ms / 86_400_000);
}

/** A date is blocked if it falls inside any [from, to) blocked range. */
export function isBlocked(iso: string): boolean {
  return BLOCKED_RANGES.some((r) => iso >= r.from && iso < r.to);
}

export function isPast(iso: string): boolean {
  return iso < todayISO();
}

export function isSelectable(iso: string): boolean {
  return !isPast(iso) && !isBlocked(iso);
}

/** Every night in [from, to) must be free for the stay to be valid. */
export function rangeIsFree(from: string, to: string): boolean {
  for (let d = from; d < to; d = addDays(d, 1)) {
    if (!isSelectable(d)) return false;
  }
  return true;
}

export function totalPrice(from: string, to: string): number {
  return nightsBetween(from, to) * PRICING.nightly;
}

export function formatPrice(amount: number): string {
  return `${amount.toLocaleString("fr-MA")} ${PRICING.currency}`;
}

/** Human-friendly date for the WhatsApp message, e.g. "12/08/2026". */
export function formatDate(iso: string, lang: "fr" | "en"): string {
  return fromISO(iso).toLocaleDateString(lang === "fr" ? "fr-FR" : "en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

/** Month grid helper: all cells (possibly null padding) for a given month. */
export function monthGrid(year: number, month: number): (string | null)[] {
  const first = new Date(year, month, 1);
  // Monday-first offset (getDay: 0=Sun..6=Sat → 0=Mon..6=Sun)
  const offset = (first.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (string | null)[] = Array(offset).fill(null);
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push(toISO(new Date(year, month, d)));
  }
  return cells;
}
