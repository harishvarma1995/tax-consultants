/**
 * ============================================================
 * Project : TAX CONSULTANTS
 * File    : components/services/ServiceCard.tsx
 * Purpose : Reusable service card used across the website.
 * ============================================================
 */

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { routes } from "@/config/routes";

type ServiceCardProps = {
  slug: string;
  title: string;
  description: string;
  priceRange: string | null;
};

export function ServiceCard({
  slug,
  title,
  description,
  priceRange,
}: ServiceCardProps) {
  return (
    <Card className="flex h-full flex-col">
      <h3 className="text-2xl font-semibold text-primary">
        {title}
      </h3>

      <p className="mt-4 flex-1 leading-7 text-muted-foreground">
        {description}
      </p>

      <div className="mt-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-accent">
          Starting From
        </p>

        <p className="mt-1 text-lg font-bold text-primary">
          {priceRange ?? "Contact us"}
        </p>
      </div>

      <Link
        className="mt-8 inline-flex items-center gap-2 font-medium text-accent hover:underline"
        href={`${routes.services}/${slug}`}
      >
        Learn More
        <ArrowRight size={18} />
      </Link>
    </Card>
  );
}