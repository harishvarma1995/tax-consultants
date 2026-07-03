/**
 * ============================================================
 * Project : TAX CONSULTANTS
 * File    : app/(public)/privacy-policy/page.tsx
 * Purpose : Public privacy policy.
 * ============================================================
 */

import { PageContainer } from "@/components/layout/PageContainer";

export default function PrivacyPolicyPage() {
  return (
    <PageContainer>
      <section className="mx-auto max-w-4xl py-16">
        <p className="text-sm font-semibold uppercase tracking-widest text-accent">
          Legal
        </p>

        <h1 className="mt-4 text-5xl font-bold text-primary">
          Privacy Policy
        </h1>

        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          TAX CONSULTANTS values your privacy. This Privacy Policy explains how
          we collect, use, store, and protect information provided through our
          website and professional services.
        </p>

        <div className="mt-12 space-y-10">
          <section>
            <h2 className="text-2xl font-semibold text-primary">
              Information We Collect
            </h2>

            <p className="mt-3 leading-7 text-muted-foreground">
              We may collect your name, email address, phone number, business
              information, and any details you voluntarily provide when
              contacting us, registering an account, or requesting professional
              tax services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary">
              How We Use Your Information
            </h2>

            <p className="mt-3 leading-7 text-muted-foreground">
              Your information is used only to provide professional tax,
              compliance, advisory, and customer support services, communicate
              with you, and improve our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary">
              Data Security
            </h2>

            <p className="mt-3 leading-7 text-muted-foreground">
              We implement appropriate administrative and technical safeguards
              to protect your information against unauthorized access,
              disclosure, alteration, or loss.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary">
              Information Sharing
            </h2>

            <p className="mt-3 leading-7 text-muted-foreground">
              We do not sell your personal information. Information is shared
              only when required to provide our services, comply with legal
              obligations, or with your explicit consent.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary">
              Contact
            </h2>

            <p className="mt-3 leading-7 text-muted-foreground">
              If you have questions regarding this Privacy Policy, please
              contact TAX CONSULTANTS using the information provided on our
              Contact page.
            </p>
          </section>
        </div>
      </section>
    </PageContainer>
  );
}