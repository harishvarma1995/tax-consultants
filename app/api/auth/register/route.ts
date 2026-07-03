/**
 * ============================================================
 * Project : TAX CONSULTANTS
 * File    : app/api/auth/register/route.ts
 * Purpose : Handles individual and business client registration.
 * ============================================================
 */

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { ClientType, UserRole } from "@prisma/client";
import { z } from "zod";
import { db } from "@/lib/db";
import { sendEmail } from "@/lib/email";
import { getVerificationEmailTemplate } from "@/lib/email-templates";
import { createRawToken, createTokenExpiry, hashToken } from "@/lib/tokens";

const registerSchema = z
  .object({
    clientType: z.nativeEnum(ClientType),

    fullName: z.string().min(2, "Full name is required."),
    email: z.string().email("Enter a valid email address."),
    phone: z.string().min(10, "Enter a valid phone number."),

    businessName: z.string().optional(),
    businessPhone: z.string().optional(),
    businessEmail: z
    .string()
    .trim()
    .optional()
    .or(z.literal(""))
    .refine((value) => !value || z.string().email().safeParse(value).success, {
    message: "Enter a valid business email.",
  }),
    businessAddress: z.string().optional(),
    representativeName: z.string().optional(),
    representativeRole: z.string().optional(),

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
  })
  .refine(
    (data) => {
      if (data.clientType === ClientType.INDIVIDUAL) {
        return true;
      }

      return Boolean(
        data.businessName &&
          data.businessPhone &&
          data.businessEmail &&
          data.businessAddress &&
          data.representativeName &&
          data.representativeRole
      );
    },
    {
      message: "Business registration details are required.",
      path: ["businessName"],
    }
  );

export async function POST(req: Request) {
  try {
    const body: unknown = await req.json();
    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "Invalid registration details.",
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const {
      clientType,
      fullName,
      email,
      phone,
      businessName,
      businessPhone,
      businessEmail,
      businessAddress,
      representativeName,
      representativeRole,
      password,
    } = parsed.data;

    const normalizedEmail = email.toLowerCase().trim();

    const existingUser = await db.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "This email is already registered." },
        { status: 400 }
      );
    }

    const rawVerificationToken = createRawToken();
    const verificationTokenHash = hashToken(rawVerificationToken);
    const verificationExpires = createTokenExpiry(24);
    const passwordHash = await bcrypt.hash(password, 12);

    const baseUrl = process.env.NEXTAUTH_URL ?? "http://localhost:3000";
    const verifyUrl = `${baseUrl}/api/auth/verify-email?token=${rawVerificationToken}`;

    await db.user.create({
      data: {
        email: normalizedEmail,
        passwordHash,
        role: UserRole.CLIENT,
        emailVerified: false,
        emailVerificationTokenHash: verificationTokenHash,
        emailVerificationExpires: verificationExpires,
        fullName,
        phone,
        clientProfile: {
          create: {
            clientType,
            fullName,
            phone,
            caseStatus: "NEW",

            businessName:
              clientType === ClientType.BUSINESS ? businessName : null,
            businessPhone:
              clientType === ClientType.BUSINESS ? businessPhone : null,
            businessEmail:
              clientType === ClientType.BUSINESS ? businessEmail : null,
            businessAddress:
              clientType === ClientType.BUSINESS ? businessAddress : null,
            representativeName:
              clientType === ClientType.BUSINESS ? representativeName : null,
            representativeRole:
              clientType === ClientType.BUSINESS ? representativeRole : null,
          },
        },
      },
    });

    const html = getVerificationEmailTemplate(verifyUrl, fullName);

    const emailResult = await sendEmail({
      to: normalizedEmail,
      subject: "Verify your Tax Consultants account",
      html,
    });

    if (!emailResult.success) {
      return NextResponse.json(
        { message: "Account created, but verification email failed to send." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message:
          "Account created successfully. Please check your email to verify your account.",
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
}