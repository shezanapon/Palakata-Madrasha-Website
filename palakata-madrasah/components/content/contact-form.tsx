"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLang } from "@/components/i18n/language-provider";

export function ContactForm() {
  const { t } = useLang();
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // [UPDATE] Wire this to an API route / email service. For now confirm locally.
    setSent(true);
    e.currentTarget.reset();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="name">{t("Your Name", "আপনার নাম")}</Label>
          <Input id="name" name="name" required autoComplete="name" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="phone">{t("Phone / Email", "ফোন / ইমেইল")}</Label>
          <Input id="phone" name="phone" required />
        </div>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="subject">{t("Subject", "বিষয়")}</Label>
        <Input id="subject" name="subject" />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="message">{t("Message", "বার্তা")}</Label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="flex w-full rounded-md border border-line bg-white px-3 py-2 text-sm shadow-sm outline-none focus-visible:border-green-mid focus-visible:ring-[3px] focus-visible:ring-green-mid/30"
        />
      </div>

      {sent && (
        <p className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
          {t(
            "Thank you! Your message has been received.",
            "ধন্যবাদ! আপনার বার্তা গৃহীত হয়েছে।"
          )}
        </p>
      )}

      <Button type="submit" variant="cta">
        <Send className="size-4" strokeWidth={2} />
        {t("Send Message", "বার্তা পাঠান")}
      </Button>
    </form>
  );
}
