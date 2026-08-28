"use client";

import { useEffect, useState } from "react";
import {
  ACCENTS,
  applyTheme,
  loadTheme,
  saveTheme,
  type Mode,
  type ThemeState,
} from "@/lib/theme";

export default function SettingsPage() {
  const [theme, setTheme] = useState<ThemeState | null>(null);

  useEffect(() => {
    setTheme(loadTheme());
  }, []);

  function update(next: ThemeState) {
    setTheme(next);
    applyTheme(next);
    saveTheme(next);
  }

  if (theme === null) {
    return <p className="text-sm text-muted">Loading settings...</p>;
  }

  const modes: { id: Mode; label: string; hint: string }[] = [
    { id: "light", label: "Light", hint: "Warm paper tones" },
    { id: "dark", label: "Dark", hint: "Easy on the eyes at night" },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-serif text-2xl text-ink">Settings</h1>
        <p className="mt-1 text-sm text-muted">
          Customize how Lumina looks for you.
        </p>
      </div>

      {/* Accent color */}
      <section className="flex flex-col gap-4 rounded-2xl border border-line bg-card p-6">
        <div>
          <h2 className="font-serif text-lg text-ink">Accent color</h2>
          <p className="text-sm text-muted">The primary color used throughout the app.</p>
        </div>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
          {ACCENTS.map((accent) => {
            const active = theme.accent === accent.id;
            return (
              <button
                key={accent.id}
                onClick={() => update({ ...theme, accent: accent.id })}
                aria-label={accent.label}
                className={`flex flex-col items-center gap-2 rounded-xl border p-3 transition-colors ${
                  active
                    ? "border-accent bg-accent/10"
                    : "border-line hover:bg-ink/5"
                }`}
              >
                <span
                  className="h-8 w-8 rounded-full shadow-sm"
                  style={{
                    backgroundColor: accent.color,
                    boxShadow: active
                      ? `0 0 12px 2px color-mix(in srgb, ${accent.color} 55%, transparent)`
                      : undefined,
                  }}
                />
                <span
                  className={`text-xs ${active ? "font-medium text-accent-strong" : "text-muted"}`}
                >
                  {accent.label}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Mode */}
      <section className="flex flex-col gap-4 rounded-2xl border border-line bg-card p-6">
        <div>
          <h2 className="font-serif text-lg text-ink">Display mode</h2>
          <p className="text-sm text-muted">Choose light or dark.</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {modes.map((m) => {
            const active = theme.mode === m.id;
            return (
              <button
                key={m.id}
                onClick={() => update({ ...theme, mode: m.id })}
                className={`flex flex-col items-start gap-1 rounded-xl border p-4 text-left transition-colors ${
                  active
                    ? "border-accent bg-accent/10"
                    : "border-line hover:bg-ink/5"
                }`}
              >
                <span
                  className={`text-sm font-medium ${active ? "text-accent-strong" : "text-ink"}`}
                >
                  {m.label}
                </span>
                <span className="text-xs text-muted">{m.hint}</span>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}
