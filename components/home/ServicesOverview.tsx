/**
 * ============================================================
 * Project : TAX CONSULTANTS
 * File    : components/home/ServicesOverview.tsx
 * Purpose : Homepage featured services section.
 * ============================================================
 */

import { Calculator, Receipt, Landmark, Briefcase, FileText, Globe } from "lucide-react";

import { ServiceCard } from "@/components/services/ServiceCard";
import { getAllActiveServices } from "@/lib/services/service";

const icons = [
  Calculator,
  Receipt,
  Landmark,
  Briefcase,
  FileText,
  Globe,
];

export async function ServicesOverview() {
  const services = await getAllActiveServices();

  return (
    <section className="py-20">
      <div className="mb-12 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-accent">
          Our Services
        </p>

        <h2 className="mt-3 text-4xl font-bold text-primary">
          Professional Tax Services
        </h2>

        <p className="mx-auto mt-4 max-w-3xl text-muted-foreground">
          For more than 20 years, we have helped individuals, professionals,
          startups, and businesses manage taxation with confidence, accuracy,
          and complete transparency.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {services.slice(0, 6).map((service, index) => {
          const Icon = icons[index];

          return (
            <div key={service.id} className="relative">
              <div className="mb-4">
                <Icon className="text-accent" size={34} />
              </div>

              <ServiceCard
                slug={service.slug}
                title={service.title}
                description={service.description}
                priceRange={service.priceRange}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}