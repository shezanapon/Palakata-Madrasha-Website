"use client";

import { Printer, UserRound } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DatedList } from "@/components/content/dated-list";
import { useLang } from "@/components/i18n/language-provider";
import { notices } from "@/lib/sample-data";

export interface StudentData {
  classEn: string;
  classBn: string;
  section: string | null;
  fatherEn: string;
  fatherBn: string;
  results: { subject: string; full: number; obtained: number | null; grade: string | null }[];
  gpa: number;
  fees: { en: string; bn: string; amount: number; paid: boolean }[];
}

// Demo data shown when there is no DB-backed student record yet.
const DEMO_RESULTS = [
  { subjectEn: "Qur'an Majeed", subjectBn: "কুরআন মাজীদ", full: 100, obtained: 92, grade: "A+" },
  { subjectEn: "Arabic 1st Paper", subjectBn: "আরবি ১ম পত্র", full: 100, obtained: 85, grade: "A+" },
  { subjectEn: "Aqaid & Fiqh", subjectBn: "আকাইদ ও ফিকহ", full: 100, obtained: 88, grade: "A+" },
  { subjectEn: "Bangla", subjectBn: "বাংলা", full: 100, obtained: 78, grade: "A" },
  { subjectEn: "English", subjectBn: "ইংরেজি", full: 100, obtained: 72, grade: "A-" },
];

const DEMO_FEES = [
  { en: "Monthly Tuition — June 2026", bn: "মাসিক বেতন — জুন ২০২৬", amount: 500, paid: true },
  { en: "Monthly Tuition — July 2026", bn: "মাসিক বেতন — জুলাই ২০২৬", amount: 500, paid: false },
  { en: "Half-Yearly Exam Fee", bn: "অর্ধবার্ষিক পরীক্ষার ফি", amount: 300, paid: true },
];

