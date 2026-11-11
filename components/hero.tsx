"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { CONTACTS, HERO } from "@/lib/content";
import { SceneBlobs } from "./blobs";
import { Magnetic } from "./magnetic";
import { IconDownload, IconTelegram } from "./icons";

/* Печать ролей: DevOps Engineer → Infra Architect → AI-assisted Builder.
 * Пауза на hover и focus (CSS + tabIndex); под reduced motion — статичный
 * первый рол, каретка выключена глобально. */
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
 * Field hero: тип над точечным ASCII-полем. Поле дрейфует вниз,
 * кобальтовые blob-поля по краям, клавиши магнитятся к курсору.
 */
export function Hero() {
  return (
    <div id="top" className="relative flex min-h-[92svh] flex-col pt-14">
      {/* ASCII-поле: точечная сетка по ячейкам 8x16, вертикальный дрейф */}
      <div className="field-bg" aria-hidden="true" />
      <SceneBlobs
        blobs={[
          {
            size: 34,
            color: "oklch(76% 0.13 254 / 0.5)",
            opacity: 0.45,
            anim: "a",
            top: "-10rem",
            left: "-8rem",
          },
          {
            size: 30,
            color: "oklch(60% 0.13 257 / 0.4)",
            opacity: 0.35,
            anim: "b",
            duration: 30,
            bottom: "-10rem",
            right: "-8rem",
          },
        ]}
      />

      <div className="container relative flex flex-1 flex-col">
        <p className="mt-6 flex flex-wrap items-baseline gap-x-6 gap-y-2 text-sm text-muted">
          <span>{CONTACTS.city}</span>
          <a href={CONTACTS.telegramUrl} className="u-link">
            {CONTACTS.telegram}
          </a>
          <a href={CONTACTS.githubUrl} className="u-link">
            {CONTACTS.github}
          </a>
        </p>

        <div className="mt-auto pb-12 sm:pb-16">
          {/* floor 2.75rem: ЕФИМОВИЧ (5.8em caps) держит целую строку от 320px; выше ~400px ведёт 11vw */}
          <h1 className="text-[clamp(2.75rem,11vw,9rem)] leading-[1.0] tracking-display text-balance">
            Кирилл
            <br />
            Ефимович
          </h1>

          <p
            tabIndex={0}
            className="roles-line font-display mt-8 text-xl font-medium uppercase sm:text-3xl"
          >
            <Typewriter words={HERO.roles} />
          </p>

          <p className="lead mt-6 max-w-[52ch] font-medium text-ink-2">
            {HERO.tagline}
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Magnetic>
              <a href={CONTACTS.resume} download className="btn-key btn-key--primary">
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
        </div>
      </div>
    </div>
  );
}
