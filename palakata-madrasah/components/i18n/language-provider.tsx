"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { DEFAULT_LANG, localizeNumber, type Lang } from "@/lib/i18n";

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggle: () => void;
  /** Pick the right string for the active language. */
  t: (en: string, bn: string) => string;
  /** Localize digits (Bengali numerals in bn mode). */
  num: (value: string | number) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function applyLangToDocument(lang: Lang) {
  if (typeof document === "undefined") return;
  document.documentElement.dataset.lang = lang;
  document.documentElement.lang = lang;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(DEFAULT_LANG);

  // Sync from localStorage on mount (the inline head script already painted it).
  useEffect(() => {
    const stored = (typeof localStorage !== "undefined" &&
      (localStorage.getItem("lang") as Lang | null)) || DEFAULT_LANG;
    setLangState(stored);
    applyLangToDocument(stored);
  }, []);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem("lang", next);
    } catch {
      /* ignore storage errors (private mode, etc.) */
    }
    applyLangToDocument(next);
  }, []);

  const toggle = useCallback(() => {
    setLang(lang === "en" ? "bn" : "en");
  }, [lang, setLang]);

  const t = useCallback((en: string, bn: string) => (lang === "bn" ? bn : en), [lang]);
  const num = useCallback((value: string | number) => localizeNumber(value, lang), [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggle, t, num }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLang must be used within a <LanguageProvider>");
  }
  return ctx;
}

/** Inline bilingual text: <T en="Home" bn="হোম" />. */
export function T({ en, bn }: { en: string; bn: string }) {
  const { t } = useLang();
  return <>{t(en, bn)}</>;
}
