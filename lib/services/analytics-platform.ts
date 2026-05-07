import { posts } from "@/lib/content";

export function analyticsSnapshot() {
  const totalViews = posts.reduce((sum, post) => sum + post.views, 0);
  const totalEngagement = posts.reduce((sum, post) => sum + post.likes + post.comments, 0);
  return {
    realTimeReaders: 184,
    totalViews,
    engagementRate: Number(((totalEngagement / totalViews) * 100).toFixed(2)),
    retention: [
      { cohort: "Week 1", value: 62 },
      { cohort: "Week 2", value: 48 },
      { cohort: "Week 4", value: 31 },
    ],
    funnel: [
      { step: "View", value: totalViews },
      { step: "Read 50%", value: Math.round(totalViews * 0.54) },
      { step: "React", value: posts.reduce((sum, post) => sum + post.likes, 0) },
      { step: "Subscribe", value: 24890 },
    ],
    authors: [
      { name: "Mira Shah", views: 135424, follows: 18400 },
      { name: "Jon Bell", views: 63190, follows: 12100 },
    ],
    newsletter: {
      openRate: 48.7,
      clickRate: 12.4,
      unsubRate: 0.28,
    },
    heatmap: posts.map((post) => ({
      slug: post.slug,
      title: post.title,
      intro: 92,
      middle: 64,
      end: 38,
    })),
  };
}
