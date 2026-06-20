"use server";

import { revalidatePath } from "next/cache";
import { hashSync } from "bcryptjs";
import type { ClassLevel } from "@prisma/client";
import { prisma } from "@/lib/db";
import { ADMIN_ROLES, getActor } from "@/lib/auth-helpers";

export interface ActionState {
  ok?: boolean;
  error?: string;
  message?: string;
}

function isUniqueError(e: unknown): boolean {
  return (
    !!e && typeof e === "object" && "code" in e && (e as { code?: string }).code === "P2002"
  );
}

export async function createStudent(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const actor = await getActor(ADMIN_ROLES);
  if (!actor) return { error: "Not authorized." };

  const get = (k: string) => String(formData.get(k) ?? "").trim();
  const rollNumber = get("rollNumber");
  const nameEn = get("nameEn");
  const nameBn = get("nameBn");
  const fatherNameEn = get("fatherNameEn");
  const fatherNameBn = get("fatherNameBn");
  const classLevel = get("classLevel");
  const admissionYear = Number(get("admissionYear"));
  const dob = get("dateOfBirth");
  const password = get("password");

  if (!rollNumber || !nameEn || !nameBn || !fatherNameEn || !fatherNameBn || !classLevel || !admissionYear || !dob || !password) {
    return { error: "Please fill all required fields." };
  }
  if (password.length < 6) return { error: "Password must be at least 6 characters." };

  try {
    await prisma.student.create({
      data: {
        rollNumber,
        nameEn,
        nameBn,
        fatherNameEn,
        fatherNameBn,
        motherNameEn: get("motherNameEn") || null,
        motherNameBn: get("motherNameBn") || null,
        classLevel: classLevel as ClassLevel,
        section: get("section") || null,
        admissionYear,
        dateOfBirth: new Date(dob),
        phone: get("phone") || null,
        guardianPhone: get("guardianPhone") || null,
        address: get("address") || null,
        password: hashSync(password, 12),
      },
    });
    revalidatePath("/dashboard/students");
    return { ok: true, message: `Student ${nameEn} (${rollNumber}) added.` };
  } catch (e) {
    if (isUniqueError(e)) return { error: "A student with this roll number already exists." };
    return { error: "Could not save. Is the database connected?" };
  }
}

export async function setStudentActive(id: string, isActive: boolean): Promise<ActionState> {
  const actor = await getActor(ADMIN_ROLES);
  if (!actor) return { error: "Not authorized." };
  try {
    await prisma.student.update({ where: { id }, data: { isActive } });
    revalidatePath("/dashboard/students");
    return { ok: true };
  } catch {
    return { error: "Update failed." };
  }
}

export async function resetStudentPassword(id: string, newPassword: string): Promise<ActionState> {
  const actor = await getActor(ADMIN_ROLES);
  if (!actor) return { error: "Not authorized." };
  if (newPassword.length < 6) return { error: "Password must be at least 6 characters." };
  try {
    await prisma.student.update({ where: { id }, data: { password: hashSync(newPassword, 12) } });
    revalidatePath("/dashboard/students");
    return { ok: true, message: "Password reset." };
  } catch {
    return { error: "Reset failed." };
  }
}
