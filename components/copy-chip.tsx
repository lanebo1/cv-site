"use client";

import { useRef, useState } from "react";

/* Срез-чип с командой/значением и рабочим copy-ключом (как curl-чип темплейта).
 * Значение — машинное (mono); подпись ключа — Grotesk, никогда mono. */
export function CopyChip({
  value,
  copyLabel = "Копировать",
  doneLabel = "Скопировано",
}: {
  value: string;
  copyLabel?: string;
  doneLabel?: string;
}) {
  const chipRef = useRef<HTMLSpanElement>(null);
  const [done, setDone] = useState(false);
  const [timer, setTimer] = useState<ReturnType<typeof setTimeout> | null>(null);

  async function onCopy() {
    let ok = false;
    try {
      await navigator.clipboard.writeText(value);
      ok = true;
    } catch {
      /* fallback: выделить, чтобы скопировать вручную */
      const cmd = chipRef.current?.querySelector("code");
      if (cmd) {
        const r = document.createRange();
        r.selectNodeContents(cmd);
        const s = getSelection();
        s?.removeAllRanges();
        s?.addRange(r);
      }
    }
    setDone(true);
    if (timer) clearTimeout(timer);
    setTimer(
      setTimeout(() => {
        setDone(false);
        if (ok) getSelection()?.removeAllRanges();
      }, 1800),
    );
  }

  return (
    <span ref={chipRef} className={`curl ${done ? "is-done" : ""}`}>
      <code className="curl__cmd">
        <span className="curl__p" aria-hidden="true">
          $
        </span>
        {value}
      </code>
      <button type="button" className="curl__copy" onClick={onCopy}>
        <span aria-live="polite">{done ? doneLabel : copyLabel}</span>
      </button>
    </span>
  );
}
