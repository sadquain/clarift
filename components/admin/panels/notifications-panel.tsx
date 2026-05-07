"use client";

import { useEffect, useState } from "react";

type Notification = {
  id: string;
  type: string;
  title: string;
  body: string;
  read: boolean;
};

export function NotificationsPanel() {
  const [items, setItems] = useState<Notification[]>([]);

  async function refresh() {
    const response = await fetch("/api/notifications");
    const data = (await response.json()) as { notifications: Notification[] };
    setItems(data.notifications);
  }

  async function seed() {
    await fetch("/api/notifications", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ type: "system", title: "Digest ready", body: "Weekly digest is queued for review." }),
    });
    await refresh();
  }

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      void refresh();
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section className="rounded-3xl border border-line bg-paper p-5 shadow-sm" aria-labelledby="notifications-title">
      <div className="flex items-center justify-between gap-3">
        <h2 id="notifications-title" className="text-xl font-bold">Notifications</h2>
        <button onClick={seed} className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white">Send test</button>
      </div>
      <div className="mt-4 grid gap-3">
        {items.length ? items.map((item) => (
          <article key={item.id} className="rounded-2xl border border-line bg-background p-4">
            <p className="text-sm font-bold">{item.title}</p>
            <p className="mt-1 text-sm text-muted">{item.body}</p>
          </article>
        )) : <p className="text-sm text-muted">No notifications yet.</p>}
      </div>
    </section>
  );
}
