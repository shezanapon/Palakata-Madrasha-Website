import { requireRole } from "@/lib/auth-helpers";
import { ComingSoon } from "@/components/dashboard/coming-soon";

export const dynamic = "force-dynamic";

export default async function ManageUsersPage() {
  await requireRole(["ADMIN", "PRINCIPAL"]);
  return (
    <ComingSoon
      titleEn="User Accounts"
      titleBn="ব্যবহারকারী অ্যাকাউন্ট"
      descEn="Create staff accounts with auto-generated passwords (shown once), and activate/deactivate them. Rules: Principal creates max 2 Admins; Admins create Teachers. The User schema and role rules are ready."
      descBn="স্বয়ংক্রিয় পাসওয়ার্ডসহ (একবার দেখানো) স্টাফ অ্যাকাউন্ট তৈরি ও সক্রিয়/নিষ্ক্রিয় করা। নিয়ম: অধ্যক্ষ সর্বোচ্চ ২ জন অ্যাডমিন; অ্যাডমিন শিক্ষক তৈরি করেন।"
    />
  );
}
