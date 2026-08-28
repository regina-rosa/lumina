import type { SharedDevotional } from "./devotionals";

// URL-safe base64 encoding of a devotional so its full content lives inside
// the share link (no server needed). Handles UTF-8 correctly.

function toBase64Url(json: string): string {
  const bytes = new TextEncoder().encode(json);
  let binary = "";
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function fromBase64Url(encoded: string): string {
  const b64 = encoded.replace(/-/g, "+").replace(/_/g, "/");
  const binary = atob(b64);
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

export function encodeDevotional(devotional: SharedDevotional): string {
  return toBase64Url(JSON.stringify(devotional));
}

export function decodeDevotional(encoded: string): SharedDevotional | null {
  try {
    const parsed = JSON.parse(fromBase64Url(encoded)) as SharedDevotional;
    if (!parsed || typeof parsed.title !== "string") return null;
    return parsed;
  } catch {
    return null;
  }
}

export function buildShareUrl(
  origin: string,
  devotional: SharedDevotional
): string {
  return `${origin}/read#${encodeDevotional(devotional)}`;
}
