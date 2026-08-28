"use client";

import { useEffect, useState } from "react";

function greetingFor(hour: number): string {
  if (hour < 11) return "Selamat pagi";
  if (hour < 15) return "Selamat siang";
  if (hour < 19) return "Selamat sore";
  return "Selamat malam";
}

export default function Greeting() {
  const [text, setText] = useState("Selamat datang kembali");

  useEffect(() => {
    setText(greetingFor(new Date().getHours()));
  }, []);

  return (
    <h1 className="font-serif text-2xl text-ink">{text}</h1>
  );
}
