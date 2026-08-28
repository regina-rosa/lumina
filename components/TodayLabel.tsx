"use client";

import { useEffect, useState } from "react";

export default function TodayLabel() {
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    const formatted = new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
    }).format(new Date());
    setLabel(formatted);
  }, []);

  return (
    <p className="text-sm text-muted">{label ?? " "}</p>
  );
}
