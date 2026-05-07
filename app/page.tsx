import { Suspense } from "react";
import Link from "next/link";
import { PostCard } from "@/components/blog/post-card";
import { NewsletterForm } from "@/components/newsletter-form";
import { SiteHeader } from "@/components/site-header";
import { authors, categories, getFeaturedPosts, getPublishedPosts, getTrendingPosts } from "@/lib/content";
import { websiteJsonLd } from "@/lib/seo";

async function PersonalizedRecommendations() {
  await new Promise((resolve) => setTimeout(resolve, 80));
  const posts = await getTrendingPosts();
  return (
    <div className="grid gap-3">
      {posts.slice(0, 3).map((post, index) => (
        <Link
          key={post.slug}
          href={`/blog/${post.slug}`}
          className="flex items-center gap-4 rounded-2xl border border-line bg-paper p-4 transition hover:border-brand"
        >
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-sky text-sm font-bold text-brand">
            {index + 1}
          </span>
          <span>
            <span className="block font-semibold">{post.title}</span>
            <span className="text-sm text-muted">{post.readingMinutes} min read</span>
          </span>
        </Link>
      ))}
    </div>
  );
}

export default async function Home() {
  "use cache";
  const [featured, trending, latest] = await Promise.all([
    getFeaturedPosts(),
    getTrendingPosts(),
    getPublishedPosts(),
  ]);

  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd()) }}
        />
        <section className="border-b border-line">
          <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:px-8">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-brand">AI publishing intelligence</p>
              <h1 className="mt-5 max-w-4xl text-5xl font-black leading-[1.02] tracking-tight text-ink sm:text-6xl lg:text-7xl">
                Publish faster without lowering the bar.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
                clarift combines Sanity-powered editorial workflows, AI-assisted drafting, search-first
                architecture, analytics, and accessible reading experiences for serious content teams.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/blog/ai-editorial-operating-system"
                  className="rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-brand-strong"
                >
                  Read featured post
                </Link>
                <Link
                  href="/admin"
                  className="rounded-full border border-line bg-paper px-5 py-3 text-sm font-semibold text-ink hover:border-brand"
                >
                  Open dashboard
                </Link>
              </div>
            </div>
            <div className="glass rounded-[2rem] p-4 shadow-2xl">
              <PostCard post={featured[0]} priority />
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_360px] lg:px-8">
          <div>
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-bold uppercase tracking-wide text-brand">Latest thinking</p>
                <h2 className="mt-2 text-3xl font-bold">Featured and fresh</h2>
              </div>
              <Link href="/search" className="text-sm font-semibold text-brand hover:text-brand-strong">
                Search archive
              </Link>
            </div>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {latest.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </div>

          <aside className="grid content-start gap-6">
            <section className="rounded-3xl border border-line bg-paper p-5">
              <h2 className="text-xl font-bold">Trending now</h2>
              <div className="mt-4 grid gap-3">
                {trending.map((post) => (
                  <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                    <span className="text-sm font-semibold group-hover:text-brand">{post.title}</span>
                    <span className="mt-1 block text-xs text-muted">{post.views.toLocaleString()} views</span>
                  </Link>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-line bg-paper p-5">
              <h2 className="text-xl font-bold">Categories</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Link
                    key={category.slug}
                    href={`/categories/${category.slug}`}
                    className="rounded-full bg-background px-3 py-2 text-sm font-medium text-muted hover:text-brand"
                  >
                    {category.title}
                  </Link>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-line bg-paper p-5">
              <h2 className="text-xl font-bold">Author spotlight</h2>
              <div className="mt-4 grid gap-4">
                {authors.map((author) => (
                  <Link key={author.slug} href={`/authors/${author.slug}`} className="flex gap-3">
                    <span className="grid size-11 place-items-center rounded-full bg-ink text-sm font-bold text-paper">
                      {author.avatar}
                    </span>
                    <span>
                      <span className="block font-semibold">{author.name}</span>
                      <span className="text-sm text-muted">{author.stats.followers} followers</span>
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          </aside>
        </section>

        <section className="bg-sky">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:px-8">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-brand">Reader intelligence</p>
              <h2 className="mt-2 text-3xl font-bold">Recommendations stream after the shell.</h2>
              <p className="mt-4 text-muted">
                This section demonstrates a Suspense boundary suitable for SSR personalization while the rest
                of the page remains cacheable.
              </p>
            </div>
            <Suspense fallback={<div className="rounded-2xl border border-line bg-paper p-5">Loading picks...</div>}>
              <PersonalizedRecommendations />
            </Suspense>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-6 px-4 py-14 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-brand">Newsletter</p>
            <h2 className="mt-2 text-3xl font-bold">Weekly publishing systems notes.</h2>
          </div>
          <NewsletterForm />
        </section>
      </main>
    </>
  );
}
