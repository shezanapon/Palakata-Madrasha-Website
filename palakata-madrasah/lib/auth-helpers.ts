import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import type { AppRole } from "@/types/next-auth";

/** For pages/layouts — redirects if not signed in or role not allowed. */
export async function requireRole(roles: AppRole[]) {
  const session = await auth();
  if (!session?.user) redirect("/sign-in");
  if (!roles.includes(session.user.role)) redirect("/dashboard");
  return session.user;
}

/** For server actions — returns the user or null (no redirect/throw). */
export async function getActor(roles: AppRole[]) {
  const session = await auth();
  if (!session?.user) return null;
  if (!roles.includes(session.user.role)) return null;
  return session.user;
}

export const ADMIN_ROLES: AppRole[] = ["ADMIN", "PRINCIPAL"];
export const STAFF_ROLES: AppRole[] = ["ADMIN", "PRINCIPAL", "TEACHER"];
