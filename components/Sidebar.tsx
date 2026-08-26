"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Beranda" },
  { href: "/journal", label: "Jurnal" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-56 shrink-0 flex-col border-r border-black/10 bg-[#faf8f3] px-4 py-6">
      <div className="mb-8 flex items-center gap-2 px-2">
        <span
          aria-hidden
          className="h-2 w-2 rounded-full bg-amber-500 shadow-[0_0_10px_3px_rgba(217,119,6,0.55)]"
        />
        <span className="text-lg font-semibold tracking-tight text-[#1c1917]">
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
                  ? "bg-amber-500/10 font-medium text-amber-800"
                  : "text-[#1c1917]/70 hover:bg-black/5 hover:text-[#1c1917]"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
      <p className="mt-auto px-2 text-xs leading-relaxed text-[#1c1917]/40">
        &ldquo;Firman-Mu itu pelita bagi kakiku.&rdquo;
        <br />
        Mazmur 119:105
      </p>
    </aside>
  );
}
