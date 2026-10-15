"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { verseOfToday, verseRef, verseText, type Verse } from "@/lib/verses";
import { Han, useLang, useT } from "@/components/i18n";
import { withLang } from "@/lib/i18n/config";

export default function VerseCard() {
  const lang = useLang();
  const t = useT();
  const [verse, setVerse] = useState<Verse | null>(null);

  useEffect(() => {
    setVerse(verseOfToday());
  }, []);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-accent/15 bg-[#1c1712] px-6 py-8 sm:px-8 sm:py-10 text-[#faf8f3] shadow-lg">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-accent/30 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 animate-pulse bg-[radial-gradient(circle_at_50%_0%,var(--accent),transparent_60%)] opacity-20"
      />
      <div className="relative mb-3 flex items-center justify-between">
        <p className="text-xs uppercase tracking-[0.2em] text-accent/90">{t.home.todaysLight}</p>
        {verse && (
          <Link
            href={withLang(lang, "/cards")}
            className="rounded-full bg-white/10 px-3 py-1 text-xs text-accent/90 transition-colors hover:bg-white/15 hover:text-accent"
          >
            {t.home.makeCard}
          </Link>
        )}
      </div>
      {verse ? (
        <>
          <p className="relative font-serif text-xl leading-relaxed sm:text-2xl">
            &ldquo;<Han>{verseText(verse, lang)}</Han>&rdquo;
          </p>
          <p className="relative mt-4 text-sm text-accent/80">
            {verseRef(verse, lang)}
          </p>
        </>
      ) : (
        <div className="relative animate-pulse space-y-3">
          <div className="h-5 w-3/4 rounded bg-white/10" />
          <div className="h-5 w-1/2 rounded bg-white/10" />
          <div className="h-4 w-24 rounded bg-white/10" />
        </div>
      )}
    </div>
  );
}
