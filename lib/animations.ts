import type { Transition, Variants } from "framer-motion";

const springReveal: Transition = {
  type: "spring",
  stiffness: 90,
  damping: 20,
  mass: 0.9,
};

export const animationVariants = {
  fadeUp: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: springReveal },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  },
  staggerChildren: {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  },
} satisfies Record<string, Variants>;

export type AnimationVariantName = keyof typeof animationVariants;
