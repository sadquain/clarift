"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useEffect, useState } from "react";

export function AnalyticsCharts({
  data,
}: {
  data: { title: string; views: number; likes: number }[];
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section className="rounded-3xl border border-line bg-paper p-5 shadow-sm" aria-labelledby="chart-title">
      <h2 id="chart-title" className="text-xl font-bold">Article performance</h2>
      <div className="mt-5 h-72" role="img" aria-label="Bar chart comparing article views and likes">
        {mounted ? (
          <ResponsiveContainer width="100%" height="100%" minWidth={320} minHeight={240}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="title" tick={{ fontSize: 11 }} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="views" fill="#146b5d" radius={[6, 6, 0, 0]} />
              <Bar dataKey="likes" fill="#b65f2b" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="grid h-full place-items-center rounded-2xl bg-background text-sm text-muted">
            Loading chart...
          </div>
        )}
      </div>
    </section>
  );
}
