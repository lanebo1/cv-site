import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Manrope } from "next/font/google";
import "./globals.css";

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
  themeColor: "#0a0a0b",
};

const themeInit = `
(function () {
  try {
    var t = localStorage.getItem("theme");
    if (t === "light") document.documentElement.classList.add("light");
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ru"
      className={`${manrope.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body
        className="min-h-full flex flex-col"
        style={
          {
            "--font-sans-stack": `${manrope.style}, system-ui, -apple-system, 'Segoe UI', sans-serif`,
            "--font-mono-stack": `${jetbrainsMono.style}, ui-monospace, 'SF Mono', 'Cascadia Mono', monospace`,
          } as React.CSSProperties
        }
      >
        {children}
      </body>
    </html>
  );
}
