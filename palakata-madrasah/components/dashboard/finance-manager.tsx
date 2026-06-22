"use client";

import { useActionState, useTransition } from "react";
import { Loader2, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useLang } from "@/components/i18n/language-provider";
import { FEE_TYPES } from "@/lib/constants";
import { addFee, setFeePaid, type ActionState } from "@/lib/actions/finance";

interface FeeRowData {
  id: string;
  en: string;
  bn: string;
  amount: number;
  paid: boolean;
  due: string | null;
}

const selectClass =
  "h-10 w-full rounded-md border border-line bg-white px-3 text-sm shadow-sm outline-none focus-visible:border-green-mid focus-visible:ring-[3px] focus-visible:ring-green-mid/30";

export function FinanceManager({
  roll,
  studentName,
  fees,
  totals,
  searched,
  dbError,
}: {
  roll: string;
  studentName: { en: string; bn: string } | null;
  fees: FeeRowData[];
  totals: { paid: number; due: number };
  searched: boolean;
  dbError: boolean;
}) {
  const { t, num } = useLang();
  const [state, formAction, pending] = useActionState<ActionState, FormData>(addFee, {});

  return (
    <div className="space-y-5">
      <h2 className="font-display text-xl font-semibold text-green-dark">{t("Finance", "অর্থ ব্যবস্থাপনা")}</h2>

      {dbError && (
        <p className="rounded-md border border-amber-200 bg-amber-50 px-4 py-2.5 text-sm text-amber-800">
          {t("Database not connected — set DATABASE_URL to manage fees.", "ডাটাবেস সংযুক্ত নয় — DATABASE_URL সেট করুন।")}
        </p>
      )}

      {/* Find student */}
      <form method="get" className="flex flex-wrap items-end gap-3 rounded-lg border border-line bg-white p-5 shadow-sm">
        <div className="flex-1 space-y-1.5">
          <Label htmlFor="roll">{t("Student Roll Number", "শিক্ষার্থীর রোল নম্বর")}</Label>
          <Input id="roll" name="roll" defaultValue={roll} placeholder="e.g. 1101" />
        </div>
        <Button type="submit" variant="outline">
          <Search className="size-4" /> {t("Find", "খুঁজুন")}
        </Button>
      </form>

      {searched && !studentName && (
        <p className="rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          {t("No student found with this roll number.", "এই রোল নম্বরে কোনো শিক্ষার্থী পাওয়া যায়নি।")}
        </p>
      )}

      {studentName && (
        <>
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-line bg-white p-4 shadow-sm">
            <p className="font-semibold text-green-dark">
              {t(studentName.en, studentName.bn)} <span className="font-mono text-xs text-muted-ink">({roll})</span>
            </p>
            <div className="flex gap-4 text-sm">
              <span className="text-emerald-700">{t("Paid", "পরিশোধিত")}: ৳ {num(totals.paid)}</span>
              <span className="text-red-700">{t("Due", "বকেয়া")}: ৳ {num(totals.due)}</span>
            </div>
          </div>

          {/* Add fee */}
          <form action={formAction} className="space-y-4 rounded-lg border border-line bg-white p-5 shadow-sm">
            <input type="hidden" name="rollNumber" value={roll} />
            {state.error && (
              <p className="rounded-md border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700">{state.error}</p>
            )}
            {state.ok && state.message && (
              <p className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">{state.message}</p>
            )}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="space-y-1.5">
                <Label htmlFor="type">{t("Fee Type *", "ফি ধরন *")}</Label>
                <select id="type" name="type" required className={selectClass} defaultValue="MONTHLY">
                  {FEE_TYPES.map((f) => (
                    <option key={f.value} value={f.value}>{t(f.en, f.bn)}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="amount">{t("Amount (৳) *", "পরিমাণ (৳) *")}</Label>
                <Input id="amount" name="amount" type="number" required />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="month">{t("Month (for monthly)", "মাস (মাসিক হলে)")}</Label>
                <Input id="month" name="month" placeholder="2026-07" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="year">{t("Year *", "বছর *")}</Label>
                <Input id="year" name="year" type="number" required defaultValue={String(new Date().getFullYear())} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="dueDate">{t("Due Date", "শেষ তারিখ")}</Label>
                <Input id="dueDate" name="dueDate" type="date" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="description">{t("Description", "বিবরণ")}</Label>
                <Input id="description" name="description" />
              </div>
            </div>
            <div className="flex items-center gap-5">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" name="isPaid" className="size-4 accent-green-dark" />
                {t("Already paid", "ইতিমধ্যে পরিশোধিত")}
              </label>
              <Button type="submit" disabled={pending} className="ml-auto">
                {pending && <Loader2 className="size-4 animate-spin" />}
                <Plus className="size-4" /> {t("Add Fee", "ফি যোগ")}
              </Button>
            </div>
          </form>

          {/* Fee list */}
          <ul className="divide-y divide-line overflow-hidden rounded-lg border border-line bg-white">
            {fees.length === 0 ? (
              <li className="p-8 text-center text-muted-ink">{t("No fees recorded yet.", "এখনো কোনো ফি নেই।")}</li>
            ) : (
              fees.map((f) => <FeeRow key={f.id} fee={f} />)
            )}
          </ul>
        </>
      )}
    </div>
  );
}

function FeeRow({ fee }: { fee: FeeRowData }) {
  const { t, num } = useLang();
  const [pending, start] = useTransition();
  return (
    <li className="flex items-center justify-between gap-3 px-4 py-3">
      <div>
        <p className="text-sm font-medium text-ink">{t(fee.en, fee.bn)}</p>
        <p className="text-xs text-muted-ink">৳ {num(fee.amount)}{fee.due ? ` · ${t("due", "শেষ")} ${fee.due}` : ""}</p>
      </div>
      <div className="flex items-center gap-2">
        {fee.paid ? <Badge variant="green">{t("PAID", "পরিশোধিত")}</Badge> : <Badge variant="red">{t("DUE", "বকেয়া")}</Badge>}
        <Button
          variant="outline"
          size="sm"
          disabled={pending}
          onClick={() => start(async () => { await setFeePaid(fee.id, !fee.paid); })}
        >
          {fee.paid ? t("Mark Due", "বকেয়া") : t("Mark Paid", "পরিশোধিত")}
        </Button>
      </div>
    </li>
  );
}
