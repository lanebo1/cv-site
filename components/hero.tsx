import { CONTACTS, HERO } from "@/lib/content";
import { IconDownload, IconTelegram } from "./icons";

/*
 * Poster: тип — единственный визуал. Имя в бетоне, прижато вниз и влево,
 * мета-строка сверху. Бетон не движется: без entrances, блобов и каретки.
 */
export function Hero() {
  return (
    <div
      id="top"
      className="flex min-h-[92svh] flex-col pt-14"
    >
      <div className="container flex flex-1 flex-col">
        <p className="mt-6 flex flex-wrap items-baseline gap-x-6 gap-y-2 text-sm text-muted">
          <span>{CONTACTS.city}</span>
          <a href={CONTACTS.telegramUrl} className="u-link">
            {CONTACTS.telegram}
          </a>
          <a href={CONTACTS.githubUrl} className="u-link">
            {CONTACTS.github}
          </a>
        </p>

        <div className="mt-auto pb-12 sm:pb-16">
          <h1 className="text-[clamp(4rem,12vw,9.5rem)] leading-[1.0] text-balance">
            Кирилл
            <br />
            Ефимович
          </h1>

          <p className="font-display mt-8 text-xl uppercase sm:text-3xl">
            {HERO.roles.join(" / ")}
          </p>

          <p className="lead mt-6 max-w-[52ch] font-medium text-ink-2">
            {HERO.tagline}
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a href={CONTACTS.resume} download className="btn-primary">
              <IconDownload className="size-4 shrink-0" />
              Скачать PDF-резюме
            </a>
            <a href={CONTACTS.telegramUrl} className="btn-ghost">
              <IconTelegram className="size-4 shrink-0" />
              Telegram
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
