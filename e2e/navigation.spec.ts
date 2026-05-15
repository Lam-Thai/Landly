import { test, expect } from "@playwright/test";

test("homepage loads and returns 200", async ({ page }) => {
  // Checks the landing page responds successfully.
  const response = await page.goto("/", { waitUntil: "domcontentloaded" });
  expect(response?.status()).toBe(200);
});

test("page title is not empty", async ({ page }) => {
  // Ensures the document title is set (basic SEO sanity check).
  await page.goto("/", { waitUntil: "domcontentloaded" });
  const title = await page.title();
  expect(title).not.toBe("");
});

test("navbar is visible on homepage", async ({ page }) => {
  // Confirms the main navigation is rendered.
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("navigation")).toBeVisible();
});

test("clicking sign-in link navigates to /sign-in", async ({ page }) => {
  // Verifies the sign-in navigation link routes correctly.
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page.getByRole("link", { name: /sign in/i }).click();
  await expect(page).toHaveURL(/\/sign-in/);
});

