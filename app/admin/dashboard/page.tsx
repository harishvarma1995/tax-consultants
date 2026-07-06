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
    totalClients,
    totalDocuments,
  ] = await Promise.all([
    db.booking.count(),
    db.booking.count({ where: { status: BookingStatus.PENDING } }),
    db.booking.count({ where: { status: BookingStatus.CONFIRMED } }),
    db.booking.count({ where: { status: BookingStatus.CANCELLED } }),
    db.user.count({ where: { role: UserRole.CLIENT } }),
    db.document.count(),
  ]);

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-6 py-10">
      <header className="mb-8 flex flex-col gap-4 border-b pb-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Central hub for managing clients, bookings, documents, and settings.
          </p>
        </div>

        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/admin/login" });
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

      <section className="mb-8 grid gap-6 md:grid-cols-3 xl:grid-cols-6">
        <StatCard label="Clients" value={totalClients} />
        <StatCard label="Documents" value={totalDocuments} />
        <StatCard label="Bookings" value={totalBookings} />
        <StatCard label="Pending" value={pendingBookings} />
        <StatCard label="Confirmed" value={confirmedBookings} />
        <StatCard label="Cancelled" value={cancelledBookings} />
      </section>

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <HubCard
          href="/admin/bookings"
          title="Booking Management"
          description="View, confirm, and cancel consultation bookings."
        />

        <HubCard
          href="/admin/documents"
          title="Document Management"
          description="View client-uploaded documents securely."
        />

        <HubCard
          href="/admin/clients"
          title="Client Management"
          description="View client profiles and service history."
        />

        <HubCard
          href="/admin/messages"
          title="Message Center"
          description="Communicate with clients securely."
        />

        <HubCard
          href="/admin/settings"
          title="Website Settings"
          description="Manage services, FAQs, office details, and booking rules."
        />
      </section>
    </main>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border bg-white p-6">
      <p className="text-sm text-gray-500">{label}</p>
      <h2 className="mt-2 text-3xl font-bold">{value}</h2>
    </div>
  );
}

function HubCard({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-lg border bg-white p-6 shadow-sm transition hover:shadow-md"
    >
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="mt-2 text-gray-600">{description}</p>
    </Link>
  );
}