"use client";

import { ABOUT, EXPERIENCE, type Experience } from "@/lib/content";

/* кобальтовый wash — на строке DevOps-практики (ВК) */
import { Section } from "./section";
import { Reveal } from "./reveal";
import { IconLink } from "./icons";

/* Ячейка стека */
function Stack({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {items.map((tech) => (
        <li key={tech} className="chip">
          {tech}
        </li>
      ))}
    </ul>
  );
}

/*
 * ОПЫТ = «таблица, которая есть API»: ruled full-width, даты — mono,
 * одна строка (ВК, DevOps-практика) — на кобальтовом wash.
 */
export function Experience() {
  return (
    <Section id="experience" title="Опыт" lead={ABOUT}>
      <Reveal>
        <div className="table-wrap scrollbar-none" tabIndex={0} role="region" aria-label="Таблица опыта работы">
          <table className="api-table">
            <thead>
              <tr>
                <th scope="col">Период</th>
                <th scope="col">Компания / роль</th>
                <th scope="col">Практика</th>
                <th scope="col">Стек</th>
              </tr>
            </thead>
            <tbody>
              {EXPERIENCE.map((item: Experience, i) => (
                <tr key={`${item.company}-${item.period}`} className={i === 1 ? "is-on" : undefined}>
                  <td className="num font-outlier whitespace-nowrap text-sm text-muted">
                    {item.period}
                  </td>
                  <td>
                    <span className="font-display text-title font-bold uppercase">
                      {item.company}
                    </span>
                    <p className="mt-1 text-md font-medium text-accent">
                      {item.role}
                    </p>
                    {item.kind && (
                      <p className="mt-0.5 text-sm text-muted">{item.kind}</p>
                    )}
                  </td>
                  <td className="max-w-[46ch] text-sm leading-relaxed text-ink-2">
                    {item.description}
                    {item.link && (
                      <a
                        href={item.link.href}
                        className="u-link mt-2 flex items-center gap-1.5 font-outlier text-sm"
                      >
                        <IconLink className="size-3.5 shrink-0" />
                        {item.link.label}
                      </a>
                    )}
                  </td>
                  <td>
                    <Stack items={item.stack} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>
    </Section>
  );
}
