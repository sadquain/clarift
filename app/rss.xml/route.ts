import { getPublishedPosts } from "@/lib/content";
import { absoluteUrl, siteConfig } from "@/lib/seo";

export async function GET() {
  const posts = await getPublishedPosts();
  const items = posts
    .map(
      (post) => `<item>
  <title><![CDATA[${post.title}]]></title>
  <link>${absoluteUrl(`/blog/${post.slug}`)}</link>
  <guid>${absoluteUrl(`/blog/${post.slug}`)}</guid>
  <description><![CDATA[${post.excerpt}]]></description>
  <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
</item>`,
    )
    .join("");

  return new Response(`<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
<channel>
  <title>${siteConfig.name}</title>
  <link>${siteConfig.url}</link>
  <description>${siteConfig.description}</description>
  ${items}
</channel>
</rss>`, {
    headers: { "content-type": "application/rss+xml; charset=utf-8" },
  });
}
