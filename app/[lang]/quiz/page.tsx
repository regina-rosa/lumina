"use client";

import { useState } from "react";
import Link from "next/link";
import {
  cheers,
  modes,
  oops,
  people,
  questions,
  rankFor,
  shuffle,
  verseBlanks,
  type Person,
  type VerseBlank,
} from "@/lib/quiz";
import { celebrate } from "@/lib/profile";
import ShareButton from "@/components/ShareButton";
import { Han, useLang, useT } from "@/components/i18n";
import { localizeRef, withLang, type L, type Lang } from "@/lib/i18n/config";

type Mode = "quiz" | "who" | "verse";

function pick<T>(list: T[]): T {
  return list[Math.floor(Math.random() * list.length)];
}

// The second, smaller line: Indonesian under English, English under the rest.
function secondary(lang: Lang): Lang {
  return lang === "en" ? "id" : "en";
}

// Main line in the reader's language, a small translation underneath.
function Text({ t, className = "", single = false }: { t: L; className?: string; single?: boolean }) {
  const lang = useLang();
  const other = secondary(lang);
  return (
    <span className={`block ${className}`}>
      <Han>{t[lang]}</Han>
      {!single && t[other] !== t[lang] && (
        <span className="mt-0.5 block text-[0.72em] font-normal leading-snug opacity-60">{t[other]}</span>
      )}
    </span>
  );
}

// ---- Shared multiple-choice item (used by Quiz and Finish the Verse) ----

type ChoiceItem = {
  prompt: L | VerseBlank;
  options: L[];
  answer: number;
  why?: L;
  story?: string;
};

function isVerse(prompt: L | VerseBlank): prompt is VerseBlank {
  return "reference" in prompt;
}

function withShuffledOptions(options: L[]): { options: L[]; answer: number } {
  const order = shuffle(options.map((_, i) => i));
  return { options: order.map((i) => options[i]), answer: order.indexOf(0) };
}

function buildQuiz(): ChoiceItem[] {
  return shuffle(questions)
    .slice(0, 10)
    .map((q) => ({ prompt: q.q, why: q.why, story: q.story, ...withShuffledOptions(q.options) }));
}

function buildVerse(): ChoiceItem[] {
  return shuffle(verseBlanks)
    .slice(0, 8)
    .map((v) => ({ prompt: v, ...withShuffledOptions(v.options) }));
}

function ProgressDots({ total, current, results }: { total: number; current: number; results: boolean[] }) {
  return (
    <div className="flex gap-1.5">
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className={`h-1.5 flex-1 rounded-full transition-colors ${
            i < results.length ? (results[i] ? "bg-emerald-500" : "bg-rose-400") : i === current ? "bg-accent" : "bg-ink/10"
          }`}
        />
      ))}
    </div>
  );
}

function optionClass(state: "idle" | "correct" | "wrong" | "dim") {
  const base = "w-full rounded-2xl border px-4 py-3 text-left text-base font-medium transition-all";
  switch (state) {
    case "correct":
      return `${base} border-emerald-500 bg-emerald-500/15 text-emerald-700 pop`;
    case "wrong":
      return `${base} border-rose-400 bg-rose-400/15 text-rose-700 shake`;
    case "dim":
      return `${base} border-line bg-card text-ink/40`;
    default:
      return `${base} border-line bg-card text-ink hover:-translate-y-0.5 hover:border-accent/50 active:scale-[0.98]`;
  }
}

function Feedback({
  reaction,
  children,
  storyHref,
  storyLabel,
  last,
  onNext,
}: {
  reaction: L;
  children?: React.ReactNode;
  storyHref?: string;
  storyLabel: string;
  last: boolean;
  onNext: () => void;
}) {
  const t = useT();
  return (
    <div className="pop flex flex-col gap-3 rounded-2xl border border-accent/25 bg-accent/[0.07] p-5">
      <Text t={reaction} single className="font-hand text-2xl leading-tight text-accent-strong" />
      {children}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        {storyHref ? (
          <Link href={storyHref} className="text-sm font-medium text-accent-strong hover:text-accent">
            {storyLabel}
          </Link>
        ) : (
          <span />
        )}
        <button onClick={onNext} className="rounded-full bg-accent px-6 py-2 text-sm font-medium text-white hover:opacity-90">
          {last ? t.quiz.results : t.quiz.next}
        </button>
      </div>
    </div>
  );
}

