/**
 * ============================================================
 * Project : TAX CONSULTANTS
 * File    : lib/blog/blog.ts
 * Purpose : Centralized read functions for blog posts.
 * ============================================================
 */

import { db } from "@/lib/db";

export async function getPublishedBlogPosts() {
  return db.blogPost.findMany({
    where: {
      isPublished: true,
    },
    orderBy: {
      publishedAt: "desc",
    },
  });
}

export async function getBlogPostBySlug(slug: string) {
  return db.blogPost.findUnique({
    where: {
      slug,
    },
  });
}

export async function getRelatedBlogPosts(
  category: string,
  currentSlug: string
) {
  return db.blogPost.findMany({
    where: {
      isPublished: true,
      category,
      slug: {
        not: currentSlug,
      },
    },
    take: 3,
    orderBy: {
      publishedAt: "desc",
    },
  });
}