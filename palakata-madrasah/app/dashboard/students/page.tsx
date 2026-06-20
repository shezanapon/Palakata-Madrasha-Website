import type { ClassLevel } from "@prisma/client";
import { requireRole } from "@/lib/auth-helpers";
import { prisma } from "@/lib/db";
import { StudentsManager } from "@/components/dashboard/students-manager";

export const dynamic = "force-dynamic";

export default async function StudentsPage({
  searchParams,
}: {
  searchParams: Promise<{ class?: string }>;
}) {
  await requireRole(["ADMIN", "PRINCIPAL"]);
  const { class: cls } = await searchParams;

  let students: Awaited<ReturnType<typeof loadStudents>> = [];
  let dbError = false;
  try {
    students = await loadStudents(cls);
  } catch {
    dbError = true;
  }

  return <StudentsManager students={students} currentClass={cls ?? ""} dbError={dbError} />;
}

function loadStudents(cls?: string) {
  return prisma.student.findMany({
    where: cls ? { classLevel: cls as ClassLevel } : {},
    orderBy: [{ classLevel: "asc" }, { rollNumber: "asc" }],
    select: {
      id: true,
      rollNumber: true,
      nameEn: true,
      nameBn: true,
      classLevel: true,
      section: true,
      isActive: true,
    },
  });
}
