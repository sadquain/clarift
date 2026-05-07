import { analyticsSnapshot } from "@/lib/services/analytics-platform";

export async function GET() {
  return Response.json(analyticsSnapshot(), {
    headers: {
      "cache-control": "private, max-age=10",
    },
  });
}
