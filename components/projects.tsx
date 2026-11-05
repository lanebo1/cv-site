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

/* 3D-tilt за мышью + glow под курсором. Только pointer:fine, без reduced-motion */
function TiltCard({ project }: { project: Project }) {
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

  function onMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el || !tilt) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width; // 0..1
    const py = (e.clientY - rect.top) / rect.height;
    rawX.set((0.5 - py) * 10); // наклон вверх/вниз
    rawY.set((px - 0.5) * 12); // наклон влево/вправо
    el.style.setProperty("--glow-x", `${px * 100}%`);
    el.style.setProperty("--glow-y", `${py * 100}%`);
  }

  function onLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={tilt ? { rotateX, rotateY, transformPerspective: 900 } : undefined}
      className="tilt-card group flex h-full flex-col rounded-xl bg-surface p-6 transition-shadow duration-300 hover:shadow-[0_18px_40px_-16px_rgba(249,115,22,0.35)]"
    >
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="text-lg font-semibold tracking-tight">{project.name}</h3>
        <a
          href={project.link.href}
          aria-label={`${project.name} на GitHub`}
          className="text-faint transition-colors group-hover:text-accent"
        >
          <IconGitHub className="size-4" />
        </a>
      </div>
      <p className="mt-1.5 font-mono text-[11px] text-faint">{project.tag}</p>
      <p className="mt-4 text-sm leading-relaxed text-muted">
        {project.description}
      </p>
      <ul className="mt-4 flex flex-wrap gap-1.5">
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
        className="mt-5 inline-flex items-center gap-1.5 font-mono text-xs text-accent transition-opacity hover:opacity-75"
      >
        github.com/…/{project.link.label}
      </a>
    </motion.div>
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
      <div className="relative grid grid-cols-1 gap-5 sm:grid-cols-2">
        {PROJECTS.map((project) => (
          <TiltCard key={project.name} project={project} />
        ))}
      </div>
    </Section>
  );
}
