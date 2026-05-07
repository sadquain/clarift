export function traceRequest(name: string, context: Record<string, unknown> = {}) {
  const traceId = crypto.randomUUID();
  const start = performance.now();
  return {
    traceId,
    end(status = "ok") {
      const durationMs = Math.round(performance.now() - start);
      console.info(JSON.stringify({ type: "trace", name, traceId, status, durationMs, context }));
      return { traceId, durationMs };
    },
  };
}

export function sentryConfigStatus() {
  return {
    enabled: Boolean(process.env.SENTRY_DSN),
    environment: process.env.VERCEL_ENV ?? process.env.NODE_ENV ?? "development",
  };
}
