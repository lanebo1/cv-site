import type { ReactNode } from "react";
import { Reveal } from "./reveal";

/*
 * Сцена: полноширинная секция со своим фоном и крупным заголовком.
 * index — номер сцены (Oswald, последовательность 01→04).
 */
export function Section({
  id,
  index,
  title,
  dark = false,
  children,
}: {
  id: string;
  index?: string;
  title?: string;
  dark?: boolean;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={`relative scroll-mt-24 overflow-hidden ${
        dark ? "scene-dark" : ""
      }`}
    >
      <div className="relative mx-auto w-full max-w-5xl px-5 py-20 sm:px-8 sm:py-28">
        {(index || title) && (
          <Reveal>
            <header className="mb-12 flex items-baseline gap-4 sm:mb-16 sm:gap-6">
              {index && (
                <span className="font-display text-2xl font-bold text-flame sm:text-4xl">
                  {index}
                </span>
              )}
              {title && (
                <h2 className="font-display text-4xl font-bold tracking-tight uppercase sm:text-6xl">
                  {title}
                </h2>
              )}
            </header>
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}
