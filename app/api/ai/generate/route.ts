import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { errorResponse } from "@/lib/errors";
import { assertRateLimit } from "@/lib/security";
import { aiRequestSchema, generateAiContent, streamTextResponse } from "@/lib/services/ai";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    const userKey = session?.user?.id ?? request.headers.get("x-forwarded-for") ?? "anonymous";
    assertRateLimit(`ai:${userKey}`, 12, 60_000);
    const body = await request.json();
    const input = aiRequestSchema.parse(body);
    const text = await generateAiContent(input);
    return new Response(streamTextResponse(text), {
      headers: {
        "content-type": "text/plain; charset=utf-8",
        "x-clarift-prompt-version": "v1",
      },
    });
  } catch (error) {
    return errorResponse(error);
  }
}
