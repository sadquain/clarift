# Production Readiness Checklist

## Performance

- Run `npm run build` and inspect route output for static/PPR/dynamic correctness.
- Run Lighthouse on `/`, `/blog/ai-editorial-operating-system`, `/search`, and `/admin`.
- Target Lighthouse 95+ for Performance, SEO, Best Practices, and Accessibility.
- Run `npm run load:test` against staging before launch.
- Confirm image CDN URLs, cache tags, and static asset caching headers.

## Accessibility

- Run `npm run test:a11y`.
- Keyboard-only audit: header, command palette, search, article engagement, comments, admin tabs.
- Screen reader audit: landmarks, headings, form errors, dialogs, chart alternatives.
- Contrast audit for light/dark modes.
- Reduced motion audit with OS-level reduced motion enabled.

## SEO

- Validate sitemap, RSS, robots, canonical URLs, OpenGraph, Twitter cards, and JSON-LD.
- Confirm no private admin/API routes are indexed.
- Confirm article schema and search action schema in Rich Results tooling.

## Security

- Verify CSP reports at `/api/security/csp-report`.
- Review Auth.js providers, session secret, credential hash, and admin RBAC.
- Confirm rate limits on AI, comments, reactions, and search.
- Run `npm audit` in CI and review dependency advisories.
- Execute the penetration checklist in `SECURITY_AUDIT.md`.

## Reliability

- Configure Sentry DSN and uptime checks against `/api/health`.
- Configure database backups and restore test.
- Configure Vercel rollback and preview deployment workflow.
- Run smoke tests after deployment.
