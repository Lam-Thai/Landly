"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  BrainCircuit,
  Download,
  FileText,
  FileUp,
  History,
  ScanSearch,
  Sparkles,
} from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import JobDescriptionInput from "@/components/tailoring/JobDescriptionInput";

type ResumeVersion = {
  id: string;
  createdAt: string;
  title: string;
  jobDescription: string;
  resume: string;
  tailoredResume: string;
};

type ResumeVersionMetadata = {
  id: string;
  title: string;
  createdAt: string;
};

const ENABLE_PERSISTENCE = false; // Set to true to enable local storage persistence
const METADATA_TTL_DAYS = 30;

const STORAGE_KEY = "landly.resumeVersions";
const STOP_WORDS = new Set([
  // Articles
  "a",
  "an",
  "the",
  // Be verbs
  "is",
  "are",
  "am",
  "was",
  "were",
  "be",
  "been",
  "being",
  // Auxiliary verbs
  "can",
  "could",
  "did",
  "do",
  "does",
  "has",
  "have",
  "had",
  "may",
  "might",
  "must",
  "shall",
  "should",
  "will",
  "would",
  // Pronouns
  "he",
  "she",
  "it",
  "i",
  "me",
  "my",
  "myself",
  "we",
  "us",
  "our",
  "ours",
  "ourselves",
  "you",
  "your",
  "yours",
  "yourself",
  "yourselves",
  "they",
  "them",
  "their",
  "theirs",
  "themselves",
  "what",
  "which",
  "who",
  "whom",
  "whose",
  // Prepositions
  "about",
  "above",
  "across",
  "after",
  "against",
  "at",
  "before",
  "behind",
  "below",
  "beneath",
  "beside",
  "between",
  "beyond",
  "by",
  "down",
  "during",
  "for",
  "from",
  "in",
  "inside",
  "into",
  "near",
  "of",
  "off",
  "on",
  "out",
  "outside",
  "over",
  "through",
  "to",
  "toward",
  "under",
  "underneath",
  "up",
  "with",
  "within",
  "without",
  // Conjunctions
  "and",
  "but",
  "nor",
  "or",
  "so",
  "yet",
  // Determiners and quantifiers
  "all",
  "also",
  "another",
  "any",
  "both",
  "each",
  "either",
  "every",
  "few",
  "first",
  "many",
  "more",
  "most",
  "much",
  "neither",
  "no",
  "none",
  "not",
  "other",
  "same",
  "several",
  "such",
  "than",
  "that",
  "these",
  "this",
  "those",
  "very",
]);

function tokenize(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 2 && !STOP_WORDS.has(word));
}

function extractTopKeywords(text: string, limit = 18) {
  const counts = new Map<string, number>();
  for (const token of tokenize(text)) {
    counts.set(token, (counts.get(token) ?? 0) + 1);
  }

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([keyword]) => keyword);
}

function buildTailoredResume(baseResume: string, jdKeywords: string[], missingKeywords: string[]) {
  const topMatch = jdKeywords.slice(0, 8).join(", ");
  const gapKeywords = missingKeywords.slice(0, 8).join(", ");

  return [
    "PROFESSIONAL SUMMARY",
    `Candidate profile aligned to role priorities: ${topMatch || "role-specific requirements"}.`,
    "",
    "TARGET ROLE KEYWORDS",
    topMatch || "No role keywords identified yet.",
    "",
    "BASE RESUME",
    baseResume,
    "",
    "KEYWORD GAPS TO ADDRESS",
    gapKeywords || "No major keyword gaps found.",
  ].join("\n");
}

