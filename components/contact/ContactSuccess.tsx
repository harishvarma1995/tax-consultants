/**
 * ============================================================
 * Project : TAX CONSULTANTS
 * File    : components/contact/ContactSuccess.tsx
 * Purpose : Shows contact form success message.
 * ============================================================
 */

import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { routes } from "@/config/routes";

export function ContactSuccess() {
  return (
    <div className="rounded-xl border border-success bg-success/10 p-6 text-center">
      <CheckCircle className="mx-auto text-success" size={42} />

      <h2 className="mt-4 text-2xl font-bold text-primary">
        Enquiry Received
      </h2>

      <p className="mt-3 text-muted-foreground">
        Thank you for contacting TAX CONSULTANTS. Our team will review your
        enquiry and respond through your preferred contact method.
      </p>

      <Link
        className="mt-6 inline-flex rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
        href={routes.home}
      >
        Back to Home
      </Link>
    </div>
  );
}