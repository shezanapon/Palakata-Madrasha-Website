import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";

// Next.js 16 renamed `middleware` → `proxy` (nodejs runtime). We build a
// lightweight Auth.js instance from the edge-safe config (no Prisma/bcrypt) to
// read the JWT session and guard routes.
const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const mustChange = req.auth?.user?.mustChangePassword;

  // Force password change for auto-generated passwords until changed.
  if (req.auth && mustChange && pathname !== "/change-password") {
    return Response.redirect(new URL("/change-password", req.url));
  }

  // Protect all dashboard routes.
  if (pathname.startsWith("/dashboard") && !req.auth) {
    return Response.redirect(new URL("/sign-in", req.url));
  }
});

export const config = {
  matcher: ["/dashboard/:path*", "/change-password"],
};
