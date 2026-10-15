"use client";

import { useEffect, useState } from "react";
import { loadName } from "@/lib/profile";
import { Han, useT } from "@/components/i18n";
import type { UI } from "@/lib/i18n/ui";

function greetingFor(hour: number, t: UI): string[] {
  if (hour < 5) return t.greeting.late;
  if (hour < 11) return t.greeting.morning;
  if (hour < 15) return t.greeting.afternoon;
  if (hour < 19) return t.greeting.evening;
  return t.greeting.night;
}

export default function Greeting() {
  const t = useT();
  const [hour, setHour] = useState<number | null>(null);
  const [name, setName] = useState("");

  useEffect(() => {
    setHour(new Date().getHours());
    setName(loadName());
  }, []);

  const text = hour === null ? null : greetingFor(hour, t);

  return (
    <div>
      <h1 className="font-serif text-2xl text-ink">
        <Han>{text ? text[0] : t.greeting.welcome}</Han>
        {name && `, ${name}`} 🌸
      </h1>
      {text && (
        <p className="font-hand text-xl leading-tight text-accent-strong">
          <Han>{text[1]}</Han>
        </p>
      )}
    </div>
  );
}
