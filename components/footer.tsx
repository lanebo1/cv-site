import { CONTACTS } from "@/lib/content";
import { Section } from "./section";
import {
  IconDownload,
  IconGitHub,
  IconMail,
  IconPhone,
  IconTelegram,
} from "./icons";
import { Reveal } from "./reveal";

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
    <Section id="contacts" index="06" title="Контакты">
      <Reveal>
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2">
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="group flex items-center gap-4 bg-surface p-5 transition-colors hover:bg-accent-dim"
            >
              <link.icon className="size-5 shrink-0 text-faint transition-colors group-hover:text-accent" />
              <span className="min-w-0">
                <span className="block font-mono text-[11px] text-faint">
                  {link.label}
                </span>
                <span className="block truncate text-sm transition-colors group-hover:text-accent">
                  {link.value}
                </span>
              </span>
            </a>
          ))}
        </div>
      </Reveal>
      <Reveal delay={0.05}>
        <div className="mt-8">
          <a
            href={CONTACTS.resume}
            download
            className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-85"
          >
            <IconDownload className="size-4" />
            Скачать резюме (PDF)
          </a>
        </div>
      </Reveal>
    </Section>
  );
}
