import { describe, expect, it } from "vitest";
import { aiQueue } from "@/lib/queue/ai-queue";

describe("AI queue", () => {
  it("enqueues and processes jobs", async () => {
    const job = aiQueue.enqueue({
      mode: "Readability",
      prompt: "Clear short sentences help readers understand enterprise software faster.",
      userId: "test",
      priority: "high",
    });
    const processed = await aiQueue.processNext();
    expect(processed?.id).toBe(job.id);
    expect(processed?.status).toBe("succeeded");
  });
});
