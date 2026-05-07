# clarift

clarift is a production-oriented AI blogging platform blueprint built on Next.js 16 App Router, TypeScript, Tailwind CSS, Prisma/PostgreSQL, Sanity CMS, Auth.js, and AI provider APIs.

The current repository contains a complete working vertical slice plus the platform contracts needed to finish the external integrations once credentials and package installation are available.

## What Is Included

- Public blog website with homepage, featured posts, trending posts, latest posts, categories, tags, authors, newsletter CTA, search, and recommendations.
- Static blog routes using `generateStaticParams`, cache-tagged content loaders, metadata generation, JSON-LD, sitemap, robots, and RSS.
- Accessible article pages with semantic headings, table of contents, reading progress, share actions, AI summary, and code blocks.
- Admin dashboard shell with analytics, workflow guidance, and an AI writing assistant route.
- Prisma schema for users, roles, sessions, bookmarks, likes, comments, analytics, AI generations, reading history, newsletter subscribers, soft deletes, and audit logs.
- Sanity schemas for posts, authors, categories, tags, SEO metadata, rich body content, scheduled publishing, and workflow status.
- Security headers, admin no-store middleware, environment variable template, CI workflow, and production deployment notes.

## Rendering Architecture

clarift uses a hybrid strategy:

- SSG: blog posts, categories, tags, and authors expose `generateStaticParams`.
- ISR: content access functions use Next 16 cache components with `use cache`, `cacheLife`, and `cacheTag`.
- SSR: admin and personalized reader sections are runtime-oriented and can be protected by Auth.js sessions.
- Streaming: homepage recommendations and admin metrics sit behind React Suspense boundaries.
- Route segment caching: cache tags use `posts` and `post:{slug}` so Sanity webhooks can trigger focused revalidation.
- Edge-ready APIs: `/api/ai/generate` uses Web Request/Response primitives so it can move to an edge route when cache component compatibility allows it.

## Folder Structure

```txt
app/
  admin/                 Runtime admin dashboard
  api/ai/generate/       AI generation endpoint
  api/newsletter/        Newsletter subscription endpoint
  authors/[slug]/        Author profile pages
  blog/[slug]/           Static article pages
  categories/[slug]/     Category archive pages
  rss.xml/               RSS route handler
  search/                Faceted search page
  tags/[slug]/           Tag archive pages
components/
  admin/                 Admin interface pieces
  blog/                  Article and listing components
lib/
  analytics.ts           Dashboard metrics boundary
  auth.ts                RBAC contract
  content.ts             Cached content repository
  seo.ts                 Metadata and JSON-LD helpers
  validators.ts          DTO validation helpers
prisma/schema.prisma     PostgreSQL data model
sanity/schemas/          CMS schema definitions
```

## Production Integration Checklist

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env.local` and fill provider credentials.
3. Run `npm run prisma:generate` and `npm run prisma:migrate`.
4. Connect Sanity Studio using the schemas in `sanity/schemas`.
5. Replace the mock repository in `lib/content.ts` with Sanity GROQ queries.
6. Wire Auth.js with `PrismaAdapter`, OAuth providers, credential login, and RBAC checks for `/admin`.
7. Connect Resend for welcome emails, weekly digests, blog notifications, and unsubscribe flows.
8. Add Cloudinary for author and cover image uploads, or swap in another audited media provider.
9. Add Sanity publish webhooks that call `revalidateTag("posts")` and `revalidateTag("post:{slug}")`.
10. Run Lighthouse, Playwright, and axe accessibility audits before production.

## AI Architecture

The admin assistant supports draft generation, title and metadata generation, rewrites, summaries, FAQs, and SEO optimization. `/api/ai/generate` currently calls Groq-compatible OpenAI chat completions when `GROQ_API_KEY` is present, OpenAI when `OPENAI_API_KEY` is present, and returns a local preview if no key is configured.

For full Vercel AI SDK streaming, replace the response body with `streamText` and persist usage in `AiGeneration`.

## SEO And Accessibility

The app ships with:

- Dynamic metadata and canonical URLs.
- OpenGraph and Twitter card data.
- Article and website JSON-LD.
- `sitemap.xml`, `robots.txt`, and `rss.xml`.
- Semantic landmarks, skip navigation, focus-visible styles, keyboard-friendly controls, reduced motion support, and readable contrast tokens.

## Commands

```bash
npm run dev
npm run lint
npm run typecheck
npm run build
```

## Deployment

Deploy to Vercel with PostgreSQL, Sanity, Auth.js secrets, Groq or OpenAI keys, Resend, and Cloudinary configured as environment variables. Use preview deployments for pull requests and the included GitHub Actions workflow for lint, typecheck, and build validation.

## Documentation

- [Architecture](docs/ARCHITECTURE.md)
- [Deployment](docs/DEPLOYMENT.md)
- [CMS guide](docs/CMS.md)
- [AI workflows](docs/AI_WORKFLOWS.md)
- [API reference](docs/API.md)
- [Contributing](docs/CONTRIBUTING.md)
- [Production readiness](docs/audits/PRODUCTION_READINESS.md)
- [Security audit](docs/audits/SECURITY_AUDIT.md)
- [Accessibility audit](docs/audits/ACCESSIBILITY_AUDIT.md)
- [Rollback and recovery](docs/audits/ROLLBACK_AND_RECOVERY.md)
