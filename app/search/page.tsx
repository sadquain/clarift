import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { categories, searchPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Search",
  description: "Search clarift articles by topic, category, and tag.",
};

async function SearchResults({ searchParams }: { searchParams: Promise<{ q?: string; category?: string }> }) {
  const { q = "", category = "" } = await searchParams;
  const results = searchPosts(q).filter((post) => (category ? post.category === category : true));

  return (
    <>
      <form className="mt-6 grid gap-3 rounded-3xl border border-line bg-paper p-4 sm:grid-cols-[1fr_220px_auto]">
        <label className="sr-only" htmlFor="q">Search query</label>
        <input
          id="q"
          name="q"
          defaultValue={q}
          placeholder="AI SEO, rendering, Sanity..."
          className="min-h-12 rounded-full border border-line bg-background px-4"
        />
        <label className="sr-only" htmlFor="category">Category</label>
        <select id="category" name="category" defaultValue={category} className="min-h-12 rounded-full border border-line bg-background px-4">
          <option value="">All categories</option>
          {categories.map((item) => (
            <option key={item.slug} value={item.slug}>{item.title}</option>
          ))}
        </select>
        <button className="min-h-12 rounded-full bg-brand px-5 text-sm font-semibold text-white">Search</button>
      </form>
      <p className="mt-5 text-sm text-muted" role="status">
        {results.length} result{results.length === 1 ? "" : "s"} found
      </p>
      <div className="mt-6 grid gap-4">
        {results.map((post) => (
          <article key={post.slug} className="rounded-2xl border border-line bg-paper p-5">
            <h2 className="text-xl font-bold">
              <Link href={`/blog/${post.slug}`} className="hover:text-brand">{post.title}</Link>
            </h2>
            <p className="mt-2 text-muted">{post.excerpt}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-sky px-3 py-1 text-xs font-semibold text-brand">{tag}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

export default function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string }>;
}) {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-black tracking-tight">Search clarift</h1>
        <Suspense fallback={<div className="mt-6 rounded-3xl border border-line bg-paper p-5">Loading search...</div>}>
          <SearchResults searchParams={searchParams} />
        </Suspense>
      </main>
    </>
  );
}
