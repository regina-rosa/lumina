"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { letters, type Letter } from "@/lib/letters";
import { loadName } from "@/lib/profile";
import ShareButton from "@/components/ShareButton";
import { Han, useLang, useT } from "@/components/i18n";
import { localizeRef, withLang, type Lang } from "@/lib/i18n/config";
import { verseText } from "@/lib/verses";

// "open when you can't sleep" / "buka saat …" / "当…时打开"
function openWhen(lang: Lang, when: string): string {
  if (lang === "zh") return `当${when}时打开`;
  if (lang === "id") return `buka saat ${when}`;
  return `open when ${when}`;
}

function Envelope({ letter }: { letter: Letter }) {
  return (
    <div
      className="envelope relative aspect-[4/3] w-full rounded-lg shadow-sm"
      style={{ background: letter.color }}
    >
      <div
        className="envelope-flap absolute inset-x-0 top-0 h-[58%]"
        style={{ background: `color-mix(in srgb, ${letter.color} 82%, #000)` }}
      />
      <span
        className="absolute left-1/2 top-[50%] flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-lg shadow-md"
        style={{
          background: "radial-gradient(circle at 35% 30%, #fb7185, #be123c)",
        }}
      >
        {letter.seal}
      </span>
    </div>
  );
}

export default function LettersPage() {
  const lang = useLang();
  const t = useT();
  const [active, setActive] = useState<Letter | null>(null);
  const [phase, setPhase] = useState<"closed" | "opening" | "open">("closed");
  const [name, setName] = useState("");

  useEffect(() => {
    setName(loadName());
    // Open a letter straight from a shared link, e.g. /letters?l=cant-sleep
    const shared = letters.find((l) => l.id === new URLSearchParams(window.location.search).get("l"));
    if (shared) setActive(shared);
  }, []);

  useEffect(() => {
    if (!active) return;
    setPhase("closed");
    const t1 = window.setTimeout(() => setPhase("opening"), 60);
    const t2 = window.setTimeout(() => setPhase("open"), 1250);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [active]);

  function open(letter: Letter) {
    setActive(letter);
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-serif text-2xl text-ink">
          <Han>{t.letters.title}</Han>
        </h1>
        <p className="mt-1 text-sm text-muted">{t.letters.intro}</p>
      </div>

      <ul className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3">
        {letters.map((letter) => {
          return (
            <li key={letter.id}>
              <button
                onClick={() => open(letter)}
                className="group flex w-full flex-col gap-2 text-left"
              >
                <div className="transition-transform group-hover:-translate-y-1 group-hover:-rotate-1">
                  <Envelope letter={letter} />
                </div>
                <span className="font-hand text-xl leading-tight text-ink">
                  <Han>{openWhen(lang, letter.when[lang])}</Han>
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <Link
        href={withLang(lang, "/mailbox?type=letter")}
        className="rounded-2xl border border-dashed border-accent/40 bg-accent/[0.05] p-5 text-center text-sm font-medium text-accent-strong hover:bg-accent/10"
      >
        {t.mailbox.requestLetter}
      </Link>

      {active && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
          onClick={() => setActive(null)}
        >
          {phase !== "open" ? (
            <div className={`w-64 ${phase === "opening" ? "is-opening" : ""}`}>
              <div className="relative">
                <div className="letter-peek absolute inset-x-3 top-3 h-[80%] rounded bg-[#fffdf8] shadow" />
                <Envelope letter={active} />
              </div>
            </div>
          ) : (
            <article
              onClick={(e) => e.stopPropagation()}
              className="letter-unfold max-h-[85vh] w-full max-w-md overflow-y-auto rounded-2xl bg-[#fffdf8] p-6 text-[#2b2420] shadow-2xl sm:p-8"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(transparent, transparent 31px, rgba(43,36,32,0.07) 32px)",
              }}
            >
              <p className="text-xs uppercase tracking-[0.2em] text-[#2b2420]/50">
                {openWhen(lang, active.when[lang])} {active.seal}
              </p>
              <div className="mt-4 flex flex-col gap-3 font-hand text-[1.45rem] leading-[1.35]">
                {active.body[lang].split(/\n{2,}/).map((p, i) => (
                  <p key={i}>
                    <Han>{p}</Han>
                  </p>
                ))}
              </div>
              <blockquote
                className="mt-6 border-l-2 pl-4 font-serif text-base italic leading-relaxed"
                style={{ borderColor: active.color }}
              >
                &ldquo;<Han>{verseText(active.verse, lang)}</Han>&rdquo;
                <span className="mt-1 block text-sm not-italic text-[#2b2420]/60">
                  — {localizeRef(active.verse.reference, lang)}
                </span>
              </blockquote>
              <p className="mt-6 text-right font-hand text-2xl">
                {t.letters.withLove}
                {name ? t.letters.forName(name) : ""} 🌸
              </p>
              <ShareButton
                title={openWhen(lang, active.when[lang])}
                text={t.letters.shareText(active.when[lang], active.seal)}
                path={withLang(lang, `/letters?l=${active.id}`)}
                label={t.letters.send}
                className="mt-6 w-full rounded-full bg-[#2b2420] py-2.5 text-sm font-medium text-[#fffdf8] hover:opacity-90"
              />
              <button
                onClick={() => setActive(null)}
                className="mt-2 w-full rounded-full border border-[#2b2420]/15 py-2 text-sm text-[#2b2420]/70 hover:text-[#2b2420]"
              >
                {t.letters.fold}
              </button>
            </article>
          )}
        </div>
      )}
    </div>
  );
}
