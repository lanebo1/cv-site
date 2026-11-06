"use client";

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

/* финальный кадр: тёмная сцена с оранжевым свечением */
export function Footer() {
  return (
    <section
      id="contacts"
      className="scene-dark relative scroll-mt-24 overflow-hidden"
    >
      <SceneBlobs
        blobs={[
          {
            size: 30,
            color: "rgba(249, 115, 22, 0.85)",
            opacity: 0.35,
            anim: "a",
            top: "-8rem",
            right: "-8rem",
          },
          {
            size: 26,
            color: "rgba(251, 191, 36, 0.8)",
            opacity: 0.28,
            anim: "b",
            duration: 28,
            bottom: "-8rem",
            left: "-8rem",
          },
        ]}
      />

      <div className="relative mx-auto w-full max-w-5xl px-5 py-24 sm:px-8 sm:py-32">
        <p className="font-mono text-xs text-stone-500">финальный кадр</p>
        <h2 className="text-flame mt-6 font-display text-[clamp(2.5rem,7vw,6rem)] leading-[1.02] font-bold tracking-tight text-balance">
          {FINALE.headline}
        </h2>
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-stone-300 sm:text-base">
          {FINALE.subline}
        </p>

        <div className="mt-12 flex flex-wrap items-center gap-4">
          {LINKS.map((link) => (
            <Magnetic key={link.label}>
              <a
                href={link.href}
                className="group inline-flex items-center gap-3 rounded-md border border-white/15 bg-white/[0.04] px-5 py-3 transition-colors hover:border-orange-400/60"
              >
                <link.icon className="size-4 text-stone-400 transition-colors group-hover:text-amber-400" />
                <span className="text-sm">
                  <span className="block font-mono text-[10px] text-stone-500">
                    {link.label}
                  </span>
                  <span className="block transition-colors group-hover:text-amber-300">
                    {link.value}
                  </span>
                </span>
              </a>
            </Magnetic>
          ))}
        </div>

        <div className="mt-10">
          <Magnetic>
            <a
              href={CONTACTS.resume}
              download
              className="btn-flame inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-medium"
            >
              <IconDownload className="size-4" />
              Скачать резюме (PDF)
            </a>
          </Magnetic>
        </div>

        <div className="mt-20 flex flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-6">
          <p className="font-mono text-[11px] text-stone-500">
            © 2026 {CONTACTS.name}
          </p>
          <p className="font-mono text-[11px] text-stone-500">
            next.js · tailwind · framer-motion
          </p>
        </div>
      </div>
    </section>
  );
}
