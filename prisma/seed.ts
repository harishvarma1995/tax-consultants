/**
 * ============================================================
 * Project : TAX CONSULTANTS
 * Phase   : Phase 2 - Database Setup
 * File    : prisma/seed.ts
 * Purpose : Populates the database with initial development data.
 *
 * This seed file creates:
 * - 1 Administrator account
 * - 8 Sample services
 * - 5 FAQ entries (stored in SiteSettings)
 * - 1 Sample blog post
 *
 * This file is intended for development and testing only.
 * ============================================================
 */

import { PrismaClient, UserRole } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('Admin@123456', 12);

  await prisma.user.upsert({
    where: { email: 'admin@taxconsultants.local' },
    update: {},
    create: {
      email: 'admin@taxconsultants.local',
      passwordHash,
      role: UserRole.ADMIN,
      emailVerified: true,
      fullName: 'System Administrator',
      phone: '0000000000',
    },
  });

  const services = [
    ['income-tax-filing', 'Income Tax Filing', 'Complete ITR filing support for individuals and professionals.', '₹999 - ₹4,999', 1],
    ['gst-registration', 'GST Registration', 'GST registration support for businesses and professionals.', '₹1,999 - ₹5,999', 2],
    ['gst-return-filing', 'GST Return Filing', 'Monthly, quarterly, and annual GST return filing assistance.', '₹1,499 - ₹7,999', 3],
    ['tax-planning', 'Tax Planning', 'Personalized tax planning to reduce liability legally.', '₹2,999 - ₹9,999', 4],
    ['pan-services', 'PAN Services', 'PAN application, correction, and update support.', '₹499 - ₹1,499', 5],
    ['tds-filing', 'TDS Filing', 'TDS return filing and compliance support.', '₹1,999 - ₹6,999', 6],
    ['business-compliance', 'Business Compliance', 'Compliance support for small businesses and firms.', '₹4,999 - ₹14,999', 7],
    ['notice-response', 'Tax Notice Response', 'Assistance with income tax and GST notices.', '₹2,999 - ₹12,999', 8],
  ];

  for (const [slug, title, description, priceRange, displayOrder] of services) {
    await prisma.service.upsert({
      where: { slug: String(slug) },
      update: {
        title: String(title),
        description: String(description),
        priceRange: String(priceRange),
        displayOrder: Number(displayOrder),
        isActive: true,
      },
      create: {
        slug: String(slug),
        title: String(title),
        description: String(description),
        priceRange: String(priceRange),
        displayOrder: Number(displayOrder),
        isActive: true,
      },
    });
  }

  const faqs = [
    ['faq.001', 'What documents are required for ITR filing?', 'PAN, Aadhaar, Form 16, bank statements, investment proofs, and income details are commonly required.'],
    ['faq.002', 'Can I file my income tax return online?', 'Yes, income tax returns can be filed online after collecting the required documents and verifying income details.'],
    ['faq.003', 'Do you help with GST registration?', 'Yes, GST registration support is available for eligible businesses and professionals.'],
    ['faq.004', 'How long does tax filing usually take?', 'Simple individual returns may be completed quickly, while complex cases may take longer depending on documents.'],
    ['faq.005', 'Is my document data secure?', 'Yes, private document handling and secure storage practices will be used in the application.'],
  ];

  for (const [key, question, answer] of faqs) {
    await prisma.siteSettings.upsert({
      where: { key: String(key) },
      update: {
        value: JSON.stringify({ question, answer }),
      },
      create: {
        key: String(key),
        value: JSON.stringify({ question, answer }),
      },
    });
  }

  await prisma.blogPost.upsert({
    where: { slug: 'income-tax-filing-guide' },
    update: {},
    create: {
      slug: 'income-tax-filing-guide',
      title: 'Beginner Guide to Income Tax Filing',
      content:
        'This sample blog post explains the basics of income tax filing, required documents, common mistakes, and why timely filing is important.',
      excerpt: 'A beginner-friendly guide to understanding income tax filing.',
      coverImage: null,
      category: 'Income Tax',
      publishedAt: new Date(),
      readingTimeMinutes: 4,
      isPublished: true,
    },
  });

  console.log('Seed completed successfully.');
}

main()
  .catch((error) => {
    console.error('Seed failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });