/**
 * ============================================================
 * Project : TAX CONSULTANTS
 * File    : lib/bookings/booking-validation.ts
 * Purpose : Zod schemas for booking requests.
 * ============================================================
 */

import { z } from "zod";
import { isValidBookingSlot } from "@/lib/bookings/booking-slots";

export const createBookingSchema = z.object({
  serviceType: z.string().min(2, "Service type is required."),
  preferredDate: z.string().min(1, "Preferred date is required."),
  preferredTime: z.string().refine(isValidBookingSlot, {
    message: "Selected time slot is not available.",
  }),
  clientNote: z.string().max(1000).optional(),
});

export type CreateBookingInput = z.infer<typeof createBookingSchema>;