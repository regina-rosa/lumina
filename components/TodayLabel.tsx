"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/components/i18n";
import { LANG_LABELS } from "@/lib/i18n/config";

export default function TodayLabel() {
  const lang = useLang();
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    const formatted = new Intl.DateTimeFormat(LANG_LABELS[lang].locale, {
      weekday: "long",
      day: "numeric",
      month: "long",
    }).format(new Date());
    setLabel(formatted);
  }, [lang]);

  return <p className="text-sm text-muted">{label ?? " "}</p>;
}
