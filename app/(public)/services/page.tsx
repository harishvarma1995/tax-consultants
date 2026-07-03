/**
 * ============================================================
 * Project : TAX CONSULTANTS
 * File    : app/(public)/services/page.tsx
 * Purpose : Displays all public tax consulting services.
 * ============================================================
 */

import { PageContainer } from "@/components/layout/PageContainer";
import { ServiceCard } from "@/components/services/ServiceCard";
import { getAllActiveServices } from "@/lib/services/service";

export default async function ServicesPage() {
  const services = await getAllActiveServices();

  return (
    <PageContainer>
      <section className="py-16 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-accent">
          Professional Services
        </p>

        <h1 className="mt-4 text-5xl font-bold text-primary">
          Comprehensive tax solutions for every stage of your journey
        </h1>

        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
          With more than two decades of professional experience, we provide
          reliable tax consulting services for individuals, professionals,
          businesses, and non-resident Indians. Every engagement is handled with
          accuracy, confidentiality, and personalized attention.
        </p>
      </section>

      <section className="grid gap-8 pb-16 md:grid-cols-2 xl:grid-cols-3">
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            slug={service.slug}
            title={service.title}
            description={service.description}
            priceRange={service.priceRange}
          />
        ))}
      </section>
    </PageContainer>
  );
}