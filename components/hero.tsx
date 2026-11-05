"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ABOUT, CONTACTS } from "@/lib/content";
import { IconDownload, IconTelegram } from "./icons";

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

function FadeIn({
  children,
  delay,
  className,
}: {
  children: React.ReactNode;
  delay: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/* blur-in появление (как в Magic UI) */
function BlurIn({
  children,
  delay,
  className,
  as: Tag = "h1",
}: {
  children: React.ReactNode;
  delay: number;
  className?: string;
  as?: "h1" | "p";
}) {
  const reduce = useReducedMotion();
  const Comp = motion[Tag];
  return (
    <Comp
      className={className}
      initial={reduce ? false : { opacity: 0, filter: "blur(10px)", y: 8 }}
      animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </Comp>
  );
}

/* magnetic hover: кнопка мягко тянется к курсору */
function Magnetic({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  function onMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el || reduce) return;
    const rect = el.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    el.style.transform = `translate(${dx * 0.12}px, ${dy * 0.18}px)`;
  }

  function onLeave() {
    const el = ref.current;
    if (el) el.style.transform = "translate(0px, 0px)";
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="inline-block transition-transform duration-300 ease-out"
    >
      {children}
    </div>
  );
}

export function Hero() {
  return (
    <div
      id="top"
      className="flame-noise relative overflow-hidden pt-14"
    >
      {/* живое пламя: размытые плазменные пятна поверх белого */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="flame-blob flame-blob-1" />
        <div className="flame-blob flame-blob-2" />
        <div className="flame-blob flame-blob-3" />
      </div>

      <div className="relative mx-auto flex w-full max-w-4xl flex-col gap-10 px-5 py-16 sm:px-8 sm:py-28">
        <div className="flex items-center gap-4">
          <FadeIn delay={0}>
            <div
              aria-hidden="true"
              className="flex size-14 items-center justify-center rounded-md border border-line bg-surface/80 shadow-sm backdrop-blur-sm sm:size-16"
            >
              <span className="font-mono text-sm text-flame sm:text-base">
                КЕ
              </span>
            </div>
          </FadeIn>
          <FadeIn delay={0.05}>
            <p className="font-mono text-xs text-muted">
              {CONTACTS.city} ·{" "}
              <a
                href={CONTACTS.telegramUrl}
                className="transition-colors hover:text-accent"
              >
                {CONTACTS.telegram}
              </a>{" "}
              ·{" "}
              <a
                href={CONTACTS.githubUrl}
                className="transition-colors hover:text-accent"
              >
                {CONTACTS.github}
              </a>
            </p>
          </FadeIn>
        </div>

        <div className="flex flex-col gap-5">
          <BlurIn
            delay={0.1}
            className="text-flame text-4xl font-semibold tracking-tight text-balance sm:text-6xl"
          >
            {CONTACTS.name}
          </BlurIn>
          <FadeIn delay={0.15}>
            <p className="font-mono text-sm text-accent sm:text-base">
              {CONTACTS.role}
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
              {ABOUT}
            </p>
          </FadeIn>
        </div>

        <FadeIn delay={0.3}>
          <div className="flex flex-wrap items-center gap-3">
            <Magnetic>
              <a
                href={CONTACTS.resume}
                download
                className="btn-flame inline-flex items-center gap-2 rounded-md px-4 py-2.5 text-sm font-medium"
              >
                <IconDownload className="size-4" />
                Скачать PDF-резюме
              </a>
            </Magnetic>
            <a
              href={CONTACTS.telegramUrl}
              className="inline-flex items-center gap-2 rounded-md border border-line bg-surface/70 px-4 py-2.5 text-sm text-foreground backdrop-blur-sm transition-colors hover:border-accent/50 hover:text-accent"
            >
              <IconTelegram className="size-4" />
              Telegram
            </a>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
