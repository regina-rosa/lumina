// What Lumina calls you, and small "celebrate" helper for cute moments.

const NAME_KEY = "lumina.name";

export function loadName(): string {
  if (typeof window === "undefined") return "";
  try {
    return window.localStorage.getItem(NAME_KEY) ?? "";
  } catch {
    return "";
  }
}

export function saveName(name: string) {
  try {
    window.localStorage.setItem(NAME_KEY, name.trim());
  } catch {}
}

// Fires the petal shower mounted in the root layout.
export function celebrate() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("lumina:celebrate"));
  }
}
