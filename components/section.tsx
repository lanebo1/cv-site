import type { ReactNode } from "react";

/*
 * Секция Cobalt: волосяная линейка сверху, контейнер, заголовок слева.
 * band — смена бумаги: graphite (достижения) или tint (контакты).
 */
export function Section({
  id,
  title,
  lead,
  caption,
  band,
  children,
  className = "",
}: {
  id: string;
  title?: string;
  lead?: ReactNode;
  caption?: string;
  band?: "graphite" | "tint";
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`relative scroll-mt-24 ${
        band === "graphite" ? "graphite" : band === "tint" ? "bg-paper-2" : ""
      } ${className}`}
    >
      <div className="container border-t border-rule-2 pt-12 pb-16 sm:pt-16 sm:pb-24">
        {(title || caption) && (
          <header className="mb-10 grid items-baseline gap-x-8 gap-y-4 sm:mb-16 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
            {title && <h2>{title}</h2>}
            {caption && <p className="text-sm text-muted">{caption}</p>}
            {lead && (
              <p className="max-w-[52ch] text-ink-2 md:justify-self-end">
                {lead}
              </p>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
