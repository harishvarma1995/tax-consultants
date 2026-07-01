/**
 * ============================================================
 * Project : TAX CONSULTANTS
 * File    : app/client/dashboard/page.tsx
 * Purpose : Client Dashboard.
 *
 * Displays a welcome screen after successful login and allows
 * the authenticated client to securely log out.
 * ============================================================
 */

"use client";

import { signOut } from "next-auth/react";

export default function ClientDashboard() {
  async function handleLogout() {
    await signOut({
      callbackUrl: "/login",
    });
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col px-6 py-10">
      <header className="mb-8 flex items-center justify-between border-b pb-4">
        <div>
          <h1 className="text-3xl font-bold">
            Client Dashboard
          </h1>

          <p className="mt-2 text-gray-600">
            Welcome to your secure Tax Consultants portal.
          </p>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="rounded-md bg-red-600 px-5 py-2 text-white transition hover:bg-red-700"
        >
          Logout
        </button>
      </header>

      <section className="rounded-lg border bg-white p-8 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">
          Welcome!
        </h2>

        <p className="text-gray-700">
          Your account has been successfully verified and you are securely
          logged in.
        </p>
      </section>
    </main>
  );
}