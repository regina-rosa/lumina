"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const groups: { title?: string; links: { href: string; label: string }[] }[] = [
  {
    links: [
      { href: "/", label: "Home" },
      { href: "/garden", label: "My Garden 🌷" },
    ],
  },
  {
    title: "for today",
    links: [
      { href: "/feelings", label: "For Your Heart" },
      { href: "/letters", label: "Open When… 💌" },
      { href: "/quiet", label: "Quiet Time" },
    ],
  },
  {
    title: "read & grow",
    links: [
      { href: "/stories", label: "Bible Stories" },
      { href: "/memorize", label: "Memorize" },
      { href: "/favorites", label: "Favorites" },
    ],
  },
  {
    title: "make & share",
    links: [
      { href: "/cards", label: "Verse Cards ✨" },
      { href: "/write", label: "Write" },
      { href: "/devotionals", label: "Devotionals" },
    ],
  },
  {
    title: "keep",
    links: [
      { href: "/journal", label: "Journal" },
      { href: "/prayers", label: "Prayer List" },
      { href: "/settings", label: "Settings" },
    ],
  },
];

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 px-2">
      <span
        aria-hidden
        className="h-2 w-2 rounded-full bg-accent"
        style={{
          boxShadow:
            "0 0 10px 3px color-mix(in srgb, var(--accent) 55%, transparent)",
        }}
      />
      <span className="text-lg font-semibold tracking-tight text-ink">
        Lumina
      </span>
    </Link>
  );
}

function NavLinks({ pathname }: { pathname: string }) {
  return (
    <nav className="flex flex-col gap-4">
      {groups.map((group, gi) => (
        <div key={gi} className="flex flex-col gap-0.5">
          {group.title && (
            <p className="px-2 pb-1 font-hand text-lg leading-none text-accent-strong/80">
              {group.title}
            </p>
          )}
          {group.links.map((link) => {
            const active =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-md px-2 py-2 text-base transition-colors md:py-1.5 md:text-sm ${
                  active
                    ? "bg-accent/10 font-medium text-accent-strong"
                    : "text-ink/70 hover:bg-ink/5 hover:text-ink"
                }`}
              >
                {link.label}
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
  const [open, setOpen] = useState(false);

  // Close the mobile menu after navigating.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Mobile: top bar with a menu toggle */}
      <header className="sticky top-0 z-30 border-b border-line bg-paper/90 backdrop-blur md:hidden">
        <div className="flex items-center justify-between px-2 py-3">
          <Logo />
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
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
        {open && (
          <div className="max-h-[calc(100dvh-64px)] overflow-y-auto border-t border-line px-2 pb-4 pt-3">
            <NavLinks pathname={pathname} />
          </div>
        )}
      </header>

      {/* Desktop: fixed sidebar */}
      <aside className="hidden w-56 shrink-0 flex-col overflow-y-auto border-r border-line bg-paper px-4 py-6 md:flex">
        <div className="mb-8">
          <Logo />
        </div>
        <NavLinks pathname={pathname} />
        <p className="mt-auto px-2 pt-6 text-xs leading-relaxed text-ink/40">
          &ldquo;Your word is a lamp to my feet.&rdquo; 🤍
          <br />
          Psalm 119:105
        </p>
      </aside>
    </>
  );
}
