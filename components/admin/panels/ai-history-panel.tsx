"use client";

import { useEffect, useState } from "react";

type AiJob = {
  id: string;
  status: string;
  attempts: number;
  costUsd: number;
  tokens: number;
  output?: string;
  input: { mode: string; prompt: string };
};

export function AiHistoryPanel() {
  const [jobs, setJobs] = useState<AiJob[]>([]);

  async function refresh() {
    const response = await fetch("/api/ai/jobs");
    const data = (await response.json()) as { jobs: AiJob[] };
    setJobs(data.jobs);
  }

  async function enqueue() {
    await fetch("/api/ai/jobs", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        mode: "SEO",
        prompt: "Create SEO metadata and FAQ recommendations for an enterprise AI blogging article.",
        priority: "normal",
      }),
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
    <section className="rounded-3xl border border-line bg-paper p-5 shadow-sm" aria-labelledby="ai-history">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 id="ai-history" className="text-xl font-bold">Generation history</h2>
        <button onClick={enqueue} className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white">
          Queue SEO job
        </button>
      </div>
      <div className="mt-5 grid gap-3">
        {jobs.length ? jobs.map((job) => (
          <article key={job.id} className="rounded-2xl border border-line bg-background p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="font-semibold">{job.input.mode}</h3>
              <span className="rounded-full bg-sky px-3 py-1 text-xs font-bold text-brand">{job.status}</span>
            </div>
            <p className="mt-2 line-clamp-2 text-sm text-muted">{job.input.prompt}</p>
            <p className="mt-3 text-xs text-muted">
              Attempts {job.attempts} · {job.tokens} tokens · ${job.costUsd.toFixed(6)}
            </p>
          </article>
        )) : (
          <p className="rounded-2xl border border-line bg-background p-4 text-sm text-muted">No generations yet.</p>
        )}
      </div>
    </section>
  );
}
