"use client";

import { useState } from "react";

const modes = ["Draft", "Title", "SEO", "Rewrite", "Summarize", "FAQ", "Tags", "Expand", "Readability"] as const;

export function AiConsole() {
  const [mode, setMode] = useState<(typeof modes)[number]>("Draft");
  const [prompt, setPrompt] = useState("Write a practical article about AI editorial governance.");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  async function generate() {
    setLoading(true);
    setOutput("");
    const response = await fetch("/api/ai/generate", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ mode, prompt, audience: "enterprise editorial teams" }),
    });
    if (!response.body) {
      setOutput(await response.text());
      setLoading(false);
      return;
    }
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let next = "";
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      next += decoder.decode(value, { stream: true });
      setOutput(next);
    }
    setLoading(false);
  }

  return (
    <section className="rounded-3xl border border-line bg-paper p-5 shadow-sm" aria-labelledby="ai-console">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 id="ai-console" className="text-xl font-bold">
            AI writing assistant
          </h2>
          <p className="mt-1 text-sm text-muted">Streamed drafts, metadata, FAQs, rewrites, tags, expansion, and scoring.</p>
        </div>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Assistant mode">
          {modes.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setMode(item)}
              className={`rounded-full px-3 py-2 text-sm font-semibold ${
                mode === item ? "bg-brand text-white" : "bg-background text-muted hover:text-ink"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <label className="mt-5 block text-sm font-semibold" htmlFor="prompt">
        Prompt
      </label>
      <textarea
        id="prompt"
        value={prompt}
        onChange={(event) => setPrompt(event.target.value)}
        className="mt-2 min-h-36 w-full rounded-2xl border border-line bg-background p-4 text-sm leading-6"
      />
      <button
        type="button"
        onClick={generate}
        disabled={loading}
        className="mt-4 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-paper hover:bg-brand disabled:cursor-wait disabled:opacity-70"
      >
        {loading ? "Generating..." : "Generate with AI"}
      </button>
      <output className="mt-5 block min-h-36 whitespace-pre-wrap rounded-2xl border border-line bg-background p-4 text-sm leading-6 text-ink">
        {output || "Generated drafts, metadata, FAQs, summaries, and rewrites appear here."}
      </output>
    </section>
  );
}
