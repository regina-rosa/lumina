"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { decodeDevotional } from "@/lib/share";
import type { SharedDevotional } from "@/lib/devotionals";
import ArticleView from "@/components/ArticleView";

export default function ReadPage() {
  const [state, setState] = useState<
    { status: "loading" } | { status: "ok"; devotional: SharedDevotional } | { status: "empty" }
  >({ status: "loading" });

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) {
      setState({ status: "empty" });
      return;
    }
    const devotional = decodeDevotional(hash);
    setState(devotional ? { status: "ok", devotional } : { status: "empty" });
  }, []);

  if (state.status === "loading") {
    return <p className="text-sm text-muted">Loading…</p>;
  }

  if (state.status === "empty") {
    return (
      <div className="rounded-2xl border border-dashed border-line bg-card p-10 text-center">
        <p className="text-sm text-muted">
          This devotional link is empty or invalid.
        </p>
        <Link
          href="/write"
          className="mt-4 inline-block rounded-full bg-accent px-5 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          Write your own
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <ArticleView devotional={state.devotional} />
      <div className="flex items-center justify-center gap-2 text-sm text-muted">
        <span>Written with</span>
        <Link href="/" className="font-medium text-accent-strong hover:text-accent">
          Lumina
        </Link>
      </div>
    </div>
  );
}
