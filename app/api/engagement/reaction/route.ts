import { z } from "zod";
import { errorResponse } from "@/lib/errors";
import { engagementRepository } from "@/lib/repositories/engagement";
import { assertRateLimit } from "@/lib/security";

const schema = z.object({ postSlug: z.string().min(1) });

export async function POST(request: Request) {
  try {
    assertRateLimit(`reaction:${request.headers.get("x-forwarded-for") ?? "anonymous"}`, 40, 60_000);
    const input = schema.parse(await request.json());
    return Response.json({ count: engagementRepository.react(input.postSlug) });
  } catch (error) {
    return errorResponse(error);
  }
}
