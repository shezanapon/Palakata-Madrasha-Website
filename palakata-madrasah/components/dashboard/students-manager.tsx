"use client";

import { useActionState, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Plus, UserCheck, UserX, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useLang } from "@/components/i18n/language-provider";
import { CLASS_LEVELS, classLabel } from "@/lib/constants";
import {
  createStudent,
  resetStudentPassword,
  setStudentActive,
  type ActionState,
} from "@/lib/actions/students";

interface StudentRow {
  id: string;
  rollNumber: string;
  nameEn: string;
  nameBn: string;
  classLevel: string;
  section: string | null;
  isActive: boolean;
}

const selectClass =
  "h-10 w-full rounded-md border border-line bg-white px-3 text-sm shadow-sm outline-none focus-visible:border-green-mid focus-visible:ring-[3px] focus-visible:ring-green-mid/30";

export function StudentsManager({
  students,
  currentClass,
  dbError,
}: {
  students: StudentRow[];
  currentClass: string;
  dbError: boolean;
}) {
  const { t } = useLang();
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [state, formAction, pending] = useActionState<ActionState, FormData>(createStudent, {});

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-display text-xl font-semibold text-green-dark">
          {t("Student Management", "শিক্ষার্থী ব্যবস্থাপনা")}
        </h2>
        <Button onClick={() => setShowForm((v) => !v)}>
          <Plus className="size-4" /> {t("Add Student", "শিক্ষার্থী যোগ")}
        </Button>
      </div>

      {dbError && (
        <p className="rounded-md border border-amber-200 bg-amber-50 px-4 py-2.5 text-sm text-amber-800">
          {t(
            "Database not connected — set DATABASE_URL and run `npx prisma db push` to enable saving.",
            "ডাটাবেস সংযুক্ত নয় — DATABASE_URL সেট করে `npx prisma db push` চালান।"
          )}
        </p>
      )}

      {/* Add form */}
      {showForm && (
        <form
          action={formAction}
          className="space-y-4 rounded-lg border border-line bg-white p-5 shadow-sm"
        >
          {state.error && (
            <p className="rounded-md border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700">{state.error}</p>
          )}
          {state.ok && state.message && (
            <p className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">{state.message}</p>
          )}

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Field name="rollNumber" label={t("Roll Number *", "রোল নম্বর *")} required />
            <div className="space-y-1.5">
              <Label htmlFor="classLevel">{t("Class *", "শ্রেণি *")}</Label>
              <select id="classLevel" name="classLevel" required className={selectClass} defaultValue="">
                <option value="" disabled>{t("Select class", "শ্রেণি নির্বাচন")}</option>
                {CLASS_LEVELS.map((c) => (
                  <option key={c.value} value={c.value}>{t(c.en, c.bn)}</option>
                ))}
              </select>
            </div>
            <Field name="section" label={t("Section", "শাখা")} />
            <Field name="nameEn" label={t("Name (English) *", "নাম (ইংরেজি) *")} required />
            <Field name="nameBn" label={t("Name (Bangla) *", "নাম (বাংলা) *")} required />
            <Field name="dateOfBirth" label={t("Date of Birth *", "জন্ম তারিখ *")} type="date" required />
            <Field name="fatherNameEn" label={t("Father (English) *", "পিতা (ইংরেজি) *")} required />
            <Field name="fatherNameBn" label={t("Father (Bangla) *", "পিতা (বাংলা) *")} required />
            <Field name="motherNameEn" label={t("Mother (English)", "মাতা (ইংরেজি)")} />
            <Field name="admissionYear" label={t("Admission Year *", "ভর্তি বছর *")} type="number" required defaultValue={String(new Date().getFullYear())} />
            <Field name="phone" label={t("Phone", "ফোন")} />
            <Field name="guardianPhone" label={t("Guardian Phone", "অভিভাবক ফোন")} />
            <Field name="address" label={t("Address", "ঠিকানা")} />
            <Field name="password" label={t("Initial Password *", "প্রাথমিক পাসওয়ার্ড *")} required />
          </div>

          <Button type="submit" disabled={pending}>
            {pending && <Loader2 className="size-4 animate-spin" />}
            {t("Save Student", "শিক্ষার্থী সংরক্ষণ")}
          </Button>
        </form>
      )}

      {/* Class filter */}
      <div className="flex items-center gap-3">
        <Label htmlFor="filter" className="shrink-0 text-sm">{t("Filter by class", "শ্রেণি অনুযায়ী")}</Label>
        <select
          id="filter"
          className={`${selectClass} max-w-xs`}
          value={currentClass}
          onChange={(e) => {
            const v = e.target.value;
            router.push(v ? `/dashboard/students?class=${v}` : "/dashboard/students");
          }}
        >
          <option value="">{t("All classes", "সব শ্রেণি")}</option>
          {CLASS_LEVELS.map((c) => (
            <option key={c.value} value={c.value}>{t(c.en, c.bn)}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-lg border border-line bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-secondary text-left text-xs uppercase tracking-wide text-muted-ink">
                <th className="px-4 py-2.5">{t("Roll", "রোল")}</th>
                <th className="px-4 py-2.5">{t("Name", "নাম")}</th>
                <th className="px-4 py-2.5">{t("Class", "শ্রেণি")}</th>
                <th className="px-4 py-2.5">{t("Status", "অবস্থা")}</th>
                <th className="px-4 py-2.5 text-right">{t("Actions", "অ্যাকশন")}</th>
              </tr>
            </thead>
            <tbody>
              {students.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center text-muted-ink">
                    {t("No students yet.", "এখনো কোনো শিক্ষার্থী নেই।")}
                  </td>
                </tr>
              ) : (
                students.map((s) => {
                  const cl = classLabel(s.classLevel);
                  return (
                    <tr key={s.id} className="border-t border-line">
                      <td className="px-4 py-2.5 font-mono text-xs">{s.rollNumber}</td>
                      <td className="px-4 py-2.5 font-medium">{t(s.nameEn, s.nameBn)}</td>
                      <td className="px-4 py-2.5">
                        {t(cl.en, cl.bn)}
                        {s.section ? ` · ${s.section}` : ""}
                      </td>
                      <td className="px-4 py-2.5">
                        {s.isActive ? (
                          <Badge variant="green">{t("Active", "সক্রিয়")}</Badge>
                        ) : (
                          <Badge variant="red">{t("Disabled", "নিষ্ক্রিয়")}</Badge>
                        )}
                      </td>
                      <td className="px-4 py-2.5">
                        <RowActions student={s} />
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function RowActions({ student }: { student: StudentRow }) {
  const { t } = useLang();
  const [pending, start] = useTransition();

  return (
    <div className="flex items-center justify-end gap-1.5">
      <Button
        variant="outline"
        size="sm"
        disabled={pending}
        onClick={() => start(async () => { await setStudentActive(student.id, !student.isActive); })}
      >
        {student.isActive ? <UserX className="size-3.5" /> : <UserCheck className="size-3.5" />}
        {student.isActive ? t("Disable", "নিষ্ক্রিয়") : t("Enable", "সক্রিয়")}
      </Button>
      <Button
        variant="outline"
        size="sm"
        disabled={pending}
        onClick={() => {
          const pw = window.prompt(t("New password for this student:", "এই শিক্ষার্থীর নতুন পাসওয়ার্ড:"));
          if (pw) start(async () => {
            const res = await resetStudentPassword(student.id, pw);
            window.alert(res.error ?? t("Password reset.", "পাসওয়ার্ড রিসেট হয়েছে।"));
          });
        }}
      >
        <KeyRound className="size-3.5" />
        {t("Reset PW", "পাসওয়ার্ড")}
      </Button>
    </div>
  );
}

function Field({
  name,
  label,
  type = "text",
  required,
  defaultValue,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  defaultValue?: string;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} name={name} type={type} required={required} defaultValue={defaultValue} />
    </div>
  );
}
