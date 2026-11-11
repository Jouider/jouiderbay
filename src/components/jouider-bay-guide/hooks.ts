import { useCallback, useEffect, useSyncExternalStore } from 'react';
import type { Lang } from './types';

/* ------------------------------------------------------------------ language */

const LANG_KEY = 'jb-lang';
const langListeners = new Set<() => void>();

function readLang(fallback: Lang): Lang {
  try {
    const saved = window.localStorage.getItem(LANG_KEY);
    if (saved === 'fr' || saved === 'en') return saved;
  } catch {
    /* storage blocked (private mode): use the browser language */
  }
  const browser = (window.navigator.language || '').toLowerCase();
  if (!browser) return fallback;
  return /^(fr|ar|nl)/.test(browser) ? 'fr' : 'en';
}

function subscribeLang(onChange: () => void) {
  langListeners.add(onChange);
  window.addEventListener('storage', onChange);
  return () => {
    langListeners.delete(onChange);
    window.removeEventListener('storage', onChange);
  };
}

/**
 * Visitor language: the saved choice, otherwise the browser language
 * (French for fr/ar/nl, English for everything else).
 * The server render uses `defaultLang`; the browser value applies right after hydration.
 */
export function useGuideLanguage(defaultLang: Lang): [Lang, (lang: Lang) => void] {
  const lang = useSyncExternalStore(
    subscribeLang,
    () => readLang(defaultLang),
    () => defaultLang,
  );
  const setLang = useCallback((next: Lang) => {
    try {
      window.localStorage.setItem(LANG_KEY, next);
    } catch {
      /* not persisted, still applied below */
    }
    langListeners.forEach((listener) => listener());
  }, []);
  return [lang, setLang];
}

/* ------------------------------------------------------------------ URL hash */

const hashListeners = new Set<() => void>();

function readHash(): string {
  const raw = window.location.hash.slice(1);
  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
}

function subscribeHash(onChange: () => void) {
  hashListeners.add(onChange);
  window.addEventListener('hashchange', onChange);
  window.addEventListener('popstate', onChange);
  return () => {
    hashListeners.delete(onChange);
    window.removeEventListener('hashchange', onChange);
    window.removeEventListener('popstate', onChange);
  };
}

/**
 * The URL hash drives which video is open, so /guide#four opens the oven video
 * and the browser Back button closes it.
 * setHash(id) adds a history entry; setHash(null) removes the hash without one.
 */
export function useLocationHash(): [string, (id: string | null) => void] {
  const hash = useSyncExternalStore(subscribeHash, readHash, () => '');
  const setHash = useCallback((id: string | null) => {
    if (id) {
      if (readHash() !== id) window.location.hash = encodeURIComponent(id);
      return;
    }
    if (!window.location.hash) return;
    window.history.replaceState(window.history.state, '', window.location.pathname + window.location.search);
    hashListeners.forEach((listener) => listener());
  }, []);
  return [hash, setHash];
}

/* ------------------------------------------------------------------ scroll lock */

/** Stops the page behind an overlay from scrolling. */
export function useBodyScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;
    const { body } = document;
    const previous = body.style.overflow;
    body.style.overflow = 'hidden';
    return () => {
      body.style.overflow = previous;
    };
  }, [active]);
}

/** Moves focus into an overlay when it opens and gives it back when it closes. */
export function useFocusOnOpen(target: { current: HTMLElement | null }) {
  useEffect(() => {
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    target.current?.focus({ preventScroll: true });
    return () => previous?.focus({ preventScroll: true });
  }, [target]);
}
