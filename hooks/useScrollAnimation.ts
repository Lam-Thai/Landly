import { useRef } from "react";
import { useInView, type HTMLMotionProps } from "framer-motion";

type ScrollMotionProps = Pick<
  HTMLMotionProps<"div">,
  "initial" | "animate" | "viewport"
>;

export function useScrollAnimation() {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, {
    amount: 0.15,
    once: true,
  });

  const motionProps: ScrollMotionProps = {
    initial: "hidden",
    animate: isInView ? "visible" : "hidden",
    viewport: { amount: 0.15, once: true },
  };

  return { ref, motionProps };
}
