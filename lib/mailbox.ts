// Talks to the Google Apps Script web app behind the Lumina mailbox.
// The script URL and secret only live in server env vars, so visitors can
// never reach the Google Sheet directly. Server-only: don't import from
// client components.

export const NOTE_TYPES = ["story", "letter", "quiz", "feature", "prayer", "hi"] as const;
export type NoteType = (typeof NOTE_TYPES)[number];

export type WallNote = { time: string; type: NoteType; name: string; message: string; reply: string };

const URL_ENV = process.env.LUMINA_MAILBOX_URL;
const SECRET_ENV = process.env.LUMINA_MAILBOX_SECRET;

export function mailboxConfigured(): boolean {
  return Boolean(URL_ENV && SECRET_ENV);
}

export async function sendNote(note: {
  type: NoteType;
  name: string;
  message: string;
  lang: string;
  share: boolean;
  client: string;
}): Promise<{ ok: boolean; error?: string }> {
  if (!URL_ENV || !SECRET_ENV) return { ok: false, error: "not_configured" };
  try {
    const res = await fetch(URL_ENV, {
      method: "POST",
      headers: { "content-type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ ...note, secret: SECRET_ENV }),
      cache: "no-store",
    });
    return (await res.json()) as { ok: boolean; error?: string };
  } catch {
    return { ok: false, error: "unreachable" };
  }
}

// Approved notes for the wall, cached for a few minutes.
export async function getWallNotes(): Promise<WallNote[]> {
  if (!URL_ENV || !SECRET_ENV) return [];
  try {
    const url = `${URL_ENV}?secret=${encodeURIComponent(SECRET_ENV)}`;
    const res = await fetch(url, { next: { revalidate: 300 } });
    const data = (await res.json()) as { ok: boolean; notes?: WallNote[] };
    return data.ok && data.notes ? data.notes : [];
  } catch {
    return [];
  }
}
