/**
 * ============================================================
 * Project : TAX CONSULTANTS
 * File    : components/layout/Footer.tsx
 * Purpose : Public website footer.
 * ============================================================
 */

import Link from "next/link";
import { legalNavigation, publicNavigation } from "@/config/routes";
import { siteContent } from "@/content/site-content";

export function Footer() {
  return (
    <footer className="border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 md:grid-cols-4">
        <div>
          <h2 className="text-xl font-bold">
            {siteContent.company.name}
            <span className="text-accent">.</span>
          </h2>
          <p className="mt-3 text-sm opacity-80">{siteContent.company.tagline}</p>
          <p className="mt-4 text-sm text-accent">{siteContent.footer.securityNote}</p>
        </div>

        <div>
          <h3 className="font-semibold">Company</h3>
          <nav className="mt-3 flex flex-col gap-2 text-sm opacity-80">
            {publicNavigation.map((item) => (
              <Link href={item.href} key={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <h3 className="font-semibold">Legal</h3>
          <nav className="mt-3 flex flex-col gap-2 text-sm opacity-80">
            {legalNavigation.map((item) => (
              <Link href={item.href} key={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <h3 className="font-semibold">Contact</h3>
          <div className="mt-3 space-y-2 text-sm opacity-80">
            <p>{siteContent.company.phone}</p>
            <p>{siteContent.company.email}</p>
            <p>{siteContent.company.address}</p>
            <p>{siteContent.company.hours}</p>
          </div>

          <div className="mt-4 flex gap-3 text-sm">
            <Link href={siteContent.social.facebook}>Facebook</Link>
            <Link href={siteContent.social.linkedin}>LinkedIn</Link>
            <Link href={siteContent.social.twitter}>Twitter</Link>
          </div>

          <form className="mt-5 flex gap-2">
            <input
              aria-label="Newsletter email"
              className="w-full rounded-md px-3 py-2 text-sm text-foreground"
              placeholder={siteContent.footer.newsletterPlaceholder}
              type="email"
            />
            <button className="rounded-md bg-accent px-3 py-2 text-sm font-medium text-accent-foreground" type="button">
              Join
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10 px-6 py-4 text-center text-xs opacity-75">
        {siteContent.footer.copyright}
      </div>
    </footer>
  );
}