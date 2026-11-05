import { SKILLS } from "@/lib/content";
import { Section } from "./section";
import { StaggerGroup, StaggerItem } from "./reveal";

/* пастельный фон + насыщенный текст + цветная тень при hover */
type ChipStyle = { chip: string; label: string; shadow: string };

const GROUP_STYLES: Record<string, ChipStyle> = {
  "DevOps / Инфра": {
    chip: "border-teal-200/80 bg-teal-50 text-teal-700",
    label: "text-teal-600",
    shadow: "0 4px 12px -2px rgba(20, 184, 166, 0.35)",
  },
  "CI/CD": {
    chip: "border-orange-200/80 bg-orange-50 text-orange-700",
    label: "text-orange-600",
    shadow: "0 4px 12px -2px rgba(249, 115, 22, 0.35)",
  },
  Мониторинг: {
    chip: "border-amber-200/80 bg-amber-50 text-amber-700",
    label: "text-amber-600",
    shadow: "0 4px 12px -2px rgba(245, 158, 11, 0.35)",
  },
  Данные: {
    chip: "border-violet-200/80 bg-violet-50 text-violet-700",
    label: "text-violet-600",
    shadow: "0 4px 12px -2px rgba(139, 92, 246, 0.35)",
  },
  Сети: {
    chip: "border-sky-200/80 bg-sky-50 text-sky-700",
    label: "text-sky-600",
    shadow: "0 4px 12px -2px rgba(14, 165, 233, 0.35)",
  },
  Backend: {
    chip: "border-rose-200/80 bg-rose-50 text-rose-700",
    label: "text-rose-600",
    shadow: "0 4px 12px -2px rgba(244, 63, 94, 0.35)",
  },
  Изучаю: {
    chip: "border-lime-200/80 bg-lime-50 text-lime-700",
    label: "text-lime-600",
    shadow: "0 4px 12px -2px rgba(132, 204, 22, 0.35)",
  },
  Софт: {
    chip: "border-fuchsia-200/80 bg-fuchsia-50 text-fuchsia-700",
    label: "text-fuchsia-600",
    shadow: "0 4px 12px -2px rgba(217, 70, 239, 0.35)",
  },
};

export function Skills() {
  return (
    <Section id="skills" index="04" title="Навыки">
      <StaggerGroup className="flex flex-col gap-6">
        {SKILLS.map((group) => {
          const style =
            GROUP_STYLES[group.group] ?? GROUP_STYLES["DevOps / Инфра"];
          return (
            <StaggerItem key={group.group}>
              <div className="group grid grid-cols-1 gap-2 sm:grid-cols-[10rem_1fr] sm:gap-4">
                <h3 className={`pt-1 font-mono text-xs ${style.label}`}>
                  {group.group}
                </h3>
                <ul className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      style={
                        {
                          "--chip-shadow": style.shadow,
                        } as React.CSSProperties
                      }
                      className={`chip rounded border px-2 py-1 font-mono text-xs ${style.chip}`}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </StaggerItem>
          );
        })}
      </StaggerGroup>
    </Section>
  );
}
