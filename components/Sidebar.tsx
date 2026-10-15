"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Han, useLang, useT } from "@/components/i18n";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { withLang } from "@/lib/i18n/config";
import type { UI } from "@/lib/i18n/ui";

function groups(t: UI): { title?: string; links: { href: string; label: string }[] }[] {
  return [
    { links: [{ href: "/", label: t.nav.home }] },
    {
      title: t.nav.forToday,
      links: [
        { href: "/feelings", label: t.nav.feelings },
        { href: "/letters", label: t.nav.letters },
        { href: "/quiet", label: t.nav.quiet },
      ],
    },
    {
      title: t.nav.readPlay,
      links: [
        { href: "/stories", label: t.nav.stories },
        { href: "/quiz", label: t.nav.quiz },
        { href: "/memorize", label: t.nav.memorize },
      ],
    },
    { title: t.nav.makeShare, links: [{ href: "/cards", label: t.nav.cards }] },
    { links: [{ href: "/settings", label: t.nav.settings }] },
  ];
}

function Logo() {
  const lang = useLang();
  return (
    <Link href={withLang(lang, "/")} className="flex items-center gap-2 px-2">
      <span
        aria-hidden
        className="h-2 w-2 rounded-full bg-accent"
        style={{ boxShadow: "0 0 10px 3px color-mix(in srgb, var(--accent) 55%, transparent)" }}
      />
      <span className="text-lg font-semibold tracking-tight text-ink">Lumina</span>
    </Link>
  );
}

function NavLinks({ pathname }: { pathname: string }) {
  const lang = useLang();
  const t = useT();
  // Path without the /en, /id or /zh prefix.
  const current = pathname.replace(/^\/(en|id|zh)(?=\/|$)/, "") || "/";

  return (
    <nav className="flex flex-col gap-4">
      {groups(t).map((group, gi) => (
        <div key={gi} className="flex flex-col gap-0.5">
          {group.title && (
            <p className="px-2 pb-1 font-hand text-lg leading-none text-accent-strong/80">{group.title}</p>
          )}
          {group.links.map((link) => {
            const active = link.href === "/" ? current === "/" : current.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={withLang(lang, link.href)}
                className={`rounded-md px-2 py-2 text-base transition-colors md:py-1.5 md:text-sm ${
                  active
                    ? "bg-accent/10 font-medium text-accent-strong"
                    : "text-ink/70 hover:bg-ink/5 hover:text-ink"
                }`}
              >
                <Han>{link.label}</Han>
              </Link>
            );
          })}
        </div>
      ))}
    </nav>
  );
}

export default function Sidebar() {
  const pathname = usePathname();
  const t = useT();
  const [open, setOpen] = useState(false);

  // Close the mobile menu after navigating.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Mobile: top bar with language switch and a menu toggle */}
      <header className="sticky top-0 z-30 border-b border-line bg-paper/90 backdrop-blur md:hidden">
        <div className="flex items-center justify-between gap-2 px-2 py-3">
          <Logo />
          <div className="flex items-center gap-1">
            <LanguageSwitcher compact />
            <button
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
              aria-expanded={open}
              className="rounded-md p-2 text-ink/70 hover:bg-ink/5 hover:text-ink"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current stroke-2">
                {open ? (
                  <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
                ) : (
                  <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
        {open && (
          <div className="max-h-[calc(100dvh-64px)] overflow-y-auto border-t border-line px-2 pb-4 pt-3">
            <NavLinks pathname={pathname} />
          </div>
        )}
      </header>

      {/* Desktop: fixed sidebar */}
      <aside className="hidden w-56 shrink-0 flex-col overflow-y-auto border-r border-line bg-paper px-4 py-6 md:flex">
        <div className="mb-6">
          <Logo />
        </div>
        <div className="mb-6 px-2">
          <LanguageSwitcher />
        </div>
        <NavLinks pathname={pathname} />
        <p className="mt-auto px-2 pt-6 text-xs leading-relaxed text-ink/40">
          {t.nav.footer}
          <br />
          {t.nav.footerRef}
        </p>
      </aside>
    </>
  );
}
