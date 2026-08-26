import Link from "next/link";

const links = [{ href: "/", label: "Journal" }];

export default function Sidebar() {
  return (
    <aside className="flex w-56 shrink-0 flex-col border-r border-black/10 bg-[#faf8f3] px-4 py-6">
      <span className="mb-8 px-2 text-lg font-semibold tracking-tight text-[#1c1917]">
        Lumina
      </span>
      <nav className="flex flex-col gap-1">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-md px-2 py-1.5 text-sm text-[#1c1917]/80 transition-colors hover:bg-black/5 hover:text-[#1c1917]"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
