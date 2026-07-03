import { redirect } from "next/navigation";
import { UserRole } from "@prisma/client";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { BookingActions } from "@/components/admin/BookingActions";

export default async function AdminBookingsPage() {
  const session = await auth();

  if (!session?.user?.id || session.user.role !== UserRole.ADMIN) {
    redirect("/");
  }

  const bookings = await db.booking.findMany({
    include: {
      client: {
        select: {
          fullName: true,
          email: true,
          phone: true,
        },
      },
    },
    orderBy: {
      preferredDate: "asc",
    },
  });

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-6 py-10">
      <header className="mb-8 border-b pb-6">
        <h1 className="text-3xl font-bold">Booking Management</h1>
        <p className="mt-2 text-gray-600">
          View and manage all client consultation bookings.
        </p>
      </header>

      <section className="space-y-4">
        {bookings.length === 0 ? (
          <div className="rounded-lg border bg-white p-6 text-gray-600">
            No bookings found.
          </div>
        ) : (
          bookings.map((booking) => (
            <div key={booking.id} className="rounded-lg border bg-white p-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <h2 className="text-xl font-semibold">
                    {booking.serviceType}
                  </h2>

                  <p className="mt-2 text-gray-600">
                    {booking.preferredDate.toLocaleDateString("en-IN")} at{" "}
                    {booking.preferredTime}
                  </p>

                  <p className="mt-2 text-sm">
                    Status: <strong>{booking.status}</strong>
                  </p>

                  <p className="mt-4 text-sm text-gray-600">
                    Client: {booking.client.fullName} ({booking.client.email})
                  </p>

                  {booking.client.phone ? (
                    <p className="text-sm text-gray-600">
                      Phone: {booking.client.phone}
                    </p>
                  ) : null}

                  {booking.clientNote ? (
                    <p className="mt-3 text-sm text-gray-600">
                      Client note: {booking.clientNote}
                    </p>
                  ) : null}
                  <BookingActions bookingId={booking.id} />
                </div>
              </div>
            </div>
          ))
        )}
      </section>
    </main>
  );
}