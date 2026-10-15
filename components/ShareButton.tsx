"use client";

import { useState } from "react";
import { useT } from "@/components/i18n";

// Opens the phone's share sheet when available, otherwise copies the link.
export default function ShareButton({
  title,
  text,
  path,
  label,
  className = "",
}: {
  title: string;
  text?: string;
  path?: string; // defaults to the current page
  label?: string;
  className?: string;
}) {
  const t = useT();
  const [copied, setCopied] = useState(false);

  async function share() {
    const url = path ? new URL(path, window.location.origin).toString() : window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
      } catch {
        // closed the share sheet
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(text ? `${text}\n${url}` : url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {}
  }

  return (
    <button
      onClick={share}
      className={
        className ||
        "rounded-full bg-accent px-5 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
      }
    >
      {copied ? t.share.copied : `${label ?? t.share.share} 💌`}
    </button>
  );
}
