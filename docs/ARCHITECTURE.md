# clarift Architecture

```mermaid
flowchart LR
  Reader["Reader"] --> App["Next.js App Router"]
  Editor["Editor/Admin"] --> Auth["Auth.js RBAC"]
  Auth --> Admin["Admin Dashboard"]
  Admin --> AI["AI Service: Groq/OpenAI"]
  AI --> Queue["AI Queue + Retry Worker"]
  AI --> SemanticCache["Semantic Cache"]
  Admin --> Sanity["Sanity CMS"]
  Sanity --> Webhook["Revalidate Webhook"]
  Webhook --> Cache["Next Cache Tags"]
  App --> Cache
  App --> API["Route Handlers"]
  API --> Postgres["PostgreSQL via Prisma"]
  API --> Resend["Resend Email"]
```

## Boundaries

- `app/` contains route orchestration, metadata, streaming boundaries, and UI composition.
- `components/` contains reusable client and server UI.
- `lib/repositories/` owns persistence access and cursor pagination contracts.
- `lib/services/` owns business workflows: AI, Sanity, newsletter, analytics, and security.
- `lib/queue/` owns background job contracts and retry behavior.
- `prisma/` is the relational system of record for users, sessions, engagement, analytics, audit logs, notifications, and AI usage.
- `sanity/` is the editorial source of truth for rich published content.

## Rendering

- Public routes use Cache Components, `use cache`, `cacheLife`, and `cacheTag`.
- Blog, category, tag, and author pages expose `generateStaticParams`.
- Dynamic reader/admin surfaces stream behind Suspense.
- Sanity publish events call `/api/revalidate` to refresh `posts` and `post:{slug}` tags.

## Scale Strategy

- Redis can replace the in-memory queue/cache contracts without changing route callers.
- Postgres indexes support analytics, search history, comments, notifications, and AI usage queries.
- Vercel CDN serves static/PPR public routes while admin/API routes remain dynamic.
- `/api/health` supports uptime checks and deployment smoke tests.
