import { logger } from "@/lib/logger";

export async function POST(request: Request) {
  const report = await request.json().catch(() => null);
  logger.warn("security.csp_violation", { hasReport: Boolean(report) });
  return new Response(null, { status: 204 });
}
