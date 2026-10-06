"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { feelings, getFeeling } from "@/lib/feelings";
import { loadCheckIns, todaysActivity, type ActivityKind } from "@/lib/activity";
import { dateKey } from "@/lib/journal";

const STEPS: { kind: ActivityKind; label: string; href: string }[] = [
  { kind: "checkin", label: "Check in", href: "/feelings" },
  { kind: "story", label: "Read a story", href: "/stories" },
  { kind: "quiet", label: "Quiet time", href: "/quiet" },
  { kind: "memorize", label: "Memorize", href: "/memorize" },
];

export default function DailyRhythm() {
  const [done, setDone] = useState<ActivityKind[] | null>(null);
  const [feelingId, setFeelingId] = useState<string | null>(null);

  useEffect(() => {
    setDone(todaysActivity());
    setFeelingId(loadCheckIns()[dateKey(new Date())]?.feeling ?? null);
  }, []);

  const todaysFeeling = feelingId ? getFeeling(feelingId) : undefined;

  return (
    <div className="rounded-2xl border border-line bg-card p-5 sm:p-6">
      <h2 className="font-serif text-lg text-ink">
        {todaysFeeling
          ? `Today you're feeling ${todaysFeeling.label.toLowerCase()} ${todaysFeeling.emoji}`
          : "How's your heart today?"}
      </h2>

      {todaysFeeling ? (
        <Link
          href="/feelings"
          className="mt-1 inline-block text-sm font-medium text-accent-strong hover:text-accent"
        >
          See verses for you →
        </Link>
      ) : (
        <div className="-mx-1 mt-3 flex gap-2 overflow-x-auto px-1 pb-1">
          {feelings.map((f) => (
            <Link
              key={f.id}
              href={`/feelings?f=${f.id}`}
              className="flex shrink-0 items-center gap-1.5 rounded-full border border-line bg-paper px-3 py-1.5 text-sm text-ink/80 hover:border-accent/40"
            >
              <span aria-hidden>{f.emoji}</span>
              {f.label}
            </Link>
          ))}
        </div>
      )}

      <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {STEPS.map((step) => {
          const complete = done?.includes(step.kind) ?? false;
          return (
            <Link
              key={step.kind}
              href={step.href}
              className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 text-sm transition-colors ${
                complete
                  ? "border-accent/30 bg-accent/10 text-accent-strong"
                  : "border-line text-ink/70 hover:border-accent/40 hover:text-ink"
              }`}
            >
              <span
                aria-hidden
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] ${
                  complete ? "bg-accent text-white" : "border border-line"
                }`}
              >
                {complete ? "✓" : ""}
              </span>
              {step.label}
            </Link>
          );
        })}
      </div>
      <p className="mt-3 text-xs text-muted">
        Any one of these keeps your streak going. No journaling required.
      </p>
    </div>
  );
}
