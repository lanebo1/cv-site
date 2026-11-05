import type { ReactNode } from "react";
import { Reveal } from "./reveal";

export function Section({
  id,
  index,
  title,
  children,
}: {
  id: string;
  index: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-24 border-t border-line py-16 sm:py-24"
    >
      <div className="mx-auto w-full max-w-4xl px-5 sm:px-8">
        <Reveal>
          <div className="mb-10 flex items-baseline gap-4 sm:mb-14">
            <span className="font-mono text-xs text-accent">{index}</span>
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
              {title}
            </h2>
            <span className="hidden h-px flex-1 bg-line sm:block" />
          </div>
        </Reveal>
        {children}
      </div>
    </section>
  );
}
