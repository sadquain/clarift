import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const projectId = process.env.SANITY_PROJECT_ID || "demo";
const dataset = process.env.SANITY_DATASET || "production";

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion: process.env.SANITY_API_VERSION || "2026-05-07",
  useCdn: true,
  token: process.env.SANITY_READ_TOKEN,
});

const builder = imageUrlBuilder(sanityClient);

export function sanityImage(source: Parameters<typeof builder.image>[0]) {
  return builder.image(source).auto("format").fit("max");
}

export const sanityQueries = {
  publishedPosts: `*[_type == "post" && workflowStatus == "published" && publishedAt <= now()] | order(publishedAt desc)`,
  scheduledPosts: `*[_type == "post" && workflowStatus == "scheduled" && scheduledFor <= now()]`,
  previewPost: `*[_type == "post" && slug.current == $slug][0]`,
};
