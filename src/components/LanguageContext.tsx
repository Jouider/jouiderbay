"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { translations, type Lang } from "@/lib/translations";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (typeof translations)[Lang];
};

const LanguageContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("fr");

  // restore preference + keep <html> lang/dir in sync
  useEffect(() => {
    const saved = (typeof window !== "undefined" &&
      localStorage.getItem("jb-lang")) as Lang | null;
    if (saved && saved in translations) setLang(saved);
  }, []);

  useEffect(() => {
    const dir = translations[lang].dir;
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
    try {
      localStorage.setItem("jb-lang", lang);
    } catch {}
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