export function FeatureWorkbench() {
  const [jobDescription, setJobDescription] = useState("");
  const [resumeText, setResumeText] = useState("");
  const [tailoredResume, setTailoredResume] = useState("");
  const [versions, setVersions] = useState<ResumeVersion[]>([]);
  const [status, setStatus] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    if (!ENABLE_PERSISTENCE) return;
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return;
    }

    try {
      const parsed = JSON.parse(raw) as ResumeVersionMetadata[];
      if (Array.isArray(parsed)) {
        const now = Date.now();
        const ttlMs = METADATA_TTL_DAYS * 24 * 60 * 60 * 1000;
        const valid = parsed.filter((v) => now - new Date(v.createdAt).getTime() < ttlMs);
        const reconstructed: ResumeVersion[] = valid.map((v) => ({
          ...v,
          jobDescription: "",
          resume: "",
          tailoredResume: "",
        }));
        setVersions(reconstructed);
      }
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    if (!ENABLE_PERSISTENCE) return;
    const metadata = versions.map((v) => ({
      id: v.id,
      title: v.title,
      createdAt: v.createdAt,
    }));
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(metadata));
  }, [versions]);

  const matchData = useMemo(() => {
    const jdKeywords = extractTopKeywords(jobDescription);
    const resumeKeywords = new Set(tokenize(resumeText));
    const matched = jdKeywords.filter((kw) => resumeKeywords.has(kw));
    const missing = jdKeywords.filter((kw) => !resumeKeywords.has(kw));
    const score = jdKeywords.length === 0 ? 0 : Math.round((matched.length / jdKeywords.length) * 100);

    return {
      jdKeywords,
      matched,
      missing,
      score,
    };
  }, [jobDescription, resumeText]);

  const runTailoring = () => {
    setError("");
    setStatus("");

    if (!jobDescription.trim()) {
      setError("Please add a job description.");
      return;
    }

    if (!resumeText.trim()) {
      setError("Please paste or upload your resume content.");
      return;
    }

    const generated = buildTailoredResume(resumeText.trim(), matchData.jdKeywords, matchData.missing);
    setTailoredResume(generated);
    setStatus("Tailored resume generated.");
  };

  const saveVersion = () => {
    setError("");
    setStatus("");

    if (!tailoredResume.trim()) {
      setError("Generate a tailored resume before saving a version.");
      return;
    }

    const title = `Version ${versions.length + 1}`;
    const next: ResumeVersion = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      title,
      jobDescription,
      resume: resumeText,
      tailoredResume,
    };

    setVersions((prev) => [next, ...prev].slice(0, 10));
    setStatus("Version saved.");
  };

  const restoreVersion = (version: ResumeVersion) => {
    setJobDescription(version.jobDescription);
    setResumeText(version.resume);
    setTailoredResume(version.tailoredResume);
    setStatus(`Loaded ${version.title}.`);
    setError("");
  };

  const uploadResumeFile = async (file: File | null) => {
    if (!file) {
      return;
    }

    setError("");
    setStatus("");

    const lowerName = file.name.toLowerCase();
    if (!file.type.includes("text") && !lowerName.endsWith(".txt") && !lowerName.endsWith(".md")) {
      setError("Upload a text-based file (.txt or .md), or paste your resume.");
      return;
    }

    const text = await file.text();
    setResumeText(text);
    setStatus(`Loaded ${file.name}.`);
  };

  const downloadPdf = async () => {
    setError("");
    setStatus("");

    if (!tailoredResume.trim()) {
      setError("Generate a tailored resume before downloading PDF.");
      return;
    }

    setIsDownloading(true);
    try {
      const response = await fetch("/api/pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: "tailored_resume",
          content: tailoredResume,
          authorName: "Landly User",
        }),
      });

      if (response.status === 401) {
        setError("Please sign in to download a PDF.");
        return;
      }

      if (!response.ok) {
        setError("Failed to generate PDF. Please try again.");
        return;
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = "tailored_resume.pdf";
      document.body.appendChild(anchor);
      anchor.click();
      setTimeout(() => {
        URL.revokeObjectURL(url);
        document.body.removeChild(anchor);
      }, 100);
      setStatus("PDF downloaded.");
    } catch {
      setError("Something went wrong while downloading PDF.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <section id="features" className="mx-auto max-w-6xl px-6 py-12">
      <h2 className="text-2xl font-bold text-text-primary">Features</h2>
      <p className="mt-2 text-text-muted">Use real tailoring tools directly in this page.</p>

      <AnimatedSection variant="staggerChildren" className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <AnimatedSection variant="fadeUp" className="rounded-2xl border border-border bg-surface p-6">
          <div className="inline-flex rounded-lg border border-border bg-surface-alt p-2.5">
            <FileText className="h-5 w-5 text-accent" />
          </div>
          <h3 className="mt-5 text-xl font-semibold text-text-primary">Paste Job Description</h3>
          <p className="mt-3 text-sm leading-relaxed text-text-muted">Paste a job posting to start tailoring.</p>
          <div className="mt-4">
            <JobDescriptionInput
              value={jobDescription}
              onChange={setJobDescription}
              onSubmit={runTailoring}
              maxLength={5000}
            />
          </div>
        </AnimatedSection>

        <AnimatedSection variant="fadeUp" className="rounded-2xl border border-border bg-surface p-6">
          <div className="inline-flex rounded-lg border border-border bg-surface-alt p-2.5">
            <FileUp className="h-5 w-5 text-accent" />
          </div>
          <h3 className="mt-5 text-xl font-semibold text-text-primary">Upload or Paste Resume</h3>
          <p className="mt-3 text-sm leading-relaxed text-text-muted">Upload a text file or paste resume content.</p>
          <label htmlFor="resume-file-input" className="block text-xs font-medium text-text-muted mt-4">Upload file</label>
          <input
            id="resume-file-input"
            type="file"
            accept=".txt,.md,text/plain,text/markdown"
            onChange={(e) => uploadResumeFile(e.target.files?.[0] ?? null)}
            className="mt-2 block w-full text-sm text-text-muted file:mr-4 file:rounded-md file:border-0 file:bg-accent file:px-3 file:py-2 file:text-sm file:font-medium file:text-white"
          />
          <label htmlFor="resume-textarea" className="block text-xs font-medium text-text-muted mt-4">Resume content</label>
          <textarea
            id="resume-textarea"
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            placeholder="Paste your resume content"
            className="mt-2 min-h-40 w-full rounded-md border border-border bg-surface-alt p-3 text-sm text-text-primary"
          />
        </AnimatedSection>

        <AnimatedSection variant="fadeUp" className="rounded-2xl border border-border bg-surface p-6">
          <div className="inline-flex rounded-lg border border-border bg-surface-alt p-2.5">
            <BrainCircuit className="h-5 w-5 text-accent" />
          </div>
          <h3 className="mt-5 text-xl font-semibold text-text-primary">AI Tailoring Engine</h3>
          <p className="mt-3 text-sm leading-relaxed text-text-muted">Generate a tailored draft from your inputs.</p>
          <button
            type="button"
            onClick={runTailoring}
            className="mt-4 rounded-md bg-accent px-4 py-2 text-sm font-medium text-white"
          >
            Tailor Resume
          </button>
          <textarea
            value={tailoredResume}
            onChange={(e) => setTailoredResume(e.target.value)}
            placeholder="Tailored resume output appears here"
            className="mt-4 min-h-40 w-full rounded-md border border-border bg-surface-alt p-3 text-sm text-text-primary"
          />
        </AnimatedSection>

        <AnimatedSection variant="fadeUp" className="rounded-2xl border border-border bg-surface p-6">
          <div className="inline-flex rounded-lg border border-border bg-surface-alt p-2.5">
            <ScanSearch className="h-5 w-5 text-accent" />
          </div>
          <h3 className="mt-5 text-xl font-semibold text-text-primary">ATS Keyword Matching</h3>
          <p className="mt-3 text-sm leading-relaxed text-text-muted">Track keyword coverage against the role.</p>
          <p className="mt-4 text-sm text-text-primary">Match score: {matchData.score}%</p>
          <p className="mt-2 text-xs text-text-muted">Matched: {matchData.matched.slice(0, 8).join(", ") || "None"}</p>
          <p className="mt-2 text-xs text-text-muted">Missing: {matchData.missing.slice(0, 8).join(", ") || "None"}</p>
        </AnimatedSection>

        <AnimatedSection variant="fadeUp" className="rounded-2xl border border-border bg-surface p-6">
          <div className="inline-flex rounded-lg border border-border bg-surface-alt p-2.5">
            <Download className="h-5 w-5 text-accent" />
          </div>
          <h3 className="mt-5 text-xl font-semibold text-text-primary">Download as PDF</h3>
          <p className="mt-3 text-sm leading-relaxed text-text-muted">Export your tailored resume as PDF.</p>
          <button
            type="button"
            onClick={downloadPdf}
            disabled={isDownloading}
            className="mt-4 rounded-md border border-border bg-surface-alt px-4 py-2 text-sm font-medium text-text-primary disabled:opacity-60"
          >
            {isDownloading ? "Generating PDF..." : "Download PDF"}
          </button>
          <p className="mt-3 text-xs text-text-muted">
            PDF download requires authentication. <Link href="/sign-in" className="underline">Sign in</Link>
          </p>
        </AnimatedSection>

        <AnimatedSection variant="fadeUp" className="rounded-2xl border border-border bg-surface p-6">
          <div className="inline-flex rounded-lg border border-border bg-surface-alt p-2.5">
            <History className="h-5 w-5 text-accent" />
          </div>
          <h3 className="mt-5 text-xl font-semibold text-text-primary">Save & Version History</h3>
          <p className="mt-3 text-sm leading-relaxed text-text-muted">Save and restore up to 10 local versions.</p>
          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={saveVersion}
              className="rounded-md border border-border bg-surface-alt px-4 py-2 text-sm font-medium text-text-primary"
            >
              Save Version
            </button>
            <button
              type="button"
              onClick={() => setVersions([])}
              className="rounded-md border border-border px-4 py-2 text-sm text-text-muted"
            >
              Clear
            </button>
          </div>
          <ul className="mt-4 space-y-2 text-xs text-text-muted">
            {versions.length === 0 ? <li>No saved versions yet.</li> : null}
            {versions.map((version) => (
              <li key={version.id} className="flex items-center justify-between gap-2 rounded-md border border-border p-2">
                <span>{version.title}</span>
                <button
                  type="button"
                  onClick={() => restoreVersion(version)}
                  className="rounded-md border border-border px-2 py-1 text-[11px] text-text-primary"
                >
                  Load
                </button>
              </li>
            ))}
          </ul>
        </AnimatedSection>
      </AnimatedSection>

      {status ? <p className="mt-6 text-sm text-green-400">{status}</p> : null}
      {error ? <p className="mt-2 text-sm text-red-400">{error}</p> : null}

      <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-xs text-text-muted">
        <Sparkles className="h-4 w-4 text-accent" />
        Real tools are now enabled directly on this page.
      </div>
    </section>
  );
}
