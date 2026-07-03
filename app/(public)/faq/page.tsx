/**
 * ============================================================
 * Project : TAX CONSULTANTS
 * File    : app/(public)/faq/page.tsx
 * Purpose : Public FAQ page.
 * ============================================================
 */

import { PageContainer } from "@/components/layout/PageContainer";
import { Card } from "@/components/ui/Card";
import { getFaqs } from "@/lib/faq/faq";

export default async function FaqPage() {
  const faqs = await getFaqs();

  return (
    <PageContainer>
      <section className="py-16 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-accent">
          Frequently Asked Questions
        </p>

        <h1 className="mt-4 text-5xl font-bold text-primary">
          Answers to common tax and compliance questions
        </h1>

        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
          Find quick answers about income tax filing, GST registration,
          compliance timelines, document security, and consultation support.
        </p>
      </section>

      <section className="mx-auto max-w-4xl space-y-5 pb-20">
        {faqs.map((faq) => (
          <Card key={faq.id} hover={false}>
            <h2 className="text-xl font-semibold text-primary">
              {faq.question}
            </h2>

            <p className="mt-3 leading-7 text-muted-foreground">
              {faq.answer}
            </p>
          </Card>
        ))}
      </section>
    </PageContainer>
  );
}