export function StudentPortal({
  name,
  username,
  data,
}: {
  name: string;
  username: string;
  data?: StudentData | null;
}) {
  const { t, num } = useLang();

  const fees = data ? data.fees : DEMO_FEES;
  const totalPaid = fees.filter((f) => f.paid).reduce((s, f) => s + f.amount, 0);
  const totalDue = fees.filter((f) => !f.paid).reduce((s, f) => s + f.amount, 0);

  return (
    <div className="space-y-6">
      {/* Profile */}
      <section id="profile" className="scroll-mt-20 overflow-hidden rounded-lg border border-line bg-white">
        <div className="flex flex-col items-center gap-4 bg-gradient-to-br from-green-dark to-green-mid p-6 text-center text-white sm:flex-row sm:text-left">
          <div className="flex size-20 items-center justify-center rounded-full border-2 border-gold bg-white/10">
            <UserRound className="size-10 text-gold" strokeWidth={1.2} />
          </div>
          <div>
            <h2 className="text-xl font-bold">{name}</h2>
            <p className="text-sm text-white/80">
              {t("Roll", "রোল")}: {username}
            </p>
            {data ? (
              <p className="mt-1 text-xs text-white/70">
                {t(data.classEn, data.classBn)}
                {data.section ? ` · ${t("Section", "শাখা")} ${data.section}` : ""}
                {" · "}
                {t("Father", "পিতা")}: {t(data.fatherEn, data.fatherBn)}
              </p>
            ) : (
              <p className="mt-1 text-xs text-white/60">
                {t("Showing demo data — full profile loads from the database.", "ডেমো ডেটা — সম্পূর্ণ প্রোফাইল ডাটাবেস থেকে আসবে।")}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Results */}
      <section id="results" className="scroll-mt-20 overflow-hidden rounded-lg border border-line bg-white">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-3">
          <h2 className="text-[15px] font-semibold text-ink">{t("My Results", "আমার ফলাফল")}</h2>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-br from-green-dark to-green-mid px-3 py-1.5 text-sm font-bold text-gold">
              {t("GPA", "জিপিএ")} {num(data ? data.gpa.toFixed(2) : "4.75")}
            </span>
            <Button variant="outline" size="sm" onClick={() => window.print()} className="no-print">
              <Printer className="size-4" strokeWidth={1.5} />
              {t("Print Card", "কার্ড প্রিন্ট")}
            </Button>
          </div>
        </div>

        {data && data.results.length === 0 ? (
          <p className="p-8 text-center text-sm text-muted-ink">
            {t("No results published yet.", "এখনো কোনো ফলাফল প্রকাশিত হয়নি।")}
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-secondary text-left text-xs uppercase tracking-wide text-muted-ink">
                  <th className="px-4 py-2.5">{t("Subject", "বিষয়")}</th>
                  <th className="px-4 py-2.5 text-center">{t("Full", "পূর্ণমান")}</th>
                  <th className="px-4 py-2.5 text-center">{t("Obtained", "প্রাপ্ত")}</th>
                  <th className="px-4 py-2.5 text-center">{t("Grade", "গ্রেড")}</th>
                </tr>
              </thead>
              <tbody>
                {data
                  ? data.results.map((r, i) => (
                      <tr key={i} className="border-t border-line">
                        <td className="px-4 py-2.5 font-medium">{r.subject}</td>
                        <td className="px-4 py-2.5 text-center">{num(r.full)}</td>
                        <td className="px-4 py-2.5 text-center">{r.obtained != null ? num(r.obtained) : "—"}</td>
                        <td className="px-4 py-2.5 text-center font-semibold text-green-dark">{r.grade ?? "—"}</td>
                      </tr>
                    ))
                  : DEMO_RESULTS.map((r) => (
                      <tr key={r.subjectEn} className="border-t border-line">
                        <td className="px-4 py-2.5 font-medium">{t(r.subjectEn, r.subjectBn)}</td>
                        <td className="px-4 py-2.5 text-center">{num(r.full)}</td>
                        <td className="px-4 py-2.5 text-center">{num(r.obtained)}</td>
                        <td className="px-4 py-2.5 text-center font-semibold text-green-dark">{r.grade}</td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Attendance */}
      <section id="attendance" className="scroll-mt-20 rounded-lg border border-line bg-white p-4">
        <h2 className="mb-2 text-[15px] font-semibold text-ink">{t("My Attendance", "আমার উপস্থিতি")}</h2>
        <p className="text-sm text-muted-ink">
          {t("Monthly attendance will appear here once recorded.", "মাসিক উপস্থিতি রেকর্ড হলে এখানে দেখা যাবে।")}
        </p>
      </section>

      {/* Fees (demo until the Finance module is wired) */}
      <section id="fees" className="scroll-mt-20 overflow-hidden rounded-lg border border-line bg-white">
        <div className="border-b border-line px-4 py-3">
          <h2 className="text-[15px] font-semibold text-ink">{t("Fees", "ফি")}</h2>
        </div>
        <div className="grid grid-cols-2 gap-3 border-b border-line p-4 sm:grid-cols-3">
          <FeeSummary label={t("Total Paid", "মোট পরিশোধিত")} value={`৳ ${num(totalPaid)}`} tone="green" />
          <FeeSummary label={t("Total Due", "মোট বকেয়া")} value={`৳ ${num(totalDue)}`} tone="red" />
          <FeeSummary label={t("Outstanding", "অবশিষ্ট")} value={`৳ ${num(totalDue)}`} tone="neutral" />
        </div>
        <ul className="divide-y divide-line">
          {fees.length === 0 ? (
            <li className="px-4 py-6 text-center text-sm text-muted-ink">
              {t("No fees recorded.", "কোনো ফি নেই।")}
            </li>
          ) : (
            fees.map((f, i) => (
              <li key={i} className="flex items-center justify-between gap-3 px-4 py-3">
                <div>
                  <p className="text-sm font-medium text-ink">{t(f.en, f.bn)}</p>
                  <p className="text-xs text-muted-ink">৳ {num(f.amount)}</p>
                </div>
                {f.paid ? (
                  <Badge variant="green">{t("PAID", "পরিশোধিত")}</Badge>
                ) : (
                  <Badge variant="red">{t("DUE", "বকেয়া")}</Badge>
                )}
              </li>
            ))
          )}
        </ul>
      </section>

      {/* Notices */}
      <section id="notices" className="scroll-mt-20">
        <h2 className="mb-3 text-[15px] font-semibold text-ink">{t("Notices", "নোটিশ")}</h2>
        <DatedList items={notices} />
      </section>
    </div>
  );
}

function FeeSummary({ label, value, tone }: { label: string; value: string; tone: "green" | "red" | "neutral" }) {
  const tones = {
    green: "bg-emerald-50 border-emerald-200 text-emerald-700",
    red: "bg-red-50 border-red-200 text-red-700",
    neutral: "bg-secondary border-line text-green-dark",
  };
  return (
    <div className={`rounded-lg border p-3 text-center ${tones[tone]}`}>
      <div className="text-lg font-bold">{value}</div>
      <div className="mt-0.5 text-[10px] uppercase tracking-wide opacity-80">{label}</div>
    </div>
  );
}
