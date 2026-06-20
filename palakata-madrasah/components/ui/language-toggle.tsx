"use client";

import { useLang } from "@/components/i18n/language-provider";
import { cn } from "@/lib/utils";

export function LanguageToggle({ className }: { className?: string }) {
  const { lang, setLang } = useLang();

  return (
    <div
      className={cn(
        "inline-flex items-center gap-0.5 rounded-full border border-gold bg-black/30 p-0.5",
        className
      )}
      role="group"
      aria-label="Language"
    >
      <button
        type="button"
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
        className={cn(
          "rounded-full px-3 py-1 text-[11px] font-bold tracking-wide transition-colors",
          lang === "en" ? "bg-gold text-green-dark" : "text-white hover:text-gold"
        )}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLang("bn")}
        aria-pressed={lang === "bn"}
        className={cn(
          "rounded-full px-3 py-1 text-[11px] font-bold tracking-wide transition-colors",
          lang === "bn" ? "bg-gold text-green-dark" : "text-white hover:text-gold"
        )}
      >
        বাংলা
      </button>
    </div>
  );
}
