"use client";

import { useEffect, useState } from "react";
import { NAV_SECTIONS, CONTACTS } from "@/lib/content";
import { IconDownload } from "./icons";

/* Command-bar нав: стеклянная линейка с волосяной кромкой.
 * Марка с глифом поля, разделы, primary-клавиша резюме. */
export function Nav() {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const sections = NAV_SECTIONS.map((s) =>
      document.getElementById(s.id),
    ).filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-30% 0px -55% 0px" },
    );
    for (const el of sections) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <header className="site-nav">
      <div className="container flex h-14 items-center gap-6">
        <a
          href="#top"
          aria-label="Наверх, к началу страницы"
          className="flex items-center gap-2 whitespace-nowrap font-display text-md font-bold uppercase"
        >
          <span aria-hidden="true" className="font-outlier text-accent">
            ┊
          </span>
          {CONTACTS.name.split(" ")[0]}
        </a>
        <nav
          aria-label="Разделы сайта"
          className="scrollbar-none flex flex-1 items-center gap-1 overflow-x-auto"
        >
          {NAV_SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              aria-current={active === s.id ? "true" : undefined}
              className={`whitespace-nowrap border-b-2 px-2 py-1 font-display text-md uppercase transition-colors ${
                active === s.id
                  ? "border-accent text-accent"
                  : "border-transparent text-muted hover:text-ink"
              }`}
            >
              {s.label}
            </a>
          ))}
        </nav>
        <a
          href={CONTACTS.resume}
          download
          className="btn-key h-9 min-h-9 px-3 text-sm"
        >
          <IconDownload className="size-3.5 shrink-0" />
          PDF
        </a>
      </div>
    </header>
  );
}
