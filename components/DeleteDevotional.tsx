"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteDevotional({ id }: { id: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function handleDelete() {
    if (!window.confirm("Delete this devotional? This cannot be undone.")) {
      return;
    }
    setBusy(true);
    try {
      await fetch(`/api/devotionals/${id}`, { method: "DELETE" });
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={busy}
      className="text-muted hover:text-red-600 disabled:opacity-50"
    >
      {busy ? "Deleting…" : "Delete"}
    </button>
  );
}
