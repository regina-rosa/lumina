"use client";

import { useState } from "react";
import Link from "next/link";
import {
  people,
  questions,
  rankFor,
  shuffle,
  verseBlanks,
  type Bi,
  type Person,
  type VerseBlank,
} from "@/lib/quiz";
import ShareButton from "@/components/ShareButton";
import { celebrate } from "@/lib/profile";

type Mode = "quiz" | "who" | "verse";

const MODES: { id: Mode; emoji: string; title: Bi; blurb: Bi; rounds: number }[] = [
  {
    id: "quiz",
    emoji: "🧩",
    title: { en: "Bible Quiz", id: "Kuis Alkitab" },
    blurb: { en: "10 multiple-choice questions from the stories.", id: "10 soal pilihan ganda dari cerita-cerita." },
    rounds: 10,
  },
  {
    id: "who",
    emoji: "🕵️",
    title: { en: "Who Am I?", id: "Siapakah Aku?" },
    blurb: { en: "Guess the Bible character. Fewer clues, more points!", id: "Tebak tokoh Alkitab. Makin sedikit petunjuk, makin banyak poin!" },
    rounds: 6,
  },
  {
    id: "verse",
    emoji: "📜",
    title: { en: "Finish the Verse", id: "Lengkapi Ayatnya" },
    blurb: { en: "Pick the missing word from a famous verse.", id: "Pilih kata yang hilang dari ayat terkenal." },
    rounds: 8,
  },
];

const CHEERS: Bi[] = [
  { en: "Yesss! 🎉", id: "Benar!" },
  { en: "You got it! ✨", id: "Tepat sekali!" },
  { en: "Bible bestie behavior 💅", id: "Kelakuan sahabat Alkitab" },
  { en: "So smart!! 🧠", id: "Pinter banget!!" },
  { en: "Correct-a-mundo 🌸", id: "Betul sekali" },
];
const OOPS: Bi[] = [
  { en: "Oops, almost! 🙈", id: "Ups, hampir!" },
  { en: "Not quite 🤏", id: "Belum tepat" },
  { en: "Nice try! 🫶", id: "Usaha yang bagus!" },
];

function pick<T>(list: T[]): T {
  return list[Math.floor(Math.random() * list.length)];
}

// English on top, a small Indonesian line underneath.
function BiText({ t, className = "" }: { t: Bi; className?: string }) {
  return (
    <span className={`block ${className}`}>
      {t.en}
      <span className="mt-0.5 block text-[0.72em] font-normal leading-snug opacity-60">
        {t.id}
      </span>
    </span>
  );
}

// ---- Shared multiple-choice item (used by Quiz and Finish the Verse) ----

type ChoiceItem = {
  prompt: Bi | VerseBlank;
  options: Bi[];
  answer: number;
  why?: Bi;
  story?: string;
};

function isVerse(prompt: Bi | VerseBlank): prompt is VerseBlank {
  return "reference" in prompt;
}

