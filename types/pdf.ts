export interface DocumentData {
  title: string;
  content: string;
  authorName: string;
  date?: string;
}

export interface PDFGenerationResult {
  buffer: Buffer;
  filename: string;
  mimeType: string;
}
