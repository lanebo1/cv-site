"use client";

import { useEffect, useRef } from "react";
import { PROJECTS, type Project } from "@/lib/content";
import { Section } from "./section";
import { Reveal } from "./reveal";
import { IconGitHub } from "./icons";

/*
 * ПРОЕКТЫ = «mapping»: панель input (что сделал, чем) → панель output
 * (что получили, где смотреть). Matched-строки соединены hairline-elbow —
 * соединители рисуются один раз, при появлении панели.
 */

type KeyedPair = { k: string; input: React.ReactNode; output: React.ReactNode };

function Wire({ pairs }: { pairs: KeyedPair[] }) {
  const wiresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wires = wiresRef.current;
    if (!wires) return;
    const fig = wires.closest<HTMLElement>(".map");
    if (!fig) return;
    const panes = fig.querySelector(".map__panes");
    const [left, right] = Array.from(
      fig.querySelectorAll<HTMLElement>(".map__pane"),
    );
    if (!panes || !left || !right) return;
    let drawn = false;

    const draw = () => {
      const b = panes.getBoundingClientRect();
      /* на узких экранах панели в столбик — локти не рисуем;
         чистим всегда, чтобы после сужения не оставались старые локти */
      wires.replaceChildren();
      if (!b.width || right.getBoundingClientRect().left <= left.getBoundingClientRect().right) {
        fig.classList.remove("is-wired");
        drawn = false;
        return;
      }
      pairs.forEach((pair, n) => {
        const a = left.querySelector(`[data-k="${pair.k}"]`);
        const z = right.querySelector(`[data-k="${pair.k}"]`);
        if (!a || !z) return;
        const ra = a.getBoundingClientRect();
        const rz = z.getBoundingClientRect();
        const x1 = Math.round(ra.right - b.left + 12);
        const y1 = Math.round(ra.top + ra.height / 2 - b.top);
        const x2 = Math.round(rz.left - b.left - 12);
        const y2 = Math.round(rz.top + rz.height / 2 - b.top);
        const mid = Math.round((x1 + x2) / 2);
        const dy = y2 - y1;
        const r = Math.min(12, Math.abs(dy) / 2 || 6);
        const g = document.createElement("i");
        g.className = "wire-c";
        g.style.setProperty("--n", String(n));
        g.style.setProperty("--r", r + "px");
        const seg = (
          cls: string,
          x: number,
          y: number,
          w: number,
          h: number,
        ) => {
          const e = document.createElement("i");
          e.className = cls;
          Object.assign(e.style, {
            left: x + "px",
            top: y + "px",
            width: w + "px",
            height: h + "px",
          });
          g.append(e);
        };
        seg("wire-c__node", x1 - 2, y1 - 2, 5, 5);
        if (Math.abs(dy) < 2) {
          seg("wire-c__h", x1, y1, x2 - x1, 1);
        } else {
          const down = dy > 0;
          const top1 = down ? y1 : y1 - Math.abs(dy) / 2;
          const top2 = down ? y1 + dy / 2 : y2;
          seg("wire-c__h", x1, y1, mid - r - x1, 1);
          seg(
            down ? "wire-c__e wire-c__e--tr" : "wire-c__e wire-c__e--br",
            mid - r,
            top1,
            r,
            Math.abs(dy) / 2,
          );
          seg(
            down ? "wire-c__e wire-c__e--bl" : "wire-c__e wire-c__e--tl",
            mid - 1,
            top2,
            r + 1,
            Math.abs(dy) / 2 + 1,
          );
          seg("wire-c__h", mid + r, y2, x2 - mid - r, 1);
        }
        seg("wire-c__node", x2 - 2, y2 - 2, 5, 5);
        wires.append(g);
      });
      if (!drawn) {
        drawn = true;
        requestAnimationFrame(() =>
          requestAnimationFrame(() => fig.classList.add("is-wired")),
        );
      }
    };

    let rz = 0;
    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(rz);
      rz = requestAnimationFrame(draw);
    });
    ro.observe(panes);
    if (document.fonts) document.fonts.ready.then(draw);
    draw();
    return () => {
      cancelAnimationFrame(rz);
      ro.disconnect();
    };
  }, [pairs]);

  return <div ref={wiresRef} className="pointer-events-none absolute inset-0" aria-hidden="true" />;
}

function MapBlock({ project }: { project: Project }) {
  const figRef = useRef<HTMLDivElement>(null);
  const pairs: KeyedPair[] = [
    {
      k: "work",
      input: (
        <>
          <span className="map__file">что сделал</span>
          <p className="mt-1.5 text-ink-2">{project.description}</p>
        </>
      ),
      output: (
        <>
          <span className="map__file">что получили</span>
          <p className="mt-1.5 font-medium">{project.result}</p>
        </>
      ),
    },
    {
      k: "stack",
      input: (
        <>
          <span className="map__file">чем</span>
          <ul className="mt-1.5 flex flex-wrap gap-1.5">
            {project.stack.map((tech) => (
              <li key={tech} className="chip">
                {tech}
              </li>
            ))}
          </ul>
        </>
      ),
      output: (
        <>
          <span className="map__file">где смотреть</span>
          <a
            href={project.link.href}
            className="u-link mt-1.5 inline-flex items-center gap-1.5 font-outlier text-sm"
          >
            <IconGitHub className="size-4 shrink-0" />
            github.com/…/{project.link.label}
          </a>
        </>
      ),
    },
  ];

  return (
    <article className="map" ref={figRef}>
      <header className="mb-5 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <h3 className="text-3xl">{project.name}</h3>
        <p className="num text-sm text-muted">
          {project.tag} · {project.period}
        </p>
      </header>
      <div className="map__panes">
        <div className="map__pane inner p-4 sm:p-5">
          <div className="map__row" data-k="work">
            {pairs[0].input}
          </div>
          <div className="map__row" data-k="stack">
            {pairs[1].input}
          </div>
          <p className="map__row text-muted">
            <span className="map__file">роль</span>
            <span className="mt-1.5 block text-ink-2">{project.role}</span>
          </p>
        </div>
        <div className="map__pane inner p-4 sm:p-5">
          <div className="map__row" data-k="work">
            {pairs[0].output}
          </div>
          <div className="map__row" data-k="stack">
            {pairs[1].output}
          </div>
        </div>
        <Wire pairs={pairs} />
      </div>
    </article>
  );
}

export function Projects() {
  return (
    <Section
      id="projects"
      title="Проекты"
      caption="input → output: что сделал — что получили"
    >
      <div className="flex flex-col">
        {PROJECTS.map((project) => (
          <Reveal key={project.name}>
            <MapBlock project={project} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
