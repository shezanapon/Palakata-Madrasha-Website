"use client";

import Link from "next/link";
import { Bell, LogIn } from "lucide-react";
import { useLang } from "@/components/i18n/language-provider";
import { notices } from "@/lib/sample-data";

export function NoticeTicker() {
  const { t } = useLang();
  // Duplicate the list so the marquee loops seamlessly (translateX -50%).
  const loop = [...notices, ...notices];

  return (
    <div className="border-b border-[#c9dde8] bg-notice-blue">
      <div className="mx-auto flex max-w-[1280px] flex-col items-stretch gap-2.5 px-4 py-2.5 sm:flex-row sm:items-center sm:gap-3.5 sm:px-6">
        <span className="inline-flex shrink-0 items-center gap-1.5 self-start rounded bg-green-dark px-3 py-1.5 text-[13px] font-bold text-white sm:self-auto">
          <Bell className="size-3.5" strokeWidth={2} />
          {t("Latest Notices", "সর্বশেষ নোটিশ")}
        </span>

        <div className="group relative flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_30px,#000_calc(100%-30px),transparent)]">
          <div className="flex w-max gap-12 whitespace-nowrap animate-ticker group-hover:[animation-play-state:paused]">
            {loop.map((n, i) => (
              <Link
                key={`${n.id}-${i}`}
                href={n.href ?? "/notice"}
                className="inline-flex items-center gap-2 text-[13.5px] font-medium text-ink hover:text-orange"
              >
                <span className="text-[10px] text-orange">●</span>
                {t(n.title.en, n.title.bn)}
              </Link>
            ))}
          </div>
        </div>

        <Link
          href="/sign-in"
          className="inline-flex shrink-0 items-center gap-1.5 self-end rounded bg-orange px-4 py-2 text-[13px] font-bold text-white transition-colors hover:bg-orange-hover sm:self-auto"
        >
          <LogIn className="size-3.5" strokeWidth={2} />
          {t("Login", "লগইন")}
        </Link>
      </div>
    </div>
  );
}
