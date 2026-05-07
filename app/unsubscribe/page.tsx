import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Unsubscribe",
  description: "Manage clarift newsletter subscriptions.",
};

export default function UnsubscribePage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="mx-auto max-w-xl px-4 py-12 sm:px-6">
        <section className="rounded-3xl border border-line bg-paper p-6">
          <h1 className="text-3xl font-black tracking-tight">Email preferences</h1>
          <p className="mt-3 text-muted">Choose exactly what you want to receive.</p>
          <form className="mt-6 grid gap-4">
            <label className="grid gap-2">
              <span className="text-sm font-semibold">Email</span>
              <input type="email" required className="min-h-12 rounded-full border border-line bg-background px-4" />
            </label>
            {["Weekly digest", "Product updates", "Instant post alerts"].map((label) => (
              <label key={label} className="flex items-center gap-3 rounded-2xl border border-line p-4">
                <input type="checkbox" className="size-5" defaultChecked={label === "Weekly digest"} />
                <span className="font-medium">{label}</span>
              </label>
            ))}
            <button className="min-h-12 rounded-full bg-ink px-5 text-sm font-semibold text-paper">Save preferences</button>
          </form>
        </section>
      </main>
    </>
  );
}
