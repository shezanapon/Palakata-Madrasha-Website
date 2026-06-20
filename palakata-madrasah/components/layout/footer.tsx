"use client";

import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { MadrasahSeal } from "@/components/ui/madrasah-seal";
import { useLang } from "@/components/i18n/language-provider";
import { site } from "@/lib/site";

const quickLinks = [
  { en: "About Us", bn: "আমাদের সম্পর্কে", href: "/about" },
  { en: "Admission", bn: "ভর্তি", href: "/admission" },
  { en: "Academic", bn: "একাডেমিক", href: "/academic" },
  { en: "Notice Board", bn: "নোটিশ বোর্ড", href: "/notice" },
  { en: "Results", bn: "ফলাফল", href: "/result" },
  { en: "Contact", bn: "যোগাযোগ", href: "/contact" },
];

const departments = [
  { en: "Ebtedayee (1–5)", bn: "ইবতেদায়ী (১–৫)", href: "/departments#ebtedayee" },
  { en: "Dakhil (6–10)", bn: "দাখিল (৬–১০)", href: "/departments#dakhil" },
  { en: "Alim (11–12)", bn: "আলিম (১১–১২)", href: "/departments#alim" },
  { en: "Hifz Department", bn: "হিফজ বিভাগ", href: "/departments" },
];

export function Footer() {
  const { t, num } = useLang();

  return (
    <footer className="mt-10 border-t-[3px] border-gold bg-green-dark px-4 pt-12 text-[#dbeae4] sm:px-6">
      <div className="mx-auto grid max-w-[1280px] gap-9 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
        {/* Brand */}
        <div>
          <div className="mb-4 flex items-center gap-3.5">
            <MadrasahSeal className="size-12" />
            <span className="font-display text-lg font-semibold leading-tight text-gold">
              {t(site.name.en, site.name.bn)}
            </span>
          </div>
          <p className="text-[13px] leading-relaxed text-[#dbeae4]/90">
            {t(
              "An Alim-level madrasah committed to Islamic and modern education — nurturing knowledge, faith and good character since",
              "ইসলামি ও আধুনিক শিক্ষায় নিবেদিত একটি আলিম মাদ্রাসা — জ্ঞান, ঈমান ও উত্তম চরিত্র গঠনে নিয়োজিত,"
            )}{" "}
            {num(site.estYear)}.
          </p>
        </div>

        {/* Quick links */}
        <FooterColumn title={t("Quick Links", "দ্রুত লিংক")}>
          {quickLinks.map((l) => (
            <FooterLink key={l.en} href={l.href}>
              {t(l.en, l.bn)}
            </FooterLink>
          ))}
        </FooterColumn>

        {/* Departments */}
        <FooterColumn title={t("Departments", "বিভাগসমূহ")}>
          {departments.map((l) => (
            <FooterLink key={l.en} href={l.href}>
              {t(l.en, l.bn)}
            </FooterLink>
          ))}
        </FooterColumn>

        {/* Contact */}
        <FooterColumn title={t("Contact", "যোগাযোগ")}>
          <li className="flex items-start gap-2 text-[13px]">
            <MapPin className="mt-0.5 size-4 shrink-0 text-gold" strokeWidth={1.5} />
            <span>{t(site.contact.address.en, site.contact.address.bn)}</span>
          </li>
          <li className="flex items-center gap-2 text-[13px]">
            <Phone className="size-4 shrink-0 text-gold" strokeWidth={1.5} />
            <a href={`tel:${site.contact.phone.replace(/\s/g, "")}`} dir="ltr">
              {site.contact.phone}
            </a>
          </li>
          <li className="flex items-center gap-2 text-[13px]">
            <Mail className="size-4 shrink-0 text-gold" strokeWidth={1.5} />
            <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
          </li>
          <li className="mt-1 text-[13px] text-[#dbeae4]/80">
            {t("EIIN", "ইআইআইএন")}: {site.eiin} · {t("Code", "কোড")}: {site.madrasahCode}
          </li>
        </FooterColumn>
      </div>

      <div className="mx-auto mt-10 max-w-[1280px] border-t border-gold/15 py-4 text-center text-[12px] text-[#9bb5ad]">
        © {num(new Date().getFullYear())} {t(site.name.en, site.name.bn)}.{" "}
        {t("All rights reserved.", "সর্বস্বত্ব সংরক্ষিত।")}
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="font-display mb-4 border-b border-gold/25 pb-2 text-base font-semibold tracking-wide text-gold">
        {title}
      </h4>
      <ul className="space-y-2">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-[13px] text-[#dbeae4] transition-colors hover:text-gold">
        {children}
      </Link>
    </li>
  );
}
