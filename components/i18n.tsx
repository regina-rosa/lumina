"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { ui, type UI } from "@/lib/i18n/ui";
import type { Lang } from "@/lib/i18n/config";

const LangContext = createContext<Lang>("en");

export function LangProvider({ lang, children }: { lang: Lang; children: ReactNode }) {
  return <LangContext.Provider value={lang}>{children}</LangContext.Provider>;
}

export function useLang(): Lang {
  return useContext(LangContext);
}

export function useT(): UI {
  return ui[useContext(LangContext)];
}

type Segment = { text: string; py?: string };

// pinyin-pro is only downloaded when Chinese text is actually on screen.
let loader: Promise<typeof import("pinyin-pro")> | null = null;
function loadPinyin() {
  loader ??= import("pinyin-pro");
  return loader;
}

function useSegments(text: string, enabled: boolean): Segment[] | null {
  const [segments, setSegments] = useState<Segment[] | null>(null);
  useEffect(() => {
    if (!enabled || !/\p{Script=Han}/u.test(text)) {
      setSegments(null);
      return;
    }
    let cancelled = false;
    loadPinyin().then(({ pinyin }) => {
      if (cancelled) return;
      const chars = pinyin(text, { type: "all" }) as { origin: string; pinyin: string; isZh: boolean }[];
      const out: Segment[] = [];
      for (const c of chars) {
        if (c.isZh) out.push({ text: c.origin, py: c.pinyin });
        else if (out.length && out[out.length - 1].py === undefined) out[out.length - 1].text += c.origin;
        else out.push({ text: c.origin });
      }
      setSegments(out);
    });
    return () => {
      cancelled = true;
    };
  }, [text, enabled]);
  return segments;
}

// Renders text as-is, or with pinyin above each character when it's Chinese.
export function Han({ children, className }: { children: string; className?: string }) {
  const lang = useLang();
  const segments = useSegments(children, lang === "zh");
  if (!segments) return className ? <span className={className}>{children}</span> : <>{children}</>;
  return (
    <span className={className}>
      {segments.map((s, i) =>
        s.py ? (
          <ruby key={i}>
            {s.text}
            <rt>{s.py}</rt>
          </ruby>
        ) : (
          <span key={i}>{s.text}</span>
        ),
      )}
    </span>
  );
}