function withShuffledOptions(options: Bi[]): { options: Bi[]; answer: number } {
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
            i < results.length
              ? results[i]
                ? "bg-emerald-500"
                : "bg-rose-400"
              : i === current
                ? "bg-accent"
                : "bg-ink/10"
          }`}
        />
      ))}
    </div>
  );
}

function optionClass(state: "idle" | "correct" | "wrong" | "dim") {
  const base =
    "w-full rounded-2xl border px-4 py-3 text-left text-base font-medium transition-all";
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

function ChoiceRound({
  items,
  onDone,
}: {
  items: ChoiceItem[];
  onDone: (score: number, max: number) => void;
}) {
  const [index, setIndex] = useState(0);
  const [chosen, setChosen] = useState<number | null>(null);
  const [results, setResults] = useState<boolean[]>([]);
  const [combo, setCombo] = useState(0);
  const [reaction, setReaction] = useState<Bi | null>(null);

  const item = items[index];
  const answered = chosen !== null;

  function choose(i: number) {
    if (answered) return;
    const correct = i === item.answer;
    setChosen(i);
    setResults((r) => [...r, correct]);
    setCombo((c) => (correct ? c + 1 : 0));
    setReaction(correct ? pick(CHEERS) : pick(OOPS));
  }

  function next() {
    if (index + 1 >= items.length) {
      onDone(results.filter(Boolean).length, items.length);
      return;
    }
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
        {combo >= 2 && (
          <span className="pop font-medium text-accent-strong">🔥 {combo} in a row!</span>
        )}
      </div>
      <ProgressDots total={items.length} current={index} results={results} />

      <div className="rounded-3xl border border-line bg-card p-5 sm:p-7">
        {isVerse(item.prompt) ? (
          <>
            <p className="text-xs uppercase tracking-[0.2em] text-accent-strong">
              {item.prompt.reference}
            </p>
            <p className="mt-3 font-serif text-xl leading-relaxed text-ink sm:text-2xl">
              &ldquo;{item.prompt.before}{" "}
              <span className={`inline-block border-b-2 border-accent text-center text-accent-strong ${answered ? "px-0.5" : "min-w-[4.5rem] px-1"}`}>
                {answered ? item.options[item.answer].en : "?"}
              </span>
              {/^[,.;:!?]/.test(item.prompt.after) ? "" : " "}
              {item.prompt.after}&rdquo;
            </p>
            <p className="mt-2 text-xs text-muted">Pilih kata yang hilang</p>
          </>
        ) : (
          <BiText t={item.prompt} className="font-serif text-xl leading-snug text-ink sm:text-2xl" />
        )}
      </div>

      <div className="grid gap-2.5 sm:grid-cols-2">
        {item.options.map((option, i) => {
          const state = !answered
            ? "idle"
            : i === item.answer
              ? "correct"
              : i === chosen
                ? "wrong"
                : "dim";
          return (
            <button key={`${index}-${i}`} onClick={() => choose(i)} className={optionClass(state)}>
              <BiText t={option} />
            </button>
          );
        })}
      </div>

      {answered && (
        <div className="pop flex flex-col gap-3 rounded-2xl border border-accent/25 bg-accent/[0.07] p-5">
          {reaction && <BiText t={reaction} className="font-hand text-2xl leading-tight text-accent-strong" />}
          {item.why && <BiText t={item.why} className="text-sm leading-relaxed text-ink/85" />}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            {item.story ? (
              <Link href={`/stories/${item.story}`} className="text-sm font-medium text-accent-strong hover:text-accent">
                Read the story →
              </Link>
            ) : (
              <span />
            )}
            <button
              onClick={next}
              className="rounded-full bg-accent px-6 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              {index + 1 >= items.length ? "See results ✨" : "Next →"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ---- Who Am I? ----

type WhoItem = { person: Person; options: Person[] };

function buildWho(): WhoItem[] {
  return shuffle(people)
    .slice(0, 6)
    .map((person) => ({
      person,
      options: shuffle([
        person,
        ...shuffle(people.filter((p) => p !== person)).slice(0, 3),
      ]),
    }));
}

function WhoRound({ items, onDone }: { items: WhoItem[]; onDone: (score: number, max: number) => void }) {
  const [index, setIndex] = useState(0);
  const [clues, setClues] = useState(1);
  const [chosen, setChosen] = useState<Person | null>(null);
  const [score, setScore] = useState(0);
  const [results, setResults] = useState<boolean[]>([]);
  const [reaction, setReaction] = useState<Bi | null>(null);

  const item = items[index];
  const answered = chosen !== null;
  const points = 4 - clues; // 3, 2, or 1

  function choose(p: Person) {
    if (answered) return;
    const correct = p === item.person;
    setChosen(p);
    setResults((r) => [...r, correct]);
    if (correct) setScore((s) => s + points);
    setReaction(correct ? pick(CHEERS) : pick(OOPS));
  }

  function next() {
    if (index + 1 >= items.length) {
      onDone(score, items.length * 3);
      return;
    }
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
        <span className="font-medium text-accent-strong">⭐ {score} pts</span>
      </div>
      <ProgressDots total={items.length} current={index} results={results} />

      <div className="rounded-3xl border border-line bg-card p-5 sm:p-7">
        <div className="flex items-center justify-between gap-3">
          <BiText t={{ en: "Who am I?", id: "Siapakah aku?" }} className="font-serif text-2xl text-ink" />
          {!answered && (
            <span className="shrink-0 rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent-strong">
              worth {points} pt{points > 1 ? "s" : ""}
            </span>
          )}
        </div>
        <ol className="mt-4 flex flex-col gap-3">
          {item.person.clues.slice(0, answered ? 3 : clues).map((clue, i) => (
            <li key={i} className="pop flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-semibold text-white">
                {i + 1}
              </span>
              <BiText t={clue} className="font-hand text-[1.4rem] leading-snug text-ink" />
            </li>
          ))}
        </ol>
        {!answered && clues < 3 && (
          <button
            onClick={() => setClues(clues + 1)}
            className="mt-4 rounded-full border border-line px-4 py-1.5 text-sm text-ink/70 hover:text-ink"
          >
            Another clue 🔍 <span className="text-xs opacity-60">· petunjuk lagi</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        {item.options.map((p) => {
          const state = !answered
            ? "idle"
            : p === item.person
              ? "correct"
              : p === chosen
                ? "wrong"
                : "dim";
          return (
            <button key={`${index}-${p.name.en}`} onClick={() => choose(p)} className={optionClass(state)}>
              <BiText t={p.name} />
            </button>
          );
        })}
      </div>

      {answered && (
        <div className="pop flex flex-col gap-3 rounded-2xl border border-accent/25 bg-accent/[0.07] p-5">
          {reaction && <BiText t={reaction} className="font-hand text-2xl leading-tight text-accent-strong" />}
          <BiText
            t={{
              en: `It's ${item.person.name.en}!${chosen === item.person ? ` +${points} pts` : ""}`,
              id: `Jawabannya ${item.person.name.id}!`,
            }}
            className="text-sm text-ink/85"
          />
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            {item.person.story ? (
              <Link href={`/stories/${item.person.story}`} className="text-sm font-medium text-accent-strong hover:text-accent">
                Read their story →
              </Link>
            ) : (
              <span />
            )}
            <button onClick={next} className="rounded-full bg-accent px-6 py-2 text-sm font-medium text-white hover:opacity-90">
              {index + 1 >= items.length ? "See results ✨" : "Next →"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ---- Page ----

export default function QuizPage() {
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
    if (!mode) return;
    const percent = Math.round((score / max) * 100);
    if (percent >= 70) celebrate();
    setResult({ score, max });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const current = MODES.find((m) => m.id === mode);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl text-ink">
            {current ? `${current.emoji} ${current.title.en}` : "bible quiz 🧩"}
          </h1>
          <div className="mt-1 text-sm text-muted">
            {current ? (
              current.title.id
            ) : (
              <BiText t={{ en: "Games to test what you've been reading. Have fun!", id: "Permainan untuk menguji bacaanmu. Selamat bermain!" }} />
            )}
          </div>
        </div>
        {mode && (
          <button
            onClick={() => {
              setMode(null);
              setResult(null);
            }}
            className="shrink-0 rounded-full border border-line px-3.5 py-1.5 text-sm text-ink/70 hover:text-ink"
          >
            ← Games
          </button>
        )}
      </div>

      {!mode && (
        <ul className="flex flex-col gap-3">
          {MODES.map((m) => (
            <li key={m.id}>
              <button
                onClick={() => start(m.id)}
                className="group flex w-full items-center gap-4 rounded-3xl border border-line bg-card p-5 text-left transition-all hover:-translate-y-0.5 hover:border-accent/50"
              >
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-accent/10 text-3xl transition-transform group-hover:rotate-6 group-hover:scale-110">
                  {m.emoji}
                </span>
                <div className="min-w-0 flex-1">
                  <BiText t={m.title} className="font-serif text-xl text-ink" />
                  <BiText t={m.blurb} className="mt-1 text-sm text-ink/70" />
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}

      {mode && result && (
        <ResultCard
          result={result}
          onAgain={() => start(mode)}
          onMenu={() => {
            setMode(null);
            setResult(null);
          }}
        />
      )}

      {mode && !result && (mode === "who" ? (
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
        <BiText t={rank.title} className="mt-2 font-serif text-2xl" />
        <BiText t={rank.note} className="max-w-xs text-sm text-white/80" />
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <ShareButton
            title="Lumina Bible Quiz"
            text={`I got ${result.score}/${result.max} and I'm a "${rank.title.en}" on the Lumina Bible quiz! Can you beat me? 🧩`}
            path="/quiz"
            label="Share my score"
            className="rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-white hover:opacity-90"
          />
          <button onClick={onAgain} className="rounded-full bg-[#faf8f3] px-6 py-2.5 text-sm font-medium text-[#1c1712] hover:opacity-90">
            Play again <span className="text-xs opacity-60">· main lagi</span>
          </button>
          <button onClick={onMenu} className="rounded-full border border-white/25 px-6 py-2.5 text-sm text-white/85 hover:text-white">
            Other games <span className="text-xs opacity-60">· game lain</span>
          </button>
        </div>
      </div>
    </div>
  );
}