function ChoiceRound({ items, onDone }: { items: ChoiceItem[]; onDone: (score: number, max: number) => void }) {
  const lang = useLang();
  const t = useT();
  const [index, setIndex] = useState(0);
  const [chosen, setChosen] = useState<number | null>(null);
  const [results, setResults] = useState<boolean[]>([]);
  const [combo, setCombo] = useState(0);
  const [reaction, setReaction] = useState<L | null>(null);

  const item = items[index];
  const answered = chosen !== null;
  const verseMode = isVerse(item.prompt);

  function choose(i: number) {
    if (answered) return;
    const correct = i === item.answer;
    setChosen(i);
    setResults((r) => [...r, correct]);
    setCombo((c) => (correct ? c + 1 : 0));
    setReaction(correct ? pick(cheers) : pick(oops));
  }

  function next() {
    if (index + 1 >= items.length) return onDone(results.filter(Boolean).length, items.length);
    setIndex(index + 1);
    setChosen(null);
    setReaction(null);
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between text-xs text-muted">
        <span>
          {index + 1} / {items.length}
        </span>
        {combo >= 2 && <span className="pop font-medium text-accent-strong">{t.quiz.inARow(combo)}</span>}
      </div>
      <ProgressDots total={items.length} current={index} results={results} />

      <div className="rounded-3xl border border-line bg-card p-5 sm:p-7">
        {isVerse(item.prompt) ? (
          <VersePrompt blank={item.prompt} filled={answered ? item.options[item.answer][lang] : null} />
        ) : (
          <Text t={item.prompt} className="font-serif text-xl leading-snug text-ink sm:text-2xl" />
        )}
      </div>

      <div className="grid gap-2.5 sm:grid-cols-2">
        {item.options.map((option, i) => {
          const state = !answered ? "idle" : i === item.answer ? "correct" : i === chosen ? "wrong" : "dim";
          return (
            <button key={`${index}-${i}`} onClick={() => choose(i)} className={optionClass(state)}>
              {/* Verse options are separate per language, so no translation line. */}
              <Text t={option} single={verseMode} />
            </button>
          );
        })}
      </div>

      {answered && reaction && (
        <Feedback
          reaction={reaction}
          storyHref={item.story ? withLang(lang, `/stories/${item.story}`) : undefined}
          storyLabel={t.quiz.readStory}
          last={index + 1 >= items.length}
          onNext={next}
        >
          {item.why && <Text t={item.why} className="text-sm leading-relaxed text-ink/85" />}
        </Feedback>
      )}
    </div>
  );
}

function VersePrompt({ blank, filled }: { blank: VerseBlank; filled: string | null }) {
  const lang = useLang();
  const t = useT();
  const chinese = lang === "zh";
  const before = blank.before[lang];
  const after = blank.after[lang];
  // Chinese has no spaces; elsewhere skip the space before punctuation.
  const gapBefore = chinese || !before ? "" : " ";
  const gapAfter = chinese || /^[,.;:!?]/.test(after) ? "" : " ";

  return (
    <>
      <p className="text-xs uppercase tracking-[0.2em] text-accent-strong">{localizeRef(blank.reference, lang)}</p>
      <p className={`mt-3 font-serif text-xl text-ink sm:text-2xl ${chinese ? "leading-[2.2]" : "leading-relaxed"}`}>
        &ldquo;<Han>{before}</Han>
        {gapBefore}
        <span
          className={`inline-block border-b-2 border-accent text-center text-accent-strong ${filled ? "px-0.5" : "min-w-[4.5rem] px-1"}`}
        >
          {filled ? <Han>{filled}</Han> : "?"}
        </span>
        {gapAfter}
        <Han>{after}</Han>&rdquo;
      </p>
      <p className="mt-2 text-xs text-muted">{t.quiz.pickMissing}</p>
    </>
  );
}

