import type { Metadata } from "next";
import type { Post } from "@/lib/content";
import { getAuthor, getCategory } from "@/lib/content";

export const siteConfig = {
  name: "clarift",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://clarift.ai",
  description:
    "AI-powered blogging, SEO intelligence, Sanity workflows, and analytics for serious publishing teams.",
};

export function absoluteUrl(path = "") {
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}

export function postMetadata(post: Post): Metadata {
  const title = post.seo.title || post.title;
  const description = post.seo.description || post.excerpt;
  return {
    title,
    description,
    alternates: {
      canonical: absoluteUrl(`/blog/${post.slug}`),
    },
    keywords: post.seo.keywords,
    openGraph: {
      type: "article",
      title,
      description,
      url: absoluteUrl(`/blog/${post.slug}`),
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [getAuthor(post.author).name],
      images: [{ url: post.cover.startsWith("http") ? post.cover : absoluteUrl(post.cover), width: 1600, height: 900, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [post.cover.startsWith("http") ? post.cover : absoluteUrl(post.cover)],
    },
  };
}

export function articleJsonLd(post: Post) {
  const author = getAuthor(post.author);
  const category = getCategory(post.category);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.cover,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    articleSection: category.title,
    keywords: post.tags.join(", "),
    author: {
      "@type": "Person",
      name: author.name,
      url: absoluteUrl(`/authors/${author.slug}`),
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}
