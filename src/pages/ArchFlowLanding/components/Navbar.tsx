import { useRef } from "react";

import type { NavbarLink } from "../utils/types";

const links: NavbarLink[] = [
  { label: "Produto", id: "#produto" },
  { label: "Pilares", id: "#pilares" },
  { label: "Features", id: "#features" },
  { label: "Workflow", id: "#workflow" }
];

export default function Navbar() {
  const headerRef = useRef<HTMLElement | null>(null);

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    const headerH = headerRef.current?.offsetHeight ?? 72;
    const y = el.getBoundingClientRect().top + window.scrollY - headerH - 12;

    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <header
      ref={headerRef}
      className="af-separator-b sticky top-0 z-50 bg-transparent backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <a
          href="#top"
          className="inline-flex items-center gap-2"
          onClick={(event) => {
            event.preventDefault();
            scrollToId("top");
          }}
        >
          <img
            src="/archflow-logo.png"
            alt="ArchFlow"
            className="h-9 w-9  object-contain"
          />
          <span className="text-sm font-semibold tracking-tight text-white">
            ArchFlow<span className="text-white/60">.io</span>
          </span>
        </a>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <a
              key={link.id}
              href={link.id}
              className="text-sm text-white/70 hover:text-white hover:underline hover:decoration-[var(--af-primary)] hover:decoration-2 hover:underline-offset-8 transition"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
