/**
 * ============================================================
 * Project : TAX CONSULTANTS
 * File    : app/api/auth/reset-password/route.ts
 * Purpose : Validates a password reset token and securely
 * updates the user's password.
 * ============================================================
 */

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { db } from "@/lib/db";
import { hashToken } from "@/lib/tokens";

const resetPasswordSchema = z
  .object({
    token: z.string().min(1),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .regex(/[A-Z]/, "Password must contain one uppercase letter.")
      .regex(/[0-9]/, "Password must contain one number.")
      .regex(/[^A-Za-z0-9]/, "Password must contain one special character."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export async function POST(req: Request) {
  try {
    const parsed = resetPasswordSchema.safeParse(await req.json());

    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "Invalid password reset request.",
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { token, password } = parsed.data;

    const tokenHash = hashToken(token);

    const user = await db.user.findFirst({
      where: {
        passwordResetTokenHash: tokenHash,
        passwordResetExpires: {
          gt: new Date(),
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          message: "This password reset link is invalid or has expired.",
        },
        { status: 400 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 12);

    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        passwordHash,
        passwordResetTokenHash: null,
        passwordResetExpires: null,
      },
    });

    return NextResponse.json(
      {
        message:
          "Password updated successfully. You can now sign in.",
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      {
        message: "Internal server error.",
      },
      { status: 500 }
    );
  }
}