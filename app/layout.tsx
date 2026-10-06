import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lumina — Bible Journal",
  description: "Your personal Bible journaling space",
};

const themeScript = `(function(){try{var t=JSON.parse(localStorage.getItem('lumina.theme')||'{}');var d=document.documentElement;d.dataset.accent=t.accent||'amber';d.dataset.mode=t.mode==='dark'?'dark':'light';}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} h-full antialiased`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-screen flex-col md:h-full md:flex-row">
        <Sidebar />
        <main className="flex-1 bg-paper md:overflow-y-auto">
          <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-10">{children}</div>
        </main>
      </body>
    </html>
  );
}
