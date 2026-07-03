/**
 * ============================================================
 * Project : TAX CONSULTANTS
 * File    : app/client/bookings/page.tsx
 * Purpose : Shows client booking history.
 * ============================================================
 */

import Link from "next/link";
import { redirect } from "next/navigation";
import { UserRole } from "@prisma/client";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export default async function ClientBookingsPage() {
  const session = await auth();

  if (!session?.user?.id || session.user.role !== UserRole.CLIENT) {
    redirect("/login");
  }

  const bookings = await db.booking.findMany({
    where: { clientId: session.user.id },
    orderBy: { preferredDate: "asc" },
  });

  const now = new Date();

  const upcoming = bookings.filter(
    (booking) => booking.preferredDate >= now
  );

  const previous = bookings.filter(
    (booking) => booking.preferredDate < now
  );

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-6 py-10">
      <div className="mb-8 flex flex-col gap-4 border-b pb-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Bookings</h1>
          <p className="mt-2 text-gray-600">
            View your upcoming and previous consultation requests.
          </p>
        </div>

        <div className="flex gap-3">
          <Link className="rounded-md border px-4 py-2" href="/client/dashboard">
            Dashboard
          </Link>
          <Link
            className="rounded-md bg-slate-900 px-4 py-2 text-white"
            href="/book-consultation"
          >
            Book Consultation
          </Link>
        </div>
      </div>

      <section className="mb-10">
        <h2 className="mb-4 text-xl font-semibold">Upcoming</h2>
        <div className="space-y-4">
          {upcoming.length === 0 ? (
            <p className="rounded-lg border bg-white p-6 text-gray-600">
              No upcoming bookings.
            </p>
          ) : (
            upcoming.map((booking) => (
              <div key={booking.id} className="rounded-lg border bg-white p-6">
                <h3 className="font-semibold">{booking.serviceType}</h3>
                <p className="mt-2 text-gray-600">
                  {booking.preferredDate.toLocaleDateString("en-IN")} at{" "}
                  {booking.preferredTime}
                </p>
                <p className="mt-2 text-sm font-medium">
                  Status: {booking.status}
                </p>
                {booking.adminNotes ? (
                  <p className="mt-2 text-sm text-gray-600">
                    Admin notes: {booking.adminNotes}
                  </p>
                ) : null}
              </div>
            ))
          )}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold">Previous</h2>
        <div className="space-y-4">
          {previous.length === 0 ? (
            <p className="rounded-lg border bg-white p-6 text-gray-600">
              No previous bookings.
            </p>
          ) : (
            previous.map((booking) => (
              <div key={booking.id} className="rounded-lg border bg-white p-6">
                <h3 className="font-semibold">{booking.serviceType}</h3>
                <p className="mt-2 text-gray-600">
                  {booking.preferredDate.toLocaleDateString("en-IN")} at{" "}
                  {booking.preferredTime}
                </p>
                <p className="mt-2 text-sm font-medium">
                  Status: {booking.status}
                </p>
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
}