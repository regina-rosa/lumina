import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Caveat, Geist } from "next/font/google";
import "../globals.css";
import Sidebar from "@/components/Sidebar";
import Petals from "@/components/Petals";
import { LangProvider } from "@/components/i18n";
import { LANGS, LANG_LABELS, isLang, type L } from "@/lib/i18n/config";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const caveat = Caveat({ variable: "--font-caveat", subsets: ["latin"] });

const TITLE: L = {
  en: "Lumina — little moments with God",
  id: "Lumina — momen kecil bersama Tuhan",
  zh: "Lumina — 与神同在的小时刻",
};
const DESCRIPTION: L = {
  en: "Bible stories in plain words, verses for how you feel, little letters, quizzes, and pretty verse cards. Free for anyone. 🤍",
  id: "Cerita Alkitab dengan bahasa sederhana, ayat sesuai perasaanmu, surat kecil, kuis, dan kartu ayat yang cantik. Gratis untuk siapa saja. 🤍",
  zh: "用简单的话讲圣经故事，按心情找经文，还有小信、问答和漂亮的经文卡片。人人免费。🤍",
};

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  const l = isLang(lang) ? lang : "en";
  return {
    // Netlify sets URL to the site's primary domain at build time, so link
    // previews follow whatever domain the site is on.
    metadataBase: new URL(process.env.URL ?? "http://localhost:3000"),
    title: { default: TITLE[l], template: "%s — Lumina" },
    description: DESCRIPTION[l],
    alternates: {
      languages: Object.fromEntries(LANGS.map((x) => [LANG_LABELS[x].htmlLang, `/${x}`])),
    },
    openGraph: { title: TITLE[l], description: DESCRIPTION[l], siteName: "Lumina", type: "website" },
    twitter: { card: "summary_large_image" },
  };
}

const themeScript = `(function(){try{var t=JSON.parse(localStorage.getItem('lumina.theme')||'{}');var d=document.documentElement;d.dataset.accent=t.accent||'amber';d.dataset.mode=t.mode==='dark'?'dark':'light';d.dataset.pinyin=localStorage.getItem('lumina.pinyin')==='off'?'off':'on';}catch(e){}})();`;

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  return (
    <html
      lang={LANG_LABELS[lang].htmlLang}
      data-lang={lang}
      className={`${geist.variable} ${caveat.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-screen flex-col md:h-full md:flex-row">
        <LangProvider lang={lang}>
          <Sidebar />
          <main className="flex-1 bg-paper md:overflow-y-auto">
            <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-10">{children}</div>
          </main>
          <Petals />
        </LangProvider>
      </body>
    </html>
  );
}
