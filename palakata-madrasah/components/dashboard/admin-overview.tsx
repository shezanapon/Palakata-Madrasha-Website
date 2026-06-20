"use client";

import {
  Bell,
  ClipboardList,
  GraduationCap,
  ImagePlus,
  UserPlus,
  Users,
  Wallet,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useLang } from "@/components/i18n/language-provider";
import type { AppRole } from "@/types/next-auth";

const STAT_CARDS = [
  { en: "Students", bn: "শিক্ষার্থী", value: "1,500", accent: "border-t-green-dark text-green-dark" },
  { en: "Teachers", bn: "শিক্ষক", value: "25", accent: "border-t-blue-500 text-blue-600" },
  { en: "Active Notices", bn: "সক্রিয় নোটিশ", value: "4", accent: "border-t-orange text-orange" },
  { en: "Fees Due", bn: "বকেয়া ফি", value: "৳ 32,400", accent: "border-t-purple-500 text-purple-600" },
];

const QUICK_ACTIONS = [
  { en: "Add Student", bn: "শিক্ষার্থী যোগ", icon: UserPlus },
  { en: "Enter Results", bn: "ফলাফল এন্ট্রি", icon: ClipboardList },
  { en: "Add Notice", bn: "নোটিশ যোগ", icon: Bell },
  { en: "Add Fee", bn: "ফি যোগ", icon: Wallet },
  { en: "Upload Gallery", bn: "গ্যালারি আপলোড", icon: ImagePlus },
  { en: "Add Teacher", bn: "শিক্ষক যোগ", icon: GraduationCap },
];

const RECENT_STUDENTS = [
  { roll: "1101", name: "Abdullah Al Mamun", cls: "Alim 11", status: "active" as const },
  { roll: "0934", name: "Tahmina Akter", cls: "Dakhil 9", status: "active" as const },
  { roll: "0612", name: "Yusuf Karim", cls: "Dakhil 6", status: "disabled" as const },
  { roll: "1205", name: "Sumaiya Islam", cls: "Alim 12", status: "active" as const },
];

