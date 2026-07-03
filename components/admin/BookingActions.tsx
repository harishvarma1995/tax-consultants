"use client";

import { BookingStatus } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

type BookingActionsProps = {
  bookingId: string;
};

export function BookingActions({ bookingId }: BookingActionsProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function updateBooking(status: BookingStatus) {
    setLoading(true);

    try {
      const response = await fetch("/api/admin/bookings", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookingId,
          status,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update booking.");
      }

      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-4 flex flex-wrap gap-3">
      <button
        className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
        disabled={loading}
        type="button"
        onClick={() => updateBooking(BookingStatus.CONFIRMED)}
      >
        Confirm
      </button>

      <button
        className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
        disabled={loading}
        type="button"
        onClick={() => updateBooking(BookingStatus.CANCELLED)}
      >
        Cancel
      </button>
    </div>
  );
}