"use client";

import { useEffect, useState } from "react";
import { verseOfToday, type Verse } from "@/lib/verses";

export default function VerseCard() {
  const [verse, setVerse] = useState<Verse | null>(null);

  useEffect(() => {
    setVerse(verseOfToday());
  }, []);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-amber-900/10 bg-[#1c1712] px-8 py-10 text-[#faf8f3] shadow-lg">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-amber-400/30 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 animate-pulse bg-[radial-gradient(circle_at_50%_0%,rgba(251,191,36,0.15),transparent_60%)]"
      />
      <p className="relative mb-3 text-xs uppercase tracking-[0.2em] text-amber-300/80">
        Terang hari ini
      </p>
      {verse ? (
        <>
          <p className="relative font-serif text-xl leading-relaxed sm:text-2xl">
            &ldquo;{verse.text}&rdquo;
          </p>
          <p className="relative mt-4 text-sm text-amber-200/80">
            {verse.reference}
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
