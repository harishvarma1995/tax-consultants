

/**
 * ============================================================
 * Project : TAX CONSULTANTS
 * File    : app/client/dashboard/page.tsx
 * Purpose : Client dashboard home.
 * ============================================================
 */

import Link from "next/link";
import { redirect } from "next/navigation";
import { UserRole } from "@prisma/client";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export default async function ClientDashboard() {
  const session = await auth();

  if (!session?.user?.id || session.user.role !== UserRole.CLIENT) {
    redirect("/login");
  }

  const bookings = await db.booking.findMany({
    where: {
      clientId: session.user.id,
    },
    orderBy: {
      preferredDate: "asc",
    },
    take: 5,
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
      <header className="mb-8 flex flex-col gap-4 border-b pb-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Client Dashboard</h1>

          <p className="mt-2 text-gray-600">
            Welcome to your secure TAX CONSULTANTS portal.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/book-consultation"
            className="rounded-md bg-slate-900 px-5 py-2 text-white"
          >
            Book Consultation
          </Link>

          <Link
            href="/client/bookings"
            className="rounded-md border px-5 py-2"
          >
            My Bookings
          </Link>

          <form
            action={async () => {
              "use server";
              const { signOut } = await import("@/lib/auth");
              await signOut({
                redirectTo: "/login",
              });
            }}
          >
            <button
              type="submit"
              className="rounded-md bg-red-600 px-5 py-2 text-white"
            >
              Logout
            </button>
          </form>
        </div>
      </header>

      <section className="mb-8 grid gap-6 md:grid-cols-3">
        <div className="rounded-lg border bg-white p-6">
          <p className="text-sm text-gray-500">Total Bookings</p>

          <h2 className="mt-2 text-3xl font-bold">
            {bookings.length}
          </h2>
        </div>

        <div className="rounded-lg border bg-white p-6">
          <p className="text-sm text-gray-500">Upcoming</p>

          <h2 className="mt-2 text-3xl font-bold">
            {upcoming.length}
          </h2>
        </div>

        <div className="rounded-lg border bg-white p-6">
          <p className="text-sm text-gray-500">Previous</p>

          <h2 className="mt-2 text-3xl font-bold">
            {previous.length}
          </h2>
        </div>
      </section>

      <section className="rounded-lg border bg-white p-6">
        <h2 className="mb-4 text-xl font-semibold">
          Recent Bookings
        </h2>

        {bookings.length === 0 ? (
          <p className="text-gray-600">
            No bookings available.
          </p>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="rounded-md border p-4"
              >
                <h3 className="font-semibold">
                  {booking.serviceType}
                </h3>

                <p className="mt-1 text-sm text-gray-600">
                  {booking.preferredDate.toLocaleDateString("en-IN")} at{" "}
                  {booking.preferredTime}
                </p>

                <p className="mt-2 text-sm">
                  Status: <strong>{booking.status}</strong>
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}