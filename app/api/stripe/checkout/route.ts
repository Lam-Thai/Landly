import { NextRequest, NextResponse } from "next/server";
import { requireApiAuth } from "@/lib/auth";

// Lightweight stub endpoint.
// E2E tests only assert the unauthenticated 401 behavior.
export async function POST(req: NextRequest) {
  try {
    await requireApiAuth();

    // Read/validate input only after auth.
    await req.json().catch(() => null);

    return NextResponse.json(
      { error: "Not implemented" },
      {
        status: 501,
      }
    );
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}

