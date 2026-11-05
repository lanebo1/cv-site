"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { EDUCATION } from "@/lib/content";
import { SceneBlobs } from "./blobs";

export function Education() {
  const { thesis } = EDUCATION;
  const sweepRef = useRef<HTMLDivElement>(null);
  /* подсветка ВКР включается, когда текст попадает в кадр */
  const sweepOn = useInView(sweepRef, { once: true, margin: "-30%" });

  return (
    <section
      id="education"
      className="relative scroll-mt-24 overflow-hidden"
    >
      <SceneBlobs
        blobs={[
          {
            size: 26,
            color: "#fb7185",
            opacity: 0.26,
            anim: "a",
            top: "5%",
            right: "-11rem",
          },
          {
            size: 24,
            color: "#fbbf24",
            opacity: 0.3,
            anim: "b",
            duration: 27,
            bottom: "0%",
            left: "-10rem",
          },
        ]}
      />

      <div className="relative mx-auto w-full max-w-5xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[auto_minmax(0,1fr)] md:gap-14">
          {/* большой номер сцены */}
          <div className="font-display text-flame text-[clamp(5rem,14vw,11rem)] leading-none font-bold select-none">
            04
          </div>

          <div className="flex flex-col gap-8">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl">
                Образование
              </h2>
              <div className="mt-6 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <h3 className="text-lg font-semibold tracking-tight">
                  {EDUCATION.university}
                </h3>
                <p className="font-mono text-xs text-faint">
                  {EDUCATION.years}
                </p>
              </div>
              <p className="mt-1 text-sm text-muted">
                {EDUCATION.program} · {EDUCATION.course} ·{" "}
                <span className="font-mono text-xs font-medium text-accent">
                  {EDUCATION.gpa}
                </span>
              </p>
            </div>

            {/* ВКР: маркер-подсветка */}
            <div
              ref={sweepRef}
              className="card-flame rounded-xl bg-surface p-6"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h4 className="font-mono text-xs text-accent">
                  {thesis.title}
                </h4>
                <p className="font-mono text-xs text-faint">{thesis.period}</p>
              </div>
              <p className="mt-3 max-w-xl text-lg leading-snug font-medium sm:text-xl sm:leading-snug">
                <span
                  className={`highlight-sweep rounded-sm px-1 ${
                    sweepOn ? "is-sweeping" : ""
                  }`}
                >
                  {thesis.text}
                </span>
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="card-flame rounded-xl bg-surface p-5">
                <h4 className="font-mono text-xs text-accent">Языки</h4>
                <ul className="mt-3 flex flex-col gap-2">
                  {EDUCATION.languages.map((lang) => (
                    <li
                      key={lang.name}
                      className="flex items-baseline justify-between text-sm"
                    >
                      <span>{lang.name}</span>
                      <span className="font-mono text-xs text-muted">
                        {lang.level}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="card-flame rounded-xl bg-surface p-5">
                <h4 className="font-mono text-xs text-accent">Студенческое</h4>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {EDUCATION.studentLife}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
