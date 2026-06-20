"use client";

import { useActionState, useState, useTransition } from "react";
import { Loader2, Pin, PinOff, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useLang } from "@/components/i18n/language-provider";
import {
  createNotice,
  deleteNotice,
  toggleNoticePin,
  type ActionState,
} from "@/lib/actions/notices";

interface NoticeRow {
  id: string;
  titleEn: string;
  titleBn: string;
  isPinned: boolean;
  isPublished: boolean;
  publishedAt: string;
}

const textareaClass =
  "flex w-full rounded-md border border-line bg-white px-3 py-2 text-sm shadow-sm outline-none focus-visible:border-green-mid focus-visible:ring-[3px] focus-visible:ring-green-mid/30";

export function NoticesManager({ notices, dbError }: { notices: NoticeRow[]; dbError: boolean }) {
  const { t, lang } = useLang();
  const [showForm, setShowForm] = useState(true);
  const [state, formAction, pending] = useActionState<ActionState, FormData>(createNotice, {});
  const locale = lang === "bn" ? "bn-BD" : "en-GB";

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-display text-xl font-semibold text-green-dark">
          {t("Notices", "নোটিশ")}
        </h2>
        <Button variant="outline" onClick={() => setShowForm((v) => !v)}>
          <Plus className="size-4" /> {t("New Notice", "নতুন নোটিশ")}
        </Button>
      </div>

      {dbError && (
        <p className="rounded-md border border-amber-200 bg-amber-50 px-4 py-2.5 text-sm text-amber-800">
          {t("Database not connected — set DATABASE_URL to enable saving.", "ডাটাবেস সংযুক্ত নয় — DATABASE_URL সেট করুন।")}
        </p>
      )}

      {showForm && (
        <form action={formAction} className="space-y-4 rounded-lg border border-line bg-white p-5 shadow-sm">
          {state.error && (
            <p className="rounded-md border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700">{state.error}</p>
          )}
          {state.ok && state.message && (
            <p className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">{state.message}</p>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="titleEn">{t("Title (English) *", "শিরোনাম (ইংরেজি) *")}</Label>
              <Input id="titleEn" name="titleEn" required />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="titleBn">{t("Title (Bangla) *", "শিরোনাম (বাংলা) *")}</Label>
              <Input id="titleBn" name="titleBn" required />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="contentEn">{t("Details (English)", "বিবরণ (ইংরেজি)")}</Label>
              <textarea id="contentEn" name="contentEn" rows={3} className={textareaClass} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="contentBn">{t("Details (Bangla)", "বিবরণ (বাংলা)")}</Label>
              <textarea id="contentBn" name="contentBn" rows={3} className={textareaClass} />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-5">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" name="isPublished" defaultChecked className="size-4 accent-green-dark" />
              {t("Published", "প্রকাশিত")}
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" name="isPinned" className="size-4 accent-green-dark" />
              {t("Pin to top", "উপরে পিন")}
            </label>
            <Button type="submit" disabled={pending} className="ml-auto">
              {pending && <Loader2 className="size-4 animate-spin" />}
              {t("Save Notice", "নোটিশ সংরক্ষণ")}
            </Button>
          </div>
        </form>
      )}

      <ul className="space-y-2">
        {notices.length === 0 ? (
          <li className="rounded-lg border border-dashed border-line bg-white p-8 text-center text-muted-ink">
            {t("No notices yet.", "এখনো কোনো নোটিশ নেই।")}
          </li>
        ) : (
          notices.map((n) => <NoticeItem key={n.id} notice={n} locale={locale} />)
        )}
      </ul>
    </div>
  );
}

function NoticeItem({ notice, locale }: { notice: NoticeRow; locale: string }) {
  const { t } = useLang();
  const [pending, start] = useTransition();

  return (
    <li className="flex items-start justify-between gap-3 rounded-lg border border-line bg-white p-4 shadow-sm">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <p className="font-medium text-ink">{t(notice.titleEn, notice.titleBn)}</p>
          {notice.isPinned && <Badge variant="gold">{t("Pinned", "পিন")}</Badge>}
          {!notice.isPublished && <Badge variant="amber">{t("Draft", "খসড়া")}</Badge>}
        </div>
        <p className="mt-0.5 text-xs text-muted-ink">
          {new Date(notice.publishedAt).toLocaleDateString(locale, {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-1.5">
        <Button
          variant="outline"
          size="sm"
          disabled={pending}
          onClick={() => start(async () => { await toggleNoticePin(notice.id, !notice.isPinned); })}
        >
          {notice.isPinned ? <PinOff className="size-3.5" /> : <Pin className="size-3.5" />}
        </Button>
        <Button
          variant="outline"
          size="sm"
          disabled={pending}
          onClick={() => {
            if (window.confirm(t("Delete this notice?", "এই নোটিশ মুছবেন?"))) {
              start(async () => { await deleteNotice(notice.id); });
            }
          }}
        >
          <Trash2 className="size-3.5 text-red-600" />
        </Button>
      </div>
    </li>
  );
}
