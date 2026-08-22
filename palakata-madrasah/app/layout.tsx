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

// Dev only. Bitdefender (and a few other AV / privacy extensions) stamp
// `bis_skin_checked="1"` onto every <div> before React hydrates, which trips the
// hydration-mismatch overlay on Next.js-internal nodes we cannot annotate with
// suppressHydrationWarning. Strip just those attributes until hydration settles,
// then disconnect. Empty string in production, so nothing ships to real users.
const stripExtensionAttrsScript =
  process.env.NODE_ENV === "development"
    ? `(function(){var A=['bis_skin_checked','bis_register','__processed_by_bis__'];function c(n){if(n&&n.nodeType===1){for(var i=0;i<A.length;i++){if(n.hasAttribute(A[i]))n.removeAttribute(A[i]);}}}var o=new MutationObserver(function(ms){for(var i=0;i<ms.length;i++){var m=ms[i];if(m.type==='attributes'){c(m.target);}else{for(var j=0;j<m.addedNodes.length;j++)c(m.addedNodes[j]);}}});o.observe(document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:A});window.addEventListener('load',function(){setTimeout(function(){o.disconnect();},1000);});})();`
    : "";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="bn" data-lang="bn" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        {stripExtensionAttrsScript && (
          <script dangerouslySetInnerHTML={{ __html: stripExtensionAttrsScript }} />
        )}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700&family=Hind+Siliguri:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=Noto+Naskh+Arabic:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
        <script dangerouslySetInnerHTML={{ __html: noFlashLangScript }} />
      </head>
      <body className="flex min-h-full flex-col antialiased" suppressHydrationWarning>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
