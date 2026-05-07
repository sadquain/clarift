export const category = {
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    { name: "title", type: "string" },
    { name: "slug", type: "slug", options: { source: "title" } },
    { name: "description", type: "text" },
    { name: "parent", type: "reference", to: [{ type: "category" }] },
  ],
};
