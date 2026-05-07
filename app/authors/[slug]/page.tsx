import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostCard } from "@/components/blog/post-card";
import { SiteHeader } from "@/components/site-header";
import { authors, getAuthorBySlug, getPublishedPosts } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return authors.map((author) => ({ slug: author.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const author = await getAuthorBySlug(slug);
  if (!author) return {};
  return { title: author.name, description: author.bio };
}

export default async function AuthorPage({ params }: Props) {
  const { slug } = await params;
  const author = await getAuthorBySlug(slug);
  if (!author) notFound();
  const posts = (await getPublishedPosts()).filter((post) => post.author === author.slug);

  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <section className="border-b border-line bg-paper">
          <div className="mx-auto grid max-w-5xl gap-6 px-4 py-12 sm:px-6 lg:px-8">
            <span className="grid size-20 place-items-center rounded-3xl bg-ink text-xl font-bold text-paper">
              {author.avatar}
            </span>
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-brand">{author.role}</p>
              <h1 className="mt-2 text-4xl font-black tracking-tight">{author.name}</h1>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-muted">{author.bio}</p>
            </div>
            <dl className="grid gap-3 sm:grid-cols-3">
              {Object.entries(author.stats).map(([key, value]) => (
                <div key={key} className="rounded-2xl border border-line bg-background p-4">
                  <dt className="text-sm capitalize text-muted">{key}</dt>
                  <dd className="mt-1 text-2xl font-bold">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold">Published articles</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
