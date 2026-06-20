import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";

// Reads the session per-request; never statically prerendered.
export const dynamic = "force-dynamic";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect("/sign-in");

  return (
    <DashboardShell
      role={session.user.role}
      name={session.user.name ?? session.user.username}
      username={session.user.username}
    >
      {children}
    </DashboardShell>
  );
}
