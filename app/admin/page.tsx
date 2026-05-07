import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { AdminHeader } from "@/components/admin/admin-header";
import { AiConsole } from "@/components/admin/ai-console";
import { AnalyticsCharts } from "@/components/admin/analytics-charts";
import { NotificationsPanel } from "@/components/admin/panels/notifications-panel";
import { getDashboardMetrics } from "@/lib/analytics";

export const metadata: Metadata = {
  title: "Admin dashboard",
  description: "clarift editorial, AI generation, SEO, newsletter, and analytics dashboard.",
};

async function Metrics() {
  const metrics = await getDashboardMetrics();
  const cards = [
    ["Views", metrics.totalViews.toLocaleString()],
    ["Likes", metrics.totalLikes.toLocaleString()],
    ["Comments", metrics.totalComments.toLocaleString()],
    ["SEO health", `${metrics.seoHealth}%`],
    ["AI credits", metrics.aiCreditsUsed.toLocaleString()],
    ["Subscribers", metrics.newsletterSubscribers.toLocaleString()],
  ];

  return (
    <section aria-labelledby="metrics" className="grid gap-4">
      <h2 id="metrics" className="text-xl font-bold">Analytics overview</h2>
      <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map(([label, value]) => (
          <div key={label} className="rounded-2xl border border-line bg-paper p-5">
            <dt className="text-sm text-muted">{label}</dt>
            <dd className="mt-2 text-3xl font-black">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export default function AdminPage() {
  return (
    <>
      <AdminHeader />
      <main id="main-content" className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-brand">Enterprise workspace</p>
            <h1 className="mt-2 text-4xl font-black tracking-tight">Editorial command center</h1>
            <p className="mt-3 max-w-3xl text-muted">
              Runtime-rendered admin surface for AI drafting, editorial QA, analytics, and workflow control.
              Wire this route to Auth.js RBAC before production access.
            </p>
          </div>
        </div>
        <nav className="flex flex-wrap gap-2" aria-label="Admin sections">
          {[
            ["/admin/ai", "AI operations"],
            ["/admin/search", "Search intelligence"],
            ["/admin/analytics", "Analytics"],
          ].map(([href, label]) => (
            <Link key={href} href={href as never} className="rounded-full border border-line bg-paper px-4 py-2 text-sm font-semibold hover:border-brand">
              {label}
            </Link>
          ))}
        </nav>

        <Suspense fallback={<div className="rounded-2xl border border-line bg-paper p-5">Loading metrics...</div>}>
          <Metrics />
        </Suspense>

        <AnalyticsCharts
          data={[
            { title: "AI ops", views: 84220, likes: 4217 },
            { title: "Rendering", views: 63190, likes: 3304 },
            { title: "SEO", views: 51204, likes: 2870 },
          ]}
        />

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <AiConsole />
          <NotificationsPanel />
          <section className="rounded-3xl border border-line bg-paper p-5 shadow-sm" aria-labelledby="workflow">
            <h2 id="workflow" className="text-xl font-bold">Publishing workflow</h2>
            <ol className="mt-5 grid gap-4">
              {[
                "Generate outline, title, excerpt, SEO metadata, tags, FAQs, and cover prompt.",
                "Edit in Sanity Portable Text with preview mode and scheduled publishing.",
                "Run readability, heading hierarchy, internal link, schema, and accessibility checks.",
                "Publish with ISR cache tags, sitemap updates, RSS, and newsletter notification.",
              ].map((item, index) => (
                <li key={item} className="flex gap-3">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-sky text-sm font-bold text-brand">
                    {index + 1}
                  </span>
                  <span className="text-sm leading-6 text-muted">{item}</span>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </main>
    </>
  );
}
