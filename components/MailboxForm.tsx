"use client";

import { useEffect, useRef, useState } from "react";
import { Han, useLang, useT } from "@/components/i18n";
import { celebrate } from "@/lib/profile";

const TYPES = ["story", "letter", "quiz", "feature", "prayer", "hi"] as const;
type Type = (typeof TYPES)[number];

export default function MailboxForm() {
  const lang = useLang();
  const t = useT().mailbox;
  const openedAt = useRef(0);
  const [type, setType] = useState<Type>("story");
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [share, setShare] = useState(true);
  const [website, setWebsite] = useState(""); // honeypot, hidden from people
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    openedAt.current = Date.now();
    // Pre-pick a type from links like /en/mailbox?type=story
    const fromUrl = new URLSearchParams(window.location.search).get("type");
    if (TYPES.includes(fromUrl as Type)) setType(fromUrl as Type);
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "sending") return;
    setError(null);
    setStatus("sending");
    try {
      const res = await fetch("/api/mailbox", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          type,
          message,
          name,
          share: type !== "prayer" && share,
          lang,
          website,
          elapsed: Date.now() - openedAt.current,
        }),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (!data.ok) throw new Error(data.error ?? "default");
      setStatus("sent");
      setMessage("");
      celebrate();
    } catch (err) {
      const code = err instanceof Error ? err.message : "default";
      setError(t.errors[code] ?? t.errors.default);
      setStatus("idle");
    }
  }

  if (status === "sent") {
    return (
      <div className="pop flex flex-col items-center gap-2 rounded-3xl border border-accent/25 bg-accent/[0.07] px-6 py-10 text-center">
        <span className="text-5xl" aria-hidden>
          💌
        </span>
        <p className="font-hand text-3xl leading-tight text-accent-strong">
          <Han>{t.thanks}</Han>
        </p>
        <p className="text-sm text-muted">{t.thanksSub}</p>
        <button
          onClick={() => {
            setStatus("idle");
            openedAt.current = Date.now();
          }}
          className="mt-3 rounded-full border border-line bg-card px-5 py-2 text-sm text-ink/80 hover:text-ink"
        >
          {t.another}
        </button>
      </div>
    );
  }

  const field =
    "rounded-lg border border-line bg-paper px-4 py-2.5 text-sm text-ink outline-none placeholder:text-muted focus:border-accent/60";

  return (
    <form
      onSubmit={submit}
      className="flex flex-col gap-5 rounded-3xl border border-line bg-card p-5 sm:p-7"
      style={{
        backgroundImage: "repeating-linear-gradient(transparent, transparent 31px, rgba(127,127,127,0.07) 32px)",
      }}
    >
      <fieldset className="flex flex-col gap-2">
        <legend className="mb-2 text-xs uppercase tracking-[0.2em] text-muted">{t.typeLabel}</legend>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {TYPES.map((id) => {
            const [emoji, label] = t.types[id];
            const active = type === id;
            return (
              <button
                type="button"
                key={id}
                onClick={() => setType(id)}
                aria-pressed={active}
                className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 text-left text-sm transition-colors ${
                  active
                    ? "border-accent bg-accent/10 font-medium text-accent-strong"
                    : "border-line bg-paper text-ink/75 hover:border-accent/40"
                }`}
              >
                <span aria-hidden className="text-lg">
                  {emoji}
                </span>
                <Han>{label}</Han>
              </button>
            );
          })}
        </div>
      </fieldset>

      <label className="flex flex-col gap-2">
        <span className="text-xs uppercase tracking-[0.2em] text-muted">{t.message}</span>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={t.placeholder}
          rows={5}
          maxLength={1000}
          required
          className={`${field} resize-none font-hand text-xl leading-snug`}
        />
        <span className="self-end text-[11px] text-muted">{message.length}/1000</span>
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-xs uppercase tracking-[0.2em] text-muted">{t.name}</span>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t.namePlaceholder}
          maxLength={40}
          className={field}
        />
      </label>

      {/* Honeypot: invisible to people, irresistible to bots. */}
      <input
        type="text"
        name="website"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />

      {type === "prayer" ? (
        <p className="rounded-xl bg-accent/[0.07] px-4 py-3 text-sm text-ink/80">{t.prayerNote}</p>
      ) : (
        <label className="flex items-start gap-3 text-sm text-ink/80">
          <input
            type="checkbox"
            checked={share}
            onChange={(e) => setShare(e.target.checked)}
            className="mt-0.5 h-4 w-4 accent-[var(--accent)]"
          />
          {t.share}
        </label>
      )}

      {error && <p className="rounded-xl bg-rose-400/15 px-4 py-3 text-sm text-rose-700">{error}</p>}

      <button
        type="submit"
        disabled={status === "sending" || message.trim().length < 3}
        className="self-start rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {status === "sending" ? t.sending : t.send}
      </button>
    </form>
  );
}
