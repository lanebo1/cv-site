"use client";

import { useEffect, useState } from "react";
import { NAV_SECTIONS, CONTACTS } from "@/lib/content";

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
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 w-full max-w-4xl items-center gap-4 px-5 sm:px-8">
        <a
          href="#top"
          className="font-mono text-xs text-muted transition-colors hover:text-foreground"
        >
          {CONTACTS.name.split(" ")[0]}_
        </a>
        <nav
          aria-label="Разделы сайта"
          className="scrollbar-none -mx-1 flex flex-1 items-center gap-1 overflow-x-auto px-1"
        >
          {NAV_SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              aria-current={active === s.id ? "true" : undefined}
              className={`shrink-0 px-2 py-1 font-mono text-xs transition-colors ${
                active === s.id
                  ? "text-accent"
                  : "text-faint hover:text-foreground"
              }`}
            >
              <span className="text-accent/60">#</span>
              {s.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
