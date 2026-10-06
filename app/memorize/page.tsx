"use client";

import { useEffect, useMemo, useState } from "react";
import { verseOfToday, verses, type Verse } from "@/lib/verses";
import { loadFavorites } from "@/lib/favorites";
import { recordActivity } from "@/lib/activity";
import { celebrate } from "@/lib/profile";

const MEMORIZED_KEY = "lumina.memorized";
const LEVELS = [0, 0.25, 0.5, 0.75, 1]; // share of words hidden

function loadMemorized(): string[] {
  try {
    return JSON.parse(window.localStorage.getItem(MEMORIZED_KEY) ?? "[]");
  } catch {
    return [];
  }
}

// A fixed but scattered order, so each level hides the previous level's
// words plus a few more instead of reshuffling.
function hideOrder(count: number): number[] {
  return Array.from({ length: count }, (_, i) => i).sort(
    (a, b) => ((a * 37 + 11) % 101) - ((b * 37 + 11) % 101),
  );
}

function splitWord(word: string) {
  const match = word.match(/^([^A-Za-z']*)([A-Za-z'-]+)([^A-Za-z']*)$/);
  return match
    ? { before: match[1], core: match[2], after: match[3] }
    : { before: "", core: word, after: "" };
}

export default function MemorizePage() {
  const [choices, setChoices] = useState<Verse[]>([]);
  const [verse, setVerse] = useState<Verse | null>(null);
  const [level, setLevel] = useState(0);
  const [peeked, setPeeked] = useState<Set<number>>(new Set());
  const [memorized, setMemorized] = useState<string[]>([]);

  useEffect(() => {
    const today = verseOfToday();
    const favorites = loadFavorites();
    const seen = new Set<string>();
    const list = [today, ...favorites, ...verses].filter((v) => {
      if (seen.has(v.reference)) return false;
      seen.add(v.reference);
      return true;
    });
    setChoices(list);
    setVerse(today);
    setMemorized(loadMemorized());
  }, []);

  const words = useMemo(() => verse?.text.split(/\s+/) ?? [], [verse]);
  const hidden = useMemo(() => {
    const count = Math.ceil(words.length * LEVELS[level]);
    return new Set(hideOrder(words.length).slice(0, count));
  }, [words, level]);

  function pick(reference: string) {
    const next = choices.find((v) => v.reference === reference);
    if (!next) return;
    setVerse(next);
    setLevel(0);
    setPeeked(new Set());
  }

  function changeLevel(next: number) {
    setLevel(next);
    setPeeked(new Set());
  }

  function finish() {
    if (!verse) return;
    const updated = memorized.includes(verse.reference)
      ? memorized
      : [...memorized, verse.reference];
    setMemorized(updated);
    try {
      window.localStorage.setItem(MEMORIZED_KEY, JSON.stringify(updated));
    } catch {}
    recordActivity("memorize");
    celebrate();
    changeLevel(0);
  }

  const isLast = level === LEVELS.length - 1;
  const isMemorized = verse ? memorized.includes(verse.reference) : false;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-serif text-2xl text-ink">Memorize a verse</h1>
        <p className="mt-1 text-sm text-muted">
          Read it out loud. Each step hides more words. Tap a blank to peek.
          {memorized.length > 0 && ` You've memorized ${memorized.length} so far 🌱`}
        </p>
      </div>

      <select
        value={verse?.reference ?? ""}
        onChange={(e) => pick(e.target.value)}
        className="w-full rounded-lg border border-line bg-card px-4 py-2.5 text-sm text-ink outline-none focus:border-accent/60"
      >
        {choices.map((v, i) => (
          <option key={v.reference} value={v.reference}>
            {i === 0 ? `Today: ${v.reference}` : v.reference}
            {memorized.includes(v.reference) ? " ✓" : ""}
          </option>
        ))}
      </select>

      {verse && (
        <div className="rounded-3xl border border-line bg-card p-6 sm:p-8">
          <div className="mb-5 flex items-center gap-1.5" aria-label={`Step ${level + 1} of ${LEVELS.length}`}>
            {LEVELS.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 flex-1 rounded-full ${i <= level ? "bg-accent" : "bg-ink/10"}`}
              />
            ))}
          </div>

          <p className="font-serif text-xl leading-loose text-ink sm:text-2xl">
            {words.map((word, i) => {
              const { before, core, after } = splitWord(word);
              const show = !hidden.has(i) || peeked.has(i);
              return (
                <span key={i}>
                  {before}
                  {show ? (
                    <span className={hidden.has(i) ? "text-accent-strong" : undefined}>{core}</span>
                  ) : (
                    <button
                      onClick={() => setPeeked((p) => new Set(p).add(i))}
                      aria-label="Reveal word"
                      className="inline-block translate-y-1 rounded border-b-2 border-accent/60 bg-accent/10 align-baseline"
                      style={{ width: `${Math.max(core.length, 2) * 0.55}em`, height: "1.1em" }}
                    />
                  )}
                  {after}{" "}
                </span>
              );
            })}
          </p>
          <p className="mt-4 text-sm text-accent-strong">
            {verse.reference}
            {isMemorized && <span className="ml-2 text-muted">✓ memorized</span>}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            {level > 0 && (
              <button
                onClick={() => changeLevel(level - 1)}
                className="rounded-full border border-line px-4 py-2 text-sm text-ink/70 hover:text-ink"
              >
                Back
              </button>
            )}
            {isLast ? (
              <button
                onClick={finish}
                className="rounded-full bg-accent px-5 py-2 text-sm font-medium text-white hover:opacity-90"
              >
                I said it all 🎉
              </button>
            ) : (
              <button
                onClick={() => changeLevel(level + 1)}
                className="rounded-full bg-accent px-5 py-2 text-sm font-medium text-white hover:opacity-90"
              >
                {level === 0 ? "Start hiding words" : "Hide more"}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
