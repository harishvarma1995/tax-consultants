/**
 * ============================================================
 * Project : TAX CONSULTANTS
 * File    : app/api/contact/route.ts
 * Purpose : Handles public contact enquiries and sends emails.
 * ============================================================
 */

import { NextResponse } from "next/server";
import { z } from "zod";
import { sendEmail } from "@/lib/email";

const contactSchema = z.object({
  clientType: z.enum(["INDIVIDUAL", "BUSINESS"]),
  fullName: z.string().min(2),
  businessName: z.string().optional(),
  email: z.string().email(),
  phone: z.string().min(10),
  preferredContactMethod: z.enum(["PHONE", "EMAIL", "WHATSAPP"]),
  service: z.string().min(1),
  message: z.string().min(10),
});

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, errors: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const data = result.data;
    const adminEmail = process.env.CONTACT_ADMIN_EMAIL ?? process.env.EMAIL_FROM;

    if (!adminEmail) {
      return NextResponse.json(
        { success: false, message: "Contact email is not configured." },
        { status: 500 }
      );
    }

    const businessLine =
      data.clientType === "BUSINESS"
        ? `<p><strong>Business Name:</strong> ${data.businessName ?? "Not provided"}</p>`
        : "";

    const adminHtml = `
      <h1>New Contact Enquiry</h1>
      <p><strong>Client Type:</strong> ${data.clientType}</p>
      ${businessLine}
      <p><strong>Name:</strong> ${data.fullName}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone}</p>
      <p><strong>Preferred Contact:</strong> ${data.preferredContactMethod}</p>
      <p><strong>Service Required:</strong> ${data.service}</p>
      <p><strong>Message:</strong></p>
      <p>${data.message}</p>
    `;

    const visitorHtml = `
      <h1>We received your enquiry</h1>
      <p>Hello ${data.fullName},</p>
      <p>Thank you for contacting TAX CONSULTANTS.</p>
      <p>Our team will review your enquiry and respond through your preferred contact method.</p>
      <p><strong>Service:</strong> ${data.service}</p>
      <p><strong>Message:</strong> ${data.message}</p>
    `;

    const adminEmailResult = await sendEmail({
      to: adminEmail,
      subject: "New contact enquiry - TAX CONSULTANTS",
      html: adminHtml,
    });

    const visitorEmailResult = await sendEmail({
      to: data.email,
      subject: "We received your enquiry - TAX CONSULTANTS",
      html: visitorHtml,
    });

    if (!adminEmailResult.success || !visitorEmailResult.success) {
      return NextResponse.json(
        { success: false, message: "Enquiry received, but email delivery failed." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Enquiry received successfully.",
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}