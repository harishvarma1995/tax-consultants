/**
 * ============================================================
 * Project : TAX CONSULTANTS
 * File    : middleware.ts
 * Purpose : Protects client and admin routes based on session role.
 * ============================================================
 */

import { auth } from "@/lib/auth";
import { UserRole } from "@prisma/client";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = Boolean(req.auth);
  const role = req.auth?.user?.role;

  const isAuthPage =
    nextUrl.pathname.startsWith("/login") ||
    nextUrl.pathname.startsWith("/register");

  const isClientRoute = nextUrl.pathname.startsWith("/client");
  const isAdminLoginPage = nextUrl.pathname.startsWith("/admin/login");
  const isAdminRoute =
  nextUrl.pathname.startsWith("/admin") && !isAdminLoginPage;
  if ((isAuthPage || isAdminLoginPage) && isLoggedIn) {
    const dashboardPath =
      role === UserRole.ADMIN ? "/admin/dashboard" : "/client/dashboard";

    return NextResponse.redirect(new URL(dashboardPath, nextUrl));
  }

  if (isClientRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  if (isAdminRoute && role !== UserRole.ADMIN) {
    return NextResponse.redirect(new URL("/", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};