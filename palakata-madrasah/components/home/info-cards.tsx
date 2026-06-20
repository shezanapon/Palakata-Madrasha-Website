"use client";

import Link from "next/link";
import { Bell, CalendarDays, Star } from "lucide-react";
import { useLang } from "@/components/i18n/language-provider";
import { achievements, events, notices, type DatedItem } from "@/lib/sample-data";
import type { Lang } from "@/lib/i18n";

function formatDay(iso: string, lang: Lang) {
  const d = new Date(iso);
  const day = d.toLocaleDateString(lang === "bn" ? "bn-BD" : "en-GB", { day: "2-digit" });
  const month = d.toLocaleDateString(lang === "bn" ? "bn-BD" : "en-GB", { month: "short" });
  return { day, month };
}

export function InfoCards() {
  const { t, lang } = useLang();

  return (
    <section className="mx-auto my-6 grid max-w-[1280px] gap-5 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-3">
      <InfoCard
        icon={<Bell className="size-3.5" strokeWidth={2} />}
        title={t("Latest Notices", "সর্বশেষ নোটিশ")}
        viewAllHref="/notice"
      >
        {notices.slice(0, 4).map((n) => (
          <DateRow key={n.id} item={n} lang={lang} />
        ))}
      </InfoCard>

      <InfoCard
        icon={<CalendarDays className="size-3.5" strokeWidth={2} />}
        title={t("Upcoming Events", "আসন্ন অনুষ্ঠান")}
        viewAllHref="/events"
      >
        {events.slice(0, 4).map((e) => (
          <DateRow key={e.id} item={e} lang={lang} />
        ))}
      </InfoCard>

      <InfoCard
        icon={<Star className="size-3.5" strokeWidth={2} />}
        title={t("Achievements", "অর্জনসমূহ")}
        viewAllHref="/about#achievements"
      >
        {achievements.slice(0, 4).map((a) => (
          <li key={a.id} className="flex items-start gap-3 border-b border-dashed border-line px-5 py-2.5 last:border-b-0">
            <span className="flex size-11 shrink-0 flex-col items-center justify-center rounded border-l-[3px] border-orange bg-secondary text-green-dark">
              <Star className="size-3.5 text-gold" fill="currentColor" strokeWidth={0} />
              <span className="font-display text-[11px] font-bold leading-none">
                {fmtYear(a.year, lang)}
              </span>
            </span>
            <span className="text-[13px] leading-snug text-ink">{t(a.title.en, a.title.bn)}</span>
          </li>
        ))}
      </InfoCard>
    </section>
  );
}

function fmtYear(year: number, lang: Lang) {
  return lang === "bn" ? new Intl.NumberFormat("bn-BD", { useGrouping: false }).format(year) : String(year);
}

function DateRow({ item, lang }: { item: DatedItem; lang: Lang }) {
  const { t } = useLang();
  const { day, month } = formatDay(item.date, lang);
  return (
    <li className="flex items-start gap-3 border-b border-dashed border-line px-5 py-2.5 last:border-b-0">
      <span className="flex w-11 shrink-0 flex-col items-center rounded border-l-[3px] border-orange bg-secondary px-1 py-1.5 text-center">
        <span className="font-display text-base font-bold leading-none text-green-dark">{day}</span>
        <span className="mt-0.5 text-[9px] uppercase tracking-wide text-muted-ink">{month}</span>
      </span>
      <Link href={item.href ?? "#"} className="text-[13px] leading-snug text-ink hover:text-orange">
        {t(item.title.en, item.title.bn)}
      </Link>
    </li>
  );
}

function InfoCard({
  icon,
  title,
  viewAllHref,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  viewAllHref: string;
  children: React.ReactNode;
}) {
  const { t } = useLang();
  return (
    <div className="overflow-hidden rounded-lg border border-line bg-white shadow-sm">
      <h3 className="flex items-center gap-2.5 bg-green-dark px-5 py-3 text-[15px] font-semibold text-white">
        <span className="flex size-7 items-center justify-center rounded-full bg-gold text-green-dark">
          {icon}
        </span>
        {title}
      </h3>
      <ul className="py-2.5">{children}</ul>
      <Link
        href={viewAllHref}
        className="block border-t border-line bg-secondary py-2.5 text-center text-[12px] font-bold tracking-wide text-green-dark transition-colors hover:bg-green-dark hover:text-white"
      >
        {t("View All →", "সব দেখুন →")}
      </Link>
    </div>
  );
}
