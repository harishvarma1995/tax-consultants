/**
 * ============================================================
 * Project : TAX CONSULTANTS
 * File    : components/blog/BlogCard.tsx
 * Purpose : Reusable blog preview card.
 * ============================================================
 */

import Link from "next/link";
import { CalendarDays, Clock, ArrowRight } from "lucide-react";

import { Card } from "@/components/ui/Card";
import { routes } from "@/config/routes";

type BlogCardProps = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readingTimeMinutes: number;
  publishedAt: Date | null;
};

export function BlogCard({
  slug,
  title,
  excerpt,
  category,
  readingTimeMinutes,
  publishedAt,
}: BlogCardProps) {
  return (
    <Card className="flex h-full flex-col">
      <div className="aspect-video rounded-lg bg-muted" />

      <div className="mt-5">
        <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
          {category}
        </span>

        <h3 className="mt-4 text-2xl font-semibold text-primary">
          {title}
        </h3>

        <p className="mt-4 flex-1 leading-7 text-muted-foreground">
          {excerpt}
        </p>

        <div className="mt-6 flex flex-wrap gap-5 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <CalendarDays size={16} />
            {publishedAt
              ? publishedAt.toLocaleDateString("en-IN")
              : "Coming Soon"}
          </span>

          <span className="flex items-center gap-1">
            <Clock size={16} />
            {readingTimeMinutes} min read
          </span>
        </div>

        <Link
          href={`${routes.blog}/${slug}`}
          className="mt-8 inline-flex items-center gap-2 font-medium text-accent hover:underline"
        >
          Read Article
          <ArrowRight size={18} />
        </Link>
      </div>
    </Card>
  );
}