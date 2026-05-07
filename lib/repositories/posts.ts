import { categories, getPublishedPosts, posts, searchPosts, type Post } from "@/lib/content";

export type CursorPage<T> = {
  items: T[];
  nextCursor: string | null;
};

export class PostRepository {
  async list({ cursor, limit = 10 }: { cursor?: string | null; limit?: number } = {}): Promise<CursorPage<Post>> {
    const all = await getPublishedPosts();
    const start = cursor ? Math.max(0, all.findIndex((post) => post.slug === cursor) + 1) : 0;
    const items = all.slice(start, start + limit);
    return { items, nextCursor: all[start + limit]?.slug ?? null };
  }

  async search(query: string, category?: string) {
    return searchPosts(query).filter((post) => (category ? post.category === category : true));
  }

  async suggestions(query: string) {
    const normalized = query.toLowerCase();
    return [...posts.map((post) => post.title), ...categories.map((category) => category.title)]
      .filter((value) => value.toLowerCase().includes(normalized))
      .slice(0, 8);
  }
}

export const postRepository = new PostRepository();
