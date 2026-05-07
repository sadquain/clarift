import { postRepository } from "@/lib/repositories/posts";
import { assertRateLimit } from "@/lib/security";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q") ?? "";
  assertRateLimit(`search:${request.headers.get("x-forwarded-for") ?? "anonymous"}`, 60, 60_000);
  return Response.json({ suggestions: await postRepository.suggestions(q) });
}
