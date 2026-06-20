import type { DefaultSession } from "next-auth";

export type AppRole = "PRINCIPAL" | "ADMIN" | "TEACHER" | "STUDENT";

declare module "next-auth" {
  interface Session {
    user: {
      role: AppRole;
      username: string;
      mustChangePassword: boolean;
    } & DefaultSession["user"];
  }

  // Shape returned by the Credentials `authorize` callback.
  interface User {
    role: AppRole;
    username: string;
    mustChangePassword: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: AppRole;
    username: string;
    mustChangePassword: boolean;
  }
}
