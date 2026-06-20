"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { ADMIN_ROLES, getActor } from "@/lib/auth-helpers";

export interface ActionState {
  ok?: boolean;
  error?: string;
  message?: string;
}

function revalidateNotices() {
  revalidatePath("/dashboard/notices");
  revalidatePath("/notice");
  revalidatePath("/");
}

export async function createNotice(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const actor = await getActor(ADMIN_ROLES);
  if (!actor) return { error: "Not authorized." };

  const get = (k: string) => String(formData.get(k) ?? "").trim();
  const titleEn = get("titleEn");
  const titleBn = get("titleBn");
  if (!titleEn || !titleBn) return { error: "Both English and Bangla titles are required." };

  try {
    await prisma.notice.create({
      data: {
        titleEn,
        titleBn,
        contentEn: get("contentEn") || null,
        contentBn: get("contentBn") || null,
        isPinned: formData.get("isPinned") === "on",
        isPublished: formData.get("isPublished") === "on",
      },
    });
    revalidateNotices();
    return { ok: true, message: "Notice saved." };
  } catch {
    return { error: "Could not save. Is the database connected?" };
  }
}

export async function deleteNotice(id: string): Promise<ActionState> {
  const actor = await getActor(ADMIN_ROLES);
  if (!actor) return { error: "Not authorized." };
  try {
    await prisma.notice.delete({ where: { id } });
    revalidateNotices();
    return { ok: true };
  } catch {
    return { error: "Delete failed." };
  }
}

export async function toggleNoticePin(id: string, isPinned: boolean): Promise<ActionState> {
  const actor = await getActor(ADMIN_ROLES);
  if (!actor) return { error: "Not authorized." };
  try {
    await prisma.notice.update({ where: { id }, data: { isPinned } });
    revalidateNotices();
    return { ok: true };
  } catch {
    return { error: "Update failed." };
  }
}
