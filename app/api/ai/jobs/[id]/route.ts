import { aiQueue } from "@/lib/queue/ai-queue";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const job = aiQueue.get(id);
  if (!job) return Response.json({ error: "Job not found" }, { status: 404 });
  return Response.json({ job });
}
