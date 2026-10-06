"use client";

import { useEffect, useState } from "react";

type Petal = {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  drift: number;
  spin: number;
  hue: string;
};

const HUES = ["var(--accent)", "#f9a8d4", "#fbcfe8", "#fda4af", "#fff1f2"];

// A soft shower of petals whenever something calls celebrate().
export default function Petals() {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    let nextId = 0;
    let clear: number | undefined;

    function shower() {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const batch = Array.from({ length: 28 }, () => ({
        id: nextId++,
        left: Math.random() * 100,
        delay: Math.random() * 0.8,
        duration: 2.6 + Math.random() * 1.8,
        size: 10 + Math.random() * 12,
        drift: (Math.random() - 0.5) * 160,
        spin: (Math.random() - 0.5) * 720,
        hue: HUES[Math.floor(Math.random() * HUES.length)],
      }));
      setPetals((p) => [...p, ...batch]);
      window.clearTimeout(clear);
      clear = window.setTimeout(() => setPetals([]), 5000);
    }

    window.addEventListener("lumina:celebrate", shower);
    return () => {
      window.removeEventListener("lumina:celebrate", shower);
      window.clearTimeout(clear);
    };
  }, []);

  if (petals.length === 0) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {petals.map((p) => (
        <span
          key={p.id}
          className="petal absolute -top-8"
          style={
            {
              left: `${p.left}%`,
              width: p.size,
              height: p.size * 0.8,
              background: p.hue,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              "--drift": `${p.drift}px`,
              "--spin": `${p.spin}deg`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
