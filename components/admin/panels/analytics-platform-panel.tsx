"use client";

import { useEffect, useState } from "react";

type Snapshot = {
  realTimeReaders: number;
  engagementRate: number;
  funnel: { step: string; value: number }[];
  retention: { cohort: string; value: number }[];
  newsletter: { openRate: number; clickRate: number; unsubRate: number };
  heatmap: { title: string; intro: number; middle: number; end: number }[];
};

export function AnalyticsPlatformPanel() {
  const [snapshot, setSnapshot] = useState<Snapshot | null>(null);

  useEffect(() => {
    fetch("/api/analytics").then((response) => response.json()).then(setSnapshot);
  }, []);

  if (!snapshot) {
    return <div className="rounded-3xl border border-line bg-paper p-5 text-sm text-muted">Loading analytics...</div>;
  }

  return (
    <section className="grid gap-5" aria-labelledby="analytics-platform">
      <h2 id="analytics-platform" className="text-xl font-bold">Real-time analytics platform</h2>
      <div className="grid gap-4 md:grid-cols-3">
        <Metric label="Readers now" value={snapshot.realTimeReaders} />
        <Metric label="Engagement rate" value={`${snapshot.engagementRate}%`} />
        <Metric label="Newsletter CTR" value={`${snapshot.newsletter.clickRate}%`} />
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        <Panel title="Engagement funnel" rows={snapshot.funnel.map((row) => `${row.step}: ${row.value.toLocaleString()}`)} />
        <Panel title="Retention" rows={snapshot.retention.map((row) => `${row.cohort}: ${row.value}%`)} />
      </div>
      <section className="rounded-3xl border border-line bg-paper p-5">
        <h3 className="font-bold">Article heatmap</h3>
        <div className="mt-4 grid gap-3">
          {snapshot.heatmap.map((row) => (
            <div key={row.title}>
              <p className="text-sm font-semibold">{row.title}</p>
              <div className="mt-2 grid grid-cols-3 overflow-hidden rounded-full bg-background text-xs text-white">
                <span className="bg-brand py-2 text-center" style={{ opacity: row.intro / 100 }}>Intro {row.intro}%</span>
                <span className="bg-accent py-2 text-center" style={{ opacity: row.middle / 100 }}>Middle {row.middle}%</span>
                <span className="bg-ink py-2 text-center" style={{ opacity: row.end / 100 }}>End {row.end}%</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-2xl border border-line bg-paper p-4">
      <p className="text-sm text-muted">{label}</p>
      <p className="mt-2 text-3xl font-black">{value}</p>
    </div>
  );
}

function Panel({ title, rows }: { title: string; rows: string[] }) {
  return (
    <section className="rounded-3xl border border-line bg-paper p-5">
      <h3 className="font-bold">{title}</h3>
      <ul className="mt-3 grid gap-2 text-sm text-muted">
        {rows.map((row) => <li key={row}>{row}</li>)}
      </ul>
    </section>
  );
}
