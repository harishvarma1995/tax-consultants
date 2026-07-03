/**
 * ============================================================
 * Project : TAX CONSULTANTS
 * File    : components/contact/OfficeInformation.tsx
 * Purpose : Displays the firm's public contact information.
 * ============================================================
 */

import Link from "next/link";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { siteContent } from "@/content/site-content";

export function OfficeInformation() {
  const whatsappUrl = `https://wa.me/${siteContent.company.whatsapp.replace(
    "+",
    ""
  )}`;

  return (
    <div className="space-y-6">
      <Card>
        <h2 className="text-3xl font-bold text-primary">
          Contact Information
        </h2>

        <p className="mt-3 text-muted-foreground">
          Reach out to our office for tax filing, GST, compliance, business tax,
          and advisory support.
        </p>

        <div className="mt-8 space-y-6">
          <div className="flex gap-4">
            <MapPin className="mt-1 text-accent" />
            <div>
              <p className="font-semibold text-primary">Office Address</p>
              <p className="text-muted-foreground">
                {siteContent.company.address}
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <Phone className="mt-1 text-accent" />
            <div>
              <p className="font-semibold text-primary">Phone</p>
              <p className="text-muted-foreground">{siteContent.company.phone}</p>
            </div>
          </div>

          <div className="flex gap-4">
            <Mail className="mt-1 text-accent" />
            <div>
              <p className="font-semibold text-primary">Email</p>
              <p className="text-muted-foreground">{siteContent.company.email}</p>
            </div>
          </div>

          <div className="flex gap-4">
            <Clock className="mt-1 text-accent" />
            <div>
              <p className="font-semibold text-primary">Office Hours</p>
              <p className="text-muted-foreground">{siteContent.company.hours}</p>
            </div>
          </div>
        </div>

        <Link
          className="mt-8 inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground transition hover:opacity-90"
          href={whatsappUrl}
          target="_blank"
        >
          <MessageCircle size={18} />
          Chat on WhatsApp
        </Link>
      </Card>

      <Card>
        <h3 className="text-xl font-semibold text-primary">Office Location</h3>

        <p className="mt-3 text-muted-foreground">
          Map preview is configured through your public business contact
          settings.
        </p>

        <Link
          className="mt-5 inline-flex font-medium text-accent hover:underline"
          href={siteContent.company.googleMapsUrl}
          target="_blank"
        >
          Open Google Maps →
        </Link>
      </Card>
    </div>
  );
}