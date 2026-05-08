"use client";

import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  const isE2E = process.env.NEXT_PUBLIC_PLAYWRIGHT_E2E === "true";

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      {isE2E ? (
        <div className="w-full max-w-md rounded-lg bg-white p-6 shadow">
          <h1 className="mb-4 text-2xl font-semibold text-gray-900">
            Sign In
          </h1>
          <form aria-label="sign-in-form" className="space-y-4">
            <div className="space-y-1">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white"
            >
              Sign in
            </button>
          </form>
        </div>
      ) : (
        <SignIn />
      )}
    </div>
  );
}
