"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { AWARDS, STATS } from "@/lib/content";
import { Section } from "./section";
import { Reveal } from "./reveal";

/* Счётчик: count-up при появлении в кадре; под reduced motion — сразу значение. */
function Counter({
  to,
  decimals,
  suffix,
}: {
  to: number;
  decimals: number;
  suffix: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!inView || !ref.current) return;
    if (reduce) {
      ref.current.textContent = to.toFixed(decimals) + suffix;
      return;
    }
    const controls = animate(0, to, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = v.toFixed(decimals) + suffix;
      },
    });
    return () => controls.stop();
  }, [inView, to, decimals, suffix, reduce]);

  return <span ref={ref}>0{suffix}</span>;
}

/*
 * Достижения: графитовая полоса. Фигуры считаются вверх при входе в кадр,
 * награды — ряды на волосяных линейках графита.
 */
export function Achievements() {
  return (
    <Section id="achievements" title="Достижения" band="graphite">
      <div className="grid grid-cols-2 gap-y-10 sm:grid-cols-4">
        {STATS.map((stat, i) => (
          <div
            key={stat.label}
            className={
              i > 0
                ? "border-l border-graphite-glyph-1/60 px-4 sm:px-8"
                : "pr-4 sm:pr-8"
            }
          >
            <span className="num font-display text-[2.5rem] leading-none font-bold text-accent-2 sm:text-[3.5rem]">
              <Counter
                to={stat.value}
                decimals={stat.decimals}
                suffix={stat.suffix}
              />
            </span>
            <p className="mt-3 text-sm text-graphite-muted">{stat.label}</p>
          </div>
        ))}
      </div>

      <Reveal>
        <ul className="mt-14 border-t border-graphite-glyph-1/60">
          {AWARDS.map((award) => (
            <li
              key={award}
              className="border-b border-graphite-glyph-1/60 py-4 text-md text-graphite-ink"
            >
              {award}
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
