"use client";

import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { useLang } from "@/components/i18n/language-provider";
import type { DatedItem } from "@/lib/sample-data";

export function DatedList({ items }: { items: DatedItem[] }) {
  const { t, lang } = useLang();
  const locale = lang === "bn" ? "bn-BD" : "en-GB";

  if (items.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-line bg-white p-8 text-center text-muted-ink">
        {t("Nothing to show yet.", "এখনো কিছু নেই।")}
      </p>
    );
  }

  return (
    <ul className="space-y-3">
      {items.map((item) => {
        const d = new Date(item.date);
        return (
          <li
            key={item.id}
            className="flex items-start gap-4 rounded-lg border border-line bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex w-16 shrink-0 flex-col items-center rounded-md border-l-4 border-orange bg-secondary px-2 py-2 text-center">
              <span className="font-display text-xl font-bold leading-none text-green-dark">
                {d.toLocaleDateString(locale, { day: "2-digit" })}
              </span>
              <span className="mt-0.5 text-[10px] uppercase tracking-wide text-muted-ink">
                {d.toLocaleDateString(locale, { month: "short" })}
              </span>
              <span className="text-[10px] text-muted-ink">
                {d.toLocaleDateString(locale, { year: "numeric" })}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <Link
                href={item.href ?? "#"}
                className="font-medium text-ink hover:text-orange"
              >
                {t(item.title.en, item.title.bn)}
              </Link>
              <p className="mt-1 inline-flex items-center gap-1.5 text-xs text-muted-ink">
                <CalendarDays className="size-3.5" strokeWidth={1.5} />
                {d.toLocaleDateString(locale, { day: "numeric", month: "long", year: "numeric" })}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
