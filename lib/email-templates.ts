/*
This file contains HTML generator templates for client transactional emails.
*/

/**
 * Returns a styled HTML email structure for verification links.
 */
export function getVerificationEmailTemplate(verifyUrl: string, name: string): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
      <h2 style="color: #1e3a8a; text-align: center;">Verify Your Account</h2>
      <p>Hello ${name},</p>
      <p>Thank you for registering with Tax Consultants Local. Before we can start securely processing your tax files, please confirm your email address by clicking the link below:</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${verifyUrl}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block;">Verify Email Address</a>
      </div>
      <p style="color: #6b7280; font-size: 0.875rem;">If the button above does not work, copy and paste this link into your web browser:</p>
      <p style="color: #2563eb; font-size: 0.875rem; word-break: break-all;">${verifyUrl}</p>
      <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
      <p style="color: #9ca3af; font-size: 0.75rem; text-align: center;">This link will expire in 24 hours. If you did not sign up for this account, please ignore this email.</p>
    </div>
  `;
}

/**
 * Returns a styled HTML email structure for password resets.
 */
export function getPasswordResetTemplate(resetUrl: string): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
      <h2 style="color: #b91c1c; text-align: center;">Password Reset Request</h2>
      <p>Hello,</p>
      <p>We received a request to reset the password for your Tax Consultants Local client account.</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${resetUrl}" style="background-color: #b91c1c; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block;">Reset Password</a>
      </div>
      <p style="color: #6b7280; font-size: 0.875rem;">If the button above does not work, copy and paste this link into your web browser:</p>
      <p style="color: #2563eb; font-size: 0.875rem; word-break: break-all;">${resetUrl}</p>
      <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
      <p style="color: #9ca3af; font-size: 0.75rem; text-align: center;">This recovery link expires in 1 hour. If you did not request a password change, please ignore this email securely.</p>
    </div>
  `;
}