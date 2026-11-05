"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { AWARDS, STATS } from "@/lib/content";
import { Section } from "./section";

/* светящийся счётчик: count-up при появлении в кадре */
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

  return (
    <span ref={ref} className="glow-text">
      0{suffix}
    </span>
  );
}

/* spark-частицы: детерминированный разброс, чтобы SSR и клиент совпадали */
const SPARKS = [
  { left: "6%", delay: 0, duration: 9 },
  { left: "14%", delay: 2.4, duration: 11 },
  { left: "23%", delay: 5, duration: 8.5 },
  { left: "33%", delay: 1.2, duration: 12 },
  { left: "43%", delay: 3.6, duration: 9.5 },
  { left: "52%", delay: 6.2, duration: 10.5 },
  { left: "61%", delay: 0.8, duration: 8 },
  { left: "70%", delay: 4.4, duration: 11.5 },
  { left: "78%", delay: 2, duration: 9 },
  { left: "86%", delay: 5.6, duration: 12.5 },
  { left: "93%", delay: 3, duration: 10 },
];

export function Achievements() {
  const reduce = useReducedMotion();

  return (
    <Section id="achievements" index="03" title="Достижения" dark>
      {/* particle-sparks: тёплые искры всплывают из тёмного */}
      {!reduce && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 top-1/3 overflow-hidden"
        >
          {SPARKS.map((s, i) => (
            <span
              key={i}
              className="spark"
              style={{
                left: s.left,
                animationDelay: `${s.delay}s`,
                animationDuration: `${s.duration}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* счётчики: крупные, светятся, разделены линиями вместо карточек */}
      <div className="relative grid grid-cols-2 gap-y-10 sm:grid-cols-4">
        {STATS.map((stat, i) => (
          <div
            key={stat.label}
            className={`flex flex-col gap-2 border-white/10 px-2 sm:px-6 ${
              i % 2 === 1 ? "border-l pl-4" : ""
            } ${i > 0 ? "sm:border-l sm:pl-6" : ""}`}
          >
            <span className="font-mono text-3xl font-medium tracking-tight sm:text-5xl">
              <Counter
                to={stat.value}
                decimals={stat.decimals}
                suffix={stat.suffix}
              />
            </span>
            <span className="font-mono text-xs text-stone-400">
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      {/* награды: бейджи с shimmer-ободком */}
      <div className="relative mt-14 flex flex-col gap-3">
        {AWARDS.map((award) => (
          <div
            key={award}
            className="badge-flame flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3"
          >
            <span
              aria-hidden="true"
              className="size-1.5 shrink-0 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.7)]"
            />
            <p className="text-sm text-stone-300">{award}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
