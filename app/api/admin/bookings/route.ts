/**
 * ============================================================
 * Project : TAX CONSULTANTS
 * File    : app/api/admin/bookings/route.ts
 * Purpose : Admin booking management API.
 * ============================================================
 */

import { BookingStatus, UserRole } from "@prisma/client";
import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { sendEmail } from "@/lib/email";
import { getBookingStatusUpdateTemplate } from "@/lib/email-templates";

export async function GET() {
  const session = await auth();

  if (!session?.user?.id || session.user.role !== UserRole.ADMIN) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const bookings = await db.booking.findMany({
    include: {
      client: true,
    },
    orderBy: {
      preferredDate: "asc",
    },
  });

  return NextResponse.json({ bookings });
}

export async function PATCH(request: Request) {
  const session = await auth();

  if (!session?.user?.id || session.user.role !== UserRole.ADMIN) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const body = (await request.json()) as {
    bookingId: string;
    status: BookingStatus;
    adminNotes?: string;
  };

  const booking = await db.booking.update({
    where: {
      id: body.bookingId,
    },
    data: {
      status: body.status,
      adminNotes: body.adminNotes,
    },
    include: {
      client: true,
    },
  });

  await sendEmail({
    to: booking.client.email,
    subject: `Consultation booking ${booking.status.toLowerCase()} - TAX CONSULTANTS`,
    html: getBookingStatusUpdateTemplate(
      booking.client.fullName,
      booking.serviceType,
      booking.preferredDate.toLocaleDateString("en-IN"),
      booking.preferredTime,
      booking.status,
      booking.adminNotes ?? undefined
    ),
  });

  return NextResponse.json({
    message: "Booking updated successfully.",
    booking,
  });
}