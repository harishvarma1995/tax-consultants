/**
 * ============================================================
 * Project : TAX CONSULTANTS
 * File    : emails/PasswordReset.tsx
 * Purpose : Password reset email template.
 * ============================================================
 */

type PasswordResetProps = {
  resetUrl: string;
};

export default function PasswordReset({ resetUrl }: PasswordResetProps) {
  return (
    <div>
      <h1>Reset Your Password</h1>
      <p>We received a request to reset your password.</p>
      <p>
        <a href={resetUrl}>Reset Password</a>
      </p>
      <p>This link expires in 1 hour.</p>
    </div>
  );
}