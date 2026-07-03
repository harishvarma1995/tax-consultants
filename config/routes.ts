/**
 * ============================================================
 * Project : TAX CONSULTANTS
 * File    : config/routes.ts
 * Purpose : Stores all public navigation routes in one place.
 *
 * Important:
 * Tax Calculator route is intentionally removed.
 * ============================================================
 */

export const routes = {
  home: "/",
  about: "/about",
  services: "/services",
  blog: "/blog",
  faq: "/faq",
  contact: "/contact",
  privacyPolicy: "/privacy-policy",
  termsOfService: "/terms-of-service",
  login: "/login",
  register: "/register",
  clientDashboard: "/client/dashboard",
  adminDashboard: "/admin/dashboard",
};

export const publicNavigation = [
  { label: "Home", href: routes.home },
  { label: "About", href: routes.about },
  { label: "Services", href: routes.services },
  { label: "Blog", href: routes.blog },
  { label: "FAQ", href: routes.faq },
  { label: "Contact", href: routes.contact },
];

export const legalNavigation = [
  { label: "Privacy Policy", href: routes.privacyPolicy },
  { label: "Terms of Service", href: routes.termsOfService },
];