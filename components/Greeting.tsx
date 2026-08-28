"use client";

import { useEffect, useState } from "react";

function greetingFor(hour: number): string {
  if (hour < 11) return "Good morning";
  if (hour < 15) return "Good afternoon";
  if (hour < 19) return "Good evening";
  return "Good night";
}

export default function Greeting() {
  const [text, setText] = useState("Welcome back");

  useEffect(() => {
    setText(greetingFor(new Date().getHours()));
  }, []);

  return (
    <h1 className="font-serif text-2xl text-ink">{text}</h1>
  );
}
