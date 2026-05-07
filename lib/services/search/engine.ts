import { posts, type Post } from "@/lib/content";

export type SearchResult = Post & {
  score: number;
  highlights: string[];
};

export type SearchFilters = {
  q?: string;
  category?: string;
  tag?: string;
  minRead?: number;
  maxRead?: number;
};

const analytics = new Map<string, number>();
const index = posts.map((post) => ({
  post,
  haystack: [post.title, post.excerpt, post.summary, post.category, ...post.tags].join(" ").toLowerCase(),
}));

function levenshtein(a: string, b: string) {
  const matrix = Array.from({ length: b.length + 1 }, (_, i) => [i]);
  for (let j = 0; j <= a.length; j += 1) matrix[0][j] = j;
  for (let i = 1; i <= b.length; i += 1) {
    for (let j = 1; j <= a.length; j += 1) {
      matrix[i][j] =
        b.charAt(i - 1) === a.charAt(j - 1)
          ? matrix[i - 1][j - 1]
          : Math.min(matrix[i - 1][j - 1] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j] + 1);
    }
  }
  return matrix[b.length][a.length];
}

export function searchEngine(filters: SearchFilters): SearchResult[] {
  const q = filters.q?.trim().toLowerCase() ?? "";
  if (q) analytics.set(q, (analytics.get(q) ?? 0) + 1);
  const terms = q.split(/\s+/).filter(Boolean);

  return index
    .filter(({ post }) => (filters.category ? post.category === filters.category : true))
    .filter(({ post }) => (filters.tag ? post.tags.some((tag) => tag.toLowerCase() === filters.tag?.toLowerCase()) : true))
    .filter(({ post }) => (filters.minRead ? post.readingMinutes >= filters.minRead : true))
    .filter(({ post }) => (filters.maxRead ? post.readingMinutes <= filters.maxRead : true))
    .map(({ post, haystack }) => {
      const title = post.title.toLowerCase();
      const exact = terms.filter((term) => haystack.includes(term)).length;
      const typo = terms.filter((term) => haystack.split(/\s+/).some((word) => levenshtein(term, word) <= 1)).length;
      const recency = Math.max(0, 30 - Math.floor((Date.now() - new Date(post.publishedAt).getTime()) / 86_400_000));
      const score = exact * 8 + typo * 4 + (title.includes(q) ? 12 : 0) + post.views / 10000 + recency / 10;
      return {
        ...post,
        score,
        highlights: terms.filter((term) => haystack.includes(term)).slice(0, 3),
      };
    })
    .filter((result) => (q ? result.score > 0 : true))
    .sort((a, b) => b.score - a.score);
}

export function trendingSearches() {
  return Array.from(analytics.entries())
    .map(([query, count]) => ({ query, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
}

export function searchIndexStats() {
  return {
    documents: index.length,
    cachedTerms: new Set(index.flatMap((entry) => entry.haystack.split(/\s+/))).size,
  };
}
