# Rollback and Recovery

## Rollback

1. Use Vercel deployment history to promote the previous healthy production deployment.
2. Disable Sanity publish webhook temporarily if content revalidation is causing instability.
3. Pause background workers with `AI_WORKER_DISABLED=true`.
4. Communicate incident state and expected recovery window.

## Database Recovery

1. Restore latest verified Postgres backup to a staging database.
2. Run Prisma migrations against staging.
3. Verify auth, comments, bookmarks, analytics, and newsletter subscriber records.
4. Promote restored database connection string only after smoke tests pass.

## Secrets

- Rotate `AUTH_SECRET` only with a planned session invalidation window.
- Rotate provider API keys after any suspected leak.
- Keep separate secrets for local, preview, staging, and production.
