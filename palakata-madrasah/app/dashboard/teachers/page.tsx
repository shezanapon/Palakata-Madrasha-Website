import { requireRole } from "@/lib/auth-helpers";
import { ComingSoon } from "@/components/dashboard/coming-soon";

export const dynamic = "force-dynamic";

export default async function ManageTeachersPage() {
  await requireRole(["ADMIN", "PRINCIPAL"]);
  return (
    <ComingSoon
      titleEn="Teachers"
      titleBn="শিক্ষক ব্যবস্থাপনা"
      descEn="Add, edit and order teacher profiles (name, photo, designation, department). The Teacher schema is ready."
      descBn="শিক্ষক প্রোফাইল যোগ, সম্পাদনা ও ক্রম নির্ধারণ (নাম, ছবি, পদবি, বিভাগ)। Teacher স্কিমা প্রস্তুত।"
    />
  );
}
