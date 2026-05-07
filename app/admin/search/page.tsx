import { AdvancedSearchPanel } from "@/components/admin/panels/advanced-search-panel";
import { AdminHeader } from "@/components/admin/admin-header";

export default function AdminSearchPage() {
  return (
    <>
      <AdminHeader />
      <main id="main-content" className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="mb-6 text-4xl font-black tracking-tight">Search intelligence</h1>
        <AdvancedSearchPanel />
      </main>
    </>
  );
}
