import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CommentsPanel } from "@/components/blog/comments-panel";
import { EngagementPanel } from "@/components/blog/engagement-panel";
import { ReadingProgress } from "@/components/blog/reading-progress";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { SiteHeader } from "@/components/site-header";
import {
  formatDate,
  getAuthor,
  getCategory,
  getPostBySlug,
  getPublishedPosts,
} from "@/lib/content";
import { articleJsonLd, postMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const posts = await getPublishedPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return postMetadata(post);
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();
  const author = getAuthor(post.author);
  const category = getCategory(post.category);
  const headings = post.body.map((block) => block.heading);

  return (
    <>
      <ReadingProgress />
      <SiteHeader />
      <main id="main-content">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd(post)) }}
        />
        <article>
          <header className="border-b border-line bg-paper">
            <div className="mx-auto grid max-w-5xl gap-8 px-4 py-14 sm:px-6 lg:px-8">
              <Link href={`/categories/${category.slug}`} className="text-sm font-bold uppercase tracking-wide text-brand">
                {category.title}
              </Link>
              <h1 className="max-w-4xl text-4xl font-black leading-tight tracking-tight sm:text-6xl">
                {post.title}
              </h1>
              <p className="max-w-3xl text-xl leading-8 text-muted">{post.excerpt}</p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted">
                <Link href={`/authors/${author.slug}`} className="font-semibold text-ink hover:text-brand">
                  {author.name}
                </Link>
                <span>{formatDate(post.publishedAt)}</span>
                <span>{post.readingMinutes} min read</span>
                <span>{post.comments} comments</span>
              </div>
            </div>
            <div
              className="h-[42vh] min-h-80 bg-cover bg-center"
              style={{ backgroundImage: `url(${post.cover})` }}
              role="img"
              aria-label=""
            />
          </header>

          <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[240px_1fr_220px] lg:px-8">
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <TableOfContents headings={headings} />
              </div>
            </aside>
            <div className="min-w-0">
              <section className="rounded-3xl border border-line bg-sky p-5">
                <h2 className="text-lg font-bold">AI summary</h2>
                <p className="mt-2 leading-7 text-muted">{post.summary}</p>
              </section>
              <div className="prose-clarift mt-8">
                {post.body.map((block) => {
                  const id = block.heading.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
                  return (
                    <section key={block.heading} aria-labelledby={id}>
                      <h2 id={id}>{block.heading}</h2>
                      <p>{block.content}</p>
                      {block.code ? <pre><code>{block.code}</code></pre> : null}
                    </section>
                  );
                })}
              </div>
            </div>
            <EngagementPanel postSlug={post.slug} initialLikes={post.likes} />
          </div>
        </article>
        <CommentsPanel postSlug={post.slug} />
      </main>
    </>
  );
}
