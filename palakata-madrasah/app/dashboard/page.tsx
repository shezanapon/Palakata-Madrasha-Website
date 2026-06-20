import { auth } from "@/lib/auth";
import { AdminOverview } from "@/components/dashboard/admin-overview";
import { StudentPortal } from "@/components/dashboard/student-portal";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await auth();
  const user = session!.user; // guaranteed by layout guard

  if (user.role === "STUDENT") {
    return <StudentPortal name={user.name ?? user.username} username={user.username} />;
  }
  return <AdminOverview role={user.role} />;
}
