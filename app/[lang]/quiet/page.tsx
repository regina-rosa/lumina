"use client";

import { useEffect, useRef, useState } from "react";
import { celebrate } from "@/lib/profile";
import { Han, useT } from "@/components/i18n";

const DURATIONS = [1, 3, 5, 10];

function chime() {
  try {
    const ctx = new AudioContext();
    [523.25, 783.99].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;
      const start = ctx.currentTime + i * 0.35;
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.exponentialRampToValueAtTime(0.2, start + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 2.5);
      osc.connect(gain).connect(ctx.destination);
      osc.start(start);
      osc.stop(start + 2.6);
    });
  } catch {
    // No audio available; the screen still shows that time is up.
  }
}

function format(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

export default function QuietTimePage() {
  const t = useT();
  const PROMPTS = t.quiet.prompts;
  const [minutes, setMinutes] = useState(3);
  const [endsAt, setEndsAt] = useState<number | null>(null);
  const [remaining, setRemaining] = useState(0);
  const [done, setDone] = useState(false);
  const [promptIndex, setPromptIndex] = useState(0);
  const startedAt = useRef(0);

  useEffect(() => {
    if (endsAt === null) return;
    const tick = () => {
      const left = Math.max(0, Math.ceil((endsAt - Date.now()) / 1000));
      setRemaining(left);
      setPromptIndex(Math.floor((Date.now() - startedAt.current) / 20000) % PROMPTS.length);
      if (left === 0) {
        setEndsAt(null);
        setDone(true);
        chime();
        celebrate();
      }
    };
    tick();
    const id = window.setInterval(tick, 250);
    return () => window.clearInterval(id);
  }, [endsAt]);

  function start() {
    startedAt.current = Date.now();
    setDone(false);
    setPromptIndex(0);
    setEndsAt(Date.now() + minutes * 60_000);
  }

  const running = endsAt !== null;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-serif text-2xl text-ink">
          <Han>{t.quiet.title}</Han>
        </h1>
        <p className="mt-1 text-sm text-muted">
          {t.quiet.intro}
        </p>
      </div>

      <div className="relative flex flex-col items-center gap-8 overflow-hidden rounded-3xl border border-accent/15 bg-[#1c1712] px-6 py-10 text-[#faf8f3] sm:py-14">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,var(--accent),transparent_65%)] opacity-20"
        />

        {/* Breathing circle: grows for 4s (breathe in), shrinks for 6s (breathe out). */}
        <div className="relative flex h-56 w-56 items-center justify-center">
          <span
            aria-hidden
            className={`absolute inset-0 rounded-full bg-accent/25 ${running ? "breathe" : "scale-75"}`}
          />
          <span
            aria-hidden
            className={`absolute inset-6 rounded-full bg-accent/30 ${running ? "breathe" : "scale-75"}`}
          />
          <div className="relative text-center">
            {running ? (
              <>
                <p className="font-serif text-4xl tabular-nums">{format(remaining)}</p>
                <p className="mt-1 grid text-xs uppercase tracking-[0.2em] text-accent">
                  <span className="breathe-in [grid-area:1/1]">{t.quiet.breatheIn}</span>
                  <span className="breathe-out [grid-area:1/1]">{t.quiet.breatheOut}</span>
                </p>
              </>
            ) : done ? (
              <p className="font-serif text-2xl">{t.quiet.amen}</p>
            ) : (
              <p className="font-serif text-4xl tabular-nums">{format(minutes * 60)}</p>
            )}
          </div>
        </div>

        <p className="relative min-h-[3.5rem] max-w-md text-center font-serif text-lg leading-relaxed text-[#faf8f3]/90">
          {running
            ? <Han>{PROMPTS[promptIndex]}</Han>
            : done
              ? <Han>{t.quiet.done}</Han>
              : <Han>{t.quiet.ready}</Han>}
        </p>

        {running ? (
          <button
            onClick={() => setEndsAt(null)}
            className="relative rounded-full border border-white/20 px-5 py-2 text-sm text-white/80 hover:text-white"
          >
            {t.quiet.stop}
          </button>
        ) : (
          <div className="relative flex flex-col items-center gap-4">
            <div className="flex gap-2">
              {DURATIONS.map((d) => (
                <button
                  key={d}
                  onClick={() => {
                    setMinutes(d);
                    setDone(false);
                  }}
                  className={`rounded-full px-4 py-1.5 text-sm transition-colors ${
                    minutes === d
                      ? "bg-accent font-medium text-white"
                      : "bg-white/10 text-white/80 hover:bg-white/15"
                  }`}
                >
                  {d} {t.quiet.min}
                </button>
              ))}
            </div>
            <button
              onClick={start}
              className="rounded-full bg-[#faf8f3] px-8 py-2.5 text-sm font-medium text-[#1c1712] transition-opacity hover:opacity-90"
            >
              {done ? t.quiet.again : t.quiet.start}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
