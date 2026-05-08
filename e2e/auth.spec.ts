import { test, expect } from "@playwright/test";

test("/sign-in page loads without error", async ({ page }) => {
  // Ensures the sign-in route renders successfully.
  const response = await page.goto("/sign-in", {
    waitUntil: "domcontentloaded",
  });
  expect(response?.status()).toBe(200);
  await expect(page).toHaveURL(/\/sign-in/);
});

test("/sign-up page loads without error", async ({ page }) => {
  // Ensures the sign-up route renders successfully.
  const response = await page.goto("/sign-up", {
    waitUntil: "domcontentloaded",
  });
  expect(response?.status()).toBe(200);
  await expect(page).toHaveURL(/\/sign-up/);
});

test("/dashboard redirects to /sign-in when not authenticated", async ({
  page,
}) => {
  // Validates protected dashboard routes redirect unauthenticated users.
  await page.goto("/dashboard");
  await expect(page).toHaveURL(/\/sign-in/);
});

test("sign-in page contains a sign-in form or Clerk component", async ({
  page,
}) => {
  // Checks for either the local E2E form fallback or Clerk's rendered UI.
  await page.goto("/sign-in");

  const signInForm = page.locator('form[aria-label="sign-in-form"]');
  if ((await signInForm.count()) > 0) {
    await expect(signInForm).toBeVisible();
    return;
  }

  const clerkRoot = page.locator("[data-clerk-root]");
  const anyForm = page.locator("form");
  await expect(clerkRoot.or(anyForm).first()).toBeVisible();
});

