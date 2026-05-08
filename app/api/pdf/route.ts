import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { generatePDF } from "@/lib/pdf";
import type { DocumentData } from "@/types/pdf";

export async function POST(req: NextRequest) {
  try {
    // Require authentication
    await requireAuth();

    // Parse request body
    const body = await req.json();

    // Validate required fields
    const { title, content, authorName } = body;

    if (!title || typeof title !== "string" || title.trim().length === 0) {
      return NextResponse.json(
        { error: "Valid title is required" },
        { status: 400 }
      );
    }

    if (!content || typeof content !== "string" || content.trim().length === 0) {
      return NextResponse.json(
        { error: "Valid content is required" },
        { status: 400 }
      );
    }

    if (
      !authorName ||
      typeof authorName !== "string" ||
      authorName.trim().length === 0
    ) {
      return NextResponse.json(
        { error: "Valid authorName is required" },
        { status: 400 }
      );
    }

    // Prepare document data
    const documentData: DocumentData = {
      title: title.trim(),
      content: content.trim(),
      authorName: authorName.trim(),
      date: new Date().toLocaleDateString(),
    };

    // Generate PDF
    const pdfBuffer = await generatePDF(documentData);

    // Return PDF response
    return new Response(new Uint8Array(pdfBuffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${documentData.title.replace(/[^a-z0-9]/gi, "_").toLowerCase()}.pdf"`,
        "Content-Length": pdfBuffer.length.toString(),
      },
    });
  } catch (error) {
    console.error("PDF generation error:", error);

    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 }
    );
  }
}
