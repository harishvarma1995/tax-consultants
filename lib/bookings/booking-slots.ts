/**
 * ============================================================
 * Project : TAX CONSULTANTS
 * File    : lib/bookings/booking-slots.ts
 * Purpose : Booking slot configuration and availability helpers.
 * ============================================================
 */

export const DEFAULT_BOOKING_SLOTS = [
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
] as const;

export function isSunday(date: Date) {
  return date.getDay() === 0;
}

export function isValidBookingSlot(time: string) {
  return DEFAULT_BOOKING_SLOTS.includes(
    time as (typeof DEFAULT_BOOKING_SLOTS)[number]
  );
}

export function getDefaultBookingSlots() {
  return [...DEFAULT_BOOKING_SLOTS];
}