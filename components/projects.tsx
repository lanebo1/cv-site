import { PROJECTS } from "@/lib/content";
import { Section } from "./section";
import { IconGitHub } from "./icons";
import { StaggerGroup, StaggerItem } from "./reveal";

export function Projects() {
  return (
    <Section id="projects" index="02" title="Проекты">
      <StaggerGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {PROJECTS.map((project) => (
          <StaggerItem key={project.name}>
            <article className="card-flame group flex h-full flex-col rounded-lg bg-surface p-5">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-semibold tracking-tight">{project.name}</h3>
                <a
                  href={project.link.href}
                  aria-label={`${project.name} на GitHub`}
                  className="text-faint transition-colors group-hover:text-accent"
                >
                  <IconGitHub className="size-4" />
                </a>
              </div>
              <p className="mt-1 font-mono text-[11px] text-faint">
                {project.tag}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {project.description}
              </p>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {project.stack.map((tech) => (
                  <li
                    key={tech}
                    className="chip rounded border border-orange-200/80 bg-orange-50 px-2 py-0.5 font-mono text-[11px] text-orange-700"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
              <a
                href={project.link.href}
                className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs text-accent transition-opacity hover:opacity-80"
              >
                github.com/…/{project.link.label}
              </a>
            </article>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </Section>
  );
}
