export type Mode = "light" | "dark";

export type AccentOption = {
  id: string;
  label: string;
  color: string;
};

export const ACCENTS: AccentOption[] = [
  { id: "amber", label: "Amber", color: "#f59e0b" },
  { id: "orange", label: "Orange", color: "#f97316" },
  { id: "rose", label: "Rose", color: "#f43f5e" },
  { id: "blush", label: "Blush", color: "#ec4899" },
  { id: "violet", label: "Violet", color: "#8b5cf6" },
  { id: "sky", label: "Sky", color: "#0ea5e9" },
  { id: "emerald", label: "Emerald", color: "#10b981" },
];

export type ThemeState = {
  accent: string;
  mode: Mode;
};

export const DEFAULT_THEME: ThemeState = { accent: "amber", mode: "light" };

const STORAGE_KEY = "lumina.theme";

export function loadTheme(): ThemeState {
  if (typeof window === "undefined") return DEFAULT_THEME;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_THEME;
    const parsed = JSON.parse(raw) as Partial<ThemeState>;
    return {
      accent: parsed.accent ?? DEFAULT_THEME.accent,
      mode: parsed.mode === "dark" ? "dark" : "light",
    };
  } catch {
    return DEFAULT_THEME;
  }
}

export function applyTheme(theme: ThemeState) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.dataset.accent = theme.accent;
  root.dataset.mode = theme.mode;
}

export function saveTheme(theme: ThemeState) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(theme));
}
