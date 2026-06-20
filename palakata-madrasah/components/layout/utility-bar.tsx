"use client";

import { Mail, Phone } from "lucide-react";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { useLang } from "@/components/i18n/language-provider";
import { site } from "@/lib/site";

export function UtilityBar() {
  const { t } = useLang();

  return (
    <div className="bg-green-dark text-white">
      <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-2 px-4 py-1.5 sm:px-6">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-[12px]">
          <a
            href={`tel:${site.contact.phone.replace(/\s/g, "")}`}
            className="inline-flex items-center gap-1.5 text-white/85 transition-colors hover:text-gold"
          >
            <Phone className="size-3.5" strokeWidth={1.5} />
            <span dir="ltr">{site.contact.phone}</span>
          </a>
          <a
            href={`mailto:${site.contact.email}`}
            className="hidden items-center gap-1.5 text-white/85 transition-colors hover:text-gold sm:inline-flex"
          >
            <Mail className="size-3.5" strokeWidth={1.5} />
            <span>{site.contact.email}</span>
          </a>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden text-[11px] tracking-wide text-white/70 md:inline">
            {t("EIIN", "ইআইআইএন")}: {site.eiin}
          </span>
          <LanguageToggle />
        </div>
      </div>
    </div>
  );
}
