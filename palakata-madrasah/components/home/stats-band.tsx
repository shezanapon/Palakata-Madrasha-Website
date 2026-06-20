"use client";

import { useLang } from "@/components/i18n/language-provider";
import { stats } from "@/lib/site";

export function StatsBand() {
  const { t, num } = useLang();

  return (
    <section className="pattern-overlay relative my-6 overflow-hidden bg-gradient-to-br from-green-dark to-green-mid px-4 py-9 text-white sm:px-6">
      <div className="relative z-[1] mx-auto grid max-w-[1280px] grid-cols-2 gap-7 lg:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label.en}
            className="text-center lg:border-r lg:border-gold/20 lg:last:border-r-0"
          >
            <div className="font-display text-4xl font-bold leading-none text-gold sm:text-[42px]">
              {num(s.value)}
              {s.suffix ?? ""}
            </div>
            <div className="mt-1.5 text-[13px] uppercase tracking-wider text-[#dbeae4]">
              {t(s.label.en, s.label.bn)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
