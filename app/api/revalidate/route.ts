import { revalidateTag } from "next/cache";
import { z } from "zod";
import { errorResponse } from "@/lib/errors";

const schema = z.object({
  secret: z.string(),
  slug: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export async function POST(request: Request) {
  try {
    const input = schema.parse(await request.json());
    if (!process.env.SANITY_REVALIDATE_SECRET || input.secret !== process.env.SANITY_REVALIDATE_SECRET) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    revalidateTag("posts", "max");
    if (input.slug) revalidateTag(`post:${input.slug}`, "max");
    input.tags?.forEach((tag) => revalidateTag(tag, "max"));
    return Response.json({ revalidated: true });
  } catch (error) {
    return errorResponse(error);
  }
}
