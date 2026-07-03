/**
 * ============================================================
 * Project : TAX CONSULTANTS
 * File    : components/home/BlogPreview.tsx
 * Purpose : Displays the latest published blog posts on the home page.
 * ============================================================
 */

import { BlogCard } from "@/components/blog/BlogCard";
import { getPublishedBlogPosts } from "@/lib/blog/blog";

export async function BlogPreview() {
  const posts = await getPublishedBlogPosts();

  return (
    <section className="py-20">
      <div className="mb-12 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-accent">
          Latest Articles
        </p>

        <h2 className="mt-3 text-4xl font-bold text-primary">
          Stay Updated With Tax Insights
        </h2>

        <p className="mx-auto mt-4 max-w-3xl text-muted-foreground">
          Read practical articles covering income tax, GST, business compliance,
          tax planning, and financial best practices written by our professional
          advisory team.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {posts.slice(0, 3).map((post) => (
          <BlogCard
            key={post.id}
            slug={post.slug}
            title={post.title}
            excerpt={post.excerpt}
            category={post.category}
            readingTimeMinutes={post.readingTimeMinutes}
            publishedAt={post.publishedAt}
          />
        ))}
      </div>
    </section>
  );
}