/**
 * ============================================================
 * Project : TAX CONSULTANTS
 * File    : app/(public)/blog/page.tsx
 * Purpose : Public blog listing page.
 * ============================================================
 */

import { BlogCard } from "@/components/blog/BlogCard";
import { PageContainer } from "@/components/layout/PageContainer";
import { getPublishedBlogPosts } from "@/lib/blog/blog";

export default async function BlogPage() {
  const posts = await getPublishedBlogPosts();

  return (
    <PageContainer>
      <section className="py-16 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-accent">
          Knowledge Centre
        </p>

        <h1 className="mt-4 text-5xl font-bold text-primary">
          Tax insights, compliance updates, and practical guides
        </h1>

        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
          Explore articles written to help individuals, professionals,
          business owners, and NRIs better understand taxation, compliance,
          and financial responsibilities.
        </p>
      </section>

      <section className="pb-20">
        {posts.length === 0 ? (
          <div className="rounded-xl border border-border bg-card p-12 text-center">
            <h2 className="text-2xl font-semibold text-primary">
              No articles available
            </h2>

            <p className="mt-4 text-muted-foreground">
              Blog articles will appear here once they have been published.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {posts.map((post) => (
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
        )}
      </section>
    </PageContainer>
  );
}