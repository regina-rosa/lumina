"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { feelings, getFeeling, type Feeling } from "@/lib/feelings";
import { verseRef, verseText } from "@/lib/verses";
import ShareButton from "@/components/ShareButton";
import { Han, useLang, useT } from "@/components/i18n";
import { withLang } from "@/lib/i18n/config";

export default function FeelingsPage() {
  const lang = useLang();
  const t = useT();
  const [selected, setSelected] = useState<Feeling | null>(null);

  useEffect(() => {
    // Open a feeling straight from a link, e.g. /en/feelings?f=tired
    const fromUrl = getFeeling(new URLSearchParams(window.location.search).get("f") ?? "");
    if (fromUrl) setSelected(fromUrl);
  }, []);

  function choose(feeling: Feeling) {
    setSelected(feeling);
    window.history.replaceState(null, "", withLang(lang, `/feelings?f=${feeling.id}`));
  }

  const cardLink = (reference: string, text: string) =>
    withLang(lang, `/cards?${new URLSearchParams({ ref: reference, text })}`);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-serif text-2xl text-ink">
          <Han>{t.feelings.title}</Han>
        </h1>
        <p className="mt-1 text-sm text-muted">{t.feelings.intro}</p>
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
              <Han>{feeling.label[lang]}</Han>
            </button>
          );
        })}
      </div>

      {selected && (
        <section className="flex flex-col gap-4">
          <p className="rounded-2xl border border-accent/25 bg-accent/[0.07] p-5 font-serif text-lg leading-relaxed text-ink">
            <Han>{selected.note[lang]}</Han>
          </p>
          <ul className="flex flex-col gap-3">
            {selected.verses.map((verse) => {
              const text = verseText(verse, lang);
              const ref = verseRef(verse, lang);
              return (
                <li key={verse.reference} className="rounded-2xl border border-line bg-card p-5">
                  <p className="font-serif text-lg leading-relaxed text-ink/90">
                    &ldquo;<Han>{text}</Han>&rdquo;
                  </p>
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <p className="text-sm text-accent-strong">{ref}</p>
                    <Link href={cardLink(ref, text)} className="shrink-0 text-xs font-medium text-muted hover:text-ink">
                      {t.feelings.makeCard}
                    </Link>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="flex justify-center">
            <ShareButton
              title={t.feelings.shareTitle(selected.label[lang].toLowerCase())}
              text={t.feelings.shareText(selected.label[lang].toLowerCase(), selected.emoji)}
              path={withLang(lang, `/feelings?f=${selected.id}`)}
              label={t.feelings.send}
            />
          </div>
        </section>
      )}
    </div>
  );
}
