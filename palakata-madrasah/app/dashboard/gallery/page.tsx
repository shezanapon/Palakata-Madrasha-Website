import { requireRole } from "@/lib/auth-helpers";
import { ComingSoon } from "@/components/dashboard/coming-soon";

export const dynamic = "force-dynamic";

export default async function ManageGalleryPage() {
  await requireRole(["ADMIN", "PRINCIPAL"]);
  return (
    <ComingSoon
      titleEn="Gallery"
      titleBn="গ্যালারি ব্যবস্থাপনা"
      descEn="Upload images (auto-compressed to WebP via the /api/upload route + sharp) and organise them by category. The R2 + compression pipeline is ready."
      descBn="ছবি আপলোড (sharp দিয়ে স্বয়ংক্রিয়ভাবে WebP-তে কম্প্রেস) ও ক্যাটাগরি অনুযায়ী সাজানো। R2 + কম্প্রেশন পাইপলাইন প্রস্তুত।"
    />
  );
}
