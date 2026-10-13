"use client";

import { useEffect, useState } from "react";
import { letters, type Letter } from "@/lib/letters";
import { loadName } from "@/lib/profile";
import ShareButton from "@/components/ShareButton";

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
        <h1 className="font-serif text-2xl text-ink">open when… 💌</h1>
        <p className="mt-1 text-sm text-muted">
          Little letters for the moments you need them. Pick the one that sounds like today.
        </p>
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
                  open when {letter.when}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

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
                open when {active.when} {active.seal}
              </p>
              <div className="mt-4 flex flex-col gap-3 font-hand text-[1.45rem] leading-[1.35]">
                {active.body.split(/\n{2,}/).map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <blockquote
                className="mt-6 border-l-2 pl-4 font-serif text-base italic leading-relaxed"
                style={{ borderColor: active.color }}
              >
                &ldquo;{active.verse.text}&rdquo;
                <span className="mt-1 block text-sm not-italic text-[#2b2420]/60">
                  — {active.verse.reference}
                </span>
              </blockquote>
              <p className="mt-6 text-right font-hand text-2xl">
                with love{name ? `, for ${name}` : ""} 🌸
              </p>
              <ShareButton
                title={`open when ${active.when}`}
                text={`a little letter for when ${active.when} ${active.seal}`}
                path={`/letters?l=${active.id}`}
                label="Send this letter"
                className="mt-6 w-full rounded-full bg-[#2b2420] py-2.5 text-sm font-medium text-[#fffdf8] hover:opacity-90"
              />
              <button
                onClick={() => setActive(null)}
                className="mt-2 w-full rounded-full border border-[#2b2420]/15 py-2 text-sm text-[#2b2420]/70 hover:text-[#2b2420]"
              >
                fold it back up
              </button>
            </article>
          )}
        </div>
      )}
    </div>
  );
}
