import { requireRole } from "@/lib/auth-helpers";
import { ComingSoon } from "@/components/dashboard/coming-soon";

export const dynamic = "force-dynamic";

export default async function FinancePage() {
  await requireRole(["ADMIN", "PRINCIPAL"]);
  return (
    <ComingSoon
      titleEn="Finance"
      titleBn="অর্থ ব্যবস্থাপনা"
      descEn="Add fees per student (monthly / admission / exam / other), mark Paid or Due, and view payment history. The Fee schema and fee types (lib/constants.ts) are ready to wire up."
      descBn="শিক্ষার্থীপ্রতি ফি যোগ (মাসিক / ভর্তি / পরীক্ষা / অন্যান্য), পরিশোধিত বা বকেয়া চিহ্নিত করা এবং পেমেন্ট ইতিহাস। Fee স্কিমা ও ফি টাইপ প্রস্তুত।"
    />
  );
}
