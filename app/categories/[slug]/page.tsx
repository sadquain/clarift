import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostCard } from "@/components/blog/post-card";
import { SiteHeader } from "@/components/site-header";
import { categories, getCategoryBySlug, getPublishedPosts } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return {};
  return {
    title: category.title,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) notFound();
  const posts = (await getPublishedPosts()).filter((post) => post.category === category.slug);

  return (
    <>
      <SiteHeader />
      <main id="main-content" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <p className="text-sm font-bold uppercase tracking-wide text-brand">Category</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight">{category.title}</h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-muted">{category.description}</p>
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </main>
    </>
  );
}
