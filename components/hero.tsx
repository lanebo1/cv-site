"use client";

import { useRef, useCallback } from "react";
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

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
  }, []);

  return (
    <div
      id="top"
      ref={ref}
      onMouseMove={onMove}
      className="hero-grid relative overflow-hidden pt-14"
      style={{ ["--spot-x" as string]: "50%", ["--spot-y" as string]: "30%" }}
    >
      {/* cursor spotlight */}
      <div
        aria-hidden="true"
        className="hero-spotlight pointer-events-none absolute inset-0"
      />
      <div className="relative mx-auto flex w-full max-w-4xl flex-col gap-10 px-5 py-16 sm:px-8 sm:py-28">
        <div className="flex items-center gap-4">
          <FadeIn delay={0}>
            <div
              aria-hidden="true"
              className="hero-grid flex size-14 items-center justify-center rounded-md border border-line sm:size-16"
            >
              <span className="font-mono text-sm text-accent sm:text-base">
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
          <FadeIn delay={0.1}>
            <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
              {CONTACTS.name}
            </h1>
          </FadeIn>
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
            <a
              href={CONTACTS.resume}
              download
              className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-85"
            >
              <IconDownload className="size-4" />
              Скачать PDF-резюме
            </a>
            <a
              href={CONTACTS.telegramUrl}
              className="inline-flex items-center gap-2 rounded-md border border-line px-4 py-2.5 text-sm text-foreground transition-colors hover:border-accent/50 hover:text-accent"
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
