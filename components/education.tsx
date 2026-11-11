"use client";

import { EDUCATION } from "@/lib/content";
import { Section } from "./section";
import { Reveal } from "./reveal";

/*
 * Образование: split. Слева вуз, языки на линейках, студенческое;
 * справа панель ВКР со срезанными углами. GPA — машинное значение на mono.
 */
export function Education() {
  const { thesis } = EDUCATION;

  return (
    <Section id="education" title="Образование">
      <div className="grid gap-12 md:grid-cols-[minmax(0,6fr)_minmax(0,6fr)] md:gap-14">
        <div>
          <h3 className="text-2xl sm:text-3xl">{EDUCATION.university}</h3>
          <p className="num mt-2 text-sm text-muted">{EDUCATION.years}</p>
          <p className="mt-1 text-md text-ink-2">
            {EDUCATION.program}, {EDUCATION.course},{" "}
            <span className="num font-outlier text-accent">
              {EDUCATION.gpa}
            </span>
          </p>
          <dl className="mt-10 border-t border-rule">
            {EDUCATION.languages.map((lang) => (
              <div
                key={lang.name}
                className="flex items-baseline justify-between border-b border-rule py-3"
              >
                <dt>{lang.name}</dt>
                <dd className="num text-sm text-muted">{lang.level}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 max-w-[52ch] text-sm text-ink-2">
            {EDUCATION.studentLife}
          </p>
        </div>

        <Reveal>
          <div className="cut self-start p-6 sm:p-10">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <p className="text-sm font-medium">{thesis.title}</p>
              <p className="num text-sm text-muted">{thesis.period}</p>
            </div>
            <p className="mt-4 text-xl leading-snug font-medium sm:text-2xl">
              {thesis.text}
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
