/**
 * ============================================================
 * Project : TAX CONSULTANTS
 * File    : components/home/Testimonials.tsx
 * Purpose : Homepage testimonials section.
 * ============================================================
 */

import { Star } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { siteContent } from "@/content/site-content";

export function Testimonials() {
  return (
    <section className="py-20">
      <div className="text-center">
        <p className="font-semibold uppercase tracking-widest text-accent">
          Client Testimonials
        </p>

        <h2 className="mt-3 text-4xl font-bold text-primary">
          Trusted by individuals and businesses
        </h2>

        <p className="mx-auto mt-4 max-w-3xl text-muted-foreground">
          Our clients value clear advice, dependable service, and secure handling
          of their financial information.
        </p>
      </div>

      <div className="mt-14 grid gap-6 lg:grid-cols-3">
        {siteContent.home.testimonials.map((testimonial) => (
          <Card key={testimonial.name}>
            <div className="mb-4 flex gap-1">
              {Array.from({ length: testimonial.rating }).map((_, index) => (
                <Star
                  key={index}
                  className="fill-current text-accent"
                  size={18}
                />
              ))}
            </div>

            <p className="italic text-muted-foreground">
              <span aria-hidden="true">&ldquo;</span>
                {testimonial.quote}
              <span aria-hidden="true">&rdquo;</span>
            </p>

            <div className="mt-6">
              <p className="font-semibold text-primary">
                {testimonial.name}
              </p>

              <p className="text-sm text-muted-foreground">
                {testimonial.designation}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}