/**
 * ============================================================
 * Project : TAX CONSULTANTS
 * File    : app/api/auth/verify-email/route.ts
 * Purpose : Verifies a user's email address using a secure token.
 * ============================================================
 */

import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { hashToken } from "@/lib/tokens";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const token = url.searchParams.get("token");

  if (!token) {
    return NextResponse.redirect(new URL("/login?error=InvalidToken", url));
  }

  const tokenHash = hashToken(token);

  const user = await db.user.findFirst({
    where: {
      emailVerificationTokenHash: tokenHash,
      emailVerificationExpires: {
        gt: new Date(),
      },
    },
  });

  if (!user) {
    return NextResponse.redirect(new URL("/login?error=InvalidToken", url));
  }

  await db.user.update({
    where: {
      id: user.id,
    },
    data: {
      emailVerified: true,
      emailVerificationTokenHash: null,
      emailVerificationExpires: null,
    },
  });

  return NextResponse.redirect(new URL("/login?verified=true", url));
}