import { ABOUT, EXPERIENCE } from "@/lib/content";
import { Section } from "./section";
import { IconLink } from "./icons";

/*
 * Опыт: две прод-инфраструктуры, отлитые в масштабе display.
 * Работодатель капсом слева, факты и стек справа, ряды на волосяных линейках.
 */
export function Experience() {
  return (
    <Section id="experience" title="Опыт" lead={ABOUT}>
      <div className="flex flex-col">
        {EXPERIENCE.map((item) => (
          <article
            key={`${item.company}-${item.period}`}
            className="grid gap-x-8 gap-y-6 border-t border-rule py-10 first:border-t-0 first:pt-0 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:py-14"
          >
            <div>
              <h3 className="text-display-s">{item.company}</h3>
              <p className="mt-3 font-medium">{item.role}</p>
              <p className="mt-1 flex flex-wrap gap-x-3 text-sm text-muted">
                <span className="num">{item.period}</span>
                {item.kind ? <span>{item.kind}</span> : null}
              </p>
            </div>
            <div>
              <p className="max-w-[65ch] text-ink-2">{item.description}</p>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {item.stack.map((tech) => (
                  <li key={tech} className="tag">
                    {tech}
                  </li>
                ))}
              </ul>
              {item.link && (
                <a
                  href={item.link.href}
                  className="u-link mt-4 inline-flex items-center gap-1.5 text-sm"
                >
                  <IconLink className="size-3.5 shrink-0" />
                  {item.link.label}
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
