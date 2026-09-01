import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://jazmine-marie.vercel.app";
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/community/", "/api/"] }],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
