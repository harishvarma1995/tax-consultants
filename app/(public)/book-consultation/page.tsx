/**
 * ============================================================
 * Project : TAX CONSULTANTS
 * File    : app/(public)/book-consultation/page.tsx
 * Purpose : Client-only consultation booking page.
 * ============================================================
 */

import Link from "next/link";
import { UserRole } from "@prisma/client";

import { ClientBookingForm } from "@/components/booking/ClientBookingForm";
import { PageContainer } from "@/components/layout/PageContainer";
import { auth } from "@/lib/auth";
import { getAllActiveServices } from "@/lib/services/service";

export default async function BookConsultationPage() {
  const session = await auth();
  const services = await getAllActiveServices();

  if (!session?.user?.id || session.user.role !== UserRole.CLIENT) {
    return (
      <PageContainer>
        <section className="mx-auto max-w-3xl py-20 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">
            Client Access Required
          </p>

          <h1 className="mt-4 text-5xl font-bold text-primary">
            Please login to book a consultation
          </h1>

          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Consultation booking is available only for registered clients.
            New visitors can contact us first, and registered clients can book
            directly after logging in.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              className="rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
              href="/login"
            >
              Login
            </Link>

            <Link
              className="rounded-md border border-border px-5 py-3 text-sm font-semibold text-primary"
              href="/contact"
            >
              Contact Us
            </Link>
          </div>
        </section>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <section className="py-16 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-accent">
          Book a Consultation
        </p>

        <h1 className="mt-4 text-5xl font-bold text-primary">
          Schedule a consultation with our tax experts
        </h1>

        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
          Select the service, date, and time that works best for you.
          Our team will review and confirm your booking.
        </p>
      </section>

      <section className="mx-auto max-w-3xl pb-20">
        <ClientBookingForm
          services={services.map((service) => ({
            slug: service.slug,
            title: service.title,
          }))}
        />
      </section>
    </PageContainer>
  );
}