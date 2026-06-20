import { prisma } from "@/lib/db";

/** Public result lookup: roll number + year + term → published results. */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const rollNumber = String(body.rollNumber ?? "").trim();
    const year = Number(body.year);
    const term = String(body.term ?? "");

    if (!rollNumber || !year || !term) {
      return Response.json({ error: "missing_fields" }, { status: 400 });
    }

    const student = await prisma.student.findUnique({
      where: { rollNumber },
      select: { id: true, nameEn: true, nameBn: true, rollNumber: true, classLevel: true, section: true },
    });
    if (!student) {
      return Response.json({ error: "not_found" }, { status: 404 });
    }

    const results = await prisma.result.findMany({
      where: { studentId: student.id, year, term: term as "FIRST" | "SECOND" },
      orderBy: { subject: "asc" },
      select: { subject: true, fullMarks: true, obtainedMarks: true, grade: true, gpa: true, isPassed: true },
    });

    return Response.json({ student, results });
  } catch {
    // Most likely the database is not yet configured / reachable.
    return Response.json({ error: "unavailable" }, { status: 503 });
  }
}
