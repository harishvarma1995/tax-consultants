/**
 * ============================================================
 * Project : TAX CONSULTANTS
 * File    : content/site-content.ts
 * Purpose : Stores public website text content in one place.
 *
 * Important:
 * Do not add Tax Calculator content. That feature is removed.
 * ============================================================
 */

export const siteContent = {
  company: {
  name: "TAX CONSULTANTS",
  tagline: "Professional tax guidance with security and care.",
  phone: "+91 98765 43210",
  email: "contact@taxconsultants.com",
  address:
    "123 Business Avenue, Financial District, Hyderabad, Telangana, India",
  hours: "Monday to Saturday, 9:00 AM - 6:30 PM",
  whatsapp: "+919876543210",
  googleMapsUrl: "https://www.google.com/maps",
},

  navigation: {
    main: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Services", href: "/services" },
      { label: "Blog", href: "/blog" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "/contact" },
    ],
    legal: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms-of-service" },
    ],
  },

  home: {
    hero: {
      headline: "Professional Tax Consulting You Can Trust",
      subheadline:
        "Expert tax filing, GST, business compliance, and advisory services with a secure client portal.",
      primaryCta: "Book Free Consultation",
      secondaryCta: "Our Services",
    },
    trustBadges: [
      "15+ Years Experience",
      "500+ Clients Served",
      "100% Secure Portal",
      "Expert CA Team",
    ],
    howItWorks: [
      {
        title: "Book Consultation",
        description: "Schedule a convenient time with our tax experts.",
      },
      {
        title: "Share Documents",
        description: "Upload or share documents securely for review.",
      },
      {
        title: "Get Your Taxes Done",
        description: "Receive accurate filing, guidance, and updates.",
      },
    ],
    testimonials: [
      {
        name: "Ravi Kumar",
        designation: "Small Business Owner",
        quote:
          "The team made GST filing and business tax compliance simple and stress-free.",
        rating: 5,
      },
      {
        name: "Priya Sharma",
        designation: "Software Professional",
        quote:
          "My income tax filing was handled quickly, clearly, and with excellent communication.",
        rating: 5,
      },
      {
        name: "Anil Reddy",
        designation: "NRI Client",
        quote:
          "They explained my NRI tax situation clearly and handled everything professionally.",
        rating: 5,
      },
    ],

    blogPreview: [
  {
    slug: "documents-needed-for-income-tax-filing",
    category: "Income Tax",
    title: "Documents Needed for Income Tax Filing",
    excerpt:
      "A practical checklist to help you prepare salary slips, Form 16, bank statements, and investment proofs before filing.",
    date: "15 Jul 2026",
    readingTime: "4 min read",
  },
  {
    slug: "gst-compliance-basics-for-small-businesses",
    category: "GST",
    title: "GST Compliance Basics for Small Businesses",
    excerpt:
      "Understand registration, return filing, invoices, and monthly compliance responsibilities for growing businesses.",
    date: "22 Jul 2026",
    readingTime: "5 min read",
  },
  {
    slug: "how-to-respond-to-a-tax-notice",
    category: "Tax Notices",
    title: "How to Respond to a Tax Notice",
    excerpt:
      "Learn the first steps to take when you receive a notice and why timely professional review matters.",
    date: "29 Jul 2026",
    readingTime: "6 min read",
  },
],

    cta: {
      title: "Ready to simplify your taxes?",
      description:
        "Book a consultation and get expert support for your tax and compliance needs.",
      button: "Book Consultation",
    },
  },

  services: [
    {
      slug: "income-tax-filing",
      title: "Income Tax Filing",
      description: "Accurate individual income tax return preparation and filing.",
      priceRange: "Starting from ₹999",
    },
    {
      slug: "gst-registration-filing",
      title: "GST Registration & Filing",
      description: "GST registration, monthly returns, and compliance support.",
      priceRange: "Starting from ₹1,999",
    },
    {
      slug: "tax-planning",
      title: "Tax Planning",
      description: "Personalized tax-saving strategies for individuals and businesses.",
      priceRange: "Consultation based",
    },
    {
      slug: "business-tax",
      title: "Business Tax",
      description: "Tax compliance and advisory for businesses and professionals.",
      priceRange: "Custom pricing",
    },
    {
      slug: "tds-returns",
      title: "TDS Returns",
      description: "TDS return filing, correction, and compliance assistance.",
      priceRange: "Starting from ₹1,499",
    },
    {
      slug: "nri-taxation",
      title: "NRI Taxation",
      description: "Tax advisory and filing support for NRI clients.",
      priceRange: "Consultation based",
    },
    {
      slug: "tax-notices-disputes",
      title: "Tax Notices & Disputes",
      description: "Professional assistance for tax notices and dispute responses.",
      priceRange: "Case based",
    },
    {
      slug: "audit-support",
      title: "Audit Support",
      description: "Documentation and compliance support for audits.",
      priceRange: "Custom pricing",
    },
  ],

  about: {
    story:
      "TAX CONSULTANTS helps individuals, professionals, and businesses manage tax compliance with clarity, accuracy, and care.",
    mission:
      "Our mission is to make tax and compliance services simple, secure, and accessible for every client.",
    values: ["Integrity", "Confidentiality", "Accuracy", "Client-first service"],
    whyChooseUs: [
      "Experienced tax professionals",
      "Secure document handling",
      "Transparent communication",
      "End-to-end compliance support",
    ],
    team: [
      {
        name: "Senior Consultant",
        role: "Income Tax Specialist",
        bio: "Experienced in individual tax filing and tax planning.",
      },
      {
        name: "GST Advisor",
        role: "GST Compliance Expert",
        bio: "Supports GST registration, filing, and compliance queries.",
      },
      {
        name: "Business Consultant",
        role: "Business Tax Advisor",
        bio: "Helps businesses with tax, notices, and compliance planning.",
      },
    ],
  },

  footer: {
    newsletterPlaceholder: "Enter your email",
    securityNote: "Developed with security and care.",
    copyright:
      "© TAX CONSULTANTS. All rights reserved.",
  },

  social: {
    facebook: "https://facebook.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
  },
};