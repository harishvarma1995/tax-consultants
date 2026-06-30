/*
This file creates a centralized email sender function that routes all system 
emails (verification, password resets) securely using the Resend service.
*/

import { Resend } from "resend";

// Initialize the Resend service using our secret API key from .env.local
const resend = new Resend(process.env.RESEND_API_KEY);

interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
}

/**
 * Global helper function to send emails from anywhere inside the application.
 */
export async function sendEmail({ to, subject, html }: SendEmailParams) {
  // If we choose to disable emails or use a mock provider during testing
  if (process.env.EMAIL_PROVIDER !== "resend") {
    console.log(`[MOCK EMAIL] To: ${to} | Subject: ${subject}`);
    return { success: true, data: null };
  }

  try {
    const data = await resend.emails.send({
      from: process.env.EMAIL_FROM || "onboarding@resend.dev",
      to: [to],
      subject: subject,
      html: html,
    });

    return { success: true, data };
  } catch (error) {
    console.error("Failed to send email via Resend:", error);
    return { success: false, error };
  }
}