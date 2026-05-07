import { posts } from "@/lib/content";

export async function getDashboardMetrics() {
  const totalViews = posts.reduce((sum, post) => sum + post.views, 0);
  const totalLikes = posts.reduce((sum, post) => sum + post.likes, 0);
  const totalComments = posts.reduce((sum, post) => sum + post.comments, 0);
  return {
    totalViews,
    totalLikes,
    totalComments,
    avgReadMinutes: Math.round(posts.reduce((sum, post) => sum + post.readingMinutes, 0) / posts.length),
    aiCreditsUsed: 12840,
    newsletterSubscribers: 24890,
    seoHealth: 97,
    topPosts: posts.slice(0, 5),
  };
}
