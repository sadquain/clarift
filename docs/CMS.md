# Sanity CMS Guide

clarift models posts, authors, categories, tags, and SEO metadata in `sanity/schemas`.

## Workflow

1. Writers create drafts with Portable Text, cover images, tags, FAQs, and SEO fields.
2. Editors move content through `draft`, `review`, `scheduled`, and `published`.
3. Scheduled posts are queried by `scheduledFor <= now()`.
4. Publish webhooks call `/api/revalidate` with the post slug.
5. Preview mode should query drafts using `sanityQueries.previewPost`.

## Media

Use Sanity image assets with hotspot metadata. Render images through `sanityImage()` to request optimized formats and dimensions.
