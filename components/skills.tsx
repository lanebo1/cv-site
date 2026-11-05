import { SKILLS } from "@/lib/content";
import { Section } from "./section";

/* цвет чипа = цвет группы (сохраняется из v2) */
const GROUP_STYLES: Record<string, string> = {
  "DevOps / Инфра": "border-teal-200/80 bg-teal-50 text-teal-700",
  "CI/CD": "border-orange-200/80 bg-orange-50 text-orange-700",
  Мониторинг: "border-amber-200/80 bg-amber-50 text-amber-700",
  Данные: "border-violet-200/80 bg-violet-50 text-violet-700",
  Сети: "border-sky-200/80 bg-sky-50 text-sky-700",
  Backend: "border-rose-200/80 bg-rose-50 text-rose-700",
  Изучаю: "border-lime-200/80 bg-lime-50 text-lime-700",
  Софт: "border-fuchsia-200/80 bg-fuchsia-50 text-fuchsia-700",
};

/* два ряда, смысловой порядок сохранён */
const ROW_GROUPS = [
  ["DevOps / Инфра", "CI/CD", "Мониторинг", "Данные"],
  ["Сети", "Backend", "Изучаю", "Софт"],
];

function MarqueeRow({
  groups,
  reverse,
}: {
  groups: string[];
  reverse?: boolean;
}) {
  const items = SKILLS.filter((g) => groups.includes(g.group));

  /* содержимое ряда; дублируется для бесшовного цикла */
  const content = items.map((group) => (
    <div key={group.group} className="flex shrink-0 items-center gap-3">
      <span className="font-mono text-xs whitespace-nowrap text-faint">
        {group.group}
      </span>
      {group.items.map((item) => (
        <span
          key={item}
          title={group.group}
          className={`rounded-full border px-3 py-1.5 font-mono text-xs whitespace-nowrap ${
            GROUP_STYLES[group.group] ?? GROUP_STYLES["CI/CD"]
          }`}
        >
          {item}
        </span>
      ))}
    </div>
  ));

  return (
    <div className={`marquee ${reverse ? "marquee-reverse" : ""}`}>
      <div className="marquee-track" style={{ "--marquee-speed": "70s" } as React.CSSProperties}>
        <div className="flex shrink-0 items-center gap-4 pr-4">{content}</div>
        <div
          className="marquee-copy flex shrink-0 items-center gap-4 pr-4"
          aria-hidden="true"
        >
          {content}
        </div>
      </div>
    </div>
  );
}

export function Skills() {
  return (
    <Section id="skills" title="Навыки">
      <p className="mb-10 font-mono text-xs text-faint">
        {SKILLS.reduce((n, g) => n + g.items.length, 0)} технологий в две
        стороны · наведите — притормозят
      </p>
      <div className="flex flex-col gap-4">
        {ROW_GROUPS.map((groups, i) => (
          <MarqueeRow key={i} groups={groups} reverse={i === 1} />
        ))}
      </div>
    </Section>
  );
}
