import type { Metadata } from "next";
import { Caveat, Geist } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Petals from "@/components/Petals";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const caveat = Caveat({ variable: "--font-caveat", subsets: ["latin"] });

const description =
  "Bible stories in plain words, verses for how you feel, little letters, quizzes, and pretty verse cards. Free for anyone. 🤍";

export const metadata: Metadata = {
  // Netlify sets URL to the site's primary domain at build time, so link
  // previews follow whatever domain the site is on.
  metadataBase: new URL(process.env.URL ?? "http://localhost:3000"),
  title: {
    default: "Lumina — little moments with God",
    template: "%s — Lumina",
  },
  description,
  openGraph: {
    title: "Lumina — little moments with God",
    description,
    siteName: "Lumina",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

const themeScript = `(function(){try{var t=JSON.parse(localStorage.getItem('lumina.theme')||'{}');var d=document.documentElement;d.dataset.accent=t.accent||'amber';d.dataset.mode=t.mode==='dark'?'dark':'light';}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${caveat.variable} h-full antialiased`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-screen flex-col md:h-full md:flex-row">
        <Sidebar />
        <main className="flex-1 bg-paper md:overflow-y-auto">
          <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-10">{children}</div>
        </main>
        <Petals />
      </body>
    </html>
  );
}
