import { sentryConfigStatus } from "@/lib/observability";

export async function GET() {
  return Response.json({
    ok: true,
    version: process.env.VERCEL_GIT_COMMIT_SHA ?? "local",
    time: new Date().toISOString(),
    providers: {
      database: Boolean(process.env.DATABASE_URL),
      sanity: Boolean(process.env.SANITY_PROJECT_ID),
      ai: Boolean(process.env.GROQ_API_KEY ?? process.env.OPENAI_API_KEY),
      resend: Boolean(process.env.RESEND_API_KEY),
      sentry: sentryConfigStatus(),
    },
  });
}
