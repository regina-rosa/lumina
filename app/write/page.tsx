"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  COVER_COLORS,
  getDevotional,
  upsertDevotional,
  type SharedDevotional,
} from "@/lib/devotionals";
import { buildShareUrl } from "@/lib/share";
import ArticleView from "@/components/ArticleView";

export default function WritePage() {
  const [id, setId] = useState<string | undefined>(undefined);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [verseRef, setVerseRef] = useState("");
  const [body, setBody] = useState("");
  const [coverColor, setCoverColor] = useState(COVER_COLORS[0].color);
  const [createdAt, setCreatedAt] = useState(() => new Date().toISOString());
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Load an existing devotional when editing (?id=…), and remember the author.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const editId = params.get("id") ?? undefined;
    if (editId) {
      const existing = getDevotional(editId);
      if (existing) {
        setId(existing.id);
        setTitle(existing.title);
        setAuthor(existing.author);
        setVerseRef(existing.verseRef);
        setBody(existing.body);
        setCoverColor(existing.coverColor);
        setCreatedAt(existing.createdAt);
        return;
      }
    }
    const savedAuthor = window.localStorage.getItem("lumina.author");
    if (savedAuthor) setAuthor(savedAuthor);
  }, []);

  const preview: SharedDevotional = useMemo(
    () => ({ title, author, verseRef, body, coverColor, createdAt }),
    [title, author, verseRef, body, coverColor, createdAt]
  );

  const canPublish = title.trim().length > 0 && body.trim().length > 0;

  function handlePublish() {
    if (!canPublish) return;
    const saved = upsertDevotional({
      id,
      title: title.trim(),
      author: author.trim(),
      verseRef: verseRef.trim(),
      body: body.trim(),
      coverColor,
    });
    setId(saved.id);
    setCreatedAt(saved.createdAt);
    window.localStorage.setItem("lumina.author", author.trim());
    setShareUrl(buildShareUrl(window.location.origin, saved));
    setCopied(false);
  }

  async function copyLink() {
    if (!shareUrl) return;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  const inputClass =
    "rounded-lg border border-line bg-paper px-4 py-2.5 text-sm text-ink outline-none placeholder:text-muted focus:border-accent/60";

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl text-ink">
            {id ? "Edit devotional" : "Write a devotional"}
          </h1>
          <p className="mt-1 text-sm text-muted">
            Craft a reflection and share it with anyone via a link.
          </p>
        </div>
        <Link
          href="/devotionals"
          className="text-sm text-muted hover:text-ink"
        >
          My devotionals
        </Link>
      </div>

      {/* Editor */}
      <div className="flex flex-col gap-3 rounded-2xl border border-line bg-card p-6">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className={`${inputClass} font-serif text-lg`}
        />
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Your name"
            className={`${inputClass} flex-1`}
          />
          <input
            value={verseRef}
            onChange={(e) => setVerseRef(e.target.value)}
            placeholder="Verse reference (optional)"
            className={`${inputClass} flex-1`}
          />
        </div>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Write your devotional… Leave a blank line between paragraphs."
          rows={10}
          className={`${inputClass} resize-none leading-relaxed`}
        />

        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs text-muted">Cover</span>
          {COVER_COLORS.map((c) => (
            <button
              key={c.id}
              onClick={() => setCoverColor(c.color)}
              aria-label={c.label}
              className="h-7 w-7 rounded-full transition-transform hover:scale-110"
              style={{
                backgroundColor: c.color,
                boxShadow:
                  coverColor === c.color
                    ? `0 0 0 2px var(--paper), 0 0 0 4px ${c.color}`
                    : undefined,
              }}
            />
          ))}
        </div>

        <div className="flex items-center gap-3 pt-1">
          <button
            onClick={handlePublish}
            disabled={!canPublish}
            className="rounded-full bg-accent px-5 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {id ? "Update & get link" : "Publish & get link"}
          </button>
          {!canPublish && (
            <span className="text-xs text-muted">
              Add a title and some text first.
            </span>
          )}
        </div>
      </div>

      {/* Share link */}
      {shareUrl && (
        <div className="flex flex-col gap-3 rounded-2xl border border-accent/30 bg-accent/[0.06] p-5">
          <p className="text-sm font-medium text-accent-strong">
            Your devotional is ready to share ✨
          </p>
          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              readOnly
              value={shareUrl}
              onFocus={(e) => e.target.select()}
              className="flex-1 rounded-lg border border-line bg-paper px-3 py-2 text-xs text-ink outline-none"
            />
            <div className="flex gap-2">
              <button
                onClick={copyLink}
                className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
              >
                {copied ? "Copied ✓" : "Copy link"}
              </button>
              <a
                href={shareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-line px-4 py-2 text-sm text-ink hover:bg-ink/5"
              >
                Open
              </a>
            </div>
          </div>
          <p className="text-xs text-muted">
            Anyone with this link can read it — no account needed.
          </p>
        </div>
      )}

      {/* Live preview */}
      <div className="flex flex-col gap-3">
        <p className="text-xs uppercase tracking-[0.2em] text-muted">Preview</p>
        <ArticleView devotional={preview} />
      </div>
    </div>
  );
}
