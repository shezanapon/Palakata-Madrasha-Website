import type { ClassLevel, Term } from "@prisma/client";
import { requireRole, STAFF_ROLES } from "@/lib/auth-helpers";
import { prisma } from "@/lib/db";
import { ResultEntry, type Selection } from "@/components/dashboard/result-entry";

export const dynamic = "force-dynamic";

interface SP {
  class?: string;
  section?: string;
  term?: string;
  year?: string;
  subject?: string;
  fullMarks?: string;
}

export default async function ResultsPage({ searchParams }: { searchParams: Promise<SP> }) {
  await requireRole(STAFF_ROLES);
  const sp = await searchParams;

  const selection: Selection = {
    classLevel: sp.class ?? "",
    section: sp.section ?? "",
    term: sp.term ?? "",
    year: sp.year ?? "",
    subject: sp.subject ?? "",
    fullMarks: sp.fullMarks ?? "100",
  };

  const ready = Boolean(sp.class && sp.term && sp.year && sp.subject);
  let students: { id: string; rollNumber: string; nameEn: string; nameBn: string }[] = [];
  let existing: Record<string, number> = {};
  let dbError = false;

  if (ready) {
    try {
      students = await prisma.student.findMany({
        where: {
          classLevel: sp.class as ClassLevel,
          isActive: true,
          ...(sp.section ? { section: sp.section } : {}),
        },
        orderBy: { rollNumber: "asc" },
        select: { id: true, rollNumber: true, nameEn: true, nameBn: true },
      });

      const prior = await prisma.result.findMany({
        where: {
          studentId: { in: students.map((s) => s.id) },
          term: sp.term as Term,
          year: Number(sp.year),
          subject: sp.subject,
        },
        select: { studentId: true, obtainedMarks: true },
      });
      existing = Object.fromEntries(
        prior.filter((p) => p.obtainedMarks != null).map((p) => [p.studentId, p.obtainedMarks as number])
      );
    } catch {
      dbError = true;
    }
  }

  return (
    <ResultEntry
      selection={selection}
      students={students}
      existing={existing}
      ready={ready}
      dbError={dbError}
    />
  );
}
