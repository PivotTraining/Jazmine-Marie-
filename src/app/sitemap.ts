import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/about", "/speaking", "/overcomeher", "/overcomeher/membership", "/resources", "/contact", "/healing-style-quiz", "/privacy", "/terms", "/membership-terms", "/wellness-disclaimer"];
  return paths.map((path) => ({ url: `${SITE_URL}${path}`, lastModified: new Date(), changeFrequency: path === "" ? "weekly" : "monthly", priority: path === "" ? 1 : 0.7 }));
}
