import { expect, test } from "@playwright/test";

test("homepage exposes accessible landmarks and navigation", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("main")).toBeVisible();
  await expect(page.getByRole("navigation", { name: "Main navigation" })).toBeVisible();
  await expect(page.getByRole("heading", { name: /publish faster/i })).toBeVisible();
});

test("article page has a discussion form and table of contents", async ({ page }) => {
  await page.goto("/blog/ai-editorial-operating-system");
  await expect(page.getByRole("navigation", { name: "Table of contents" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Discussion" })).toBeVisible();
});
