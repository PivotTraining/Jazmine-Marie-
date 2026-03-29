import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from "@/lib/constants";
import "./globals.css";

// Google Fonts will load in production on Vercel.
// In local/sandbox builds without internet, the CSS variables
// fall back to the system font stacks defined in globals.css.
let fontClasses = "";
try {
  // Dynamic import to avoid build failure when fonts can't be fetched
  const { Cormorant_Garamond, DM_Sans } = require("next/font/google");
  const cormorant = Cormorant_Garamond({
    variable: "--font-cormorant",
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    display: "swap",
  });
  const dmSans = DM_Sans({
    variable: "--font-dm-sans",
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    display: "swap",
  });
  fontClasses = `${cormorant.variable} ${dmSans.variable}`;
} catch {
  // Fonts unavailable — use system fallbacks
}

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} — Host. Speaker. Healing Advocate.`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fontClasses} h-full`}
      style={{
        ["--font-cormorant" as string]: fontClasses
          ? undefined
          : "'Georgia', 'Times New Roman', serif",
        ["--font-dm-sans" as string]: fontClasses
          ? undefined
          : "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
      }}
    >
      <body className="min-h-full flex flex-col antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
