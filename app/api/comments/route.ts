import { z } from "zod";
import { errorResponse } from "@/lib/errors";
import { engagementRepository } from "@/lib/repositories/engagement";
import { assertRateLimit, sanitizeText } from "@/lib/security";

const commentSchema = z.object({
  postSlug: z.string().min(1),
  parentId: z.string().optional(),
  authorName: z.string().min(2).max(80),
  body: z.string().min(2).max(2000),
});

export async function GET(request: Request) {
  const postSlug = new URL(request.url).searchParams.get("postSlug") ?? "";
  return Response.json({ comments: engagementRepository.listComments(postSlug) });
}

export async function POST(request: Request) {
  try {
    assertRateLimit(`comment:${request.headers.get("x-forwarded-for") ?? "anonymous"}`, 10, 60_000);
    const input = commentSchema.parse(await request.json());
    const comment = engagementRepository.createComment({
      ...input,
      authorName: sanitizeText(input.authorName),
      body: sanitizeText(input.body),
    });
    return Response.json({ comment, moderation: "pending" }, { status: 201 });
  } catch (error) {
    return errorResponse(error);
  }
}
