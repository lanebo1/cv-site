import { PROJECTS, type Project } from "@/lib/content";
import { Section } from "./section";
import { Reveal } from "./reveal";
import { IconGitHub } from "./icons";

/*
 * Проекты: индекс из четырёх кейсов на волосяных линейках, имя капсом,
 * итог выделен, репозиторий — машинное значение на mono.
 */
function CaseRow({ project }: { project: Project }) {
  return (
    <article className="grid gap-x-8 gap-y-5 border-t border-rule py-10 first:border-t-0 first:pt-0 md:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] md:py-12">
      <div>
        <h3 className="text-3xl uppercase">{project.name}</h3>
        <p className="mt-2 text-sm text-muted">{project.tag}</p>
        <p className="num mt-1 text-sm text-muted">{project.period}</p>
      </div>
      <div>
        <p className="text-sm font-medium">{project.role}</p>
        <p className="mt-3 max-w-[65ch] text-ink-2">{project.description}</p>
        <p className="mt-5 text-md font-medium">{project.result}</p>
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <li key={tech} className="chip">
              {tech}
            </li>
          ))}
        </ul>
        <a
          href={project.link.href}
          aria-label={`${project.name} на GitHub`}
          className="u-link mt-5 inline-flex items-center gap-1.5 font-outlier text-sm"
        >
          <IconGitHub className="size-4 shrink-0" />
          github.com/…/{project.link.label}
        </a>
      </div>
    </article>
  );
}

export function Projects() {
  return (
    <Section id="projects" title="Проекты">
      <div className="flex flex-col">
        {PROJECTS.map((project) => (
          <Reveal key={project.name}>
            <CaseRow project={project} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
