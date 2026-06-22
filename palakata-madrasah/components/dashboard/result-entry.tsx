"use client";

import { useState, useTransition } from "react";
import { Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useLang } from "@/components/i18n/language-provider";
import { CLASS_LEVELS, TERMS } from "@/lib/constants";
import { gradeFromMarks } from "@/lib/grade";
import { saveResults } from "@/lib/actions/results";

interface StudentRow {
  id: string;
  rollNumber: string;
  nameEn: string;
  nameBn: string;
}

export interface Selection {
  classLevel: string;
  section: string;
  term: string;
  year: string;
  subject: string;
  fullMarks: string;
}

const selectClass =
  "h-10 w-full rounded-md border border-line bg-white px-3 text-sm shadow-sm outline-none focus-visible:border-green-mid focus-visible:ring-[3px] focus-visible:ring-green-mid/30";

export function ResultEntry({
  selection,
  students,
  existing,
  ready,
  dbError,
}: {
  selection: Selection;
  students: StudentRow[];
  existing: Record<string, number>;
  ready: boolean;
  dbError: boolean;
}) {
  const { t } = useLang();
  const years = [0, 1, 2].map((d) => new Date().getFullYear() - d);
  const fullMarks = Number(selection.fullMarks) || 100;

  const [marks, setMarks] = useState<Record<string, string>>(() =>
    Object.fromEntries(students.map((s) => [s.id, existing[s.id] != null ? String(existing[s.id]) : ""]))
  );
  const [pending, start] = useTransition();
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  function onSave() {
    const entries = students.map((s) => {
      const raw = marks[s.id]?.trim();
      return { studentId: s.id, obtained: raw === "" || raw == null ? null : Number(raw) };
    });
    start(async () => {
      const res = await saveResults({
        classLevel: selection.classLevel,
        section: selection.section || undefined,
        term: selection.term,
        year: Number(selection.year),
        subject: selection.subject,
        fullMarks,
        entries,
      });
      setMsg({ ok: !!res.ok, text: res.error ?? res.message ?? "" });
    });
  }

  return (
    <div className="space-y-5">
      <h2 className="font-display text-xl font-semibold text-green-dark">
        {t("Result Entry", "ফলাফল এন্ট্রি")}
      </h2>

      {dbError && (
        <p className="rounded-md border border-amber-200 bg-amber-50 px-4 py-2.5 text-sm text-amber-800">
          {t("Database not connected — set DATABASE_URL to load students and save marks.", "ডাটাবেস সংযুক্ত নয় — DATABASE_URL সেট করুন।")}
        </p>
      )}

      {/* Selection (GET → reloads students) */}
      <form method="get" className="grid gap-4 rounded-lg border border-line bg-white p-5 shadow-sm sm:grid-cols-2 lg:grid-cols-3">
        <div className="space-y-1.5">
          <Label htmlFor="class">{t("Class *", "শ্রেণি *")}</Label>
          <select id="class" name="class" required className={selectClass} defaultValue={selection.classLevel}>
            <option value="" disabled>{t("Select class", "শ্রেণি নির্বাচন")}</option>
            {CLASS_LEVELS.map((c) => (
              <option key={c.value} value={c.value}>{t(c.en, c.bn)}</option>
            ))}
          </select>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="section">{t("Section", "শাখা")}</Label>
          <Input id="section" name="section" defaultValue={selection.section} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="term">{t("Term *", "টার্ম *")}</Label>
          <select id="term" name="term" required className={selectClass} defaultValue={selection.term}>
            <option value="" disabled>{t("Select term", "টার্ম নির্বাচন")}</option>
            {TERMS.map((tm) => (
              <option key={tm.value} value={tm.value}>{t(tm.en, tm.bn)}</option>
            ))}
          </select>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="year">{t("Year *", "বছর *")}</Label>
          <select id="year" name="year" required className={selectClass} defaultValue={selection.year || String(years[0])}>
            {years.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="subject">{t("Subject *", "বিষয় *")}</Label>
          <Input id="subject" name="subject" required defaultValue={selection.subject} placeholder={t("e.g. Qur'an Majeed", "যেমন কুরআন মাজীদ")} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="fullMarks">{t("Full Marks", "পূর্ণমান")}</Label>
          <Input id="fullMarks" name="fullMarks" type="number" defaultValue={selection.fullMarks || "100"} />
        </div>
        <div className="flex items-end">
          <Button type="submit" variant="outline">{t("Load Students", "শিক্ষার্থী লোড")}</Button>
        </div>
      </form>

      {msg && (
        <p className={`rounded-md border px-3 py-2 text-sm ${msg.ok ? "border-emerald-200 bg-emerald-50 text-emerald-800" : "border-red-300 bg-red-50 text-red-700"}`}>
          {msg.text}
        </p>
      )}

      {/* Marks grid */}
      {ready && (
        students.length === 0 ? (
          <p className="rounded-lg border border-dashed border-line bg-white p-8 text-center text-muted-ink">
            {t("No students found for this class/section.", "এই শ্রেণি/শাখায় কোনো শিক্ষার্থী নেই।")}
          </p>
        ) : (
          <div className="overflow-hidden rounded-lg border border-line bg-white">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-secondary text-left text-xs uppercase tracking-wide text-muted-ink">
                    <th className="px-4 py-2.5">{t("Roll", "রোল")}</th>
                    <th className="px-4 py-2.5">{t("Name", "নাম")}</th>
                    <th className="px-4 py-2.5 w-32">{t("Obtained", "প্রাপ্ত")} / {fullMarks}</th>
                    <th className="px-4 py-2.5">{t("Grade", "গ্রেড")}</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((s) => {
                    const raw = marks[s.id]?.trim();
                    const num = raw ? Number(raw) : null;
                    const g = num != null && !Number.isNaN(num) ? gradeFromMarks(num, fullMarks) : null;
                    return (
                      <tr key={s.id} className="border-t border-line">
                        <td className="px-4 py-2 font-mono text-xs">{s.rollNumber}</td>
                        <td className="px-4 py-2 font-medium">{t(s.nameEn, s.nameBn)}</td>
                        <td className="px-4 py-2">
                          <Input
                            type="number"
                            value={marks[s.id] ?? ""}
                            max={fullMarks}
                            min={0}
                            onChange={(e) => setMarks((m) => ({ ...m, [s.id]: e.target.value }))}
                            className="h-8 w-24"
                          />
                        </td>
                        <td className="px-4 py-2">
                          {g && (
                            <Badge variant={g.isPassed ? "green" : "red"}>
                              {g.grade} · {g.gpa.toFixed(2)}
                            </Badge>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="flex justify-end border-t border-line p-4">
              <Button onClick={onSave} disabled={pending}>
                {pending && <Loader2 className="size-4 animate-spin" />}
                <Save className="size-4" /> {t("Save Results", "ফলাফল সংরক্ষণ")}
              </Button>
            </div>
          </div>
        )
      )}
    </div>
  );
}
