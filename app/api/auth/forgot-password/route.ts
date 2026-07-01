/**
 * ============================================================
 * Project : TAX CONSULTANTS
 * File    : app/api/auth/forgot-password/route.ts
 * Purpose : Creates a secure password reset token and emails it.
 * ============================================================
 */

import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { sendEmail } from "@/lib/email";
import { getPasswordResetTemplate } from "@/lib/email-templates";
import { createRawToken, createTokenExpiry, hashToken } from "@/lib/tokens";

const forgotPasswordSchema = z.object({
  email: z.string().email("Enter a valid email address."),
});

export async function POST(req: Request) {
  try {
    const parsed = forgotPasswordSchema.safeParse(await req.json());

    if (!parsed.success) {
      return NextResponse.json(
        { message: "If the email exists, a reset link has been sent." },
        { status: 200 }
      );
    }

    const email = parsed.data.email.toLowerCase().trim();

    const user = await db.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { message: "If the email exists, a reset link has been sent." },
        { status: 200 }
      );
    }

    const rawToken = createRawToken();
    const resetUrl = `${
      process.env.NEXTAUTH_URL ?? "http://localhost:3000"
    }/reset-password?token=${rawToken}`;

    await db.user.update({
      where: { id: user.id },
      data: {
        passwordResetTokenHash: hashToken(rawToken),
        passwordResetExpires: createTokenExpiry(1),
      },
    });

    const html = getPasswordResetTemplate(resetUrl);

    const emailResult = await sendEmail({
      to: user.email,
      subject: "Reset your Tax Consultants password",
      html,
    });

    if (!emailResult.success) {
      return NextResponse.json(
        { message: "Password reset email could not be sent." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "If the email exists, a reset link has been sent." },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { message: "If the email exists, a reset link has been sent." },
      { status: 200 }
    );
  }
}