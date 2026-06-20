import { requireRole } from "@/lib/auth-helpers";
import { ComingSoon } from "@/components/dashboard/coming-soon";

export const dynamic = "force-dynamic";

export default async function ResultsPage() {
  await requireRole(["ADMIN", "PRINCIPAL", "TEACHER"]);
  return (
    <ComingSoon
      titleEn="Result Entry"
      titleBn="ফলাফল এন্ট্রি"
      descEn="Bulk result entry (class → section → term → year → subject) with auto grade & GPA calculation is the next module to wire up. The grading helper (lib/grade.ts) and Result schema are ready."
      descBn="শ্রেণি → শাখা → টার্ম → বছর → বিষয় অনুযায়ী বাল্ক ফলাফল এন্ট্রি ও স্বয়ংক্রিয় গ্রেড/জিপিএ গণনা পরবর্তী মডিউল। গ্রেডিং হেল্পার ও Result স্কিমা প্রস্তুত।"
    />
  );
}
