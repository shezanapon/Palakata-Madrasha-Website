import { compareSync, hashSync } from "bcryptjs";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.username) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }

  let body: { currentPassword?: string; newPassword?: string };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "bad_request" }, { status: 400 });
  }

  const newPassword = String(body.newPassword ?? "");
  if (newPassword.length < 8) {
    return Response.json({ error: "weak_password" }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({ where: { username: session.user.username } });
    if (!user) return Response.json({ error: "not_found" }, { status: 404 });

    // If this is a normal change (not a forced first-login change), verify the current password.
    if (!user.mustChangePassword) {
      const current = String(body.currentPassword ?? "");
      if (!current || !compareSync(current, user.password)) {
        return Response.json({ error: "bad_current" }, { status: 400 });
      }
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashSync(newPassword, 12), mustChangePassword: false },
    });

    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "unavailable" }, { status: 503 });
  }
}
