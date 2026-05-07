import { cacheLife, cacheTag } from "next/cache";

export type Role = "Admin" | "Editor" | "Writer" | "Reader";

export type Author = {
  slug: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  socials: { label: string; href: string }[];
  stats: { posts: number; followers: string; readTime: string };
};

export type Category = {
  slug: string;
  title: string;
  description: string;
  parent?: string;
};

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  summary: string;
  body: { heading: string; content: string; code?: string }[];
  cover: string;
  publishedAt: string;
  updatedAt: string;
  author: string;
  category: string;
  tags: string[];
  featured?: boolean;
  trending?: boolean;
  views: number;
  likes: number;
  comments: number;
  readingMinutes: number;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
};

export const authors: Author[] = [
  {
    slug: "mira-shah",
    name: "Mira Shah",
    role: "Editor in chief",
    bio: "Mira leads content strategy for AI-native product teams and keeps the clarift voice precise, warm, and searchable.",
    avatar: "MS",
    socials: [
      { label: "LinkedIn", href: "https://www.linkedin.com" },
      { label: "X", href: "https://x.com" },
    ],
    stats: { posts: 42, followers: "18.4k", readTime: "6.8m" },
  },
  {
    slug: "jon-bell",
    name: "Jon Bell",
    role: "Staff engineer",
    bio: "Jon writes about production AI systems, analytics, developer workflows, and durable platform design.",
    avatar: "JB",
    socials: [{ label: "GitHub", href: "https://github.com" }],
    stats: { posts: 31, followers: "12.1k", readTime: "8.1m" },
  },
];

export const categories: Category[] = [
  {
    slug: "ai-strategy",
    title: "AI Strategy",
    description: "Practical editorial workflows powered by assistants, scoring, and automation.",
  },
  {
    slug: "engineering",
    title: "Engineering",
    description: "Architecture, performance, security, and maintainability for publishing teams.",
  },
  {
    slug: "seo",
    title: "SEO",
    description: "Technical search guidance, structured data, topical maps, and publishing hygiene.",
  },
  {
    slug: "cms-operations",
    title: "CMS Operations",
    description: "Sanity workflows, approvals, previews, media, and content governance.",
    parent: "engineering",
  },
];

