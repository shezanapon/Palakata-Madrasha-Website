import { requireRole } from "@/lib/auth-helpers";
import { ComingSoon } from "@/components/dashboard/coming-soon";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  await requireRole(["ADMIN", "PRINCIPAL"]);
  return (
    <ComingSoon
      titleEn="Site Settings"
      titleBn="সাইট সেটিংস"
      descEn="Edit institution details (principal name, phone, EIIN, about text) that currently live in lib/site.ts. A settings table can back these for live editing."
      descBn="প্রতিষ্ঠানের তথ্য সম্পাদনা (অধ্যক্ষের নাম, ফোন, ইআইআইএন, পরিচিতি) যা বর্তমানে lib/site.ts-এ আছে।"
    />
  );
}
