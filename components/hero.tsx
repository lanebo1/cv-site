"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { CONTACTS, HERO } from "@/lib/content";
import { Magnetic } from "./magnetic";
import { CopyChip } from "./copy-chip";
import { IconDownload, IconTelegram } from "./icons";

/* Печать ролей: DevOps Engineer → Infra Architect → AI-assisted Builder.
 * Пауза на hover/focus; под reduced motion — статичный первый рол. */
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
          timer = setTimeout(tick, 1700);
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

/*
 * Hero: тип на спокойном патче поля (движок замеряет [data-field-calm] и
 * глушит шум под текстом). Кейкапы магнитятся, почта — срез-чип с
 * copy-ключом. Внизу — легенда «как читать поле».
 */
export function Hero() {
  return (
    <div id="top" className="relative flex min-h-[92svh] flex-col pt-14">
      <div className="container relative flex flex-1 flex-col" data-field-calm>
        <p className="mt-6 flex flex-wrap items-baseline gap-x-6 gap-y-2 text-sm text-muted">
          <span>{CONTACTS.city}</span>
          <a href={CONTACTS.telegramUrl} className="u-link font-outlier text-sm">
            {CONTACTS.telegram}
          </a>
          <a href={CONTACTS.githubUrl} className="u-link font-outlier text-sm">
            {CONTACTS.github}
          </a>
        </p>

        <div className="mt-auto pb-10 sm:pb-14">
          {/* floor 2.75rem: ЕФИМОВИЧ (5.8em caps) держит целую строку от 320px;
              выше ~400px ведёт 11vw */}
          <h1 className="text-[clamp(2.75rem,11vw,9rem)] leading-[1.0] tracking-display text-balance">
            Кирилл
            <br />
            Ефимович
          </h1>

          <p
            tabIndex={0}
            className="roles-line mt-8 font-display text-xl font-bold uppercase sm:text-3xl"
          >
            <Typewriter words={HERO.roles} />
          </p>

          <p className="lead mt-6 max-w-[52ch] font-medium text-ink-2">
            {HERO.tagline}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Magnetic>
              <a
                href={CONTACTS.resume}
                download
                className="btn-key btn-key--primary"
              >
                <IconDownload className="size-4 shrink-0" />
                Скачать PDF-резюме
              </a>
            </Magnetic>
            <Magnetic>
              <a href={CONTACTS.telegramUrl} className="btn-key">
                <IconTelegram className="size-4 shrink-0" />
                Telegram
              </a>
            </Magnetic>
          </div>

          <div className="mt-5 max-w-[52ch]">
            <CopyChip value={CONTACTS.email} />
          </div>
        </div>
      </div>

      {/* легенда поля: как читать символы, как легенду на карте погоды */}
      <div className="container relative pb-6">
        <div className="grid md:grid-cols-12">
          <ul className="legend md:col-span-5 md:col-start-8">
            <li>
              <code className="legend__raw">·:-=+*#%</code>
              <span>сырой шум</span>
            </li>
            <li>
              <code className="text-ink">⠁⠃⠇⣿</code>
              <span>решено</span>
            </li>
            <li>
              <code className="text-accent">⣿┆</code>
              <span>деплой</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
