"use client";

import Link from "next/link";
import { MadrasahSeal } from "@/components/ui/madrasah-seal";
import { MihrabDecoration } from "@/components/ui/mihrab-decoration";
import { useLang } from "@/components/i18n/language-provider";
import { site } from "@/lib/site";

export function Header() {
  const { t } = useLang();

  return (
    <header className="pattern-overlay relative overflow-hidden border-b-[3px] border-gold bg-gradient-to-b from-green-dark to-green-mid text-white">
      <div className="relative z-[1] mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-5 px-4 py-4 text-center sm:px-6 md:grid-cols-[auto_1fr] md:gap-7 md:text-left lg:grid-cols-[auto_1fr_auto]">
        <Link href="/" aria-label={t(site.name.en, site.name.bn)} className="mx-auto md:mx-0">
          <MadrasahSeal className="size-[88px] drop-shadow-md md:size-[104px]" />
        </Link>

        <div className="text-center">
          <p className="font-arabic mb-1 text-lg text-white/95 sm:text-xl md:text-[22px]">
            {site.nameArabic}
          </p>
          <h1 className="font-bangla text-2xl font-bold leading-tight sm:text-3xl">
            {site.name.bn}
          </h1>
          <p className="font-display mt-0.5 text-xl font-semibold tracking-wide sm:text-2xl md:text-[28px]">
            {site.name.en}
          </p>
          <p className="mt-1.5 text-[12px] text-[#dbeae4]">
            {t("EIIN", "ইআইআইএন")}: <span className="text-gold">{site.eiin}</span>
            <span className="mx-2 text-gold">·</span>
            {t("Madrasah Code", "মাদ্রাসা কোড")}: <span className="text-gold">{site.madrasahCode}</span>
          </p>
        </div>

        <div className="hidden lg:block">
          <MihrabDecoration />
        </div>
      </div>
    </header>
  );
}
