/**
 * ============================================================
 * Project : TAX CONSULTANTS
 * File    : app/api/client/bookings/route.ts
 * Purpose : Client booking API for authenticated users only.
 * ============================================================
 */

import { BookingStatus, UserRole } from "@prisma/client";
import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { createBookingSchema } from "@/lib/bookings/booking-validation";
import { sendEmail } from "@/lib/email";
import {
  getBookingAdminNotificationTemplate,
  getBookingConfirmationEmailTemplate,
} from "@/lib/email-templates";

export async function GET() {
  const session = await auth();

  if (!session?.user?.id || session.user.role !== UserRole.CLIENT) {
    return NextResponse.json(
      { message: "Unauthorized." },
      { status: 401 }
    );
  }

  const bookings = await db.booking.findMany({
    where: {
      clientId: session.user.id,
    },
    orderBy: {
      preferredDate: "desc",
    },
  });

  return NextResponse.json({ bookings });
}

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user?.id || session.user.role !== UserRole.CLIENT) {
    return NextResponse.json(
      { message: "Please login before booking a consultation." },
      { status: 401 }
    );
  }

  const body: unknown = await request.json();
  const parsed = createBookingSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        message: "Invalid booking details.",
        errors: parsed.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  const { serviceType, preferredDate, preferredTime, clientNote } =
    parsed.data;

  const bookingDate = new Date(preferredDate);

  if (Number.isNaN(bookingDate.getTime())) {
    return NextResponse.json(
      { message: "Invalid booking date." },
      { status: 400 }
    );
  }

  const existingBooking = await db.booking.findFirst({
    where: {
      preferredDate: bookingDate,
      preferredTime,
      status: {
        in: [
          BookingStatus.PENDING,
          BookingStatus.CONFIRMED,
          BookingStatus.RESCHEDULED,
        ],
      },
    },
  });

  if (existingBooking) {
    return NextResponse.json(
      { message: "This time slot is already booked." },
      { status: 409 }
    );
  }

  const booking = await db.booking.create({
  data: {
    clientId: session.user.id,
    serviceType,
    preferredDate: bookingDate,
    preferredTime,
    clientNote,
    status: BookingStatus.PENDING,
  },
});

const client = await db.user.findUnique({
  where: {
    id: session.user.id,
  },
});

if (client) {
  const formattedDate = bookingDate.toLocaleDateString("en-IN");
  const adminEmail = process.env.CONTACT_ADMIN_EMAIL ?? process.env.EMAIL_FROM;

  await sendEmail({
    to: client.email,
    subject: "Consultation request received - TAX CONSULTANTS",
    html: getBookingConfirmationEmailTemplate(
      client.fullName,
      serviceType,
      formattedDate,
      preferredTime
    ),
  });

  if (adminEmail) {
    await sendEmail({
      to: adminEmail,
      subject: "New consultation booking - TAX CONSULTANTS",
      html: getBookingAdminNotificationTemplate(
        client.fullName,
        client.email,
        serviceType,
        formattedDate,
        preferredTime,
        clientNote ?? ""
      ),
    });
  }
}

return NextResponse.json(
  {
    message: "Booking created successfully.",
    booking,
  },
  { status: 201 }
);
}