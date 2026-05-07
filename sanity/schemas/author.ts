export const author = {
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    { name: "name", type: "string" },
    { name: "slug", type: "slug", options: { source: "name" } },
    { name: "image", type: "image", options: { hotspot: true } },
    { name: "bio", type: "text" },
    { name: "role", type: "string" },
    { name: "socialLinks", type: "array", of: [{ type: "object", fields: [{ name: "label", type: "string" }, { name: "url", type: "url" }] }] },
  ],
};
