import Link from "next/link";

export const metadata = {
  title: "Features — Landly",
  description: "AI-powered resume tailoring and job matching features from Landly.",
};

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-slate-900 to-black text-white">
      <section className="mx-auto max-w-6xl px-6 py-24 text-center">
        <h1 className="mx-auto max-w-3xl text-4xl font-extrabold leading-tight sm:text-5xl">
          Tailor your resume to every job — fast
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
          Landly uses AI to analyze job postings and transform your resume so it matches what hiring
          managers are looking for. Save time, increase callbacks, and apply with confidence.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/sign-up"
            className="rounded-md bg-accent px-6 py-3 text-sm font-semibold text-black hover:opacity-95"
          >
            Get started — Sign up
          </Link>
          <Link
            href="/"
            className="rounded-md border border-white/10 px-6 py-3 text-sm font-medium text-white/90"
          >
            Learn more
          </Link>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-6xl px-6 py-12">
        <h2 className="text-2xl font-bold">Features</h2>
        <p className="mt-2 text-gray-300">Everything you need to tailor resumes and land interviews.</p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border border-white/6 bg-white/3 p-6">
            <h3 className="text-lg font-semibold">Job-aware Tailoring</h3>
            <p className="mt-2 text-sm text-gray-200">
              Paste job descriptions and get a tailored resume that highlights the most relevant
              skills and experience.
            </p>
          </div>

          <div className="rounded-lg border border-white/6 bg-white/3 p-6">
            <h3 className="text-lg font-semibold">ATS-Optimized Formatting</h3>
            <p className="mt-2 text-sm text-gray-200">
              Output resumes formatted for applicant tracking systems to improve parsing and
              screening results.
            </p>
          </div>

          <div className="rounded-lg border border-white/6 bg-white/3 p-6">
            <h3 className="text-lg font-semibold">One-click Apply</h3>
            <p className="mt-2 text-sm text-gray-200">
              Save tailored resumes and apply directly to jobs with pre-filled application
              information.
            </p>
          </div>

          <div className="rounded-lg border border-white/6 bg-white/3 p-6">
            <h3 className="text-lg font-semibold">Privacy-first</h3>
            <p className="mt-2 text-sm text-gray-200">
              Your data stays private — export or delete your data anytime from the dashboard.
            </p>
          </div>

          <div className="rounded-lg border border-white/6 bg-white/3 p-6">
            <h3 className="text-lg font-semibold">Version History</h3>
            <p className="mt-2 text-sm text-gray-200">
              Keep multiple tailored versions for different roles and track changes over time.
            </p>
          </div>

          <div className="rounded-lg border border-white/6 bg-white/3 p-6">
            <h3 className="text-lg font-semibold">Integrations</h3>
            <p className="mt-2 text-sm text-gray-200">
              Connect to LinkedIn and popular job boards to import postings and streamline
              applications.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 text-center">
        <div className="mx-auto max-w-2xl">
          <h3 className="text-2xl font-bold">Ready to get more interview invites?</h3>
          <p className="mt-3 text-gray-300">
            Create a free account and start tailoring your resume in minutes.
          </p>

          <div className="mt-6 flex justify-center gap-4">
            <Link
              href="/sign-up"
              className="rounded-md bg-accent px-6 py-3 text-sm font-semibold text-black"
            >
              Create free account
            </Link>
            <Link href="/contact" className="rounded-md border border-white/10 px-6 py-3 text-sm">
              Contact sales
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
