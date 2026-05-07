import type { Metadata } from "next";
import { PostCard } from "@/components/blog/post-card";
import { SiteHeader } from "@/components/site-header";
import { getPublishedPosts } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const posts = await getPublishedPosts();
  return Array.from(new Set(posts.flatMap((post) => post.tags))).map((tag) => ({
    slug: tag.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return { title: `Tag: ${slug}`, description: `Articles tagged ${slug}.` };
}

export default async function TagPage({ params }: Props) {
  const { slug } = await params;
  const posts = (await getPublishedPosts()).filter((post) =>
    post.tags.some((tag) => tag.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") === slug),
  );

  return (
    <>
      <SiteHeader />
      <main id="main-content" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <p className="text-sm font-bold uppercase tracking-wide text-brand">Tag</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight">#{slug}</h1>
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </main>
    </>
  );
}
