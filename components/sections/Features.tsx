"use client";

import { motion } from "framer-motion";
import { Cpu, ShieldCheck, Sparkles } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

const features = [
  {
    icon: Sparkles,
    title: "Polished User Journeys",
    description:
      "Deliver premium onboarding and conversion flows with smooth interactions that keep users engaged.",
  },
  {
    icon: Cpu,
    title: "Fast, Scalable Foundation",
    description:
      "Built for speed from day one with a modern stack that stays performant as your product grows.",
  },
  {
    icon: ShieldCheck,
    title: "Enterprise-Ready Security",
    description:
      "Protect data and operations with secure defaults, robust auth patterns, and production-grade practices.",
  },
];

export function Features() {
  return (
    <section className="relative px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <AnimatedSection
          variant="fadeIn"
          className="mb-12 h-px w-full"
          style={{
            backgroundImage:
              "linear-gradient(to right, color-mix(in srgb, var(--color-gradient-accent-from) 10%, transparent), color-mix(in srgb, var(--color-gradient-accent-via) 80%, transparent), color-mix(in srgb, var(--color-gradient-accent-to) 10%, transparent))",
          }}
        />

        <AnimatedSection
          variant="fadeUp"
          className="text-center"
        >
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-text-muted">
            Features
          </p>
        </AnimatedSection>

        <AnimatedSection
          variant="fadeUp"
          delay={0.08}
          className="mx-auto mt-4 max-w-4xl text-center text-4xl font-bold tracking-tight text-text-primary sm:text-5xl"
        >
          Built for modern SaaS teams shipping fast.
        </AnimatedSection>

        <AnimatedSection
          variant="fadeIn"
          delay={0.16}
          className="mx-auto mt-5 max-w-2xl text-center text-base text-text-muted sm:text-lg"
        >
          Everything you need to design, launch, and scale a polished product
          experience without sacrificing performance.
        </AnimatedSection>

        <AnimatedSection
          variant="staggerChildren"
          delay={0.24}
          className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <AnimatedSection
                key={feature.title}
                variant="fadeUp"
              >
                <motion.article
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                  className="rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent"
                >
                  <div className="inline-flex rounded-lg border border-border bg-surface-alt p-2.5">
                    <Icon className="h-5 w-5 text-accent" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-text-primary">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-text-muted">
                    {feature.description}
                  </p>
                </motion.article>
              </AnimatedSection>
            );
          })}
        </AnimatedSection>
      </div>
    </section>
  );
}
