# Security Audit Checklist

- Authentication: OAuth callbacks restricted, credentials disabled unless `ADMIN_PASSWORD_HASH` is configured, strong `AUTH_SECRET`.
- Authorization: `/admin` protected in proxy, API mutations verify session or apply abuse limits.
- Input: all route DTOs validated with Zod, user text sanitized before storage/display.
- Output: CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy.
- Abuse: AI/comment/reaction/search rate limits, bot heuristics, CSP reporting.
- Data: Prisma soft deletes, audit logs, least-privilege database credentials.
- Secrets: no secrets in repository, environment separation for preview/staging/prod.
- Dependencies: run `npm audit`, patch high/critical advisories, pin risky transitive dependencies if required.
- Incident response: define alert owners, rollback process, key rotation process, and customer communication path.
