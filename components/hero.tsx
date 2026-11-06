"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CONTACTS, HERO, STATS } from "@/lib/content";
import { SceneBlobs } from "./blobs";
import { Magnetic } from "./magnetic";
import { IconDownload, IconTelegram } from "./icons";

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

function BlurIn({
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
      initial={reduce ? false : { opacity: 0, filter: "blur(10px)", y: 10 }}
      animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/* печать по кругу: DevOps Engineer → Infra Architect → AI-assisted Builder */
function Typewriter({ words }: { words: string[] }) {
  const reduce = useReducedMotion();
  const [text, setText] = useState(words[0]);

  useEffect(() => {
    if (reduce) return;
    let word = 0;
    let char = words[0].length;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const current = words[word];
      if (!deleting) {
        if (char >= current.length) {
          deleting = true;
          timer = setTimeout(tick, 1700); // пауза на полном слове
          return;
        }
        char += 1;
        setText(current.slice(0, char));
        timer = setTimeout(tick, 55 + Math.random() * 60);
      } else {
        if (char <= 0) {
          deleting = false;
          word = (word + 1) % words.length;
          timer = setTimeout(tick, 380);
          return;
        }
        char -= 1;
        setText(current.slice(0, char));
        timer = setTimeout(tick, 30);
      }
    };

    timer = setTimeout(tick, 1700);
    return () => clearTimeout(timer);
  }, [reduce, words]);

  return (
    <span>
      {text}
      <span className="type-caret" aria-hidden="true" />
    </span>
  );
}

/* строка статов снизу hero — из фактов STATS */
function StatLine() {
  return (
    <p className="font-mono text-[11px] tracking-wide text-faint sm:text-xs">
      {STATS.map((s, i) => (
        <span key={s.label}>
          {i > 0 && <span className="mx-2 text-orange-300">/</span>}
          {s.value.toFixed(s.decimals)}
          {s.suffix} {s.label}
        </span>
      ))}
      <span className="mx-2 text-orange-300">/</span>
      {CONTACTS.city}
    </p>
  );
}

export function Hero() {
  return (
    <div
      id="top"
      className="flame-noise relative flex min-h-svh flex-col overflow-hidden pt-14"
    >
      <SceneBlobs
        blobs={[
          {
            size: 36,
            color: "#fb923c",
            opacity: 0.6,
            anim: "a",
            top: "-10rem",
            left: "-9rem",
          },
          {
            size: 30,
            color: "#fbbf24",
            opacity: 0.5,
            anim: "b",
            duration: 27,
            top: "-6rem",
            right: "-10rem",
          },
          {
            size: 28,
            color: "#fb7185",
            opacity: 0.4,
            anim: "c",
            duration: 25,
            bottom: "-12rem",
            left: "32%",
          },
        ]}
      />

      <div className="relative mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center px-5 py-20 sm:px-8">
        <BlurIn delay={0.05}>
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
        </BlurIn>

        <BlurIn delay={0.15}>
          <h1 className="text-flame mt-6 font-display text-[clamp(2.5rem,9vw,7rem)] leading-[0.98] font-bold tracking-tight text-balance">
            Кирилл
            <br />
            <span className="italic">Ефимович</span>
          </h1>
        </BlurIn>

        <BlurIn delay={0.3}>
          <p className="mt-7 font-mono text-base text-accent sm:text-xl">
            <Typewriter words={HERO.roles} />
          </p>
        </BlurIn>

        <BlurIn delay={0.45}>
          <p className="mt-6 max-w-xl text-lg leading-snug font-medium text-foreground sm:text-2xl sm:leading-snug">
            {HERO.tagline}
          </p>
        </BlurIn>

        <BlurIn delay={0.6}>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Magnetic>
              <a
                href={CONTACTS.resume}
                download
                className="btn-flame inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-medium"
              >
                <IconDownload className="size-4" />
                Скачать PDF-резюме
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={CONTACTS.telegramUrl}
                className="inline-flex items-center gap-2 rounded-md border border-line bg-surface/70 px-5 py-3 text-sm font-medium backdrop-blur-sm transition-colors hover:border-accent/50 hover:text-accent"
              >
                <IconTelegram className="size-4" />
                Telegram
              </a>
            </Magnetic>
          </div>
        </BlurIn>
      </div>

      {/* scroll-cue + статы: якорь в первую сцену */}
      <div className="relative mx-auto flex w-full max-w-5xl flex-wrap items-end justify-between gap-x-8 gap-y-4 px-5 pb-8 sm:px-8">
        <StatLine />
        <a
          href="#experience"
          aria-label="Прокрутить к опыту"
          className="group flex flex-col items-center gap-2 pb-1"
        >
          <span className="scroll-cue-line" aria-hidden="true" />
          <span className="font-mono text-[10px] text-faint transition-colors group-hover:text-accent">
            скролл
          </span>
        </a>
      </div>
    </div>
  );
}
