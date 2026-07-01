/**
 * ============================================================
 * Project : TAX CONSULTANTS
 * File    : emails/WelcomeClient.tsx
 * Purpose : Email verification template for new clients.
 * ============================================================
 */

type WelcomeClientProps = {
  name: string;
  verifyUrl: string;
};

export default function WelcomeClient({ name, verifyUrl }: WelcomeClientProps) {
  return (
    <div>
      <h1>Verify Your Account</h1>
      <p>Hello {name},</p>
      <p>
        Thank you for registering with Tax Consultants. Please verify your email
        address using the link below.
      </p>
      <p>
        <a href={verifyUrl}>Verify Email Address</a>
      </p>
      <p>This link expires in 24 hours.</p>
    </div>
  );
}