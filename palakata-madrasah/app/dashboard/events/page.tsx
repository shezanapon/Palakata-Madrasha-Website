import { requireRole } from "@/lib/auth-helpers";
import { ComingSoon } from "@/components/dashboard/coming-soon";

export const dynamic = "force-dynamic";

export default async function ManageEventsPage() {
  await requireRole(["ADMIN", "PRINCIPAL"]);
  return (
    <ComingSoon
      titleEn="Events"
      titleBn="অনুষ্ঠান ব্যবস্থাপনা"
      descEn="Create and publish events (bilingual title, date, location). Follows the same pattern as the Notices module already built."
      descBn="অনুষ্ঠান তৈরি ও প্রকাশ (দ্বিভাষিক শিরোনাম, তারিখ, স্থান)। ইতিমধ্যে তৈরি নোটিশ মডিউলের অনুরূপ।"
    />
  );
}
