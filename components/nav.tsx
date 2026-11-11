"use client";

import { useEffect, useState } from "react";
import { NAV_SECTIONS, CONTACTS } from "@/lib/content";

/* Бумажная линейка с волосяной кромкой: марка слева, разделы, активный — кобальт. */
export function Nav() {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const sections = NAV_SECTIONS.map((s) =>
      document.getElementById(s.id),
    ).filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { rootMargin: "-30% 0px -55% 0px" },
    );
    for (const el of sections) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-rule bg-paper/90 backdrop-blur-md">
      <div className="container flex h-14 items-center gap-6">
        <a
          href="#top"
          aria-label="Наверх, к началу страницы"
          className="font-display text-md uppercase whitespace-nowrap"
        >
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
              className={`font-display text-md uppercase whitespace-nowrap border-b-2 px-2 py-1 transition-colors ${
                active === s.id
                  ? "border-accent text-accent"
                  : "border-transparent text-muted hover:text-ink"
              }`}
            >
              {s.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
