import type { ReactNode } from "react";

/*
 * Сцена Formwork: 3px чернильная линейка сверху, контейнер, заголовок слева.
 * night — ночная заливка (ink band).
 */
export function Section({
  id,
  title,
  lead,
  caption,
  night = false,
  children,
}: {
  id: string;
  title?: string;
  lead?: ReactNode;
  caption?: string;
  night?: boolean;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={`relative scroll-mt-24 ${night ? "night" : ""}`}
    >
      <div
        className={`container border-t-[3px] pt-12 pb-16 sm:pt-16 sm:pb-24 ${
          night ? "border-night-ink" : "border-ink"
        }`}
      >
        {(title || caption) && (
          <header className="mb-10 grid items-baseline gap-x-8 gap-y-4 sm:mb-16 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
            {title && <h2>{title}</h2>}
            {caption && <p className="text-sm text-muted">{caption}</p>}
            {lead && <p className="max-w-[52ch] text-ink-2 md:justify-self-end">{lead}</p>}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
