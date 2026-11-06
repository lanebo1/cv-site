import type { Metadata, Viewport } from "next";
import { Cormorant, JetBrains_Mono, Onest } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant({
  variable: "--font-cormorant",
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600", "700"],
  // настоящие курсивные глифы для editorial-акцентов (не faux italic)
  style: ["normal", "italic"],
  display: "swap",
});

const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Кирилл Ефимович — DevOps / Infrastructure Engineer",
  description:
    "Персональный сайт-визитка: опыт, проекты, навыки и контакты DevOps-инженера.",
};

export const viewport: Viewport = {
  themeColor: "#fffdf9",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ru"
      className={`${cormorant.variable} ${onest.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body
        className="min-h-full flex flex-col"
        style={
          {
            "--font-display-stack": `var(--font-cormorant), Georgia, serif`,
            "--font-sans-stack": `var(--font-onest), system-ui, -apple-system, 'Segoe UI', sans-serif`,
            "--font-mono-stack": `var(--font-jetbrains), ui-monospace, 'SF Mono', 'Cascadia Mono', monospace`,
          } as React.CSSProperties
        }
      >
        {children}
      </body>
    </html>
  );
}
