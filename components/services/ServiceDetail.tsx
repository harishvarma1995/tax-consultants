/**
 * ============================================================
 * Project : TAX CONSULTANTS
 * File    : components/services/ServiceDetail.tsx
 * Purpose : Displays complete service information.
 * ============================================================
 */

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { routes } from "@/config/routes";

type ServiceDetailProps = {
  title: string;
  description: string;
  priceRange: string | null;
};

export function ServiceDetail({
  title,
  description,
  priceRange,
}: ServiceDetailProps) {
  return (
    <>
      {/* Hero */}
      <section className="py-16">
        <p className="text-sm font-semibold uppercase tracking-widest text-accent">
          Professional Tax Service
        </p>

        <h1 className="mt-4 text-5xl font-bold text-primary">
          {title}
        </h1>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
          {description}
        </p>

        <div className="mt-8">
          <Button href={routes.contact} variant="secondary">
            Book Consultation
          </Button>
        </div>
      </section>

      {/* What's Included */}
      <section className="grid gap-8 py-10 lg:grid-cols-2">
        <Card>
          <h2 className="text-2xl font-semibold text-primary">
            What`&apos;`s Included
          </h2>

          <ul className="mt-6 list-disc space-y-3 pl-6 text-muted-foreground">
            <li>Professional review of your requirements</li>
            <li>Document verification and compliance checks</li>
            <li>Preparation of all required filings</li>
            <li>Expert guidance throughout the process</li>
            <li>Timely communication and progress updates</li>
          </ul>
        </Card>

        <Card>
          <h2 className="text-2xl font-semibold text-primary">
            Service Information
          </h2>

          <div className="mt-6 space-y-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-accent">
                Starting Price
              </p>

              <p className="text-2xl font-bold text-primary">
                {priceRange ?? "Contact us"}
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-accent">
                Turnaround
              </p>

              <p className="text-muted-foreground">
                Depends on documentation and case complexity.
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-accent">
                Need Help?
              </p>

              <Link
                className="font-medium text-accent hover:underline"
                href={routes.contact}
              >
                Contact our experts →
              </Link>
            </div>
          </div>
        </Card>
      </section>

      {/* FAQ */}
      <section className="py-10">
        <h2 className="text-3xl font-bold text-primary">
          Frequently Asked Questions
        </h2>

        <div className="mt-8 grid gap-6">
          <Card>
            <h3 className="text-lg font-semibold text-primary">
              Who should use this service?
            </h3>

            <p className="mt-3 text-muted-foreground">
              Anyone requiring professional assistance to remain compliant while
              reducing the risk of filing errors.
            </p>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold text-primary">
              What documents will I need?
            </h3>

            <p className="mt-3 text-muted-foreground">
              Required documents vary by service. Our team provides a complete
              checklist after your consultation is booked.
            </p>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold text-primary">
              Can I complete everything online?
            </h3>

            <p className="mt-3 text-muted-foreground">
              Yes. Most services can be completed remotely using our secure
              client portal and document upload system.
            </p>
          </Card>
        </div>
      </section>
    </>
  );
}