import { CONTACTS, FINALE } from "@/lib/content";
import {
  IconDownload,
  IconGitHub,
  IconMail,
  IconPhone,
  IconTelegram,
} from "./icons";

/*
 * Финал: ночная заливка, statement «Пойдём строить?», контакты рядами,
 * resume вдавленной secondary. Футер закрывает страницу юридической строкой.
 */
const LINKS = [
  {
    href: CONTACTS.telegramUrl,
    label: "Telegram",
    value: CONTACTS.telegram,
    icon: IconTelegram,
  },
  {
    href: `mailto:${CONTACTS.email}`,
    label: "Email",
    value: CONTACTS.email,
    icon: IconMail,
  },
  {
    href: CONTACTS.githubUrl,
    label: "GitHub",
    value: CONTACTS.github,
    icon: IconGitHub,
  },
  {
    href: `tel:${CONTACTS.phone.replace(/[^+\d]/g, "")}`,
    label: "Телефон",
    value: CONTACTS.phone,
    icon: IconPhone,
  },
];

export function Footer() {
  return (
    <section id="contacts" className="night scroll-mt-24">
      <div className="container border-t-[3px] border-night-ink pt-14 pb-8 sm:pt-20">
        <h2 className="text-[clamp(3rem,8vw,7rem)] leading-[1.0]">
          {FINALE.headline}
        </h2>
        <p className="lead mt-6 max-w-[52ch] text-night-muted">
          {FINALE.subline}
        </p>

        <div className="mt-10">
          <a href={CONTACTS.resume} download className="btn-ghost">
            <IconDownload className="size-4 shrink-0" />
            Скачать резюме (PDF)
          </a>
        </div>

        <ul className="mt-12 grid gap-x-8 gap-y-2 border-t border-night-line pt-6 sm:grid-cols-2">
          {LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="u-link flex items-center gap-3 py-2 text-night-ink"
              >
                <link.icon className="size-4 shrink-0 text-night-muted" />
                <span className="text-sm text-night-muted">{link.label}</span>
                <span className="text-md">{link.value}</span>
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-16 flex flex-wrap justify-between gap-2 border-t border-night-line pt-6">
          <p className="text-sm text-night-muted">© 2026 {CONTACTS.name}</p>
        </div>
      </div>
    </section>
  );
}
