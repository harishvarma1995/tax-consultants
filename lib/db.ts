/**
 * ============================================================
 * Project : TAX CONSULTANTS
 * File    : lib/db.ts
 * Purpose : Creates a single shared Prisma Client instance.
 *
 * This prevents too many database connections during local
 * development when Next.js refreshes files frequently.
 * ============================================================
 */

import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}