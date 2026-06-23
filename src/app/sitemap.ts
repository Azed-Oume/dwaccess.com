import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();
  return [
    { url: `${base}/`,                                       lastModified: now, priority: 1.0 },
    { url: `${base}/services`,                               lastModified: now, priority: 0.9 },
    { url: `${base}/services/creation-site-internet`,        lastModified: now, priority: 0.9 },
    { url: `${base}/services/developpement-application-web`, lastModified: now, priority: 0.9 },
    { url: `${base}/services/seo-technique`,                 lastModified: now, priority: 0.8 },
    { url: `${base}/services/deploiement-maintenance`,       lastModified: now, priority: 0.8 },
    { url: `${base}/projets`,                                lastModified: now, priority: 0.8 },
    { url: `${base}/devis`,                                  lastModified: now, priority: 0.7 },
    { url: `${base}/mentions-legales`,                       lastModified: now, priority: 0.2 },
  ];
}
