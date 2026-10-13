"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { feelings, getFeeling, type Feeling } from "@/lib/feelings";
import ShareButton from "@/components/ShareButton";

function cardLink(reference: string, text: string) {
  return `/cards?${new URLSearchParams({ ref: reference, text })}`;
}

export default function FeelingsPage() {
  const [selected, setSelected] = useState<Feeling | null>(null);

  useEffect(() => {
    // Open a feeling straight from a link, e.g. /feelings?f=tired
    const fromUrl = getFeeling(new URLSearchParams(window.location.search).get("f") ?? "");
    if (fromUrl) setSelected(fromUrl);
  }, []);

  function choose(feeling: Feeling) {
    setSelected(feeling);
    window.history.replaceState(null, "", `/feelings?f=${feeling.id}`);
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-serif text-2xl text-ink">For your heart</h1>
        <p className="mt-1 text-sm text-muted">
          How are you feeling today? Pick one and sit with what God says about it.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
        {feelings.map((feeling) => {
          const active = selected?.id === feeling.id;
          return (
            <button
              key={feeling.id}
              onClick={() => choose(feeling)}
              className={`flex flex-col items-center gap-1 rounded-2xl border px-2 py-3 text-sm transition-colors ${
                active
                  ? "border-accent bg-accent/10 font-medium text-accent-strong"
                  : "border-line bg-card text-ink/80 hover:border-accent/40"
              }`}
            >
              <span className="text-xl" aria-hidden>
                {feeling.emoji}
              </span>
              {feeling.label}
            </button>
          );
        })}
      </div>

      {selected && (
        <section className="flex flex-col gap-4">
          <p className="rounded-2xl border border-accent/25 bg-accent/[0.07] p-5 font-serif text-lg leading-relaxed text-ink">
            {selected.note}
          </p>
          <ul className="flex flex-col gap-3">
            {selected.verses.map((verse) => (
              <li key={verse.reference} className="rounded-2xl border border-line bg-card p-5">
                <p className="font-serif text-lg leading-relaxed text-ink/90">
                  &ldquo;{verse.text}&rdquo;
                </p>
                <div className="mt-3 flex items-center justify-between gap-3">
                  <p className="text-sm text-accent-strong">{verse.reference}</p>
                  <Link
                    href={cardLink(verse.reference, verse.text)}
                    className="text-xs font-medium text-muted hover:text-ink"
                  >
                    Make a card ✨
                  </Link>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex justify-center">
            <ShareButton
              title={`Verses for when you feel ${selected.label.toLowerCase()}`}
              text={`For anyone feeling ${selected.label.toLowerCase()} today ${selected.emoji}`}
              path={`/feelings?f=${selected.id}`}
              label="Send to a friend"
            />
          </div>
        </section>
      )}
    </div>
  );
}
