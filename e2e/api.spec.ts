import { test, expect } from "@playwright/test";

test("POST /api/pdf returns 401 when not authenticated", async ({
  page,
}) => {
  // Checks protected PDF endpoint rejects unauthenticated requests.
  const response = await page.request.post("/api/pdf", {
    data: {
      title: "Test PDF",
      content: "Hello",
      authorName: "Tester",
    },
  });
  expect(response.status()).toBe(401);
});

test("POST /api/ai returns 401 when not authenticated", async ({
  page,
}) => {
  // Checks protected AI endpoint rejects unauthenticated requests.
  const response = await page.request.post("/api/ai", {
    data: { prompt: "Hello" },
  });
  expect(response.status()).toBe(401);
});

test("POST /api/upload returns 401 when not authenticated", async ({
  page,
}) => {
  // Checks protected upload endpoint rejects unauthenticated requests.
  const response = await page.request.post("/api/upload", {
    data: { filename: "test.txt" },
  });
  expect(response.status()).toBe(401);
});

