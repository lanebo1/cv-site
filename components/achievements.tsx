"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { AWARDS, STATS } from "@/lib/content";
import { Section } from "./section";
import { StaggerGroup, StaggerItem } from "./reveal";

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
      duration: 1.4,
      ease: "easeOut",
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = v.toFixed(decimals) + suffix;
      },
    });
    return () => controls.stop();
  }, [inView, to, decimals, suffix, reduce]);

  return (
    <span ref={ref}>
      0{suffix}
    </span>
  );
}

export function Achievements() {
  return (
    <Section id="achievements" index="03" title="Достижения">
      <StaggerGroup className="grid grid-cols-2 gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-4">
        {STATS.map((stat) => (
          <StaggerItem key={stat.label}>
            <div className="flex h-full flex-col gap-1 bg-surface p-5">
              <span className="font-mono text-3xl text-accent sm:text-4xl">
                <Counter
                  to={stat.value}
                  decimals={stat.decimals}
                  suffix={stat.suffix}
                />
              </span>
              <span className="font-mono text-xs text-muted">{stat.label}</span>
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>
      <StaggerGroup className="mt-8 flex flex-col">
        {AWARDS.map((award) => (
          <StaggerItem key={award}>
            <div className="group flex items-start gap-3 border-t border-line py-3 last:border-b">
              <span
                aria-hidden="true"
                className="mt-[7px] size-1 shrink-0 rounded-full bg-faint transition-colors group-hover:bg-accent"
              />
              <p className="text-sm text-muted transition-colors group-hover:text-foreground">
                {award}
              </p>
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </Section>
  );
}
