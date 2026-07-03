/**
 * ============================================================
 * Project : TAX CONSULTANTS
 * File    : app/(public)/about/page.tsx
 * Purpose : Public About Us page.
 * ============================================================
 */

import { Card } from "@/components/ui/Card";
import { PageContainer } from "@/components/layout/PageContainer";

export default function AboutPage() {
  return (
    <PageContainer>
      {/* Hero */}
      <section className="py-16 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-accent">
          About TAX CONSULTANTS
        </p>

        <h1 className="mt-4 text-5xl font-bold text-primary">
          Professional tax advice backed by experience and trust.
        </h1>

        <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground">
          TAX CONSULTANTS is dedicated to helping individuals, professionals,
          and businesses navigate taxation with confidence. Our focus is on
          accuracy, compliance, transparency, and long-term client
          relationships.
        </p>
      </section>

      {/* Our Story */}
      <section className="py-12">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold text-primary">
              Our Story
            </h2>

            <p className="mt-5 text-muted-foreground leading-8">
              We believe taxation should never feel overwhelming. By combining
              technical expertise with a client-first approach, we simplify
              complex financial regulations into practical solutions that people
              can understand and trust.
            </p>

            <p className="mt-5 text-muted-foreground leading-8">
              Whether it&rsquo;s filing an income tax return, managing GST
              compliance, responding to tax notices, or planning for future
              growth, we strive to provide timely, dependable, and ethical
              professional guidance.
            </p>
          </div>

          <Card>
            <h3 className="text-2xl font-semibold text-primary">
              Our Mission
            </h3>

            <p className="mt-4 text-muted-foreground">
              To provide reliable, transparent, and secure tax consulting
              services that empower individuals and businesses to meet their
              financial obligations with confidence.
            </p>

            <h3 className="mt-8 text-2xl font-semibold text-primary">
              Our Vision
            </h3>

            <p className="mt-4 text-muted-foreground">
              To become a trusted long-term advisory partner known for
              professionalism, integrity, and exceptional client service.
            </p>
          </Card>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-primary">
            Why Choose Us
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Every engagement is built around accuracy, responsiveness,
            confidentiality, and personalized service.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <Card>
            <h3 className="text-xl font-semibold text-primary">
              Experienced Guidance
            </h3>

            <p className="mt-3 text-muted-foreground">
              Practical advice tailored to individual and business tax
              requirements.
            </p>
          </Card>

          <Card>
            <h3 className="text-xl font-semibold text-primary">
              Secure Process
            </h3>

            <p className="mt-3 text-muted-foreground">
              Your financial information is handled with confidentiality and
              care.
            </p>
          </Card>

          <Card>
            <h3 className="text-xl font-semibold text-primary">
              Transparent Communication
            </h3>

            <p className="mt-3 text-muted-foreground">
              Clear explanations, regular updates, and no unnecessary jargon.
            </p>
          </Card>

          <Card>
            <h3 className="text-xl font-semibold text-primary">
              Long-Term Support
            </h3>

            <p className="mt-3 text-muted-foreground">
              We aim to build lasting relationships beyond a single tax season.
            </p>
          </Card>
        </div>
      </section>

      {/* Team */}
      <section className="py-16">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-primary">
            Meet Our Team
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Placeholder profiles are shown below and can be replaced with your
            actual team information in the future.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            {
              name: "Senior Tax Consultant",
              role: "Founder & Principal Consultant",
            },
            {
              name: "GST Specialist",
              role: "Indirect Tax Advisor",
            },
            {
              name: "Client Relationship Manager",
              role: "Client Success",
            },
          ].map((member) => (
            <Card key={member.name}>
              <div className="mx-auto h-24 w-24 rounded-full bg-muted" />

              <h3 className="mt-6 text-center text-xl font-semibold text-primary">
                {member.name}
              </h3>

              <p className="mt-2 text-center text-muted-foreground">
                {member.role}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16">
        <Card>
          <h2 className="text-3xl font-bold text-primary">
            Certifications & Professional Standards
          </h2>

          <p className="mt-5 leading-8 text-muted-foreground">
            Professional registrations, certifications, memberships, and
            regulatory information will be displayed here once finalized.
            This placeholder section demonstrates the final layout without
            making claims about credentials that have not yet been provided.
          </p>
        </Card>
      </section>
    </PageContainer>
  );
}