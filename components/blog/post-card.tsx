import Link from "next/link";
import type { Post } from "@/lib/content";
import { formatDate, getAuthor, getCategory } from "@/lib/content";

export function PostCard({ post, priority = false }: { post: Post; priority?: boolean }) {
  const author = getAuthor(post.author);
  const category = getCategory(post.category);

  return (
    <article className="group overflow-hidden rounded-2xl border border-line bg-paper shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <Link href={`/blog/${post.slug}`} className="block" aria-label={`Read ${post.title}`}>
        <div
          className="aspect-[16/9] bg-cover bg-center"
          style={{ backgroundImage: `url(${post.cover})` }}
          aria-hidden="true"
        />
      </Link>
      <div className="grid gap-4 p-5">
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted">
          <Link href={`/categories/${category.slug}`} className="rounded-full bg-sky px-3 py-1 text-brand">
            {category.title}
          </Link>
          <span>{formatDate(post.publishedAt)}</span>
          <span>{post.readingMinutes} min read</span>
        </div>
        <div>
          <h2 className={priority ? "text-2xl font-bold leading-tight" : "text-xl font-bold leading-tight"}>
            <Link href={`/blog/${post.slug}`} className="transition group-hover:text-brand">
              {post.title}
            </Link>
          </h2>
          <p className="mt-3 text-sm leading-6 text-muted">{post.excerpt}</p>
        </div>
        <div className="flex items-center justify-between gap-3 text-sm text-muted">
          <Link href={`/authors/${author.slug}`} className="font-medium text-ink hover:text-brand">
            {author.name}
          </Link>
          <span aria-label={`${post.likes} likes`}>{post.likes.toLocaleString()} likes</span>
        </div>
      </div>
    </article>
  );
}
