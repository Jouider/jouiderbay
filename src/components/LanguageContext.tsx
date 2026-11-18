"use client";

import { createContext, useContext, useEffect, useSyncExternalStore } from "react";
import { translations, type Dict, type Lang } from "@/lib/translations";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Dict;
};

const LanguageContext = createContext<Ctx | null>(null);

/* ---------- Language store ----------
 * The chosen language is remembered in localStorage ("jb-lang"). It is read
 * through useSyncExternalStore: the server (and the first client render, for
 * hydration) uses French, then the saved preference is applied — without
 * calling setState inside an effect.
 */
const STORAGE_KEY = "jb-lang";
const DEFAULT_LANG: Lang = "fr";
const listeners = new Set<() => void>();
let current: Lang | null = null; // in-memory copy (also works when storage is blocked)

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot(): Lang {
  if (current === null) {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      current = saved && saved in translations ? (saved as Lang) : DEFAULT_LANG;
    } catch {
      current = DEFAULT_LANG;
    }
  }
  return current;
}

function getServerSnapshot(): Lang {
  return DEFAULT_LANG;
}

function setLang(lang: Lang) {
  current = lang;
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {}
  listeners.forEach((listener) => listener());
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // keep <html lang> in sync
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}
