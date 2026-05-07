import { z } from "zod";
import { sanitizeText } from "@/lib/security";
import { semanticCache } from "@/lib/services/semantic-cache";

export const aiRequestSchema = z.object({
  mode: z.enum(["Draft", "Title", "SEO", "Rewrite", "Summarize", "FAQ", "Tags", "Expand", "Readability"]),
  prompt: z.string().min(12).max(4000),
  audience: z.string().max(120).optional(),
  keywords: z.array(z.string()).max(12).optional(),
});

export type AiRequest = z.infer<typeof aiRequestSchema>;

export const promptVersions = {
  v1: {
    Draft: "Write a complete article with title, excerpt, outline, sections, conclusion, and editorial notes.",
    Title: "Generate 10 SEO-friendly title options scored for clarity and click intent.",
    SEO: "Return SEO title, meta description, canonical intent, keywords, schema notes, and internal links.",
    Rewrite: "Rewrite for clarity, authority, accessibility, and strong information scent.",
    Summarize: "Create a concise abstract, TLDR, and reader takeaways.",
    FAQ: "Generate practical FAQs that satisfy search intent.",
    Tags: "Recommend tags, category, topical cluster, and entities.",
    Expand: "Expand the draft with examples, transitions, and missing subtopics.",
    Readability: "Score readability, heading quality, sentence complexity, and jargon risk.",
  },
} as const;

export function scoreReadability(text: string) {
  const words = text.trim().split(/\s+/).filter(Boolean);
  const sentences = text.split(/[.!?]+/).filter((part) => part.trim().length > 0);
  const longWords = words.filter((word) => word.length > 9).length;
  const avgSentence = words.length / Math.max(1, sentences.length);
  const score = Math.max(1, Math.min(100, Math.round(100 - avgSentence * 1.4 - longWords * 0.6)));
  return {
    score,
    grade: score >= 85 ? "Excellent" : score >= 70 ? "Good" : score >= 55 ? "Needs editing" : "Difficult",
    avgSentence: Number(avgSentence.toFixed(1)),
    longWords,
  };
}

export async function generateAiContent(input: AiRequest) {
  const cleanPrompt = sanitizeText(input.prompt);
  const instruction = promptVersions.v1[input.mode];
  const cached = semanticCache.get(`${input.mode}:${cleanPrompt}`);
  if (cached) return `${cached}\n\nCache: semantic-hit`;
  const apiKey = process.env.GROQ_API_KEY ?? process.env.OPENAI_API_KEY;

  if (input.mode === "Readability") {
    return JSON.stringify(scoreReadability(cleanPrompt), null, 2);
  }

  if (!apiKey) {
    const preview = [
      `Prompt version: v1`,
      `Mode: ${input.mode}`,
      `Instruction: ${instruction}`,
      "",
      `Working draft for: ${cleanPrompt}`,
      "",
      "Configure GROQ_API_KEY or OPENAI_API_KEY to enable provider-backed generation.",
    ].join("\n");
    semanticCache.set(`${input.mode}:${cleanPrompt}`, preview);
    return preview;
  }

  const providerUrl = process.env.GROQ_API_KEY
    ? "https://api.groq.com/openai/v1/chat/completions"
    : "https://api.openai.com/v1/chat/completions";

  const upstream = await fetch(providerUrl, {
    method: "POST",
    headers: { authorization: `Bearer ${apiKey}`, "content-type": "application/json" },
    body: JSON.stringify({
      model: process.env.GROQ_API_KEY ? "llama-3.1-70b-versatile" : "gpt-4o-mini",
      messages: [
        { role: "system", content: instruction },
        { role: "user", content: cleanPrompt },
      ],
      temperature: 0.55,
    }),
  });

  if (!upstream.ok) {
    throw new Error("AI provider request failed.");
  }
  const data = (await upstream.json()) as { choices?: { message?: { content?: string } }[] };
  const output = data.choices?.[0]?.message?.content ?? "No content generated.";
  semanticCache.set(`${input.mode}:${cleanPrompt}`, output);
  return output;
}

export function streamTextResponse(text: string) {
  const encoder = new TextEncoder();
  const words = text.split(/(\s+)/);
  return new ReadableStream({
    async start(controller) {
      for (const word of words) {
        controller.enqueue(encoder.encode(word));
        await new Promise((resolve) => setTimeout(resolve, 8));
      }
      controller.close();
    },
  });
}
