export const seo = {
  name: "seo",
  title: "SEO metadata",
  type: "object",
  fields: [
    { name: "title", type: "string" },
    { name: "description", type: "text", rows: 3 },
    { name: "canonicalUrl", type: "url" },
    { name: "keywords", type: "array", of: [{ type: "string" }] },
    { name: "ogImage", type: "image", options: { hotspot: true } },
    { name: "noIndex", type: "boolean", initialValue: false },
  ],
};
