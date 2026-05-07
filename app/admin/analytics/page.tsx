import { AnalyticsPlatformPanel } from "@/components/admin/panels/analytics-platform-panel";
import { AdminHeader } from "@/components/admin/admin-header";

export default function AdminAnalyticsPage() {
  return (
    <>
      <AdminHeader />
      <main id="main-content" className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="mb-6 text-4xl font-black tracking-tight">Analytics intelligence</h1>
        <AnalyticsPlatformPanel />
      </main>
    </>
  );
}
