import { motion, type HTMLMotionProps } from "framer-motion";
import {
  animationVariants,
  type AnimationVariantName,
} from "@/lib/animations";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

type AnimatedSectionProps = Omit<HTMLMotionProps<"section">, "variants"> & {
  variant?: AnimationVariantName;
  delay?: number;
};

export function AnimatedSection({
  children,
  className,
  variant = "fadeUp",
  delay = 0,
  ...props
}: AnimatedSectionProps) {
  const { ref, motionProps } = useScrollAnimation();
  const selectedVariant = animationVariants[variant];
  const visibleState =
    typeof selectedVariant.visible === "function"
      ? {}
      : selectedVariant.visible;
  const mergedTransition =
    visibleState && "transition" in visibleState
      ? {
          ...(visibleState.transition as Record<string, unknown> ?? {}),
          delay: (((visibleState.transition as Record<string, unknown>)?.delay as number) ?? 0) + delay,
        }
      : { delay };
  const resolvedVariant =
    delay > 0 && visibleState
      ? {
          ...selectedVariant,
          visible: {
            ...visibleState,
            transition: mergedTransition,
          },
        }
      : selectedVariant;

  return (
    <motion.section
      ref={ref}
      className={cn(className)}
      variants={resolvedVariant}
      {...motionProps}
      {...props}
    >
      {children}
    </motion.section>
  );
}
