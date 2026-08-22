"use client";

import { useLang } from "@/components/i18n/language-provider";

/**
 * Route-level fallback for the public pages. The Next docs prefer this over an
 * inline pending hint: it renders instantly while a dynamic route (/notice,
 * /events) resolves, and is simply skipped for prefetched static routes.
 * The site header, ticker and footer stay put — only the page body swaps.
 */
export default function SiteLoading() {
  const { t } = useLang();

  return (
    <div
      role="status"
      aria-live="polite"
      className="mx-auto flex min-h-[50vh] max-w-page flex-col items-center justify-center gap-4 px-6"
    >
      <span
        aria-hidden="true"
        className="size-10 rounded-full border-[3px] border-line border-t-brand-600 motion-safe:animate-spin"
      />
      <p className="text-ui text-subtle">{t("Loading…", "লোড হচ্ছে…")}</p>
    </div>
  );
}
