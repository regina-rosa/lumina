"use client";

import { useEffect, useState } from "react";
import { verseOfToday, type Verse } from "@/lib/verses";
import { loadFavorites, toggleFavorite } from "@/lib/favorites";

export default function VerseCard() {
  const [verse, setVerse] = useState<Verse | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const today = verseOfToday();
    setVerse(today);
    setSaved(loadFavorites().some((f) => f.reference === today.reference));
  }, []);

  function handleToggleFavorite() {
    if (!verse) return;
    const updated = toggleFavorite(verse);
    setSaved(updated.some((f) => f.reference === verse.reference));
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-accent/15 bg-[#1c1712] px-8 py-10 text-[#faf8f3] shadow-lg">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-accent/30 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 animate-pulse bg-[radial-gradient(circle_at_50%_0%,var(--accent),transparent_60%)] opacity-20"
      />
      <div className="relative mb-3 flex items-center justify-between">
        <p className="text-xs uppercase tracking-[0.2em] text-accent/90">
          Terang hari ini
        </p>
        {verse && (
          <button
            onClick={handleToggleFavorite}
            aria-label={saved ? "Hapus dari favorit" : "Simpan ke favorit"}
            className="text-accent/90 transition-colors hover:text-accent"
          >
            <svg
              viewBox="0 0 24 24"
              className={`h-5 w-5 ${saved ? "fill-accent" : "fill-none stroke-current stroke-2"}`}
            >
              <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z" />
            </svg>
          </button>
        )}
      </div>
      {verse ? (
        <>
          <p className="relative font-serif text-xl leading-relaxed sm:text-2xl">
            &ldquo;{verse.text}&rdquo;
          </p>
          <p className="relative mt-4 text-sm text-accent/80">
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
