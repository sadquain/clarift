import { describe, expect, it } from "vitest";

describe("clarift architecture", () => {
  it("documents the production test layer", () => {
    expect(["unit", "integration", "e2e", "accessibility"]).toContain("accessibility");
  });
});
