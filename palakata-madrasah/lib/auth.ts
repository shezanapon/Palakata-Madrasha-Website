import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compareSync } from "bcryptjs";
import { prisma } from "@/lib/db";
import { authConfig } from "@/lib/auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const username = credentials?.username as string | undefined;
        const password = credentials?.password as string | undefined;
        if (!username || !password) return null;

        // 1) Staff/admin accounts — User table, by username.
        const user = await prisma.user.findUnique({ where: { username } });
        if (user) {
          if (!user.isActive) return null; // account deactivated
          if (!compareSync(password, user.password)) return null; // wrong password
          return {
            id: user.id,
            username: user.username,
            name: user.nameEn,
            role: user.role,
            mustChangePassword: user.mustChangePassword,
          };
        }

        // 2) Students — Student table, by roll number (spec §13).
        const student = await prisma.student.findUnique({
          where: { rollNumber: username },
        });
        if (student) {
          if (!student.isActive) return null;
          if (!compareSync(password, student.password)) return null;
          return {
            id: student.id,
            username: student.rollNumber,
            name: student.nameEn,
            role: "STUDENT",
            mustChangePassword: false,
          };
        }

        return null; // not found in either table
      },
    }),
  ],
});
