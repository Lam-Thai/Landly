import Link from "next/link";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { FeatureWorkbench } from "@/components/features/FeatureWorkbench";

export const metadata = {
  title: "Features — Landly",
  description: "AI-powered resume tailoring and job matching features from Landly.",
};

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-slate-900 to-black text-white">
      <AnimatedSection className="mx-auto max-w-6xl px-6 py-24 text-center" variant="staggerChildren">
        <AnimatedSection className="mx-auto max-w-3xl" delay={0}>
          <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl">
            Your resume, tailored for every job
          </h1>
        </AnimatedSection>

        <AnimatedSection className="mx-auto mt-4 max-w-2xl" delay={0.08}>
          <p className="text-lg text-gray-300">
            AI-powered tailoring that analyzes job postings and highlights the skills and
            experience recruiters care about — save time and improve your interview rate.
          </p>
        </AnimatedSection>

        <AnimatedSection className="mt-8 flex justify-center gap-4" delay={0.16}>
          <Link
            href="/sign-up"
            className="rounded-md bg-accent px-6 py-3 text-sm font-semibold text-black hover:opacity-95"
          >
            Get started — Sign up
          </Link>
        </AnimatedSection>
      </AnimatedSection>

      <FeatureWorkbench />

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
