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
      {/* узкие экраны: пункты переносятся во вторую строку (ничего не режется),
          от lg — одна строка h-14 */}
      <div className="container flex min-h-14 flex-wrap items-center gap-x-5 gap-y-1 py-1.5 lg:h-14 lg:flex-nowrap lg:gap-6 lg:py-0">
        <a
          href="#top"
          aria-label="Наверх, к началу страницы"
          className="order-1 flex items-center gap-2 whitespace-nowrap font-display text-md font-bold uppercase"
        >
          <span aria-hidden="true" className="font-outlier text-accent">
            ┊
          </span>
          {CONTACTS.name.split(" ")[0]}
        </a>
        <a
          href={CONTACTS.resume}
          download
          className="btn-key order-2 ml-auto h-9 min-h-9 px-3 text-sm lg:order-3 lg:ml-0"
        >
          <IconDownload className="size-3.5 shrink-0" />
          PDF
        </a>
        <nav
          aria-label="Разделы сайта"
          className="order-3 flex w-full min-w-0 basis-full flex-wrap items-center gap-x-1 gap-y-0.5 pt-1 lg:order-2 lg:w-auto lg:basis-auto lg:flex-1 lg:flex-nowrap lg:pt-0"
        >
          {NAV_SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              aria-current={active === s.id ? "true" : undefined}
              className={`whitespace-nowrap border-b-2 px-1.5 py-1 font-display text-md uppercase transition-colors ${
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
