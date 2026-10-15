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
import { loadName, saveName } from "@/lib/profile";
import { Han, useLang, useT } from "@/components/i18n";
import { switchLang, usePinyin } from "@/components/LanguageSwitcher";
import { LANGS, LANG_LABELS } from "@/lib/i18n/config";
import { usePathname, useRouter } from "next/navigation";

export default function SettingsPage() {
  const lang = useLang();
  const t = useT();
  const pathname = usePathname();
  const router = useRouter();
  const [pinyin, setPinyin] = usePinyin();
  const [theme, setTheme] = useState<ThemeState | null>(null);
  const [name, setName] = useState("");

  useEffect(() => {
    setTheme(loadTheme());
    setName(loadName());
  }, []);

  function update(next: ThemeState) {
    setTheme(next);
    applyTheme(next);
    saveTheme(next);
  }

  if (theme === null) {
    return <p className="text-sm text-muted">{t.settings.loading}</p>;
  }

  const modes: { id: Mode; label: string; hint: string }[] = [
    { id: "light", label: t.settings.light[0], hint: t.settings.light[1] },
    { id: "dark", label: t.settings.dark[0], hint: t.settings.dark[1] },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-serif text-2xl text-ink">
          <Han>{t.settings.title}</Han>
        </h1>
        <p className="mt-1 text-sm text-muted">{t.settings.intro}</p>
      </div>

      <section className="flex flex-col gap-4 rounded-2xl border border-line bg-card p-6">
        <div>
          <h2 className="font-serif text-lg text-ink">
            <Han>{t.settings.langTitle}</Han>
          </h2>
          <p className="text-sm text-muted">{t.settings.langHint}</p>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {LANGS.map((l) => (
            <button
              key={l}
              onClick={() => l !== lang && switchLang(l, pathname, router.push)}
              className={`flex flex-col items-center gap-1 rounded-xl border p-3 transition-colors ${
                l === lang ? "border-accent bg-accent/10 text-accent-strong" : "border-line text-ink hover:bg-ink/5"
              }`}
            >
              <span className="text-lg font-semibold">{LANG_LABELS[l].short}</span>
              <span className="text-xs text-muted">{LANG_LABELS[l].name}</span>
            </button>
          ))}
        </div>
        {lang === "zh" && (
          <label className="flex items-center gap-3 text-sm text-ink">
            <input
              type="checkbox"
              checked={pinyin}
              onChange={(e) => setPinyin(e.target.checked)}
              className="h-4 w-4 accent-[var(--accent)]"
            />
            {t.settings.pinyinToggle}
          </label>
        )}
      </section>

      <section className="flex flex-col gap-4 rounded-2xl border border-line bg-card p-6">
        <div>
          <h2 className="font-serif text-lg text-ink">
            <Han>{t.settings.nameTitle}</Han>
          </h2>
          <p className="text-sm text-muted">{t.settings.nameHint}</p>
        </div>
        <input
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            saveName(e.target.value);
          }}
          placeholder={t.settings.namePlaceholder}
          maxLength={24}
          className="rounded-lg border border-line bg-paper px-4 py-2.5 text-sm text-ink outline-none placeholder:text-muted focus:border-accent/60"
        />
        {name.trim() && (
          <p className="font-hand text-2xl text-accent-strong">{t.settings.hi(name.trim())}</p>
        )}
      </section>

      <section className="flex flex-col gap-4 rounded-2xl border border-line bg-card p-6">
        <div>
          <h2 className="font-serif text-lg text-ink">
            <Han>{t.settings.accentTitle}</Han>
          </h2>
          <p className="text-sm text-muted">{t.settings.accentHint}</p>
        </div>
        <div className="grid grid-cols-4 gap-3 sm:grid-cols-7">
          {ACCENTS.map((accent) => {
            const active = theme.accent === accent.id;
            return (
              <button
                key={accent.id}
                onClick={() => update({ ...theme, accent: accent.id })}
                aria-label={t.settings.accents[accent.id] ?? accent.label}
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
                  {t.settings.accents[accent.id] ?? accent.label}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Mode */}
      <section className="flex flex-col gap-4 rounded-2xl border border-line bg-card p-6">
        <div>
          <h2 className="font-serif text-lg text-ink">
            <Han>{t.settings.modeTitle}</Han>
          </h2>
          <p className="text-sm text-muted">{t.settings.modeHint}</p>
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
