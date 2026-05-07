"use client";

import { useState } from "react";

type Result = {
  slug: string;
  title: string;
  excerpt: string;
  score: number;
};

export function AdvancedSearchPanel() {
  const [query, setQuery] = useState("AI editorial");
  const [results, setResults] = useState<Result[]>([]);
  const [trending, setTrending] = useState<{ query: string; count: number }[]>([]);

  async function search(event?: React.FormEvent) {
    event?.preventDefault();
    const response = await fetch("/api/search", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ q: query }),
    });
    const data = (await response.json()) as { results: Result[]; trending: { query: string; count: number }[] };
    setResults(data.results);
    setTrending(data.trending);
  }

  return (
    <section className="rounded-3xl border border-line bg-paper p-5 shadow-sm" aria-labelledby="advanced-search">
      <h2 id="advanced-search" className="text-xl font-bold">Search intelligence</h2>
      <form onSubmit={search} className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto]">
        <label className="sr-only" htmlFor="admin-search">Search query</label>
        <input id="admin-search" value={query} onChange={(event) => setQuery(event.target.value)} className="min-h-12 rounded-full border border-line bg-background px-4" />
        <button className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-paper">Analyze search</button>
      </form>
      <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_220px]">
        <div className="grid gap-3">
          {results.map((result) => (
            <article key={result.slug} className="rounded-2xl border border-line bg-background p-4">
              <h3 className="font-semibold">{result.title}</h3>
              <p className="mt-1 text-sm text-muted">{result.excerpt}</p>
              <p className="mt-2 text-xs font-semibold text-brand">Score {result.score.toFixed(2)}</p>
            </article>
          ))}
        </div>
        <aside className="rounded-2xl bg-background p-4">
          <h3 className="font-semibold">Trending searches</h3>
          <ol className="mt-3 grid gap-2 text-sm text-muted">
            {trending.map((item) => <li key={item.query}>{item.query} · {item.count}</li>)}
          </ol>
        </aside>
      </div>
    </section>
  );
}
