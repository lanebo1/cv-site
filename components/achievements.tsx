import { AWARDS, STATS } from "@/lib/content";
import { Section } from "./section";

/*
 * Достижения: ночная заливка. Фигуры STATS отлиты на волосяных линейках,
 * награды — ряды под ними. Всё статично: бетон не движется.
 */
export function Achievements() {
  return (
    <Section id="achievements" title="Достижения" night>
      <div className="grid grid-cols-2 gap-y-10 sm:grid-cols-4">
        {STATS.map((stat, i) => (
          <div
            key={stat.label}
            className={
              i > 0
                ? "border-l border-night-line px-4 sm:px-8"
                : "pr-4 sm:pr-8"
            }
          >
            <span className="num font-display text-[2.5rem] leading-none font-bold sm:text-[3.5rem]">
              {stat.value}
              {stat.suffix}
            </span>
            <p className="mt-3 text-sm text-night-muted">{stat.label}</p>
          </div>
        ))}
      </div>

      <ul className="mt-14 border-t border-night-line">
        {AWARDS.map((award) => (
          <li
            key={award}
            className="border-b border-night-line py-4 text-md text-night-ink"
          >
            {award}
          </li>
        ))}
      </ul>
    </Section>
  );
}
