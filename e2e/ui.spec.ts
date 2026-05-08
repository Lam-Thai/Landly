import { test, expect } from "@playwright/test";

test("Hero section is visible on homepage", async ({ page }) => {
  // Verifies the main landing hero content is present.
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(
    page.getByRole("heading", { name: /designing digital products/i })
  ).toBeVisible();
});

test("CTA buttons are present in Hero", async ({ page }) => {
  // Ensures both hero call-to-action links render.
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(
    page.getByRole("link", { name: /start your project/i })
  ).toBeVisible();
  await expect(page.getByRole("link", { name: /view work/i })).toBeVisible();
});

test("Features section renders on homepage", async ({ page }) => {
  // Confirms the features section heading is visible.
  await page.goto("/", { waitUntil: "domcontentloaded" });
  const features = page.locator("#features");
  await expect(features.getByText("Features", { exact: true })).toBeVisible();
});

test("page is responsive — 375px and 1280px", async ({ page }) => {
  // Checks key above-the-fold elements remain visible at mobile/desktop widths.
  const sizes = [375, 1280];

  for (const width of sizes) {
    await page.setViewportSize({ width, height: 800 });
    await page.goto("/", { waitUntil: "domcontentloaded" });

    await expect(
      page.getByRole("heading", { name: /designing digital products/i })
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: /start your project/i })
    ).toBeVisible();
  }
});

