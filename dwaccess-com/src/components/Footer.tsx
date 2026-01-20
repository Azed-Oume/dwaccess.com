// dwaccess-com/src/components/Footer.tsx

import Link from "next/link";
import { siteConfig } from "@/content/site";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black text-white">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-semibold">{siteConfig.legalName}</p>
            <p className="mt-1 text-sm text-white/70">
              {siteConfig.tagline}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-white/70">
            <Link href="/services" className="hover:text-white">Services</Link>
            <Link href="/projets" className="hover:text-white">Projets</Link>
            <Link href="/contact" className="hover:text-white">Contact</Link>
            <Link href="/mentions-legales" className="hover:text-white">Mentions légales</Link>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-white/70">
            {siteConfig.linkedin ? (
              <a
                href={siteConfig.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-3 py-2 text-white/80 hover:bg-white/10 hover:text-white"
                aria-label="LinkedIn"
              >
                <img
                  src="/logo/linkedin.png"
                  alt="Logo LinkedIn"
                  className="image-logo"
                />
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
                <img
                  src="/logo/whatsapp.png"
                  alt="Logo WhatsApp"
                  className="image-logo"
                />
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