// ---- Who Am I? ----

type WhoItem = { person: Person; options: Person[] };

function buildWho(): WhoItem[] {
  return shuffle(people)
    .slice(0, 6)
    .map((person) => ({
      person,
      options: shuffle([person, ...shuffle(people.filter((p) => p !== person)).slice(0, 3)]),
    }));
}

function WhoRound({ items, onDone }: { items: WhoItem[]; onDone: (score: number, max: number) => void }) {
  const lang = useLang();
  const t = useT();
  const [index, setIndex] = useState(0);
  const [clues, setClues] = useState(1);
  const [chosen, setChosen] = useState<Person | null>(null);
  const [score, setScore] = useState(0);
  const [results, setResults] = useState<boolean[]>([]);
  const [reaction, setReaction] = useState<L | null>(null);

  const item = items[index];
  const answered = chosen !== null;
  const points = 4 - clues; // 3, 2, or 1

  function choose(p: Person) {
    if (answered) return;
    const correct = p === item.person;
    setChosen(p);
    setResults((r) => [...r, correct]);
    if (correct) setScore((s) => s + points);
    setReaction(correct ? pick(cheers) : pick(oops));
  }

  function next() {
    if (index + 1 >= items.length) return onDone(score, items.length * 3);
    setIndex(index + 1);
    setClues(1);
    setChosen(null);
    setReaction(null);
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between text-xs text-muted">
        <span>
          {index + 1} / {items.length}
        </span>
        <span className="font-medium text-accent-strong">{t.quiz.pts(score)}</span>
      </div>
      <ProgressDots total={items.length} current={index} results={results} />

      <div className="rounded-3xl border border-line bg-card p-5 sm:p-7">
        <div className="flex items-center justify-between gap-3">
          <p className="font-serif text-2xl text-ink">
            <Han>{t.quiz.whoAmI}</Han>
          </p>
          {!answered && (
            <span className="shrink-0 rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent-strong">
              {t.quiz.worth(points)}
            </span>
          )}
        </div>
        <ol className="mt-4 flex flex-col gap-3">
          {item.person.clues.slice(0, answered ? 3 : clues).map((clue, i) => (
            <li key={i} className="pop flex gap-3">
              <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-semibold text-white">
                {i + 1}
              </span>
              <Text t={clue} className="font-hand text-[1.4rem] leading-snug text-ink" />
            </li>
          ))}
        </ol>
        {!answered && clues < 3 && (
          <button
            onClick={() => setClues(clues + 1)}
            className="mt-4 rounded-full border border-line px-4 py-1.5 text-sm text-ink/70 hover:text-ink"
          >
            {t.quiz.anotherClue}
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        {item.options.map((p) => {
          const state = !answered ? "idle" : p === item.person ? "correct" : p === chosen ? "wrong" : "dim";
          return (
            <button key={`${index}-${p.name.en}`} onClick={() => choose(p)} className={optionClass(state)}>
              <Text t={p.name} />
            </button>
          );
        })}
      </div>

      {answered && reaction && (
        <Feedback
          reaction={reaction}
          storyHref={item.person.story ? withLang(lang, `/stories/${item.person.story}`) : undefined}
          storyLabel={t.quiz.readTheirStory}
          last={index + 1 >= items.length}
          onNext={next}
        >
          <p className="text-sm text-ink/85">
            <Han>{t.quiz.itsX(item.person.name[lang], chosen === item.person ? points : 0)}</Han>
          </p>
        </Feedback>
      )}
    </div>
  );
}

// ---- Page ----

export default function QuizPage() {
  const lang = useLang();
  const t = useT();
  const [mode, setMode] = useState<Mode | null>(null);
  const [round, setRound] = useState(0); // bump to restart
  const [choiceItems, setChoiceItems] = useState<ChoiceItem[]>([]);
  const [whoItems, setWhoItems] = useState<WhoItem[]>([]);
  const [result, setResult] = useState<{ score: number; max: number } | null>(null);

  function start(next: Mode) {
    setMode(next);
    setResult(null);
    setRound((r) => r + 1);
    if (next === "quiz") setChoiceItems(buildQuiz());
    if (next === "verse") setChoiceItems(buildVerse());
    if (next === "who") setWhoItems(buildWho());
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function finish(score: number, max: number) {
    const percent = Math.round((score / max) * 100);
    if (percent >= 70) celebrate();
    setResult({ score, max });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function backToMenu() {
    setMode(null);
    setResult(null);
  }

  const current = modes.find((m) => m.id === mode);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl text-ink">
            {current ? (
              <>
                {current.emoji} <Han>{current.title[lang]}</Han>
              </>
            ) : (
              <Han>{t.quiz.pageTitle}</Han>
            )}
          </h1>
          <p className="mt-1 text-sm text-muted">{current ? current.title[secondary(lang)] : t.quiz.intro}</p>
        </div>
        {mode && (
          <button
            onClick={backToMenu}
            className="shrink-0 rounded-full border border-line px-3.5 py-1.5 text-sm text-ink/70 hover:text-ink"
          >
            {t.quiz.games}
          </button>
        )}
      </div>

      {!mode && (
        <ul className="flex flex-col gap-3">
          {modes.map((m) => (
            <li key={m.id}>
              <button
                onClick={() => start(m.id)}
                className="group flex w-full items-center gap-4 rounded-3xl border border-line bg-card p-5 text-left transition-all hover:-translate-y-0.5 hover:border-accent/50"
              >
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-accent/10 text-3xl transition-transform group-hover:rotate-6 group-hover:scale-110">
                  {m.emoji}
                </span>
                <div className="min-w-0 flex-1">
                  <Text t={m.title} className="font-serif text-xl text-ink" />
                  <Text t={m.blurb} className="mt-1 text-sm text-ink/70" />
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}

      {mode && result && <ResultCard result={result} onAgain={() => start(mode)} onMenu={backToMenu} />}

      {mode &&
        !result &&
        (mode === "who" ? (
          <WhoRound key={round} items={whoItems} onDone={finish} />
        ) : (
          <ChoiceRound key={round} items={choiceItems} onDone={finish} />
        ))}
    </div>
  );
}

function ResultCard({
  result,
  onAgain,
  onMenu,
}: {
  result: { score: number; max: number };
  onAgain: () => void;
  onMenu: () => void;
}) {
  const lang = useLang();
  const t = useT();
  const percent = Math.round((result.score / result.max) * 100);
  const rank = rankFor(percent);

  return (
    <div className="pop relative overflow-hidden rounded-3xl border border-accent/15 bg-[#1c1712] px-6 py-10 text-center text-[#faf8f3]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,var(--accent),transparent_65%)] opacity-30"
      />
      <div className="relative flex flex-col items-center gap-2">
        <p className="mt-2 font-serif text-6xl">
          {result.score}
          <span className="text-2xl text-white/50">/{result.max}</span>
        </p>
        <Text t={rank.title} className="mt-2 font-serif text-2xl" />
        <Text t={rank.note} className="max-w-xs text-sm text-white/80" />
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <ShareButton
            title="Lumina"
            text={t.quiz.shareText(result.score, result.max, rank.title[lang])}
            path={withLang(lang, "/quiz")}
            label={t.quiz.shareScore}
            className="rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-white hover:opacity-90"
          />
          <button onClick={onAgain} className="rounded-full bg-[#faf8f3] px-6 py-2.5 text-sm font-medium text-[#1c1712] hover:opacity-90">
            {t.quiz.playAgain}
          </button>
          <button onClick={onMenu} className="rounded-full border border-white/25 px-6 py-2.5 text-sm text-white/85 hover:text-white">
            {t.quiz.otherGames}
          </button>
        </div>
      </div>
    </div>
  );
}
