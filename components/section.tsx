import type { ReactNode } from "react";

/*
 * Секция Cobalt: одна стеклянная панель над полем (срезанные углы,
 * hairline, blur), заголовок внутри панели. band — смена материала:
 * graphite (единственная тёмная полоса) или tint (paper-2).
 */
export function Section({
  id,
  title,
  lead,
  caption,
  band,
  dark,
  children,
  className = "",
}: {
  id: string;
  title?: string;
  lead?: ReactNode;
  caption?: string;
  band?: "graphite" | "tint";
  dark?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`scroll-mt-24 ${className}`}>
      <div className="container">
        <div
          className={`panel ${band === "graphite" ? "panel--graphite" : band === "tint" ? "panel--tint" : ""}`}
          {...(dark ? { "data-field-dark": "" } : {})}
        >
          {(title || caption || lead) && (
            <header className="mb-10 grid items-baseline gap-x-8 gap-y-4 sm:mb-14 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
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
      </div>
    </section>
  );
}
