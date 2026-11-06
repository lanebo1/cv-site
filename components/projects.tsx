"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { PROJECTS, type Project } from "@/lib/content";
import { Section } from "./section";
import { SceneBlobs } from "./blobs";
import { IconGitHub } from "./icons";
import { Reveal } from "./reveal";

/*
 * Полноширинный кейс: 3D-tilt за мышью + glow под курсором.
 * Только pointer:fine, без reduced-motion. Наклон мягче, чем у маленьких карточек.
 */
function CaseBlock({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [fine, setFine] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const update = () => setFine(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateX = useSpring(rawX, { stiffness: 220, damping: 22 });
  const rotateY = useSpring(rawY, { stiffness: 220, damping: 22 });
  const tilt = fine && !reduce;

  // Чётные кейсы (01, 03) — слева, нечётные (02, 04) — справа на десктопе
  const right = index % 2 === 1;

  function onMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el || !tilt) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width; // 0..1
    const py = (e.clientY - rect.top) / rect.height;
    rawX.set((0.5 - py) * 6); // наклон вверх/вниз
    rawY.set((px - 0.5) * 8); // наклон влево/вправо
    el.style.setProperty("--glow-x", `${px * 100}%`);
    el.style.setProperty("--glow-y", `${py * 100}%`);
  }

  function onLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  const num = String(index + 1).padStart(2, "0");

  return (
    <Reveal>
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={tilt ? { rotateX, rotateY, transformPerspective: 1200 } : undefined}
        className="tilt-card group relative rounded-2xl bg-surface p-6 transition-shadow duration-300 hover:shadow-[0_24px_60px_-20px_rgba(249,115,22,0.35)] sm:p-10 lg:p-14"
      >
        {/* Большой полупрозрачный номер кейса — по диагонали от контента */}
        <span
          aria-hidden
          className={`pointer-events-none absolute -top-3 select-none font-display text-[5rem] font-bold leading-none text-orange-500/[0.09] sm:-top-6 sm:text-[9rem] lg:text-[11rem] ${
            right ? "left-2 sm:left-6" : "right-2 sm:right-6"
          }`}
        >
          {num}
        </span>

        <div
          className={`relative flex max-w-2xl flex-col ${
            right ? "md:ml-auto md:items-end md:text-right" : ""
          }`}
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
            {project.tag}
          </p>
          <h3 className="font-display mt-3 text-2xl font-bold tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
            {project.name}
          </h3>
          <p className="mt-5 text-sm leading-relaxed text-foreground/80">
            {project.role}
          </p>
          <p className="mt-1.5 font-mono text-xs text-faint">{project.period}</p>
          <p className="mt-6 leading-relaxed text-muted">
            {project.description}
          </p>

          {/* Итог — выделенный результат кейса */}
          <div
            className={`mt-7 flex items-center gap-3 rounded-lg border border-orange-200/80 bg-orange-50 px-4 py-3 ${
              right ? "md:flex-row-reverse" : ""
            }`}
          >
            <span className="badge-flame shrink-0 rounded-full bg-white px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wider text-orange-700">
              итог
            </span>
            <p className="text-sm font-semibold leading-snug text-orange-700">
              {project.result}
            </p>
          </div>

          <ul
            className={`mt-7 flex flex-wrap gap-1.5 ${
              right ? "md:justify-end" : ""
            }`}
          >
            {project.stack.map((tech) => (
              <li
                key={tech}
                className="chip rounded border border-orange-200/80 bg-orange-50 px-2 py-0.5 font-mono text-[11px] text-orange-700"
              >
                {tech}
              </li>
            ))}
          </ul>

          <a
            href={project.link.href}
            aria-label={`${project.name} на GitHub`}
            className="btn-flame mt-9 inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-mono text-sm"
          >
            <IconGitHub className="size-4" />
            github.com/…/{project.link.label}
          </a>
        </div>
      </motion.div>
    </Reveal>
  );
}

export function Projects() {
  return (
    <Section id="projects" index="02" title="Проекты">
      <SceneBlobs
        blobs={[
          {
            size: 28,
            color: "#fb923c",
            opacity: 0.28,
            anim: "a",
            top: "0%",
            left: "-12rem",
          },
          {
            size: 24,
            color: "#fbbf24",
            opacity: 0.24,
            anim: "c",
            duration: 26,
            bottom: "10%",
            right: "-10rem",
          },
        ]}
      />
      <div className="relative flex flex-col gap-10 sm:gap-16 lg:gap-20">
        {PROJECTS.map((project, index) => (
          <CaseBlock key={project.name} project={project} index={index} />
        ))}
      </div>
    </Section>
  );
}
