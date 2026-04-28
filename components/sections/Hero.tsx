"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { animationVariants } from "@/lib/animations";

const headline = "Designing digital products with clarity and momentum.";

const words = headline.split(" ");

export function Hero() {
  return (
    <section className="relative flex h-[100dvh] items-center justify-center overflow-hidden px-6">
      <motion.div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 size-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(79,70,229,0.42), rgba(124,58,237,0.28) 45%, rgba(147,51,234,0.12) 70%, transparent 100%)",
        }}
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.52, 0.72, 0.52],
        }}
        transition={{
          duration: 12,
          ease: "easeInOut",
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "mirror",
        }}
      />

      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.08]"
      >
        <filter id="heroNoiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.75"
            numOctaves="2"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#heroNoiseFilter)" />
      </svg>

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center text-center">
        <motion.h1
          className="text-6xl font-bold tracking-tight text-transparent sm:text-7xl lg:text-8xl bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text"
          variants={animationVariants.staggerChildren}
          initial="hidden"
          animate="visible"
        >
          {words.map((word, index) => (
            <motion.span
              key={`${word}-${index}`}
              className="mr-[0.25em] inline-block"
              variants={animationVariants.fadeUp}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          className="mt-6 max-w-2xl text-base text-text-muted sm:text-lg"
          variants={animationVariants.fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.45 }}
        >
          Crafted scroll experiences inspired by Apple-level polish, with every
          reveal feeling deliberate, smooth, and elegant.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
          variants={animationVariants.fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.62 }}
        >
          <Link
            href="#"
            className="inline-flex items-center rounded-md bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
          >
            Start Your Project
          </Link>
          <Link
            href="#"
            className="inline-flex items-center rounded-md border border-border px-6 py-3 text-sm font-medium text-text-primary transition-colors hover:bg-surface-alt"
          >
            View Work
          </Link>
        </motion.div>
      </div>

      <motion.div
        aria-hidden="true"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        animate={{ y: [0, 7, 0], opacity: [0.75, 1, 0.75] }}
        transition={{
          duration: 1.8,
          ease: "easeInOut",
          repeat: Number.POSITIVE_INFINITY,
        }}
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-border p-1">
          <span className="h-2 w-1 rounded-full bg-text-muted" />
        </div>
      </motion.div>
    </section>
  );
}