export function AdminOverview({ role }: { role: AppRole }) {
  const { t } = useLang();

  return (
    <div className="space-y-6">
      <p className="rounded-md border border-amber-200 bg-amber-50 px-4 py-2.5 text-sm text-amber-800">
        {t(
          "Demo data shown below. Connect the database (DATABASE_URL) and build out the management forms to make these live.",
          "নিচে ডেমো ডেটা দেখানো হচ্ছে। লাইভ করতে ডাটাবেস (DATABASE_URL) সংযুক্ত করুন এবং ম্যানেজমেন্ট ফর্ম তৈরি করুন।"
        )}
      </p>

      {/* Stat cards */}
      <section id="overview" className="grid scroll-mt-20 grid-cols-2 gap-4 lg:grid-cols-4">
        {STAT_CARDS.map((s) => (
          <div
            key={s.en}
            className={`rounded-lg border border-line border-t-[3px] bg-white p-4 ${s.accent.split(" ")[0]}`}
          >
            <div className={`text-2xl font-bold ${s.accent.split(" ")[1]}`}>{s.value}</div>
            <div className="mt-1 text-xs text-muted-ink">{t(s.en, s.bn)}</div>
          </div>
        ))}
      </section>

      {/* Quick actions */}
      <Panel id="actions" title={t("Quick Actions", "দ্রুত কার্যক্রম")}>
        <div className="grid grid-cols-2 gap-3 p-4 sm:grid-cols-3">
          {QUICK_ACTIONS.map((a) => {
            const Icon = a.icon;
            return (
              <button
                key={a.en}
                className="group flex flex-col items-center gap-1.5 rounded-lg border border-line bg-secondary/40 p-4 text-center transition-colors hover:border-green-dark hover:bg-green-dark"
              >
                <Icon className="size-5 text-green-mid group-hover:text-gold" strokeWidth={1.5} />
                <span className="text-xs font-semibold text-ink group-hover:text-white">{t(a.en, a.bn)}</span>
              </button>
            );
          })}
        </div>
      </Panel>

      {/* Recent students */}
      <Panel id="students" title={t("Recent Students", "সাম্প্রতিক শিক্ষার্থী")}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-secondary text-left text-xs uppercase tracking-wide text-muted-ink">
                <th className="px-4 py-2.5">{t("Roll", "রোল")}</th>
                <th className="px-4 py-2.5">{t("Name", "নাম")}</th>
                <th className="px-4 py-2.5">{t("Class", "শ্রেণি")}</th>
                <th className="px-4 py-2.5">{t("Status", "অবস্থা")}</th>
              </tr>
            </thead>
            <tbody>
              {RECENT_STUDENTS.map((s) => (
                <tr key={s.roll} className="border-t border-line">
                  <td className="px-4 py-2.5 font-mono text-xs">{s.roll}</td>
                  <td className="px-4 py-2.5 font-medium">{s.name}</td>
                  <td className="px-4 py-2.5">{s.cls}</td>
                  <td className="px-4 py-2.5">
                    {s.status === "active" ? (
                      <Badge variant="green">{t("Active", "সক্রিয়")}</Badge>
                    ) : (
                      <Badge variant="red">{t("Disabled", "নিষ্ক্রিয়")}</Badge>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      {/* Finance / Results sections (placeholders with anchors) */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Panel id="finance" title={t("Finance Summary", "অর্থ সারসংক্ষেপ")}>
          <div className="grid grid-cols-3 gap-3 p-4 text-center">
            <FinanceStat label={t("Collected", "আদায়")} value="৳ 1.2L" tone="green" />
            <FinanceStat label={t("Due", "বকেয়া")} value="৳ 32.4K" tone="red" />
            <FinanceStat label={t("This Month", "এ মাস")} value="৳ 18K" tone="neutral" />
          </div>
        </Panel>
        <Panel id="results" title={t("Result Entry", "ফলাফল এন্ট্রি")}>
          <p className="p-4 text-sm text-muted-ink">
            {t(
              "Select class, section, term, year and subject to bulk-enter marks. Grades & GPA are auto-calculated and appear instantly in the student panel.",
              "মার্ক বাল্ক এন্ট্রির জন্য শ্রেণি, শাখা, টার্ম, বছর ও বিষয় নির্বাচন করুন। গ্রেড ও জিপিএ স্বয়ংক্রিয়ভাবে গণনা হয়ে শিক্ষার্থী প্যানেলে সঙ্গে সঙ্গে প্রদর্শিত হয়।"
            )}
          </p>
        </Panel>
      </div>

      {role === "PRINCIPAL" && (
        <Panel id="users" title={t("User Accounts", "ব্যবহারকারী অ্যাকাউন্ট")}>
          <p className="p-4 text-sm text-muted-ink">
            {t(
              "As Principal you can create up to 2 Administrator accounts and manage all roles.",
              "অধ্যক্ষ হিসেবে আপনি সর্বোচ্চ ২টি প্রশাসক অ্যাকাউন্ট তৈরি ও সকল ভূমিকা পরিচালনা করতে পারেন।"
            )}
          </p>
        </Panel>
      )}
    </div>
  );
}

function Panel({ id, title, children }: { id?: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-20 overflow-hidden rounded-lg border border-line bg-white">
      <div className="border-b border-line px-4 py-3">
        <h2 className="text-[15px] font-semibold text-ink">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function FinanceStat({ label, value, tone }: { label: string; value: string; tone: "green" | "red" | "neutral" }) {
  const tones = {
    green: "bg-emerald-50 border-emerald-200 text-emerald-700",
    red: "bg-red-50 border-red-200 text-red-700",
    neutral: "bg-secondary border-line text-green-dark",
  };
  return (
    <div className={`rounded-lg border p-4 ${tones[tone]}`}>
      <div className="text-xl font-bold">{value}</div>
      <div className="mt-1 text-[11px] uppercase tracking-wide opacity-80">{label}</div>
    </div>
  );
}
