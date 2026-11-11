import { CONTACTS, FINALE } from "@/lib/content";
import { SceneBlobs } from "./blobs";
import { Magnetic } from "./magnetic";
import {
  IconDownload,
  IconGitHub,
  IconMail,
  IconPhone,
  IconTelegram,
} from "./icons";

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

/*
 * Финал: tint-полоса paper-2 (вторая из двух допустимых), statement капсом,
 * контакты — клавиши с магнитом, resume — кобальтовая primary-клавиша.
 */
export function Footer() {
  return (
    <section id="contacts" className="relative scroll-mt-24 overflow-hidden bg-paper-2">
      <SceneBlobs
        blobs={[
          {
            size: 30,
            color: "oklch(76% 0.13 254 / 0.45)",
            opacity: 0.4,
            anim: "b",
            top: "-8rem",
            right: "-8rem",
          },
          {
            size: 26,
            color: "oklch(60% 0.13 257 / 0.35)",
            opacity: 0.3,
            anim: "a",
            duration: 30,
            bottom: "-8rem",
            left: "-8rem",
          },
        ]}
      />

      <div className="container relative border-t border-rule-2 pt-14 pb-8 sm:pt-20">
        <h2 className="text-[clamp(2.75rem,7vw,6.5rem)] leading-[1.02]">
          {FINALE.headline}
        </h2>
        <p className="lead mt-6 max-w-[52ch] text-ink-2">{FINALE.subline}</p>

        <div className="mt-10">
          <Magnetic>
            <a href={CONTACTS.resume} download className="btn-key btn-key--primary">
              <IconDownload className="size-4 shrink-0" />
              Скачать резюме (PDF)
            </a>
          </Magnetic>
        </div>

        <ul className="mt-12 grid gap-x-8 gap-y-1 border-t border-rule pt-6 sm:grid-cols-2">
          {LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="u-link flex items-center gap-3 py-2"
              >
                <link.icon className="size-4 shrink-0 text-muted" />
                <span className="text-sm text-muted">{link.label}</span>
                <span className="text-md">{link.value}</span>
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-16 flex flex-wrap justify-between gap-2 border-t border-rule pt-6">
          <p className="text-sm text-muted">© 2026 {CONTACTS.name}</p>
        </div>
      </div>
    </section>
  );
}
