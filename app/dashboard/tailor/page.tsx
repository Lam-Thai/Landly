import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "New Tailor — Landly",
  description: "Create a new tailored resume draft from the dashboard.",
};

export default function TailorPage() {
  return (
    <div className="space-y-4 rounded-4xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-8">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-text-muted">
          New Tailor
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-text-primary">
          Start a new tailoring session
        </h2>
      </div>

      <p className="max-w-2xl text-sm leading-6 text-text-muted sm:text-base">
        This route is now available for the dashboard navigation. Add the job
        description and resume details here to begin a new tailored draft.
      </p>
    </div>
  );
}