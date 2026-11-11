"use client";

import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";

/*
 * Вертикальный прогресс скролла: рейл у правого края на всю высоту страницы.
 * Заполняется сверху вниз; при reduced motion не рисуется вовсе.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const reduce = useReducedMotion();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  if (reduce) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-y-0 right-3 z-[60] hidden w-[3px] bg-rule sm:block"
    >
      <motion.div
        className="h-full w-full origin-top bg-accent"
        style={{ scaleY }}
      />
    </div>
  );
}
