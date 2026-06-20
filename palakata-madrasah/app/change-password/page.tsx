"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { KeyRound, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLang } from "@/components/i18n/language-provider";

export default function ChangePasswordPage() {
  const { t } = useLang();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const newPassword = String(form.get("newPassword") ?? "");
    const confirm = String(form.get("confirm") ?? "");

    if (newPassword.length < 8) {
      setError(t("Password must be at least 8 characters.", "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।"));
      return;
    }
    if (newPassword !== confirm) {
      setError(t("Passwords do not match.", "পাসওয়ার্ড মিলছে না।"));
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: String(form.get("currentPassword") ?? ""),
          newPassword,
        }),
      });
      if (res.ok) {
        setDone(true);
        // Token still carries the old flag — re-login with the new password.
        setTimeout(() => signOut({ redirectTo: "/sign-in" }), 1500);
      } else if (res.status === 400) {
        setError(t("Current password is incorrect or new password is too weak.", "বর্তমান পাসওয়ার্ড ভুল বা নতুন পাসওয়ার্ড দুর্বল।"));
      } else {
        setError(t("Could not change password. Please try again.", "পাসওয়ার্ড পরিবর্তন করা যায়নি। আবার চেষ্টা করুন।"));
      }
    } catch {
      setError(t("Network error. Please try again.", "নেটওয়ার্ক সমস্যা। আবার চেষ্টা করুন।"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="pattern-overlay relative flex min-h-screen items-center justify-center bg-[#0c1142] p-5">
      <div className="relative z-[1] w-full max-w-[420px] overflow-hidden rounded-xl bg-white shadow-2xl">
        <div className="border-b-[3px] border-gold bg-gradient-to-br from-green-dark to-green-mid p-7 text-center text-white">
          <KeyRound className="mx-auto mb-2 size-9 text-gold" strokeWidth={1.5} />
          <h1 className="font-display text-lg font-semibold">{t("Change Password", "পাসওয়ার্ড পরিবর্তন")}</h1>
          <p className="mt-0.5 text-xs text-white/70">
            {t("Set a new password to continue", "চালিয়ে যেতে নতুন পাসওয়ার্ড দিন")}
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4 p-7">
          {error && (
            <p className="rounded-md border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
          )}
          {done && (
            <p className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
              {t("Password changed. Please sign in again…", "পাসওয়ার্ড পরিবর্তিত হয়েছে। আবার লগইন করুন…")}
            </p>
          )}

          <div className="space-y-1.5">
            <Label htmlFor="currentPassword">{t("Current Password", "বর্তমান পাসওয়ার্ড")}</Label>
            <Input id="currentPassword" name="currentPassword" type="password" autoComplete="current-password" />
            <p className="text-xs text-muted-ink">
              {t("(Leave blank if this is your first login.)", "(প্রথমবার লগইন হলে খালি রাখুন।)")}
            </p>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="newPassword">{t("New Password", "নতুন পাসওয়ার্ড")}</Label>
            <Input id="newPassword" name="newPassword" type="password" required autoComplete="new-password" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="confirm">{t("Confirm New Password", "নতুন পাসওয়ার্ড নিশ্চিত করুন")}</Label>
            <Input id="confirm" name="confirm" type="password" required autoComplete="new-password" />
          </div>

          <Button type="submit" className="w-full" disabled={loading || done}>
            {loading && <Loader2 className="size-4 animate-spin" />}
            {t("Update Password", "পাসওয়ার্ড আপডেট করুন")}
          </Button>
        </form>
      </div>
    </div>
  );
}
