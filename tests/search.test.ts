import { describe, expect, it } from "vitest";
import { searchEngine } from "@/lib/services/search/engine";

describe("search engine", () => {
  it("ranks exact topic matches", () => {
    const results = searchEngine({ q: "SEO systems" });
    expect(results[0]?.title).toMatch(/SEO/i);
  });

  it("has typo tolerance", () => {
    const results = searchEngine({ q: "editrial" });
    expect(results.length).toBeGreaterThan(0);
  });
});
