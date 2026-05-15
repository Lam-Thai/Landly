import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "History — Landly",
  description: "Review previous tailoring runs from the dashboard.",
};

export default function HistoryPage() {
  return (
    <div className="space-y-4 rounded-4xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-8">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-text-muted">
          History
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-text-primary">
          Past tailoring runs
        </h2>
      </div>

      <p className="max-w-2xl text-sm leading-6 text-text-muted sm:text-base">
        Use this page to review previous resume tailoring sessions, compare
        outcomes, and reopen any draft you want to refine.
      </p>
    </div>
  );
}