import { describe, expect, it } from "vitest";
import { sanitizeText } from "@/lib/security";

describe("security helpers", () => {
  it("removes dangerous markup", () => {
    expect(sanitizeText("<script>javascript:alert(1)</script>")).not.toContain("<");
  });
});
