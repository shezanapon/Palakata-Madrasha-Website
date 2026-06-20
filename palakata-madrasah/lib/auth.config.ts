import type { NextAuthConfig } from "next-auth";
import type { AppRole } from "@/types/next-auth";

/**
 * Edge/proxy-safe Auth.js config: NO database or bcrypt imports here, so it can
 * be used by `proxy.ts`. The Credentials provider (which needs Prisma) is added
 * in `lib/auth.ts`. Callbacks live here so both instances share JWT/session shape.
 */
export const authConfig = {
  pages: { signIn: "/sign-in" },
  session: { strategy: "jwt" },
  providers: [], // added in lib/auth.ts
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.username = user.username;
        token.mustChangePassword = user.mustChangePassword;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as AppRole;
        session.user.username = token.username as string;
        session.user.mustChangePassword = Boolean(token.mustChangePassword);
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
