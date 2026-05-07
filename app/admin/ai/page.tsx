import { AdminHeader } from "@/components/admin/admin-header";
import { AiConsole } from "@/components/admin/ai-console";
import { AiHistoryPanel } from "@/components/admin/panels/ai-history-panel";

export default function AdminAiPage() {
  return (
    <>
      <AdminHeader />
      <main id="main-content" className="mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-black tracking-tight">AI operations</h1>
        <AiConsole />
        <AiHistoryPanel />
      </main>
    </>
  );
}