export const posts: Post[] = [
  {
    slug: "ai-editorial-operating-system",
    title: "Designing an AI editorial operating system",
    excerpt:
      "A blueprint for pairing human editors with AI agents without losing craft, trust, or accountability.",
    summary:
      "clarift uses AI for drafts, metadata, recommendations, and scoring while keeping approvals and audits human-readable.",
    cover: "/covers/ai-editorial.svg",
    publishedAt: "2026-04-28T09:00:00.000Z",
    updatedAt: "2026-05-02T12:00:00.000Z",
    author: "mira-shah",
    category: "ai-strategy",
    tags: ["AI writing", "Editorial ops", "Governance"],
    featured: true,
    trending: true,
    views: 84220,
    likes: 4217,
    comments: 128,
    readingMinutes: 7,
    seo: {
      title: "AI editorial operating system blueprint",
      description:
        "Learn how to build AI-assisted editorial workflows with governance, previews, analytics, and SEO automation.",
      keywords: ["AI blog generation", "editorial workflow", "AI CMS"],
    },
    body: [
      {
        heading: "Start with editorial intent",
        content:
          "AI works best when it is given a role in the publishing system instead of being treated as a replacement for the system. In clarift, every generated draft carries provenance, prompt metadata, risk labels, and a required human approval path.",
      },
      {
        heading: "Make quality observable",
        content:
          "The dashboard tracks readability, topical coverage, internal link opportunities, semantic freshness, and content decay. Editors see why a recommendation exists before accepting it.",
      },
      {
        heading: "Stream ideas, cache finished work",
        content:
          "Generation is streamed from the admin surface for responsiveness. Published posts are statically generated and refreshed incrementally so readers get fast pages and editors get current content.",
        code: "export async function generateStaticParams() {\n  const posts = await getPublishedPosts();\n  return posts.map((post) => ({ slug: post.slug }));\n}",
      },
    ],
  },
  {
    slug: "next-rendering-for-content-platforms",
    title: "Modern Next.js rendering for content platforms",
    excerpt:
      "How SSG, ISR, streaming, route caching, and personalization fit together in a serious publishing app.",
    summary:
      "Use static generation for posts, cached server components for shared data, Suspense for personalized islands, and runtime rendering for dashboards.",
    cover: "/covers/next-rendering.svg",
    publishedAt: "2026-04-21T10:30:00.000Z",
    updatedAt: "2026-04-30T08:15:00.000Z",
    author: "jon-bell",
    category: "engineering",
    tags: ["Next.js", "Performance", "Architecture"],
    featured: true,
    trending: true,
    views: 63190,
    likes: 3304,
    comments: 91,
    readingMinutes: 9,
    seo: {
      title: "Next.js rendering architecture for blogs",
      description:
        "A professional hybrid rendering architecture for scalable AI blogging platforms.",
      keywords: ["Next.js ISR", "partial prerendering", "content platform architecture"],
    },
    body: [
      {
        heading: "Cache the public contract",
        content:
          "The public blog should be the fastest part of the product. Category lists, author cards, and article paths are cached with explicit cache lifetimes and tags so publishing webhooks can invalidate them deliberately.",
      },
      {
        heading: "Stream the unknown",
        content:
          "Personalized recommendations, bookmarks, and reader history belong behind Suspense boundaries. The static shell remains useful while private data arrives.",
      },
      {
        heading: "Keep admin runtime-first",
        content:
          "Dashboards, AI generation, and workflow queues depend on session state and fresh analytics, so they render at request time and use route handlers for mutations.",
      },
    ],
  },
  {
    slug: "seo-systems-not-checklists",
    title: "SEO systems beat SEO checklists",
    excerpt:
      "Enterprise SEO is a publishing feedback loop: metadata, schemas, links, freshness, and analytics all working together.",
    summary:
      "clarift treats SEO as a structured data product with canonical URLs, JSON-LD, sitemaps, RSS, and automated QA.",
    cover: "/covers/seo-systems.svg",
    publishedAt: "2026-04-12T14:00:00.000Z",
    updatedAt: "2026-04-19T10:00:00.000Z",
    author: "mira-shah",
    category: "seo",
    tags: ["SEO", "Structured data", "Analytics"],
    trending: true,
    views: 51204,
    likes: 2870,
    comments: 64,
    readingMinutes: 6,
    seo: {
      title: "Enterprise SEO systems for publishing teams",
      description:
        "Build SEO-first publishing workflows with structured data, canonical URLs, content scoring, and automated audits.",
      keywords: ["enterprise SEO", "JSON-LD", "technical SEO"],
    },
    body: [
      {
        heading: "Model search fields directly",
        content:
          "SEO metadata is part of the content model, not an afterthought. Every post stores canonical intent, excerpt, social copy, FAQs, and target keywords.",
      },
      {
        heading: "Publish machine-readable context",
        content:
          "Article schema, breadcrumb schema, RSS, robots, and sitemaps keep discovery reliable at scale.",
      },
    ],
  },
];

export async function getPublishedPosts() {
  "use cache";
  cacheLife("hours");
  cacheTag("posts");
  return posts;
}

export async function getPostBySlug(slug: string) {
  "use cache";
  cacheLife("hours");
  cacheTag(`post:${slug}`);
  return posts.find((post) => post.slug === slug) ?? null;
}

export async function getFeaturedPosts() {
  "use cache";
  cacheLife("hours");
  return posts.filter((post) => post.featured);
}

export async function getTrendingPosts() {
  "use cache";
  cacheLife("minutes");
  return [...posts].filter((post) => post.trending).sort((a, b) => b.views - a.views);
}

export async function getAuthorBySlug(slug: string) {
  "use cache";
  cacheLife("hours");
  return authors.find((author) => author.slug === slug) ?? null;
}

export async function getCategoryBySlug(slug: string) {
  "use cache";
  cacheLife("hours");
  return categories.find((category) => category.slug === slug) ?? null;
}

export function getAuthor(slug: string) {
  return authors.find((author) => author.slug === slug) ?? authors[0];
}

export function getCategory(slug: string) {
  return categories.find((category) => category.slug === slug) ?? categories[0];
}

export function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export function searchPosts(query: string) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return posts;
  return posts.filter((post) =>
    [post.title, post.excerpt, post.category, ...post.tags]
      .join(" ")
      .toLowerCase()
      .includes(normalized),
  );
}
