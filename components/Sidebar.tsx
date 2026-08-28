"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/journal", label: "Journal" },
  { href: "/prayers", label: "Prayer List" },
  { href: "/favorites", label: "Favorites" },
  { href: "/devotionals", label: "Devotionals" },
  { href: "/write", label: "Write" },
  { href: "/settings", label: "Settings" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-56 shrink-0 flex-col border-r border-line bg-paper px-4 py-6">
      <div className="mb-8 flex items-center gap-2 px-2">
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
      </div>
      <nav className="flex flex-col gap-1">
        {links.map((link) => {
          const active =
            link.href === "/"
              ? pathname === "/"
              : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-md px-2 py-1.5 text-sm transition-colors ${
                active
                  ? "bg-accent/10 font-medium text-accent-strong"
                  : "text-ink/70 hover:bg-ink/5 hover:text-ink"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
      <p className="mt-auto px-2 text-xs leading-relaxed text-ink/40">
        &ldquo;Your word is a lamp to my feet.&rdquo;
        <br />
        Psalm 119:105
      </p>
    </aside>
  );
}
