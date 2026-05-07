import { getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "@/auth";
import { errorResponse } from "@/lib/errors";
import { engagementRepository } from "@/lib/repositories/engagement";

const schema = z.object({ postSlug: z.string().min(1) });

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    const input = schema.parse(await request.json());
    const active = engagementRepository.toggleBookmark(session?.user?.id ?? "anonymous", input.postSlug);
    return Response.json({ active });
  } catch (error) {
    return errorResponse(error);
  }
}
