import type { Lang, Localized } from './types';

/** URL hash of the arrival video (e.g. /guide#arrivee). */
export const ARRIVAL_ID = 'arrivee';

/** Section anchors: /guide#bienvenue, /guide#appartement, /guide#depart. */
export const SECTION_IDS = ['bienvenue', 'appartement', 'depart'] as const;
export type SectionId = (typeof SECTION_IDS)[number];

export function isSectionId(id: string): id is SectionId {
  return (SECTION_IDS as readonly string[]).includes(id);
}

/** 83 → "1:23" */
export function formatDuration(seconds: number): string {
  const s = Math.max(0, Math.round(seconds || 0));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}

/** Joins a content path to the asset base; absolute paths, URLs and data: URIs are returned unchanged. */
export function resolveAsset(base: string, path: string): string {
  if (!path || /^(?:[a-z][a-z0-9+.-]*:|\/)/i.test(path)) return path;
  return `${base.replace(/\/+$/, '')}/${path.replace(/^(?:\.\/)+/, '')}`;
}

/** Text in the requested language, falling back to French, then English. */
export function pickText(text: Localized | undefined, lang: Lang): string {
  if (!text) return '';
  return text[lang] || text.fr || text.en || '';
}

export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ');
}
