"use client";

/**
 * ============================================================
 * Project : TAX CONSULTANTS
 * File    : components/booking/ClientBookingForm.tsx
 * Purpose : Client-only consultation booking form.
 * ============================================================
 */

import { useEffect, useState } from "react";

type ServiceOption = {
  slug: string;
  title: string;
};

type Slot = {
  time: string;
  available: boolean;
};

type ClientBookingFormProps = {
  services: ServiceOption[];
};

export function ClientBookingForm({ services }: ClientBookingFormProps) {
  const [serviceType, setServiceType] = useState(services[0]?.title ?? "");
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [clientNote, setClientNote] = useState("");
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    async function loadSlots() {
      if (!preferredDate) {
        setSlots([]);
        return;
      }

      setLoadingSlots(true);
      setPreferredTime("");

      try {
        const response = await fetch(
          `/api/client/bookings/slots?date=${preferredDate}`
        );

        const data = (await response.json()) as {
          slots?: Slot[];
          message?: string;
        };

        setSlots(data.slots ?? []);
        setMessage(data.message ?? null);
      } finally {
        setLoadingSlots(false);
      }
    }

    void loadSlots();
  }, [preferredDate]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setMessage(null);

    try {
      const response = await fetch("/api/client/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          serviceType,
          preferredDate,
          preferredTime,
          clientNote,
        }),
      });

      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(data.message ?? "Unable to create booking.");
      }

      setMessage("Booking request submitted successfully.");
      setPreferredDate("");
      setPreferredTime("");
      setClientNote("");
      setSlots([]);
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to create booking."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      className="space-y-8 rounded-xl border border-border bg-surface p-8 shadow-sm"
      onSubmit={handleSubmit}
    >
      <div>
        <h2 className="text-3xl font-bold text-primary">
          Book Your Consultation
        </h2>
        <p className="mt-2 text-muted-foreground">
          Choose a service, date, and available time slot.
        </p>
      </div>

      {message ? (
        <div className="rounded-lg border border-border bg-muted p-4 text-sm text-muted-foreground">
          {message}
        </div>
      ) : null}

      <div>
        <label className="mb-2 block text-sm font-medium">
          Service Type
        </label>
        <select
          className="w-full rounded-lg border border-border px-4 py-3"
          required
          value={serviceType}
          onChange={(event) => setServiceType(event.target.value)}
        >
          {services.map((service) => (
            <option key={service.slug} value={service.title}>
              {service.title}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Preferred Date
        </label>
        <input
          className="w-full rounded-lg border border-border px-4 py-3"
          min={new Date().toISOString().split("T")[0]}
          required
          type="date"
          value={preferredDate}
          onChange={(event) => setPreferredDate(event.target.value)}
        />
      </div>

      <div>
        <label className="mb-3 block text-sm font-medium">
          Preferred Time
        </label>

        {loadingSlots ? (
          <p className="text-sm text-muted-foreground">
            Loading available slots...
          </p>
        ) : (
          <div className="grid gap-3 sm:grid-cols-3">
            {slots.map((slot) => (
              <button
                key={slot.time}
                className={`rounded-lg border p-3 text-sm ${
                  preferredTime === slot.time
                    ? "border-accent bg-accent/10"
                    : "border-border"
                } ${
                  !slot.available
                    ? "cursor-not-allowed opacity-50"
                    : "hover:border-accent"
                }`}
                disabled={!slot.available}
                type="button"
                onClick={() => setPreferredTime(slot.time)}
              >
                {slot.time}
              </button>
            ))}
          </div>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Brief Description
        </label>
        <textarea
          className="min-h-32 w-full rounded-lg border border-border px-4 py-3"
          placeholder="Briefly describe what you need help with."
          value={clientNote}
          onChange={(event) => setClientNote(event.target.value)}
        />
      </div>

      <button
        className="w-full rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-60"
        disabled={submitting || !preferredTime}
        type="submit"
      >
        {submitting ? "Submitting..." : "Confirm Booking"}
      </button>
    </form>
  );
}