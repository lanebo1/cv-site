import { EDUCATION } from "@/lib/content";
import { Section } from "./section";
import { Reveal } from "./reveal";

export function Education() {
  const { thesis } = EDUCATION;
  return (
    <Section id="education" index="05" title="Образование">
      <div className="flex flex-col gap-6">
        <Reveal>
          <article className="card-flame rounded-lg bg-surface p-5">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="font-semibold tracking-tight">
                {EDUCATION.university}
              </h3>
              <p className="font-mono text-xs text-faint">{EDUCATION.years}</p>
            </div>
            <p className="mt-1 text-sm text-muted">
              {EDUCATION.program} · {EDUCATION.course} ·{" "}
              <span className="font-mono text-xs font-medium text-accent">
                {EDUCATION.gpa}
              </span>
            </p>

            {/* Дипломная работа */}
            <div className="mt-5 rounded-md border border-orange-200/80 bg-orange-50/60 p-4">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h4 className="font-mono text-xs text-accent">
                  {thesis.title}
                </h4>
                <p className="font-mono text-xs text-faint">
                  {thesis.period}
                </p>
              </div>
              <p className="mt-2 text-sm text-muted">
                Работа над ВКР — {thesis.status}.
              </p>
            </div>
          </article>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="card-flame rounded-lg bg-surface p-5">
              <h3 className="font-mono text-xs text-accent">Языки</h3>
              <ul className="mt-3 flex flex-col gap-2">
                {EDUCATION.languages.map((lang) => (
                  <li
                    key={lang.name}
                    className="flex items-baseline justify-between text-sm"
                  >
                    <span>{lang.name}</span>
                    <span className="font-mono text-xs text-muted">
                      {lang.level}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card-flame rounded-lg bg-surface p-5">
              <h3 className="font-mono text-xs text-accent">
                Студенческая жизнь
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {EDUCATION.studentLife}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
