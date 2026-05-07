import { z } from "zod";
import { searchEngine, searchIndexStats, trendingSearches } from "@/lib/services/search/engine";

const schema = z.object({
  q: z.string().optional(),
  category: z.string().optional(),
  tag: z.string().optional(),
  minRead: z.number().optional(),
  maxRead: z.number().optional(),
});

export async function POST(request: Request) {
  const filters = schema.parse(await request.json());
  return Response.json({
    results: searchEngine(filters),
    trending: trendingSearches(),
    index: searchIndexStats(),
  });
}
