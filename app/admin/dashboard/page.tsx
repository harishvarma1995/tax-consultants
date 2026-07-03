import Link from "next/link";
import { redirect } from "next/navigation";
import { BookingStatus, UserRole } from "@prisma/client";

import { auth, signOut } from "@/lib/auth";
import { db } from "@/lib/db";

export default async function AdminDashboard() {
  const session = await auth();

  if (!session?.user?.id || session.user.role !== UserRole.ADMIN) {
    redirect("/admin/login");
  }

  const [
    totalBookings,
    pendingBookings,
    confirmedBookings,
    cancelledBookings,
  ] = await Promise.all([
    db.booking.count(),
    db.booking.count({
      where: { status: BookingStatus.PENDING },
    }),
    db.booking.count({
      where: { status: BookingStatus.CONFIRMED },
    }),
    db.booking.count({
      where: { status: BookingStatus.CANCELLED },
    }),
  ]);

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-6 py-10">
      <header className="mb-8 flex flex-col gap-4 border-b pb-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>

          <p className="mt-2 text-gray-600">
            Welcome to the TAX CONSULTANTS administration portal.
          </p>
        </div>

        <form
          action={async () => {
            "use server";

            await signOut({
              redirectTo: "/admin/login",
            });
          }}
        >
          <button
            className="rounded-md bg-red-600 px-5 py-2 text-white"
            type="submit"
          >
            Logout
          </button>
        </form>
      </header>

      <section className="mb-8 grid gap-6 md:grid-cols-4">
        <div className="rounded-lg border bg-white p-6">
          <p className="text-sm text-gray-500">Total Bookings</p>
          <h2 className="mt-2 text-3xl font-bold">{totalBookings}</h2>
        </div>

        <div className="rounded-lg border bg-white p-6">
          <p className="text-sm text-gray-500">Pending</p>
          <h2 className="mt-2 text-3xl font-bold">{pendingBookings}</h2>
        </div>

        <div className="rounded-lg border bg-white p-6">
          <p className="text-sm text-gray-500">Confirmed</p>
          <h2 className="mt-2 text-3xl font-bold">{confirmedBookings}</h2>
        </div>

        <div className="rounded-lg border bg-white p-6">
          <p className="text-sm text-gray-500">Cancelled</p>
          <h2 className="mt-2 text-3xl font-bold">{cancelledBookings}</h2>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <Link
          href="/admin/bookings"
          className="rounded-lg border bg-white p-6 shadow-sm transition hover:shadow-md"
        >
          <h2 className="text-xl font-semibold">Booking Management</h2>

          <p className="mt-2 text-gray-600">
            View, confirm and cancel consultation bookings.
          </p>
        </Link>

        <div className="rounded-lg border bg-white p-6 shadow-sm opacity-60">
          <h2 className="text-xl font-semibold">
            Client Management
          </h2>

          <p className="mt-2 text-gray-600">
            Coming in the next build.
          </p>
        </div>
      </section>
    </main>
  );
}