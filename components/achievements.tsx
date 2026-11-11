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
 * ДОСТИЖЕНИЯ = «timeline-ruler» на графитовой полосе (единственная тёмная
 * полоса страницы): большие цифры 60px+ табличные (count-up) в синтакс-тинте
 * accent-2, линейка с реальными засечками по наградам, награды — ruled rows.
 */
export function Achievements() {
  return (
    <Section
      id="achievements"
      title="Достижения"
      band="graphite"
      dark
    >
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
            <span className="num font-display text-[3.75rem] leading-none font-bold text-accent-2 sm:text-[4.5rem]">
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

      {/* линейка-рулетка: засечка на каждую награду, порядок хронологии */}
      <Reveal>
        <div
          className="ruler mt-14"
          aria-hidden="true"
        >
          {AWARDS.map((award, i) => (
            <span
              key={award}
              className="ruler__tick"
              style={{ "--at": AWARDS.length > 1 ? i / (AWARDS.length - 1) : 0 } as React.CSSProperties}
            >
              <i />
              <b>{String(i + 1).padStart(2, "0")}</b>
            </span>
          ))}
        </div>
        <ol className="mt-8 border-t border-graphite-glyph-1/60">
          {AWARDS.map((award, i) => (
            <li
              key={award}
              className="flex items-baseline gap-4 border-b border-graphite-glyph-1/60 py-4 text-md text-graphite-ink"
            >
              <span className="num shrink-0 font-outlier text-sm text-accent-2">
                {String(i + 1).padStart(2, "0")}
              </span>
              {award}
            </li>
          ))}
        </ol>
      </Reveal>
    </Section>
  );
}
