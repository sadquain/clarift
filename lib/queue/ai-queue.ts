import { z } from "zod";
import { generateAiContent, aiRequestSchema, scoreReadability } from "@/lib/services/ai";
import { logger } from "@/lib/logger";

export const aiJobSchema = aiRequestSchema.extend({
  userId: z.string().default("system"),
  priority: z.enum(["low", "normal", "high"]).default("normal"),
});

export type AiJobInput = z.infer<typeof aiJobSchema>;

export type AiJob = {
  id: string;
  input: AiJobInput;
  status: "queued" | "running" | "succeeded" | "failed";
  attempts: number;
  maxAttempts: number;
  output?: string;
  error?: string;
  costUsd: number;
  tokens: number;
  createdAt: string;
  updatedAt: string;
};

const jobs = new Map<string, AiJob>();
const queue: string[] = [];

function estimateTokens(text: string) {
  return Math.ceil(text.split(/\s+/).filter(Boolean).length * 1.35);
}

function estimateCost(tokens: number) {
  return Number(((tokens / 1_000_000) * 0.59).toFixed(6));
}

export const aiQueue = {
  enqueue(input: AiJobInput) {
    const parsed = aiJobSchema.parse(input);
    const now = new Date().toISOString();
    const job: AiJob = {
      id: crypto.randomUUID(),
      input: parsed,
      status: "queued",
      attempts: 0,
      maxAttempts: 3,
      costUsd: 0,
      tokens: 0,
      createdAt: now,
      updatedAt: now,
    };
    jobs.set(job.id, job);
    if (parsed.priority === "high") queue.unshift(job.id);
    else queue.push(job.id);
    logger.info("ai.job.enqueued", { jobId: job.id, mode: parsed.mode });
    return job;
  },
  list(userId?: string) {
    return Array.from(jobs.values())
      .filter((job) => (userId ? job.input.userId === userId : true))
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  },
  get(id: string) {
    return jobs.get(id) ?? null;
  },
  async processNext() {
    const id = queue.shift();
    if (!id) return null;
    const job = jobs.get(id);
    if (!job) return null;
    job.status = "running";
    job.attempts += 1;
    job.updatedAt = new Date().toISOString();
    try {
      const output = await generateAiContent(job.input);
      const evaluation = scoreReadability(output);
      job.output = `${output}\n\n---\nEvaluation: ${evaluation.grade} (${evaluation.score}/100)`;
      job.tokens = estimateTokens(job.input.prompt + output);
      job.costUsd = estimateCost(job.tokens);
      job.status = "succeeded";
      logger.info("ai.job.succeeded", { jobId: job.id, tokens: job.tokens, costUsd: job.costUsd });
    } catch (error) {
      job.error = error instanceof Error ? error.message : "Unknown AI job failure";
      job.status = job.attempts >= job.maxAttempts ? "failed" : "queued";
      if (job.status === "queued") queue.push(job.id);
      logger.error("ai.job.failed", { jobId: job.id, attempts: job.attempts });
    } finally {
      job.updatedAt = new Date().toISOString();
    }
    return job;
  },
};
