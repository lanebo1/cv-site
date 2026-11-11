"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { ABOUT, EXPERIENCE } from "@/lib/content";
import { Section } from "./section";
import { Reveal } from "./reveal";
import { IconLink } from "./icons";

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

/*
 * Опыт: sticky-колонка с текущим работодателем крупным капсом справа не нужна —
 * employers отлиты в каждой строке; вертикальная прогресс-линия растёт вдоль
 * секции, активная точка — кобальт. Скролл-рассказчик на вертикали.
 */
export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.65", "end 0.65"],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <Section id="experience" title="Опыт" lead={ABOUT}>
      <div className="grid grid-cols-1 gap-10 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-14">
        {/* sticky-колонка: текущий работодатель крупным капсом */}
        <div className="md:sticky md:top-24 md:self-start">
          <p className="num text-sm text-muted">
            {String(active + 1).padStart(2, "0")} /{" "}
            {String(EXPERIENCE.length).padStart(2, "0")}
          </p>
          <motion.h3
            key={EXPERIENCE[active]?.company}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="mt-3 text-display-s text-balance"
          >
            {EXPERIENCE[active]?.company ?? ""}
          </motion.h3>
          <p className="mt-3 text-md font-medium text-accent">
            {EXPERIENCE[active]?.role ?? ""}
          </p>
          <p className="num mt-1 flex flex-wrap gap-x-3 text-sm text-muted">
            <span>{EXPERIENCE[active]?.period ?? ""}</span>
            {EXPERIENCE[active]?.kind ? (
              <span>{EXPERIENCE[active]?.kind}</span>
            ) : null}
          </p>
        </div>

        {/* строки этапов + вертикальная прогресс-линия */}
        <div ref={containerRef} className="relative">
          <span
            aria-hidden="true"
            className="absolute top-2 bottom-2 left-[4px] w-[3px] rounded-full bg-rule"
          />
          <motion.span
            aria-hidden="true"
            style={{ scaleY: reduce ? 1 : scaleY }}
            className="absolute top-2 bottom-2 left-[4px] w-[3px] origin-top rounded-full bg-accent"
          />

          <div className="flex flex-col gap-12">
            {EXPERIENCE.map((item, i) => (
              <Reveal key={`${item.company}-${item.period}`}>
                <motion.article
                  onViewportEnter={() => setActive(i)}
                  viewport={{ once: true, amount: 0.05, margin: "100px" }}
                  className="relative pl-8"
                >
                  <span
                    aria-hidden="true"
                    className={`absolute top-2 left-0 size-[11px] rounded-full border-2 transition-colors duration-300 ${
                      active === i
                        ? "border-accent bg-accent"
                        : "border-rule-2 bg-paper"
                    }`}
                  />
                  <h4 className="font-semibold md:hidden">{item.company}</h4>
                  <p className="max-w-[65ch] text-ink-2">
                    {item.description}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {item.stack.map((tech) => (
                      <li key={tech} className="chip">
                        {tech}
                      </li>
                    ))}
                  </ul>
                  {item.link && (
                    <a
                      href={item.link.href}
                      className="u-link mt-4 inline-flex items-center gap-1.5 text-sm"
                    >
                      <IconLink className="size-3.5 shrink-0" />
                      {item.link.label}
                    </a>
                  )}
                </motion.article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
