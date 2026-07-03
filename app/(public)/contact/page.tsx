/**
 * ============================================================
 * Project : TAX CONSULTANTS
 * File    : app/(public)/contact/page.tsx
 * Purpose : Public contact page.
 * ============================================================
 */

import { ContactForm } from "@/components/contact/ContactForm";
import { OfficeInformation } from "@/components/contact/OfficeInformation";
import { PageContainer } from "@/components/layout/PageContainer";

export default function ContactPage() {
  return (
    <PageContainer>
      <section className="py-16 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-accent">
          Contact Us
        </p>

        <h1 className="mt-4 text-5xl font-bold text-primary">
          Speak with our tax consulting team
        </h1>

        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
          Send your enquiry and our team will get back to you regarding tax
          filing, GST, business compliance, notices, or advisory support.
        </p>
      </section>

      <section className="grid gap-8 pb-20 lg:grid-cols-[1.2fr_0.8fr]">
        <ContactForm />
        <OfficeInformation />
      </section>
    </PageContainer>
  );
}