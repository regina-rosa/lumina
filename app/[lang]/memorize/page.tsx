"use client";

import { useEffect, useMemo, useState } from "react";
import { verseOfToday, verseRef, verseText, verses, type Verse } from "@/lib/verses";
import { celebrate } from "@/lib/profile";
import { Han, useLang, useT } from "@/components/i18n";

const LEVELS = [0, 0.25, 0.5, 0.75, 1]; // share of words hidden

// A fixed but scattered order, so each level hides the previous level's
// words plus a few more instead of reshuffling.
function hideOrder(count: number): number[] {
  return Array.from({ length: count }, (_, i) => i).sort(
    (a, b) => ((a * 37 + 11) % 101) - ((b * 37 + 11) % 101),
  );
}

type Token = { before: string; core: string; after: string; gap: string };

// Words for alphabet languages; single characters for Chinese.
function tokenize(text: string, chinese: boolean): Token[] {
  if (chinese) {
    const tokens: Token[] = [];
    for (const ch of Array.from(text)) {
      if (/\p{Script=Han}/u.test(ch)) tokens.push({ before: "", core: ch, after: "", gap: "" });
      else if (tokens.length) tokens[tokens.length - 1].after += ch;
      else tokens.push({ before: ch, core: "", after: "", gap: "" });
    }
    return tokens.filter((t) => t.core || t.before);
  }
  return text.split(/\s+/).map((word) => {
    const match = word.match(/^([^\p{L}']*)([\p{L}'-]+)([^\p{L}']*)$/u);
    return match
      ? { before: match[1], core: match[2], after: match[3], gap: " " }
      : { before: "", core: word, after: "", gap: " " };
  });
}

// Pinyin for each Han character of the verse, read in context.
function usePinyinList(text: string, enabled: boolean): string[] | null {
  const [list, setList] = useState<string[] | null>(null);
  useEffect(() => {
    if (!enabled) return setList(null);
    let cancelled = false;
    import("pinyin-pro").then(({ pinyin }) => {
      if (cancelled) return;
      const all = pinyin(text, { type: "all" }) as { pinyin: string; isZh: boolean }[];
      setList(all.filter((c) => c.isZh).map((c) => c.pinyin));
    });
    return () => {
      cancelled = true;
    };
  }, [text, enabled]);
  return list;
}

export default function MemorizePage() {
  const lang = useLang();
  const t = useT();
  const [choices, setChoices] = useState<Verse[]>([]);
  const [verse, setVerse] = useState<Verse | null>(null);
  const [level, setLevel] = useState(0);
  const [peeked, setPeeked] = useState<Set<number>>(new Set());

  useEffect(() => {
    const today = verseOfToday();
    const seen = new Set<string>();
    const list = [today, ...verses].filter((v) => {
      if (seen.has(v.reference)) return false;
      seen.add(v.reference);
      return true;
    });
    setChoices(list);
    setVerse(today);
  }, []);

  const chinese = lang === "zh";
  const text = verse ? verseText(verse, lang) : "";
  const tokens = useMemo(() => tokenize(text, chinese), [text, chinese]);
  const pinyinList = usePinyinList(text, chinese);
  const hideable = useMemo(() => tokens.map((tk, i) => (tk.core ? i : -1)).filter((i) => i >= 0), [tokens]);
  const hidden = useMemo(() => {
    const count = Math.ceil(hideable.length * LEVELS[level]);
    return new Set(hideOrder(hideable.length).slice(0, count).map((k) => hideable[k]));
  }, [hideable, level]);

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
    celebrate();
    changeLevel(0);
  }

  const isLast = level === LEVELS.length - 1;
  let hanIndex = -1;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-serif text-2xl text-ink">
          <Han>{t.memorize.title}</Han>
        </h1>
        <p className="mt-1 text-sm text-muted">{t.memorize.intro}</p>
      </div>

      <select
        value={verse?.reference ?? ""}
        onChange={(e) => pick(e.target.value)}
        className="w-full rounded-lg border border-line bg-card px-4 py-2.5 text-sm text-ink outline-none focus:border-accent/60"
      >
        {choices.map((v, i) => (
          <option key={v.reference} value={v.reference}>
            {i === 0 ? `${t.memorize.today}: ${verseRef(v, lang)}` : verseRef(v, lang)}
          </option>
        ))}
      </select>

      {verse && (
        <div className="rounded-3xl border border-line bg-card p-6 sm:p-8">
          <div className="mb-5 flex items-center gap-1.5" aria-label={t.memorize.step(level + 1, LEVELS.length)}>
            {LEVELS.map((_, i) => (
              <span key={i} className={`h-1.5 flex-1 rounded-full ${i <= level ? "bg-accent" : "bg-ink/10"}`} />
            ))}
          </div>

          <p className={`font-serif text-xl text-ink sm:text-2xl ${chinese ? "leading-[2.4]" : "leading-loose"}`}>
            {tokens.map((tk, i) => {
              if (chinese && tk.core) hanIndex += 1;
              const show = !hidden.has(i) || peeked.has(i);
              const py = chinese && pinyinList ? pinyinList[hanIndex] : undefined;
              return (
                <span key={i}>
                  {tk.before}
                  {!tk.core ? null : show ? (
                    <span className={hidden.has(i) ? "text-accent-strong" : undefined}>
                      {py ? (
                        <ruby>
                          {tk.core}
                          <rt>{py}</rt>
                        </ruby>
                      ) : (
                        tk.core
                      )}
                    </span>
                  ) : (
                    <button
                      onClick={() => setPeeked((p) => new Set(p).add(i))}
                      aria-label={t.memorize.reveal}
                      className="mx-px inline-block translate-y-1 rounded border-b-2 border-accent/60 bg-accent/10 align-baseline"
                      style={{ width: chinese ? "1em" : `${Math.max(tk.core.length, 2) * 0.55}em`, height: "1.1em" }}
                    />
                  )}
                  {tk.after}
                  {tk.gap}
                </span>
              );
            })}
          </p>
          <p className="mt-4 text-sm text-accent-strong">{verseRef(verse, lang)}</p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            {level > 0 && (
              <button
                onClick={() => changeLevel(level - 1)}
                className="rounded-full border border-line px-4 py-2 text-sm text-ink/70 hover:text-ink"
              >
                {t.memorize.back}
              </button>
            )}
            {isLast ? (
              <button onClick={finish} className="rounded-full bg-accent px-5 py-2 text-sm font-medium text-white hover:opacity-90">
                {t.memorize.done}
              </button>
            ) : (
              <button
                onClick={() => changeLevel(level + 1)}
                className="rounded-full bg-accent px-5 py-2 text-sm font-medium text-white hover:opacity-90"
              >
                {level === 0 ? t.memorize.startHiding : t.memorize.hideMore}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
