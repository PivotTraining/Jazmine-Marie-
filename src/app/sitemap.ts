import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://jazmine-marie.vercel.app";
  const paths = ["", "/about", "/speaking", "/overcomeher", "/overcomeher/membership", "/resources", "/contact", "/healing-style-quiz", "/privacy", "/terms", "/membership-terms", "/wellness-disclaimer"];
  return paths.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
