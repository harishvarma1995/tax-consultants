/**
 * ============================================================
 * Project : TAX CONSULTANTS
 * File    : app/api/health/route.ts
 * Purpose : Provides a simple health check endpoint.
 * ============================================================
 */

import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    status: "ok",
    timestamp: Date.now(),
  });
}