"use client";

import { useEffect, useState } from "react";
import { IconMoon, IconSun } from "./icons";

export function ThemeToggle({ className }: { className?: string }) {
  const [light, setLight] = useState(false);

  useEffect(() => {
    setLight(document.documentElement.classList.contains("light"));
  }, []);

  function toggle() {
    const next = !light;
    setLight(next);
    document.documentElement.classList.toggle("light", next);
    try {
      localStorage.setItem("theme", next ? "light" : "dark");
    } catch {
      // приватный режим — просто не сохраняем
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className={className}
      aria-label={light ? "Включить тёмную тему" : "Включить светлую тему"}
      title={light ? "Тёмная тема" : "Светлая тема"}
    >
      {light ? <IconMoon className="size-4" /> : <IconSun className="size-4" />}
    </button>
  );
}
