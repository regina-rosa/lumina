import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_LANG, LANG_COOKIE, isLang, type Lang } from "@/lib/i18n/config";

// Pick a language from the saved choice, then the browser's preferences.
function preferredLang(request: NextRequest): Lang {
  const saved = request.cookies.get(LANG_COOKIE)?.value;
  if (isLang(saved)) return saved;
  const accepted = (request.headers.get("accept-language") ?? "")
    .split(",")
    .map((part) => part.split(";")[0].trim().toLowerCase());
  for (const tag of accepted) {
    if (tag.startsWith("zh")) return "zh";
    if (tag.startsWith("id") || tag.startsWith("in") || tag.startsWith("ms")) return "id";
    if (tag.startsWith("en")) return "en";
  }
  return DEFAULT_LANG;
}

// Every page lives under /en, /id or /zh. Paths without one (including old
// shared links like /stories/zacchaeus or /letters?l=cant-sleep) get the
// visitor's language added, keeping the query string.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const first = pathname.split("/")[1];
  if (isLang(first)) return;

  const url = request.nextUrl.clone();
  url.pathname = `/${preferredLang(request)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next internals and any file with an extension (favicon, images…).
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
