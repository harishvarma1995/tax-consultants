/**
 * ============================================================
 * Project : TAX CONSULTANTS
 * File    : components/home/ContactStrip.tsx
 * Purpose : Homepage contact information strip.
 * ============================================================
 */

import {
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

import { siteContent } from "@/content/site-content";

export function ContactStrip() {
  return (
    <section className="py-14">
      <div className="grid gap-8 rounded-2xl border border-border bg-card p-8 md:grid-cols-3">
        <div className="flex items-center gap-4">
          <Phone className="text-accent" />
          <div>
            <p className="font-semibold text-primary">
              Call Us
            </p>
            <p className="text-muted-foreground">
              {siteContent.company.phone}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Mail className="text-accent" />
          <div>
            <p className="font-semibold text-primary">
              Email
            </p>
            <p className="text-muted-foreground">
              {siteContent.company.email}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <MapPin className="text-accent" />
          <div>
            <p className="font-semibold text-primary">
              Office
            </p>
            <p className="text-muted-foreground">
              {siteContent.company.address}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}