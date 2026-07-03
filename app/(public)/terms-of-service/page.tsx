/**
 * ============================================================
 * Project : TAX CONSULTANTS
 * File    : app/(public)/terms-of-service/page.tsx
 * Purpose : Public Terms of Service page.
 * ============================================================
 */

import { PageContainer } from "@/components/layout/PageContainer";

export default function TermsOfServicePage() {
  return (
    <PageContainer>
      <section className="mx-auto max-w-4xl py-16">
        <p className="text-sm font-semibold uppercase tracking-widest text-accent">
          Legal
        </p>

        <h1 className="mt-4 text-5xl font-bold text-primary">
          Terms of Service
        </h1>

        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          These Terms of Service govern your use of the TAX CONSULTANTS
          website and professional services. By accessing or using this
          website, you agree to these terms.
        </p>

        <div className="mt-12 space-y-10">
          <section>
            <h2 className="text-2xl font-semibold text-primary">
              Professional Services
            </h2>

            <p className="mt-3 leading-7 text-muted-foreground">
              Information published on this website is intended for general
              guidance only and should not be considered professional tax,
              legal, or financial advice without a formal consultation.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary">
              Client Responsibilities
            </h2>

            <p className="mt-3 leading-7 text-muted-foreground">
              Clients are responsible for providing complete, accurate, and
              timely information necessary to perform the requested services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary">
              Confidentiality
            </h2>

            <p className="mt-3 leading-7 text-muted-foreground">
              All client information received during the course of professional
              engagements will be handled with appropriate confidentiality,
              subject to applicable legal and regulatory requirements.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary">
              Limitation of Liability
            </h2>

            <p className="mt-3 leading-7 text-muted-foreground">
              TAX CONSULTANTS shall not be liable for losses arising from
              incomplete, inaccurate, or delayed information provided by
              clients or from circumstances beyond reasonable control.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary">
              Changes to These Terms
            </h2>

            <p className="mt-3 leading-7 text-muted-foreground">
              These Terms of Service may be updated periodically. Continued use
              of the website constitutes acceptance of any revised terms.
            </p>
          </section>
        </div>
      </section>
    </PageContainer>
  );
}