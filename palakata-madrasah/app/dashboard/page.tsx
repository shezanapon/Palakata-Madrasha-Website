import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { classLabel } from "@/lib/constants";
import { feeLabel } from "@/lib/fees";
import { overallGpa } from "@/lib/grade";
import { AdminOverview } from "@/components/dashboard/admin-overview";
import { StudentPortal, type StudentData } from "@/components/dashboard/student-portal";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await auth();
  const user = session!.user; // guaranteed by layout guard

  if (user.role === "STUDENT") {
    const data = await loadStudentData(user.username);
    return <StudentPortal name={user.name ?? user.username} username={user.username} data={data} />;
  }
  return <AdminOverview role={user.role} />;
}

async function loadStudentData(rollNumber: string): Promise<StudentData | null> {
  try {
    const student = await prisma.student.findUnique({
      where: { rollNumber },
      include: {
        results: { orderBy: [{ year: "desc" }, { subject: "asc" }] },
        fees: { orderBy: { createdAt: "desc" } },
      },
    });
    if (!student) return null;

    const cl = classLabel(student.classLevel);
    return {
      classEn: cl.en,
      classBn: cl.bn,
      section: student.section,
      fatherEn: student.fatherNameEn,
      fatherBn: student.fatherNameBn,
      results: student.results.map((r) => ({
        subject: r.subject,
        full: r.fullMarks,
        obtained: r.obtainedMarks,
        grade: r.grade,
      })),
      gpa: overallGpa(student.results.map((r) => ({ gpa: r.gpa, isPassed: r.isPassed }))),
      fees: student.fees.map((f) => {
        const label = feeLabel(f.type, f.month, f.year);
        return { en: label.en, bn: label.bn, amount: f.amount, paid: f.isPaid };
      }),
    };
  } catch {
    return null; // DB unavailable → portal shows demo data
  }
}
