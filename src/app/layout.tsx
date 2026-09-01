import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SITE_NAME } from "@/lib/constants";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://jazmine-marie.vercel.app";
const siteDescription = "Jazmine Marie is a speaker, facilitator, and founder of OvercomeHER, creating practical experiences for women building self-trust, healthier patterns, emotional clarity, and meaningful growth.";

let fontClasses = "";
try {
  const { Cormorant_Garamond, DM_Sans, Great_Vibes } = require("next/font/google");
  const cormorant = Cormorant_Garamond({ variable: "--font-cormorant", subsets: ["latin"], weight: ["300", "400", "500", "600", "700"], display: "swap" });
  const dmSans = DM_Sans({ variable: "--font-dm-sans", subsets: ["latin"], weight: ["300", "400", "500", "600", "700"], display: "swap" });
  const greatVibes = Great_Vibes({ variable: "--font-script", subsets: ["latin"], weight: ["400"], display: "swap" });
  fontClasses = `${cormorant.variable} ${dmSans.variable} ${greatVibes.variable}`;
} catch {
  // Fonts unavailable — use system fallbacks.
}

export const metadata: Metadata = {
  title: { default: `${SITE_NAME} — Speaker · Facilitator · Founder of OvercomeHER`, template: `%s | ${SITE_NAME}` },
  description: siteDescription,
  metadataBase: new URL(siteUrl),
  openGraph: { title: SITE_NAME, description: siteDescription, url: siteUrl, siteName: SITE_NAME, type: "website" },
  twitter: { card: "summary_large_image", title: SITE_NAME, description: siteDescription },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fontClasses} h-full`} style={{
      ["--font-cormorant" as string]: fontClasses ? undefined : "'Georgia', 'Times New Roman', serif",
      ["--font-dm-sans" as string]: fontClasses ? undefined : "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
      ["--font-script" as string]: fontClasses ? undefined : "'Brush Script MT', 'Segoe Script', cursive",
    }}>
      <body className="min-h-full flex flex-col antialiased"><Header /><main className="flex-1">{children}</main><Footer /></body>
    </html>
  );
}
