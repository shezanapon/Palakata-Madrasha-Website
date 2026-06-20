"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Home, Loader2, Lock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MadrasahSeal } from "@/components/ui/madrasah-seal";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { useLang } from "@/components/i18n/language-provider";
import { site } from "@/lib/site";

export default function SignInPage() {
  const { t } = useLang();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setLoading(true);
    setError(null);
    try {
      const res = await signIn("credentials", {
        redirect: false,
        username: String(form.get("username") ?? ""),
        password: String(form.get("password") ?? ""),
      });
      if (res?.error) {
        setError(t("Invalid username or password, or your account is disabled.", "ভুল ইউজারনেম বা পাসওয়ার্ড, অথবা আপনার অ্যাকাউন্ট নিষ্ক্রিয়।"));
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch {
      setError(t("Login service is unavailable. Please try again later.", "লগইন সেবা উপলব্ধ নয়। পরে চেষ্টা করুন।"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="pattern-overlay relative flex min-h-screen items-center justify-center bg-[#0c1142] p-5">
      <div className="absolute right-4 top-4 z-10">
        <LanguageToggle />
      </div>

      <div className="relative z-[1] w-full max-w-[420px] overflow-hidden rounded-xl bg-white shadow-2xl">
        <div className="border-b-[3px] border-gold bg-gradient-to-br from-green-dark to-green-mid p-7 text-center">
          <MadrasahSeal className="mx-auto mb-3 size-16" />
          <h1 className="font-display text-lg font-semibold text-white">
            {t(site.name.en, site.name.bn)}
          </h1>
          <p className="mt-0.5 text-xs text-white/70">
            {t("Sign in to your account", "আপনার অ্যাকাউন্টে লগইন করুন")}
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4 p-7">
          {error && (
            <p className="rounded-md border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </p>
          )}

          <div className="space-y-1.5">
            <Label htmlFor="username">{t("Username / Roll", "ইউজারনেম / রোল")}</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-ink" strokeWidth={1.5} />
              <Input id="username" name="username" required autoComplete="username" className="pl-9" />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="password">{t("Password", "পাসওয়ার্ড")}</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-ink" strokeWidth={1.5} />
              <Input id="password" name="password" type="password" required autoComplete="current-password" className="pl-9" />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading && <Loader2 className="size-4 animate-spin" />}
            {t("Sign In", "লগইন")}
          </Button>

          <Link
            href="/"
            className="flex items-center justify-center gap-1.5 text-sm text-muted-ink hover:text-green-dark"
          >
            <Home className="size-4" strokeWidth={1.5} />
            {t("Back to website", "ওয়েবসাইটে ফিরুন")}
          </Link>
        </form>
      </div>
    </div>
  );
}
