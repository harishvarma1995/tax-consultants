/**
 * ============================================================
 * Project : TAX CONSULTANTS
 * File    : components/blog/BlogDetail.tsx
 * Purpose : Displays a complete blog article.
 * ============================================================
 */

import Link from "next/link";

import { CalendarDays, Clock, ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { routes } from "@/config/routes";

type RelatedPost = {
  id: string;
  slug: string;
  title: string;
};

type BlogDetailProps = {
  title: string;
  category: string;
  excerpt: string;
  content: string;
  readingTimeMinutes: number;
  publishedAt: Date | null;
  relatedPosts: RelatedPost[];
};

export function BlogDetail({
  title,
  category,
  excerpt,
  content,
  readingTimeMinutes,
  publishedAt,
  relatedPosts,
}: BlogDetailProps) {
  return (
    <>
      <section className="py-16">
        <Link
          href={routes.blog}
          className="inline-flex items-center gap-2 text-accent hover:underline"
        >
          <ArrowLeft size={18} />
          Back to Articles
        </Link>

        <div className="mt-8">
          <span className="rounded-full bg-accent/10 px-3 py-1 text-sm font-medium text-accent">
            {category}
          </span>

          <h1 className="mt-6 text-5xl font-bold text-primary">
            {title}
          </h1>

          <p className="mt-6 max-w-3xl text-xl leading-8 text-muted-foreground">
            {excerpt}
          </p>

          <div className="mt-8 flex flex-wrap gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <CalendarDays size={16} />
              {publishedAt
                ? publishedAt.toLocaleDateString("en-IN")
                : "Coming Soon"}
            </span>

            <span className="flex items-center gap-2">
              <Clock size={16} />
              {readingTimeMinutes} min read
            </span>
          </div>
        </div>
      </section>

      <section className="grid gap-10 lg:grid-cols-[2fr_1fr]">
        <article className="prose prose-lg max-w-none">
          <div className="whitespace-pre-line text-muted-foreground">
            {content}
          </div>
        </article>

        <aside className="space-y-8">
          <Card>
            <h2 className="text-xl font-semibold text-primary">
              About the Author
            </h2>

            <p className="mt-4 text-muted-foreground">
              This article has been prepared by the TAX CONSULTANTS
              professional advisory team with more than 20 years of
              experience in taxation, compliance, and business advisory.
            </p>
          </Card>

          <Card>
            <h2 className="text-xl font-semibold text-primary">
              Need Professional Help?
            </h2>

            <p className="mt-4 text-muted-foreground">
              Every tax situation is different. Speak with our experts for
              advice tailored to your circumstances.
            </p>

            <div className="mt-6">
              <Button href={routes.contact}>
                Book a Consultation
              </Button>
            </div>
          </Card>

          {relatedPosts.length > 0 && (
            <Card>
              <h2 className="text-xl font-semibold text-primary">
                Related Articles
              </h2>

              <div className="mt-5 space-y-4">
                {relatedPosts.map((post) => (
                  <Link
                    key={post.id}
                    href={`${routes.blog}/${post.slug}`}
                    className="block text-accent hover:underline"
                  >
                    {post.title}
                  </Link>
                ))}
              </div>
            </Card>
          )}
        </aside>
      </section>
    </>
  );
}