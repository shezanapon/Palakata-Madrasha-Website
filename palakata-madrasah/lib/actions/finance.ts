"use server";

import { revalidatePath } from "next/cache";
import type { FeeType } from "@prisma/client";
import { prisma } from "@/lib/db";
import { ADMIN_ROLES, getActor } from "@/lib/auth-helpers";

export interface ActionState {
  ok?: boolean;
  error?: string;
  message?: string;
}

export async function addFee(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const actor = await getActor(ADMIN_ROLES);
  if (!actor) return { error: "Not authorized." };

  const get = (k: string) => String(formData.get(k) ?? "").trim();
  const rollNumber = get("rollNumber");
  const type = get("type");
  const amount = Number(get("amount"));
  const year = Number(get("year"));

  if (!rollNumber || !type || !amount || !year) return { error: "Roll, type, amount and year are required." };
  if (amount <= 0) return { error: "Amount must be greater than 0." };

  try {
    const student = await prisma.student.findUnique({ where: { rollNumber }, select: { id: true } });
    if (!student) return { error: "No student with this roll number." };

    const isPaid = formData.get("isPaid") === "on";
    const dueDate = get("dueDate");

    await prisma.fee.create({
      data: {
        studentId: student.id,
        type: type as FeeType,
        amount,
        month: get("month") || null,
        year,
        description: get("description") || null,
        isPaid,
        paidAt: isPaid ? new Date() : null,
        dueDate: dueDate ? new Date(dueDate) : null,
      },
    });

    revalidatePath("/dashboard/finance");
    revalidatePath("/dashboard");
    return { ok: true, message: "Fee added." };
  } catch {
    return { error: "Could not save. Is the database connected?" };
  }
}

export async function setFeePaid(id: string, paid: boolean): Promise<ActionState> {
  const actor = await getActor(ADMIN_ROLES);
  if (!actor) return { error: "Not authorized." };
  try {
    await prisma.fee.update({
      where: { id },
      data: { isPaid: paid, paidAt: paid ? new Date() : null },
    });
    revalidatePath("/dashboard/finance");
    revalidatePath("/dashboard");
    return { ok: true };
  } catch {
    return { error: "Update failed." };
  }
}
