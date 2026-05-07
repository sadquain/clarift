import { describe, expect, it } from "vitest";
import { aiRequestSchema, scoreReadability } from "@/lib/services/ai";

describe("AI service", () => {
  it("validates generation requests", () => {
    expect(aiRequestSchema.safeParse({ mode: "SEO", prompt: "Optimize this article for enterprise AI search." }).success).toBe(true);
  });

  it("scores readability", () => {
    const result = scoreReadability("Short sentences help readers. Clear headings help scanning.");
    expect(result.score).toBeGreaterThan(70);
  });
});
