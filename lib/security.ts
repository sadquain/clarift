import { AppError } from "@/lib/errors";

const buckets = new Map<string, { count: number; resetAt: number }>();

export function sanitizeText(value: string) {
  return value.replace(/[<>]/g, "").replace(/javascript:/gi, "").trim();
}

export function assertRateLimit(key: string, limit = 20, windowMs = 60_000) {
  const now = Date.now();
  const current = buckets.get(key);
  if (!current || current.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return;
  }
  if (current.count >= limit) {
    throw new AppError("Too many requests. Please wait a moment.", 429, "RATE_LIMITED");
  }
  current.count += 1;
}

export function isLikelyBot(request: Request) {
  const agent = request.headers.get("user-agent") ?? "";
  return /curl|python-requests|scrapy|bot/i.test(agent) && !/googlebot|bingbot/i.test(agent);
}
