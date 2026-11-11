"use client";

import { useState } from "react";
import { SKILLS } from "@/lib/content";
import { Section } from "./section";

/* Группы разложены по четырём колонкам; смысловой порядок сохранён. */
const COLUMNS: string[][] = [
  ["DevOps / Инфра", "CI/CD"],
  ["Мониторинг", "Данные"],
  ["Сети", "Backend"],
  ["Изучаю", "Софт"],
];

/*
 * ВЕРТИКАЛЬНЫЙ marquee: колонки навыков текут сверху вниз, соседние — в
 * противофазе. Пауза на hover и focus-within, видимая кнопка «Пауза»,
 * под reduced motion — статичные колонки без дубликата.
 */
export function Skills() {
  const [paused, setPaused] = useState(false);

  return (
    <Section
      id="skills"
      title="Навыки"
      caption={`${SKILLS.reduce((n, g) => n + g.items.length, 0)} технологии в восьми группах`}
    >
      <div>
        <div className="mb-8 flex justify-end">
          <button
            type="button"
            aria-pressed={paused}
            onClick={() => setPaused((p) => !p)}
            className="btn-key min-h-10 px-3 text-sm"
          >
            {paused ? "Пуск" : "Пауза"}
          </button>
        </div>

        {/* 2 колонки уже от 360px: одна на всю ширину выглядит жидко */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-8 lg:grid-cols-4">
          {COLUMNS.map((groups, c) => (
            <dl
              key={c}
              className={`v-marquee ${c % 2 === 1 ? "v-marquee-reverse" : ""} ${paused ? "is-paused" : ""}`}
            >
              <div
                className="v-marquee-track"
                style={{ "--v-speed": `${40 + c * 6}s` } as React.CSSProperties}
              >
                {[0, 1].map((half) => (
                  <div
                    key={half}
                    className={`flex flex-col gap-6 pb-6 ${half === 1 ? "v-dup" : ""}`}
                    aria-hidden={half === 1 ? true : undefined}
                  >
                    {SKILLS.filter((g) => groups.includes(g.group)).map(
                      (group) => (
                        <div key={group.group}>
                          <dt className="text-sm font-medium">{group.group}</dt>
                          <dd className="mt-2 flex flex-col items-start gap-1.5">
                            {group.items.map((item) => (
                              <span key={item} className="chip">
                                {item}
                              </span>
                            ))}
                          </dd>
                        </div>
                      ),
                    )}
                  </div>
                ))}
              </div>
            </dl>
          ))}
        </div>
      </div>
    </Section>
  );
}
