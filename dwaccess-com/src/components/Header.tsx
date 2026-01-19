// dwaccess-com/src/components/Header.tsx

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const nav = [
  { href: "/", label: "Accueil" },
  { href: "/services", label: "Services" },
  { href: "/projets", label: "Projets" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  // Bloque le scroll quand le menu mobile est ouvert
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <img
              src="/logo/logodwaccess.png"
            alt="Logo TAXI PREMIUM"
            className="image"
            />
          <span className="font-semibold tracking-tight">DWACCESS</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-white/80 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/devis"
            className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-black hover:bg-white/90"
          >
            Demander un devis
          </Link>
        </nav>

        {/* Mobile burger */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-xl border border-white/15 p-2 hover:bg-white/10 md:hidden"
          aria-label="Ouvrir le menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            {open ? (
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile drawer */}
      {open ? (
        <div className="md:hidden">
          <div className="border-t border-white/10 bg-black">
            <div className="mx-auto max-w-6xl px-4 py-4">
              <div className="flex flex-col gap-3">
                {nav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-xl px-3 py-3 text-sm text-white/90 hover:bg-white/10"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  href="/devis"
                  className="rounded-xl bg-white px-3 py-3 text-sm font-semibold text-black hover:bg-white/90"
                  onClick={() => setOpen(false)}
                >
                  Demander un devis
                </Link>
              </div>
            </div>
          </div>

          {/* Backdrop */}
          <button
            type="button"
            className="fixed inset-0 -z-10 bg-black/40"
            aria-label="Fermer le menu"
            onClick={() => setOpen(false)}
          />
        </div>
      ) : null}
    </header>
  );
}
