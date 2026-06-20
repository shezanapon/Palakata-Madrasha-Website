"use client";

import { useState } from "react";
import { Printer, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLang } from "@/components/i18n/language-provider";

interface ResultRow {
  subject: string;
  fullMarks: number;
  obtainedMarks: number | null;
  grade: string | null;
  gpa: number | null;
  isPassed: boolean;
}
interface ResultData {
  student: { nameEn: string; nameBn: string; rollNumber: string; classLevel: string; section: string | null };
  results: ResultRow[];
}

const selectClass =
  "h-10 w-full rounded-md border border-line bg-white px-3 text-sm shadow-sm outline-none focus-visible:border-green-mid focus-visible:ring-[3px] focus-visible:ring-green-mid/30";

export function ResultSearch() {
  const { t } = useLang();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<ResultData | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const res = await fetch("/api/result", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rollNumber: form.get("rollNumber"),
          year: form.get("year"),
          term: form.get("term"),
        }),
      });
      if (res.ok) {
        const json = (await res.json()) as ResultData;
        if (json.results.length === 0) {
          setError(t("No results published for this selection yet.", "এই নির্বাচনের জন্য এখনো ফলাফল প্রকাশিত হয়নি।"));
        } else {
          setData(json);
        }
      } else if (res.status === 404) {
        setError(t("No student found with this roll number.", "এই রোল নম্বরে কোনো শিক্ষার্থী পাওয়া যায়নি।"));
      } else if (res.status === 503) {
        setError(t("Result service is not available yet (database not connected).", "ফলাফল সেবা এখনো উপলব্ধ নয় (ডাটাবেস সংযুক্ত নয়)।"));
      } else {
        setError(t("Something went wrong. Please try again.", "কিছু একটা সমস্যা হয়েছে। আবার চেষ্টা করুন।"));
      }
    } catch {
      setError(t("Network error. Please try again.", "নেটওয়ার্ক সমস্যা। আবার চেষ্টা করুন।"));
    } finally {
      setLoading(false);
    }
  }

  const gpa =
    data && data.results.length
      ? (
          data.results.reduce((s, r) => s + (r.gpa ?? 0), 0) / data.results.length
        ).toFixed(2)
      : null;

  return (
    <div className="space-y-6">
      <form
        onSubmit={onSubmit}
        className="grid gap-4 rounded-lg border border-line bg-white p-6 shadow-sm sm:grid-cols-2 lg:grid-cols-4 lg:items-end"
      >
        <div className="space-y-1.5">
          <Label htmlFor="rollNumber">{t("Roll Number", "রোল নম্বর")}</Label>
          <Input id="rollNumber" name="rollNumber" required placeholder="e.g. 1024" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="year">{t("Year", "বছর")}</Label>
          <select id="year" name="year" className={selectClass} defaultValue="2026">
            {[2026, 2025, 2024].map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="term">{t("Term", "টার্ম")}</Label>
          <select id="term" name="term" className={selectClass} defaultValue="FIRST">
            <option value="FIRST">{t("First Term", "প্রথম সাময়িক")}</option>
            <option value="SECOND">{t("Second Term", "দ্বিতীয় সাময়িক")}</option>
          </select>
        </div>
        <Button type="submit" disabled={loading}>
          <Search className="size-4" strokeWidth={2} />
          {loading ? t("Searching…", "খোঁজা হচ্ছে…") : t("View Result", "ফলাফল দেখুন")}
        </Button>
      </form>

      {error && (
        <p className="rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          {error}
        </p>
      )}

      {data && (
        <div className="overflow-hidden rounded-lg border border-line bg-white shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-secondary/50 p-4">
            <div>
              <p className="font-semibold text-green-dark">{t(data.student.nameEn, data.student.nameBn)}</p>
              <p className="text-sm text-muted-ink">
                {t("Roll", "রোল")}: {data.student.rollNumber}
                {data.student.section ? ` · ${t("Section", "শাখা")}: ${data.student.section}` : ""}
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={() => window.print()} className="no-print">
              <Printer className="size-4" strokeWidth={1.5} />
              {t("Print", "প্রিন্ট")}
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-secondary text-left text-xs uppercase tracking-wide text-muted-ink">
                  <th className="px-4 py-2.5">{t("Subject", "বিষয়")}</th>
                  <th className="px-4 py-2.5 text-center">{t("Full Marks", "পূর্ণমান")}</th>
                  <th className="px-4 py-2.5 text-center">{t("Obtained", "প্রাপ্ত")}</th>
                  <th className="px-4 py-2.5 text-center">{t("Grade", "গ্রেড")}</th>
                </tr>
              </thead>
              <tbody>
                {data.results.map((r, i) => (
                  <tr key={i} className="border-t border-line">
                    <td className="px-4 py-2.5 font-medium">{r.subject}</td>
                    <td className="px-4 py-2.5 text-center">{r.fullMarks}</td>
                    <td className="px-4 py-2.5 text-center">{r.obtainedMarks ?? "—"}</td>
                    <td className="px-4 py-2.5 text-center font-semibold text-green-dark">{r.grade ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {gpa && (
            <div className="border-t border-line p-4 text-right text-sm">
              {t("GPA", "জিপিএ")}: <span className="font-bold text-green-dark">{gpa}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
