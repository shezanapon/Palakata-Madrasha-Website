"use client";

import { useLang } from "@/components/i18n/language-provider";
import { stats } from "@/lib/site";

export function StatsBand() {
  const { t, num } = useLang();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-green-dark to-green-mid py-12 text-white lg:py-22">
      <div className="relative z-[1] mx-auto grid max-w-page grid-cols-2 gap-8 px-6 lg:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label.en}
            className="text-center lg:border-r lg:border-gold/20 lg:last:border-r-0"
          >
            <div className="font-display text-h1 leading-none text-gold">
              {num(s.value)}
              {s.suffix ?? ""}
            </div>
            <div className="mt-1.5 text-ui text-[#dbeae4]">
              {t(s.label.en, s.label.bn)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
