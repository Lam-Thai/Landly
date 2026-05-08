import { defineConfig } from "@playwright/test";

const isCI = !!process.env.CI;

export default defineConfig({
  testDir: "./e2e",
  timeout: 30_000,
  retries: isCI ? 1 : 0,
  workers: isCI ? undefined : 1,
  reporter: isCI ? "github" : "list",
  use: {
    baseURL: "http://localhost:3000",
  },
  projects: [
    {
      name: "chromium",
      use: {
        browserName: "chromium",
      },
    },
  ],
  webServer: {
    command: "npm run dev",
    port: 3000,
    reuseExistingServer: true,
    env: {
      // Used by the app to avoid real Clerk auth/network calls in E2E.
      PLAYWRIGHT_E2E: "true",
      NEXT_PUBLIC_PLAYWRIGHT_E2E: "true",
    },
  },
});

