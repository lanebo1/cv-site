import { SKILLS } from "@/lib/content";
import { Section } from "./section";

/*
 * Навыки: восемь групп как dl-сетка на волосяных линейках.
 * Бегущая строка убрана: бетон не движется, состав групп сохранён 1:1.
 */
export function Skills() {
  return (
    <Section
      id="skills"
      title="Навыки"
      caption={`${SKILLS.reduce((n, g) => n + g.items.length, 0)} технологии в восьми группах`}
    >
      <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {SKILLS.map((group) => (
          <div key={group.group} className="border-t border-rule pt-4">
            <dt className="font-medium">{group.group}</dt>
            <dd className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-sm text-ink-2">
              {group.items.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
