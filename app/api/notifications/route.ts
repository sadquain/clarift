import { getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "@/auth";
import { notificationService } from "@/lib/services/notifications";

const schema = z.object({
  type: z.enum(["comment", "reaction", "follow", "newsletter", "system"]),
  title: z.string().min(1),
  body: z.string().min(1),
});

export async function GET() {
  const session = await getServerSession(authOptions);
  return Response.json({ notifications: notificationService.list(session?.user?.id ?? "anonymous") });
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  const input = schema.parse(await request.json());
  return Response.json({
    notification: notificationService.push(session?.user?.id ?? "anonymous", input),
  });
}
