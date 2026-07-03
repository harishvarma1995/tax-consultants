/**
 * ============================================================
 * Project : TAX CONSULTANTS
 * File    : app/(public)/blog/[slug]/page.tsx
 * Purpose : Dynamic public blog article page.
 * ============================================================
 */

import { notFound } from "next/navigation";

import { BlogDetail } from "@/components/blog/BlogDetail";
import { PageContainer } from "@/components/layout/PageContainer";
import {
  getBlogPostBySlug,
  getRelatedBlogPosts,
} from "@/lib/blog/blog";

type BlogPageProps = {
  params: {
    slug: string;
  };
};

export default async function BlogArticlePage({
  params,
}: BlogPageProps) {
  const post = await getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedBlogPosts(
    post.category,
    post.slug
  );

  return (
    <PageContainer>
      <BlogDetail
        title={post.title}
        category={post.category}
        excerpt={post.excerpt}
        content={post.content}
        readingTimeMinutes={post.readingTimeMinutes}
        publishedAt={post.publishedAt}
        relatedPosts={relatedPosts}
      />
    </PageContainer>
  );
}