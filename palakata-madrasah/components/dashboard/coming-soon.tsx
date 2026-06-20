"use client";

import { Hammer } from "lucide-react";
import { useLang } from "@/components/i18n/language-provider";

export function ComingSoon({
  titleEn,
  titleBn,
  descEn,
  descBn,
}: {
  titleEn: string;
  titleBn: string;
  descEn: string;
  descBn: string;
}) {
  const { t } = useLang();
  return (
    <div className="space-y-5">
      <h2 className="font-display text-xl font-semibold text-green-dark">{t(titleEn, titleBn)}</h2>
      <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed border-line bg-white p-12 text-center">
        <span className="flex size-12 items-center justify-center rounded-full bg-secondary text-green-mid">
          <Hammer className="size-6" strokeWidth={1.5} />
        </span>
        <p className="max-w-md text-sm text-muted-ink">{t(descEn, descBn)}</p>
      </div>
    </div>
  );
}
