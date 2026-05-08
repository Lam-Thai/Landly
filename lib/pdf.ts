// ⚠️ SERVER-ONLY MODULE
// Do NOT import this module in client components.
// This module uses @react-pdf/renderer which only works on the server.

import { renderToBuffer } from "@react-pdf/renderer";
import DocumentTemplate from "@/components/pdf/DocumentTemplate";
import type { DocumentData } from "@/types/pdf";

/**
 * Generates a PDF buffer from document data.
 * @param data - The document data including title, content, author, and optional date
 * @returns Promise resolving to a Buffer containing the PDF
 */
export async function generatePDF(data: DocumentData): Promise<Buffer> {
  try {
    const buffer = await renderToBuffer(
      DocumentTemplate(data)
    );
    return buffer;
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw new Error("Failed to generate PDF");
  }
}

export type { DocumentData } from "@/types/pdf";
