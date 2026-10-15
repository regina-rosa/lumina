"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useLang, useT } from "@/components/i18n";
import { LANGS, LANG_COOKIE, LANG_LABELS, type Lang } from "@/lib/i18n/config";

export function switchLang(to: Lang, pathname: string, push: (href: string) => void) {
  document.cookie = `${LANG_COOKIE}=${to}; path=/; max-age=31536000; samesite=lax`;
  const rest = pathname.replace(/^\/(en|id|zh)(?=\/|$)/, "");
  push(`/${to}${rest}${window.location.search}`);
}

export function usePinyin(): [boolean, (on: boolean) => void] {
  const [on, setOn] = useState(true);
  useEffect(() => {
    setOn(document.documentElement.dataset.pinyin !== "off");
  }, []);
  function set(next: boolean) {
    setOn(next);
    document.documentElement.dataset.pinyin = next ? "on" : "off";
    try {
      window.localStorage.setItem("lumina.pinyin", next ? "on" : "off");
    } catch {}
  }
  return [on, set];
}

// EN / ID / 中文 pill switcher, plus a pinyin toggle when Chinese is active.
export default function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const lang = useLang();
  const t = useT();
  const pathname = usePathname();
  const router = useRouter();
  const [pinyin, setPinyin] = usePinyin();

  return (
    <div className={`flex items-center ${compact ? "gap-1" : "flex-wrap gap-2"}`}>
      <div role="group" aria-label={t.nav.language} className="flex rounded-full border border-line bg-card p-0.5">
        {LANGS.map((l) => (
          <button
            key={l}
            onClick={() => l !== lang && switchLang(l, pathname, router.push)}
            aria-pressed={l === lang}
            title={LANG_LABELS[l].name}
            className={`rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${
              l === lang ? "bg-accent text-white" : "text-ink/60 hover:text-ink"
            }`}
          >
            {LANG_LABELS[l].short}
          </button>
        ))}
      </div>
      {lang === "zh" && (
        <button
          onClick={() => setPinyin(!pinyin)}
          aria-pressed={pinyin}
          title={t.settings.pinyinToggle}
          className={`rounded-full border px-2 py-1 text-xs transition-colors ${
            pinyin ? "border-accent/50 bg-accent/10 text-accent-strong" : "border-line text-ink/50"
          }`}
        >
          pīn
        </button>
      )}
    </div>
  );
}
