/**
 * ============================================================
 * Project : TAX CONSULTANTS
 * File    : app/api/client/bookings/slots/route.ts
 * Purpose : Returns available booking slots for a selected date.
 * ============================================================
 */

import { BookingStatus, UserRole } from "@prisma/client";
import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import {
  getDefaultBookingSlots,
  isSunday,
} from "@/lib/bookings/booking-slots";

export async function GET(request: Request) {
  const session = await auth();

  if (!session?.user?.id || session.user.role !== UserRole.CLIENT) {
    return NextResponse.json(
      { message: "Please login to view booking slots." },
      { status: 401 }
    );
  }

  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");

  if (!date) {
    return NextResponse.json(
      { message: "Date is required." },
      { status: 400 }
    );
  }

  const selectedDate = new Date(date);

  if (Number.isNaN(selectedDate.getTime())) {
    return NextResponse.json(
      { message: "Invalid date." },
      { status: 400 }
    );
  }

  if (isSunday(selectedDate)) {
    return NextResponse.json({
      slots: [],
      message: "Bookings are not available on Sundays.",
    });
  }

  const bookedSlots = await db.booking.findMany({
    where: {
      preferredDate: selectedDate,
      status: {
        in: [
          BookingStatus.PENDING,
          BookingStatus.CONFIRMED,
          BookingStatus.RESCHEDULED,
        ],
      },
    },
    select: {
      preferredTime: true,
    },
  });

  const takenTimes = new Set(
    bookedSlots.map((booking) => booking.preferredTime)
  );

  const slots = getDefaultBookingSlots().map((time) => ({
    time,
    available: !takenTimes.has(time),
  }));

  return NextResponse.json({ slots });
}