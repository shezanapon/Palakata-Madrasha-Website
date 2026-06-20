"use client";

import { ChevronRight } from "lucide-react";
import { useLang } from "@/components/i18n/language-provider";
import { cn } from "@/lib/utils";

/** Dark-green page banner with bilingual title + optional subtitle. */
export function PageHeader({
  titleEn,
  titleBn,
  subtitleEn,
  subtitleBn,
}: {
  titleEn: string;
  titleBn: string;
  subtitleEn?: string;
  subtitleBn?: string;
}) {
  const { t } = useLang();
  return (
    <div className="pattern-overlay relative overflow-hidden border-b-[3px] border-gold bg-gradient-to-br from-green-dark to-green-mid">
      <div className="relative z-[1] mx-auto max-w-[1280px] px-4 py-9 text-white sm:px-6">
        <h1 className="font-display text-2xl font-bold tracking-wide text-gold sm:text-3xl">
          {t(titleEn, titleBn)}
        </h1>
        {(subtitleEn || subtitleBn) && (
          <p className="mt-2 max-w-2xl text-sm text-white/85">
            {t(subtitleEn ?? "", subtitleBn ?? "")}
          </p>
        )}
      </div>
    </div>
  );
}

/** Page content wrapper. */
export function ContentWrap({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-[1280px] space-y-6 px-4 py-8 sm:px-6">{children}</div>
  );
}

/** Anchored white card section with a gold-underlined heading. */
export function Section({
  id,
  titleEn,
  titleBn,
  children,
  className,
}: {
  id?: string;
  titleEn: string;
  titleBn: string;
  children: React.ReactNode;
  className?: string;
}) {
  const { t } = useLang();
  return (
    <section
      id={id}
      className={cn("scroll-mt-24 rounded-lg border border-line bg-white p-6 shadow-sm sm:p-8", className)}
    >
      <h2 className="font-display mb-4 inline-block border-b-2 border-gold pb-2 text-xl font-semibold text-green-dark sm:text-2xl">
        {t(titleEn, titleBn)}
      </h2>
      <div className="space-y-3.5 text-[14.5px] leading-[1.85] text-[#374151]">{children}</div>
    </section>
  );
}

/** Bilingual paragraph. */
export function P({ en, bn }: { en: string; bn: string }) {
  const { t } = useLang();
  return <p>{t(en, bn)}</p>;
}

/** Bilingual bullet list. */
export function Bullets({ items }: { items: { en: string; bn: string }[] }) {
  const { t } = useLang();
  return (
    <ul className="space-y-2">
      {items.map((it, i) => (
        <li key={i} className="flex items-start gap-2.5">
          <ChevronRight className="mt-1 size-4 shrink-0 text-orange" strokeWidth={2.5} />
          <span>{t(it.en, it.bn)}</span>
        </li>
      ))}
    </ul>
  );
}

/** Responsive grid of small feature cards. */
export function FeatureGrid({
  items,
}: {
  items: { en: string; bn: string; descEn?: string; descBn?: string }[];
}) {
  const { t } = useLang();
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((it, i) => (
        <div key={i} className="rounded-lg border border-line bg-secondary/40 p-4">
          <h3 className="font-semibold text-green-dark">{t(it.en, it.bn)}</h3>
          {(it.descEn || it.descBn) && (
            <p className="mt-1.5 text-[13px] leading-relaxed text-muted-ink">
              {t(it.descEn ?? "", it.descBn ?? "")}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
