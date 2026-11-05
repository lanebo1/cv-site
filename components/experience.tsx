"use client";

import { useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import { ABOUT, EXPERIENCE } from "@/lib/content";
import { Section } from "./section";
import { SceneBlobs } from "./blobs";
import { IconLink } from "./icons";

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();

  /* прогресс-линия растёт вместе со скроллом по сцене */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.65", "end 0.65"],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  const current = EXPERIENCE[active] ?? EXPERIENCE[0];

  return (
    <Section id="experience" index="01" title="Опыт">
      <SceneBlobs
        blobs={[
          {
            size: 26,
            color: "#fbbf24",
            opacity: 0.32,
            anim: "b",
            top: "10%",
            right: "-12rem",
          },
          {
            size: 24,
            color: "#fb7185",
            opacity: 0.25,
            anim: "c",
            duration: 28,
            bottom: "0%",
            left: "-10rem",
          },
        ]}
      />

      <p className="relative mb-12 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
        {ABOUT}
      </p>

      <div className="relative grid grid-cols-1 gap-10 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-14">
        {/* sticky-колонка: текущая компания крупным Unbounded */}
        <div className="md:sticky md:top-24 md:self-start">
          <p className="font-mono text-xs text-faint">
            {String(active + 1).padStart(2, "0")} /{" "}
            {String(EXPERIENCE.length).padStart(2, "0")}
          </p>
          <motion.h3
            key={current.company}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="font-display mt-3 text-3xl leading-tight font-bold text-balance sm:text-4xl"
          >
            {current.company}
          </motion.h3>
          <p className="mt-3 text-sm font-medium text-accent">
            {current.role}
          </p>
          <p className="mt-1 font-mono text-xs text-faint">
            {current.period}
            {current.kind ? ` · ${current.kind}` : ""}
          </p>
        </div>

        {/* карточки этапов: blur-in, смена активной компании при скролле */}
        <div ref={containerRef} className="relative">
          {/* прогресс-линия: фон + растущая оранжевая поверх */}
          <span
            aria-hidden="true"
            className="absolute top-2 bottom-2 left-[4px] w-0.5 rounded-full bg-line"
          />
          <motion.span
            aria-hidden="true"
            style={{ scaleY: reduce ? 1 : scaleY }}
            className="absolute top-2 bottom-2 left-[4px] w-0.5 origin-top rounded-full bg-gradient-to-b from-orange-500 via-amber-400 to-rose-400"
          />

          <div className="flex flex-col gap-8">
            {EXPERIENCE.map((item, i) => (
              <motion.article
                key={`${item.company}-${item.period}`}
                onViewportEnter={() => setActive(i)}
                viewport={{ margin: "-45% 0px -45% 0px" }}
                initial={
                  reduce
                    ? false
                    : { opacity: 0, y: 28, filter: "blur(10px)" }
                }
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.6, ease: EASE }}
                className="relative pl-8"
              >
                <span
                  aria-hidden="true"
                  className={`absolute top-2 left-0 size-[11px] rounded-full border-2 transition-colors duration-300 ${
                    active === i
                      ? "border-amber-300 bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]"
                      : "border-line bg-surface"
                  }`}
                />
                <h4 className="font-semibold tracking-tight md:hidden">
                  {item.company}
                </h4>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted sm:mt-0">
                  {item.description}
                </p>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {item.stack.map((tech) => (
                    <li
                      key={tech}
                      className="chip rounded border border-orange-200/80 bg-orange-50 px-2 py-0.5 font-mono text-[11px] text-orange-700"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
                {item.link && (
                  <a
                    href={item.link.href}
                    className="mt-3 inline-flex items-center gap-1.5 font-mono text-xs text-faint transition-colors hover:text-accent"
                  >
                    <IconLink className="size-3.5" />
                    {item.link.label}
                  </a>
                )}
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
