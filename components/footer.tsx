import { CONTACTS, FINALE } from "@/lib/content";
import { Section } from "./section";
import { Magnetic } from "./magnetic";
import { CopyChip } from "./copy-chip";
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
 * Финал: стеклянная tint-полоса paper-2 (вторая допустимая), statement
 * капсом, primary-клавиша резюме, контакты — ruled rows, почта — срез-чип
 * с рабочим copy-ключом.
 */
export function Footer() {
  return (
    <Section id="contacts" band="tint">
      <div className="grid items-end gap-x-14 gap-y-10 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
        <div>
          <h2 className="text-[clamp(2.75rem,7vw,6.5rem)] leading-[1.02]">
            {FINALE.headline}
          </h2>
          <p className="lead mt-6 max-w-[52ch] text-ink-2">
            {FINALE.subline}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Magnetic>
              <a
                href={CONTACTS.resume}
                download
                className="btn-key"
              >
                <IconDownload className="size-4 shrink-0" />
                Скачать резюме (PDF)
              </a>
            </Magnetic>
          </div>
          <div className="mt-5 max-w-[52ch]">
            <CopyChip value={CONTACTS.email} />
          </div>
        </div>

        <ul className="border-t border-rule">
          {LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="u-link flex items-baseline gap-3 border-b border-rule py-3"
              >
                <link.icon className="size-4 shrink-0 self-center text-muted" />
                <span className="text-sm text-muted">{link.label}</span>
                <span className="ml-auto num font-outlier text-sm">
                  {link.value}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-14 border-t border-rule pt-6 text-sm text-muted">
        © 2026 {CONTACTS.name}
      </p>
    </Section>
  );
}
