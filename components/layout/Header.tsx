/**
 * ============================================================
 * Project : TAX CONSULTANTS
 * File    : components/layout/Header.tsx
 * Purpose : Public website header with navigation and mobile menu.
 * ============================================================
 */

"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { publicNavigation, routes } from "@/config/routes";
import { siteContent } from "@/content/site-content";
import { Button } from "@/components/ui/Button";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link className="text-xl font-bold tracking-wide text-primary" href={routes.home}>
          {siteContent.company.name}
          <span className="ml-1 text-accent">.</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {publicNavigation.map((item) => (
            <Link
              className="text-sm font-medium text-foreground hover:text-accent"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link className="text-sm font-medium hover:text-accent" href={routes.login}>
            Client Login
          </Link>
          <Button href={routes.contact} variant="secondary">
            Book a Consultation
          </Button>
        </div>

        <button
          aria-label="Toggle navigation menu"
          className="rounded-md p-2 md:hidden"
          type="button"
          onClick={() => setIsOpen((current) => !current)}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {isOpen ? (
        <div className="border-t border-border bg-background px-6 py-4 md:hidden">
          <nav className="flex flex-col gap-4">
            {publicNavigation.map((item) => (
              <Link
                className="text-sm font-medium"
                href={item.href}
                key={item.href}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link href={routes.login} onClick={() => setIsOpen(false)}>
              Client Login
            </Link>
            <Button href={routes.contact} variant="secondary">
              Book a Consultation
            </Button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}