import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  return [
    { url: `${base}/`, lastModified: new Date() },
    { url: `${base}/services`, lastModified: new Date() },
    { url: `${base}/projets`, lastModified: new Date() },
    { url: `${base}/mentions-legales`, lastModified: new Date() },
    { url: `${base}/devis`, lastModified: new Date() },
  ];
}
