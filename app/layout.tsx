import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Manrope, Unbounded } from "next/font/google";
import "./globals.css";

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
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
      className={`${unbounded.variable} ${manrope.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body
        className="min-h-full flex flex-col"
        style={
          {
            "--font-display-stack": `var(--font-unbounded), var(--font-manrope), system-ui, sans-serif`,
            "--font-sans-stack": `var(--font-manrope), system-ui, -apple-system, 'Segoe UI', sans-serif`,
            "--font-mono-stack": `var(--font-jetbrains), ui-monospace, 'SF Mono', 'Cascadia Mono', monospace`,
          } as React.CSSProperties
        }
      >
        {children}
      </body>
    </html>
  );
}
