import { EXPERIENCE } from "@/lib/content";
import { Section } from "./section";
import { IconLink } from "./icons";
import { StaggerGroup, StaggerItem } from "./reveal";

export function Experience() {
  return (
    <Section id="experience" index="01" title="Опыт">
      <div className="relative">
        {/* вертикальная линия таймлайна: градиент оранж → янтарь */}
        <span
          aria-hidden="true"
          className="absolute top-2 bottom-2 left-[4px] w-0.5 rounded-full bg-gradient-to-b from-orange-400 via-amber-300 to-orange-200"
        />
        <StaggerGroup className="flex flex-col gap-10">
          {EXPERIENCE.map((item) => (
            <StaggerItem key={`${item.company}-${item.period}`}>
              <article className="relative pl-8">
                <span
                  aria-hidden="true"
                  className="timeline-dot absolute top-1.5 left-0 size-[11px] rounded-full bg-orange-500"
                >
                  <span className="absolute inset-[2.5px] rounded-full bg-amber-300" />
                </span>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="font-semibold tracking-tight">
                    {item.company}
                  </h3>
                  <span className="text-sm text-muted">{item.role}</span>
                </div>
                <p className="mt-1 font-mono text-xs text-faint">
                  {item.period}
                  {item.kind ? ` · ${item.kind}` : ""}
                </p>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
                  {item.description}
                </p>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {item.stack.map((tech) => (
                    <li
                      key={tech}
                      className="chip rounded border border-orange-200/80 bg-orange-50 px-2 py-0.5 font-mono text-[11px] text-orange-700"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
                {item.link && (
                  <a
                    href={item.link.href}
                    className="mt-3 inline-flex items-center gap-1.5 font-mono text-xs text-faint transition-colors hover:text-accent"
                  >
                    <IconLink className="size-3.5" />
                    {item.link.label}
                  </a>
                )}
              </article>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </Section>
  );
}
