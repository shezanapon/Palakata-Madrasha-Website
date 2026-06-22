import { requireRole } from "@/lib/auth-helpers";
import { prisma } from "@/lib/db";
import { feeLabel } from "@/lib/fees";
import { FinanceManager } from "@/components/dashboard/finance-manager";

export const dynamic = "force-dynamic";

export default async function FinancePage({
  searchParams,
}: {
  searchParams: Promise<{ roll?: string }>;
}) {
  await requireRole(["ADMIN", "PRINCIPAL"]);
  const { roll = "" } = await searchParams;

  let studentName: { en: string; bn: string } | null = null;
  let fees: { id: string; en: string; bn: string; amount: number; paid: boolean; due: string | null }[] = [];
  let totals = { paid: 0, due: 0 };
  let dbError = false;

  if (roll) {
    try {
      const student = await prisma.student.findUnique({
        where: { rollNumber: roll },
        include: { fees: { orderBy: { createdAt: "desc" } } },
      });
      if (student) {
        studentName = { en: student.nameEn, bn: student.nameBn };
        fees = student.fees.map((f) => {
          const label = feeLabel(f.type, f.month, f.year);
          return {
            id: f.id,
            en: label.en,
            bn: label.bn,
            amount: f.amount,
            paid: f.isPaid,
            due: f.dueDate ? f.dueDate.toISOString().slice(0, 10) : null,
          };
        });
        totals = student.fees.reduce(
          (acc, f) => (f.isPaid ? { ...acc, paid: acc.paid + f.amount } : { ...acc, due: acc.due + f.amount }),
          { paid: 0, due: 0 }
        );
      }
    } catch {
      dbError = true;
    }
  }

  return (
    <FinanceManager
      roll={roll}
      studentName={studentName}
      fees={fees}
      totals={totals}
      searched={Boolean(roll)}
      dbError={dbError}
    />
  );
}
