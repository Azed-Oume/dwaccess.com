// dwaccess-com/src/app/layout.tsx

import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { siteConfig } from "@/content/site";
import ClientShell from "./ClientShell";

export const viewport: Viewport = {
  themeColor: "#070A0F",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),

  // ✅ PWA
  manifest: "/manifest.webmanifest",
  applicationName: "DWACCESS",

  // ✅ iOS Add-to-Home-Screen
  appleWebApp: {
    capable: true,
    title: "DWACCESS",
    statusBarStyle: "black-translucent",
  },

  // ✅ Empêche Safari iOS de transformer tel/mail/adresse en liens
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },

  // ✅ Icônes
  icons: {
  icon: [
    { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
    { url: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" },
  ],
  apple: [
    { url: "/icons/apple-touch-icon-180x180.png", sizes: "180x180", type: "image/png" },
  ],
},


  // --- ton SEO existant ---
  title: {
    default: `${siteConfig.tagline} | ${siteConfig.name}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.subheadline,
  openGraph: {
    title: `${siteConfig.tagline} | ${siteConfig.name}`,
    description: siteConfig.subheadline,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: siteConfig.name }],
    locale: "fr_FR",
    type: "website",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: siteConfig.url },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body suppressHydrationWarning className="min-h-dvh antialiased flex flex-col">
        <ClientShell>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ClientShell>
      </body>
    </html>
  );
}
