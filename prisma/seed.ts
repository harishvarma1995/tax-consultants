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
  {
    slug: "income-tax-filing",
    title: "Income Tax Filing",
    description:
      "Complete income tax return preparation and filing for salaried individuals, professionals, senior citizens, and businesses.",
    priceRange: "Rs. 999 - Rs. 4,999",
    displayOrder: 1,
  },
  {
    slug: "gst-registration-filing",
    title: "GST Registration & Filing",
    description:
      "GST registration, return filing, amendments, reconciliation, and ongoing GST compliance support.",
    priceRange: "Rs. 1,999 - Rs. 7,999",
    displayOrder: 2,
  },
  {
    slug: "tax-planning",
    title: "Tax Planning",
    description:
      "Strategic tax planning to legally reduce tax liability while maximizing eligible deductions and exemptions.",
    priceRange: "Rs. 2,999 - Rs. 9,999",
    displayOrder: 3,
  },
  {
    slug: "business-tax",
    title: "Business Tax",
    description:
      "Comprehensive tax compliance and advisory services for proprietorships, partnerships, LLPs, and companies.",
    priceRange: "Rs. 4,999 - Rs. 14,999",
    displayOrder: 4,
  },
  {
    slug: "tds-returns",
    title: "TDS Returns",
    description:
      "Quarterly TDS return filing, corrections, challan reconciliation, and compliance management.",
    priceRange: "Rs. 1,999 - Rs. 6,999",
    displayOrder: 5,
  },
  {
    slug: "nri-taxation",
    title: "NRI Taxation",
    description:
      "Specialized tax advisory and return filing services for Non-Resident Indians with Indian income or investments.",
    priceRange: "Rs. 3,999 - Rs. 12,999",
    displayOrder: 6,
  },
  {
    slug: "tax-notices-disputes",
    title: "Tax Notices & Disputes",
    description:
      "Professional assistance in responding to income tax and GST notices, assessments, and departmental communications.",
    priceRange: "Rs. 2,999 - Rs. 12,999",
    displayOrder: 7,
  },
  {
    slug: "audit-support",
    title: "Audit Support",
    description:
      "Documentation review, audit preparation, representation support, and compliance assistance for financial audits.",
    priceRange: "Rs. 5,999 - Rs. 19,999",
    displayOrder: 8,
  },
];

  for (const service of services) {
  await prisma.service.upsert({
    where: {
      slug: service.slug,
    },

    update: {
      title: service.title,
      description: service.description,
      priceRange: service.priceRange,
      displayOrder: service.displayOrder,
      isActive: true,
    },

    create: {
      slug: service.slug,
      title: service.title,
      description: service.description,
      priceRange: service.priceRange,
      displayOrder: service.displayOrder,
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

  const blogPosts = [
  {
    slug: "documents-required-for-income-tax-filing",
    title: "Documents Required for Income Tax Filing",
    excerpt:
      "A complete checklist of documents you should gather before filing your income tax return.",
    content: `
Preparing your documents before filing your income tax return makes the entire process faster and reduces errors.

Common documents include:
• PAN Card
• Aadhaar Card
• Form 16
• Bank Statements
• Interest Certificates
• Investment Proofs
• Home Loan Statements
• Capital Gain Statements

Organizing these records early helps ensure accurate reporting and faster processing.
`,
    category: "Income Tax",
    readingTimeMinutes: 5,
    isPublished: true,
  },
  {
    slug: "common-income-tax-filing-mistakes",
    title: "Common Income Tax Filing Mistakes",
    excerpt:
      "Avoid the most frequent filing errors that delay refunds or trigger notices.",
    content: `
Many taxpayers make avoidable mistakes such as:

• Choosing the wrong ITR form
• Reporting incorrect bank details
• Forgetting additional income
• Claiming deductions without proof
• Missing filing deadlines

Reviewing your return carefully before submission helps avoid unnecessary complications.
`,
    category: "Income Tax",
    readingTimeMinutes: 6,
    isPublished: true,
  },
  {
    slug: "year-end-tax-planning-guide",
    title: "Year-End Tax Planning Guide",
    excerpt:
      "Practical tax planning ideas before the financial year closes.",
    content: `
Good tax planning should happen throughout the year rather than at the last minute.

Review:

• Section 80C investments
• Health insurance deductions
• Home loan benefits
• Capital gains planning
• Advance tax obligations

Planning early provides more options and reduces stress during filing season.
`,
    category: "Income Tax",
    readingTimeMinutes: 7,
    isPublished: true,
  },
  {
    slug: "gst-registration-guide",
    title: "GST Registration Guide",
    excerpt:
      "Understand who should register for GST and how the registration process works.",
    content: `
GST registration depends on turnover, business type, and location.

Important considerations include:

• Registration threshold
• Required documents
• Business constitution
• Bank account verification
• GSTIN issuance

Professional guidance helps ensure the application is completed correctly.
`,
    category: "GST",
    readingTimeMinutes: 6,
    isPublished: true,
  },
  {
    slug: "gst-return-filing-checklist",
    title: "GST Return Filing Checklist",
    excerpt:
      "A practical checklist for preparing monthly and quarterly GST returns.",
    content: `
Before filing GST returns, verify:

• Sales invoices
• Purchase invoices
• Input tax credit
• Tax payments
• Reconciliation reports

Maintaining accurate records significantly reduces filing errors.
`,
    category: "GST",
    readingTimeMinutes: 5,
    isPublished: true,
  },
  {
    slug: "gst-mistakes-small-businesses-make",
    title: "GST Mistakes Small Businesses Make",
    excerpt:
      "Common GST compliance mistakes and how businesses can avoid them.",
    content: `
Small businesses often struggle with:

• Late return filing
• Incorrect invoice formats
• Missing reconciliations
• Improper ITC claims
• Record keeping

Establishing a consistent compliance process helps avoid penalties.
`,
    category: "GST",
    readingTimeMinutes: 6,
    isPublished: true,
  },

  {
    slug: "tax-saving-strategies-for-small-businesses",
    title: "Tax Saving Strategies for Small Businesses",
    excerpt:
      "Practical tax planning ideas for small businesses to reduce their tax liability.",
    content: `
Small businesses can take advantage of various tax-saving opportunities.

Effective strategies include:

• Section 80C investments
• Health insurance deductions
• Home loan benefits
• Capital gains planning
• Advance tax obligations

Implementing these strategies early in the year maximizes savings.
`,
    category: "Income Tax",
    readingTimeMinutes: 7,
    isPublished: true,
  },
  {
    slug: "choosing-the-right-business-structure",
    title: "Choosing the Right Business Structure",
    excerpt:
      "Understand the tax implications of proprietorships, partnerships, LLPs, and private limited companies.",
    content: `
Selecting the correct business structure affects taxation, compliance, and long-term growth.

Before choosing, consider:

• Business objectives
• Tax obligations
• Compliance requirements
• Liability protection
• Future expansion plans

Professional advice can help you choose the most suitable structure from the beginning.
`,
    category: "Business Tax",
    readingTimeMinutes: 7,
    isPublished: true,
  },
  {
    slug: "business-tax-compliance-calendar",
    title: "Business Tax Compliance Calendar",
    excerpt:
      "A practical overview of important tax and compliance deadlines for businesses.",
    content: `
Keeping track of compliance deadlines helps businesses avoid penalties.

Important activities include:

• GST returns
• TDS returns
• Advance tax
• Income tax returns
• Annual filings

Maintaining a compliance calendar improves business discipline.
`,
    category: "Business Tax",
    readingTimeMinutes: 6,
    isPublished: true,
  },
  {
    slug: "financial-records-every-business-should-maintain",
    title: "Financial Records Every Business Should Maintain",
    excerpt:
      "Learn which financial records every business should organize throughout the year.",
    content: `
Proper documentation makes taxation and auditing much easier.

Essential records include:

• Sales invoices
• Purchase invoices
• Bank statements
• Payroll records
• Expense vouchers
• Tax payment receipts

Well-maintained records reduce compliance risks.
`,
    category: "Business Tax",
    readingTimeMinutes: 5,
    isPublished: true,
  },
  {
    slug: "understanding-income-tax-notices",
    title: "Understanding Income Tax Notices",
    excerpt:
      "Understand why notices are issued and how to respond appropriately.",
    content: `
Receiving a tax notice does not necessarily mean something is wrong.

Common reasons include:

• Information mismatch
• Missing documents
• Verification requests
• Assessment proceedings

Responding within the prescribed timeline is extremely important.
`,
    category: "Tax Notices",
    readingTimeMinutes: 6,
    isPublished: true,
  },
  {
    slug: "responding-to-gst-notices",
    title: "Responding to GST Notices",
    excerpt:
      "A practical guide to understanding and responding to GST notices.",
    content: `
GST notices should always be reviewed carefully.

Recommended steps include:

• Understand the notice
• Collect supporting documents
• Review applicable provisions
• Prepare an appropriate response
• Maintain complete records

Professional guidance can help avoid unnecessary disputes.
`,
    category: "Tax Notices",
    readingTimeMinutes: 6,
    isPublished: true,
  },
    {
    slug: "when-to-seek-professional-tax-advice",
    title: "When to Seek Professional Tax Advice",
    excerpt:
      "Know when professional assistance can save time, money, and future compliance issues.",
    content: `
Professional tax advice becomes valuable when dealing with:

• Business taxation
• Capital gains
• International taxation
• Tax notices
• High-value transactions
• Tax planning

Seeking advice early often prevents costly mistakes later.
`,
    category: "Tax Notices",
    readingTimeMinutes: 5,
    isPublished: true,
  },
];

for (const post of blogPosts) {
  await prisma.blogPost.upsert({
    where: {
      slug: post.slug,
    },

    update: {
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      readingTimeMinutes: post.readingTimeMinutes,
      isPublished: post.isPublished,
      publishedAt: new Date(),
    },

    create: {
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      readingTimeMinutes: post.readingTimeMinutes,
      isPublished: post.isPublished,
      publishedAt: new Date(),
    },
  });
}


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