# Deployment Guide

1. Provision Vercel, Vercel Postgres or Neon, Sanity, Resend, Groq/OpenAI, and UploadThing or Cloudinary.
2. Set all variables from `.env.example` in Vercel.
3. Run `npm run prisma:generate` and `npm run prisma:migrate` against production.
4. Deploy Sanity Studio with `npm run sanity:deploy`.
5. Configure Sanity publish webhooks to `POST /api/revalidate`.
6. Protect production admin routes with `AUTH_SECRET`, OAuth credentials, and `ADMIN_PASSWORD_HASH`.
7. Enable Vercel preview deployments for pull requests.
8. Run `npm run lint`, `npm run typecheck`, `npm run test`, `npm run test:e2e`, and `npm run build` in CI.
9. Use `docker-compose up postgres redis` for local production-like infrastructure.
10. Use `Dockerfile` for containerized staging and long-running worker environments.

## Observability

- Use `lib/logger.ts` for structured logs.
- Persist security and workflow events to `AuditLog`.
- Track AI usage with `AiGeneration` and prompt version checksums.
- Track article performance with `PostAnalytics`.

## Environments

- Local: `.env.local`, local Postgres/Redis from Docker Compose.
- Preview: Vercel preview deployments, isolated Sanity dataset, preview database branch.
- Staging: production-like secrets and scheduled workers, no customer traffic.
- Production: locked secrets, backups, Sentry alerts, uptime checks, and rollback runbook.
