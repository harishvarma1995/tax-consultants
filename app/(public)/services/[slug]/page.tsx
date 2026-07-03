/**
 * ============================================================
 * Project : TAX CONSULTANTS
 * File    : app/(public)/services/[slug]/page.tsx
 * Purpose : Dynamic service details page.
 * ============================================================
 */

import { notFound } from "next/navigation";
import { PageContainer } from "@/components/layout/PageContainer";
import { ServiceDetail } from "@/components/services/ServiceDetail";
import { getServiceBySlug } from "@/lib/services/service";

type Props = {
  params: {
    slug: string;
  };
};

export default async function ServicePage({ params }: Props) {
  const service = await getServiceBySlug(params.slug);

  if (!service) {
    notFound();
  }

  return (
    <PageContainer>
      <ServiceDetail
        title={service.title}
        description={service.description}
        priceRange={service.priceRange}
      />
    </PageContainer>
  );
}