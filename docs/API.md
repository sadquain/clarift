# API Reference

## Auth

- `GET|POST /api/auth/[...nextauth]`: Auth.js session, OAuth, and credentials routes.

## AI

- `POST /api/ai/generate`
- Body: `{ "mode": "Draft|Title|SEO|Rewrite|Summarize|FAQ|Tags|Expand|Readability", "prompt": "..." }`
- Response: streamed `text/plain`

## Search

- `GET /api/search/suggestions?q=term`

## Engagement

- `GET /api/comments?postSlug=slug`
- `POST /api/comments`
- `POST /api/engagement/reaction`
- `POST /api/engagement/bookmark`
- `POST /api/engagement/follow`

## Newsletter

- `POST /api/newsletter`
- `POST /api/newsletter/preferences`
- `/unsubscribe`

## Revalidation

- `POST /api/revalidate`
- Body: `{ "secret": "...", "slug": "post-slug", "tags": ["optional"] }`
