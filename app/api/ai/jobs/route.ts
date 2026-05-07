import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { errorResponse } from "@/lib/errors";
import { aiQueue, aiJobSchema } from "@/lib/queue/ai-queue";
import { semanticCache } from "@/lib/services/semantic-cache";

export async function GET() {
  const session = await getServerSession(authOptions);
  return Response.json({
    jobs: aiQueue.list(session?.user?.id),
    cache: semanticCache.stats(),
  });
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    const input = aiJobSchema.parse({
      ...(await request.json()),
      userId: session?.user?.id ?? "anonymous",
    });
    const job = aiQueue.enqueue(input);
    void aiQueue.processNext();
    return Response.json({ job }, { status: 202 });
  } catch (error) {
    return errorResponse(error);
  }
}
