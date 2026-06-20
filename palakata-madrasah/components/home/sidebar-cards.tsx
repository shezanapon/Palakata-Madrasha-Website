"use client";

import Link from "next/link";
import { ChevronRight, UserRound } from "lucide-react";
import { MadrasahSeal } from "@/components/ui/madrasah-seal";
import { Button } from "@/components/ui/button";
import { useLang } from "@/components/i18n/language-provider";
import { importantLinks, site } from "@/lib/site";

export function SidebarCards() {
  const { t } = useLang();

  return (
    <aside className="flex flex-col gap-5">
      {/* Online Admission */}
      <SideCard title={t("Online Admission", "অনলাইন ভর্তি")}>
        <div className="px-5 py-6 text-center">
          <MadrasahSeal className="mx-auto mb-3.5 size-16" />
          <p className="mb-4 text-[13px] text-muted-ink">
            {t(
              "Admission for the 2026 session is now open.",
              "২০২৬ শিক্ষাবর্ষের ভর্তি চলছে।"
            )}
          </p>
          <Button asChild variant="cta" className="w-full">
            <Link href="/admission">{t("Apply Now", "এখনই আবেদন করুন")}</Link>
          </Button>
        </div>
      </SideCard>

      {/* Founder & Patron */}
      <SideCard title={t("Founder & Patron", "প্রতিষ্ঠাতা ও পৃষ্ঠপোষক")}>
        <div className="px-5 py-5 text-center">
          <div className="mx-auto mb-3.5 flex aspect-square w-full max-w-[180px] items-center justify-center rounded-md border border-line bg-gradient-to-br from-[#e9ecf0] to-[#cfd5dd] text-muted-ink">
            <UserRound className="size-12" strokeWidth={1.2} />
          </div>
          <p className="font-display text-base font-bold text-green-dark">
            {t(site.founder.name.en, site.founder.name.bn)}
          </p>
          <p className="mt-1 text-[12px] italic text-muted-ink">
            {t(site.founder.title.en, site.founder.title.bn)}
          </p>
        </div>
      </SideCard>

      {/* Important Links */}
      <SideCard title={t("Important Links", "গুরুত্বপূর্ণ লিংক")}>
        <ul className="py-2">
          {importantLinks.map((l) => (
            <li key={l.href} className="border-b border-line last:border-b-0">
              <a
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-5 py-2.5 text-[13.5px] font-medium text-ink transition-all hover:bg-secondary hover:pl-7 hover:text-orange"
              >
                <ChevronRight className="size-4 shrink-0 text-orange" strokeWidth={2.5} />
                {t(l.label.en, l.label.bn)}
              </a>
            </li>
          ))}
        </ul>
      </SideCard>
    </aside>
  );
}

function SideCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-lg border border-line bg-white shadow-sm">
      <h3 className="font-display border-b-2 border-green-dark bg-gradient-to-b from-white to-[#f7f9fc] p-3.5 text-center text-[17px] font-semibold text-green-dark">
        {title}
      </h3>
      {children}
    </div>
  );
}
