import Link from "next/link";
import { siteConfig } from "@/content/site";

function IconLinkedIn() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M6.94 6.5a1.94 1.94 0 1 1-3.88 0 1.94 1.94 0 0 1 3.88 0ZM3.5 21h3V9h-3v12ZM10 9h2.88v1.64h.04c.4-.76 1.38-1.56 2.84-1.56C18.9 9.08 20 10.4 20 13.2V21h-3v-7.02c0-1.67-.03-3.81-2.32-3.81-2.33 0-2.69 1.82-2.69 3.7V21h-3V9Z"
        fill="currentColor"
      />
    </svg>
  );
}

function IconWhatsApp() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M20.5 11.9c0 4.7-3.8 8.6-8.6 8.6-1.5 0-3-.4-4.3-1.1L3.5 20.5l1.2-4c-.8-1.3-1.3-2.9-1.3-4.6 0-4.7 3.8-8.6 8.6-8.6 4.7 0 8.5 3.9 8.5 8.6Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M9.2 8.8c.2-.4.3-.4.6-.4h.5c.2 0 .4.1.5.4l.6 1.5c.1.3.1.5-.1.7l-.4.5c-.1.1-.2.3-.1.5.2.6.8 1.4 1.4 2 .6.6 1.4 1.1 2 1.3.2.1.4 0 .5-.1l.5-.5c.2-.2.4-.2.7-.1l1.6.7c.3.1.4.3.4.5v.5c0 .3-.1.5-.4.7-.4.3-1.1.6-1.9.6-1.2 0-2.7-.5-4.4-2.1-1.6-1.6-2.3-3.2-2.3-4.4 0-.7.2-1.4.6-1.9Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black text-white">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-semibold">{siteConfig.legalName}</p>
            <p className="mt-1 text-sm text-white/70">
              {siteConfig.tagline} — {siteConfig.city}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-white/70">
            <Link href="/services" className="hover:text-white">Services</Link>
            <Link href="/projets" className="hover:text-white">Projets</Link>
            <Link href="/contact" className="hover:text-white">Contact</Link>
            <Link href="/mentions-legales" className="hover:text-white">Mentions légales</Link>

            <span className="mx-1 hidden h-5 w-px bg-white/15 md:inline-block" />

            {siteConfig.linkedin ? (
              <a
                href={siteConfig.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-3 py-2 text-white/80 hover:bg-white/10 hover:text-white"
                aria-label="LinkedIn"
              >
                <IconLinkedIn />
                <span className="hidden sm:inline">LinkedIn</span>
              </a>
            ) : null}

            {siteConfig.whatsapp ? (
              <a
                href={siteConfig.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-3 py-2 text-white/80 hover:bg-white/10 hover:text-white"
                aria-label="WhatsApp"
              >
                <IconWhatsApp />
                <span className="hidden sm:inline">WhatsApp</span>
              </a>
            ) : null}
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/60 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.legalName}. Tous droits réservés.
          </p>
          <p className="text-white/50">Next.js + Tailwind.</p>
        </div>
      </div>
    </footer>
  );
}
