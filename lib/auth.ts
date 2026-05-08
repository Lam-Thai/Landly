import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function getCurrentUser() {
  const { userId } = await auth();
  return userId;
}

export async function requireAuth() {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }
  return userId;
}

export async function requireApiAuth() {
  // During Playwright E2E we never want to trigger real auth provider calls.
  if (
    process.env.PLAYWRIGHT_E2E === "true" ||
    process.env.NEXT_PUBLIC_PLAYWRIGHT_E2E === "true"
  ) {
    throw new Error("Unauthorized");
  }

  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  return userId;
}
