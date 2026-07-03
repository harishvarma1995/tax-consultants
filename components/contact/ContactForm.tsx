"use client";

/**
 * ============================================================
 * Project : TAX CONSULTANTS
 * File    : components/contact/ContactForm.tsx
 * Purpose : Public consultation request form.
 * ============================================================
 */

import { useState } from "react";
import { ContactSuccess } from "@/components/contact/ContactSuccess";

type ClientType = "INDIVIDUAL" | "BUSINESS";

type ContactMethod = "PHONE" | "EMAIL" | "WHATSAPP";

type FormData = {
  clientType: ClientType;

  fullName: string;
  businessName: string;

  email: string;
  phone: string;

  preferredContactMethod: ContactMethod;

  service: string;

  message: string;
};

const SERVICES = [
  "Income Tax Filing",
  "GST Registration",
  "GST Return Filing",
  "Tax Planning",
  "PAN Services",
  "TDS Filing",
  "Business Compliance",
  "Tax Notice Response",
  "General Enquiry",
];

export function ContactForm() {
  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState<FormData>({
    clientType: "INDIVIDUAL",

    fullName: "",

    businessName: "",

    email: "",

    phone: "",

    preferredContactMethod: "PHONE",

    service: SERVICES[0],

    message: "",
  });

  function updateField<K extends keyof FormData>(
    field: K,
    value: FormData[K]
  ) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setLoading(true);

    setSuccess(false);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Unable to send enquiry.");
      }

      setSuccess(true);

      setForm({
        clientType: "INDIVIDUAL",

        fullName: "",

        businessName: "",

        email: "",

        phone: "",

        preferredContactMethod: "PHONE",

        service: SERVICES[0],

        message: "",
      });
    } catch {
      alert("Unable to send your enquiry. Please try again.");
    } finally {
      setLoading(false);
    }
  }

    if (success) {
  return <ContactSuccess />;
    }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 rounded-xl border border-border bg-surface p-8 shadow-sm"
    >
      <div>
        <h2 className="text-3xl font-bold text-primary">
          Request a Consultation
        </h2>

        <p className="mt-2 text-muted-foreground">
          Complete the form below and our team will contact you.
        </p>
      </div>

      

      <div>
        <label className="mb-3 block text-sm font-semibold">
          I am contacting as
        </label>

        <div className="grid gap-4 md:grid-cols-2">
          <button
            type="button"
            onClick={() =>
              updateField("clientType", "INDIVIDUAL")
            }
            className={`rounded-lg border p-4 text-left transition ${
              form.clientType === "INDIVIDUAL"
                ? "border-accent bg-accent/10"
                : "border-border"
            }`}
          >
            <p className="font-semibold">Individual</p>

            <p className="mt-1 text-sm text-muted-foreground">
              Personal taxation and financial advice.
            </p>
          </button>

          <button
            type="button"
            onClick={() =>
              updateField("clientType", "BUSINESS")
            }
            className={`rounded-lg border p-4 text-left transition ${
              form.clientType === "BUSINESS"
                ? "border-accent bg-accent/10"
                : "border-border"
            }`}
          >
            <p className="font-semibold">Business</p>

            <p className="mt-1 text-sm text-muted-foreground">
              GST, compliance, audit and business taxation.
            </p>
          </button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium">
            Full Name
          </label>

          <input
            className="w-full rounded-lg border border-border px-4 py-3"
            value={form.fullName}
            onChange={(e) =>
              updateField("fullName", e.target.value)
            }
          />
        </div>

        {form.clientType === "BUSINESS" && (
          <div>
            <label className="mb-2 block text-sm font-medium">
              Business Name
            </label>

            <input
              className="w-full rounded-lg border border-border px-4 py-3"
              value={form.businessName}
              onChange={(e) =>
                updateField("businessName", e.target.value)
              }
            />
          </div>
        )}
          </div>
              <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium">
            Email Address
          </label>

          <input
            className="w-full rounded-lg border border-border px-4 py-3"
            type="email"
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Phone Number
          </label>

          <input
            className="w-full rounded-lg border border-border px-4 py-3"
            type="tel"
            value={form.phone}
            onChange={(e) => updateField("phone", e.target.value)}
          />
        </div>
      </div>

      <div>
        <label className="mb-3 block text-sm font-medium">
          Preferred Contact Method
        </label>

        <div className="grid gap-3 md:grid-cols-3">
          {(["PHONE", "EMAIL", "WHATSAPP"] as const).map((method) => (
            <button
              key={method}
              type="button"
              onClick={() =>
                updateField("preferredContactMethod", method)
              }
              className={`rounded-lg border p-3 transition ${
                form.preferredContactMethod === method
                  ? "border-accent bg-accent/10"
                  : "border-border"
              }`}
            >
              {method.charAt(0) + method.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Service Required
        </label>

        <select
          className="w-full rounded-lg border border-border px-4 py-3"
          value={form.service}
          onChange={(e) => updateField("service", e.target.value)}
        >
          {SERVICES.map((service) => (
            <option key={service} value={service}>
              {service}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Message
        </label>

        <textarea
          rows={6}
          className="w-full rounded-lg border border-border px-4 py-3"
          placeholder="Please describe your enquiry."
          value={form.message}
          onChange={(e) => updateField("message", e.target.value)}
        />
      </div>

      <div className="rounded-lg bg-muted p-4 text-sm text-muted-foreground">
        Your information will only be used to respond to your enquiry.
        We never share your personal information with third parties
        without your consent.
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-primary px-6 py-3 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Sending Enquiry..." : "Send Enquiry"}
      </button>
    </form>
  );
}