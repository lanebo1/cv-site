import { SKILLS } from "@/lib/content";
import { Section } from "./section";
import { StaggerGroup, StaggerItem } from "./reveal";

export function Skills() {
  return (
    <Section id="skills" index="04" title="Навыки">
      <StaggerGroup className="flex flex-col gap-6">
        {SKILLS.map((group) => (
          <StaggerItem key={group.group}>
            <div className="group grid grid-cols-1 gap-2 sm:grid-cols-[10rem_1fr] sm:gap-4">
              <h3 className="pt-1 font-mono text-xs text-accent">
                {group.group}
              </h3>
              <ul className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded border border-line bg-surface px-2 py-1 font-mono text-xs text-muted transition-colors duration-200 hover:border-accent/50 hover:text-accent"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </Section>
  );
}
