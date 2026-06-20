import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/components/i18n/language-provider";

export const metadata: Metadata = {
  title: {
    default: "Palakata Alim Madrasah",
    template: "%s · Palakata Alim Madrasah",
  },
  description:
    "Official website of Palakata Alim Madrasah — a Bangladeshi Alim-level madrasah serving 1500+ students. Knowledge, Faith and Character.",
  icons: { icon: "/favicon.ico" },
};

// Runs before paint to set the language (and font) with no flash of the wrong
// language. Mirrors the LanguageProvider default ("bn").
const noFlashLangScript = `(function(){try{var l=localStorage.getItem('lang')||'bn';document.documentElement.setAttribute('data-lang',l);document.documentElement.setAttribute('lang',l);}catch(e){document.documentElement.setAttribute('data-lang','bn');}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="bn" data-lang="bn" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700&family=Hind+Siliguri:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=Noto+Naskh+Arabic:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
        <script dangerouslySetInnerHTML={{ __html: noFlashLangScript }} />
      </head>
      <body className="flex min-h-full flex-col antialiased">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
