"use client";

import { useEffect, useState } from "react";
import { loadName } from "@/lib/profile";

function greetingFor(hour: number): { hello: string; note: string } {
  if (hour < 5) return { hello: "still up", note: "He never sleeps, so you can 🌙" };
  if (hour < 11) return { hello: "good morning", note: "His mercies are brand new today ☀️" };
  if (hour < 15) return { hello: "good afternoon", note: "take a little pause with Him 🍵" };
  if (hour < 19) return { hello: "good evening", note: "you made it through today 🤍" };
  return { hello: "good night", note: "lay it all down, He's got tomorrow ✨" };
}

export default function Greeting() {
  const [text, setText] = useState<{ hello: string; note: string } | null>(null);
  const [name, setName] = useState("");

  useEffect(() => {
    setText(greetingFor(new Date().getHours()));
    setName(loadName());
  }, []);

  return (
    <div>
      <h1 className="font-serif text-2xl text-ink">
        {text ? text.hello : "welcome back"}
        {name && `, ${name}`} 🌸
      </h1>
      {text && (
        <p className="font-hand text-xl leading-tight text-accent-strong">{text.note}</p>
      )}
    </div>
  );
}
