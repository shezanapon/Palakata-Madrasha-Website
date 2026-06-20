import { requireRole } from "@/lib/auth-helpers";
import { prisma } from "@/lib/db";
import { NoticesManager } from "@/components/dashboard/notices-manager";

export const dynamic = "force-dynamic";

export default async function NoticesPage() {
  await requireRole(["ADMIN", "PRINCIPAL"]);

  let notices: { id: string; titleEn: string; titleBn: string; isPinned: boolean; isPublished: boolean; publishedAt: string }[] = [];
  let dbError = false;
  try {
    const rows = await prisma.notice.findMany({
      orderBy: [{ isPinned: "desc" }, { publishedAt: "desc" }],
      select: { id: true, titleEn: true, titleBn: true, isPinned: true, isPublished: true, publishedAt: true },
    });
    notices = rows.map((n) => ({ ...n, publishedAt: n.publishedAt.toISOString() }));
  } catch {
    dbError = true;
  }

  return <NoticesManager notices={notices} dbError={dbError} />;
}
