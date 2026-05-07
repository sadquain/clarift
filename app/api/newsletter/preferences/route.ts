import { z } from "zod";
import { errorResponse } from "@/lib/errors";

const schema = z.object({
  email: z.string().email(),
  weeklyDigest: z.boolean().default(true),
  productUpdates: z.boolean().default(false),
  instantPostAlerts: z.boolean().default(false),
});

export async function POST(request: Request) {
  try {
    const input = schema.parse(await request.json());
    return Response.json({ ok: true, preferences: input });
  } catch (error) {
    return errorResponse(error);
  }
}
