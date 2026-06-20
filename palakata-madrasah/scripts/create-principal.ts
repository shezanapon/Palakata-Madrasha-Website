/**
 * Seed the first PRINCIPAL (super-admin) account. Run once:
 *   npm run seed:principal      (or: npx tsx scripts/create-principal.ts)
 *
 * Update the username / names / password below before running.
 */
import { PrismaClient } from "@prisma/client";
import { hashSync } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const username = "principal"; // [UPDATE to real username]
  const initialPassword = "Change@123"; // [UPDATE] — shown once, must be changed on first login

  const existing = await prisma.user.findUnique({ where: { username } });
  if (existing) {
    console.log(`User "${username}" already exists — skipping.`);
    return;
  }

  const user = await prisma.user.create({
    data: {
      username,
      nameEn: "Principal Name", // [UPDATE]
      nameBn: "অধ্যক্ষের নাম", // [UPDATE]
      password: hashSync(initialPassword, 12),
      role: "PRINCIPAL",
      mustChangePassword: true,
    },
  });

  console.log("✅ Principal account created:");
  console.log(`   username: ${user.username}`);
  console.log(`   password: ${initialPassword}  (change it on first login)`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
