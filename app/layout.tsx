import type { Metadata, Viewport } from "next";
import { Onest, Oswald } from "next/font/google";
import "./globals.css";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Кирилл Ефимович — DevOps / Infrastructure Engineer",
  description:
    "Персональный сайт-визитка: опыт, проекты, навыки и контакты DevOps-инженера.",
};

export const viewport: Viewport = {
  themeColor: "#b1aba2",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ru"
      className={`${oswald.variable} ${onest.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
