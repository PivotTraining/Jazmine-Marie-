import type { Metadata } from "next";
import localFont from "next/font/local";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from "@/lib/constants";
import "./globals.css";

// Use system font stacks that match the brand aesthetic.
// When deploying to production with internet access, swap these for:
//   import { Cormorant_Garamond, DM_Sans } from "next/font/google";
const serifFont = {
  variable: "--font-cormorant",
  style: { fontFamily: "'Georgia', 'Times New Roman', serif" },
};

const sansFont = {
  variable: "--font-dm-sans",
  style: { fontFamily: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif" },
};

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
    <html lang="en" className="h-full" style={{
      ["--font-cormorant" as string]: "'Georgia', 'Times New Roman', serif",
      ["--font-dm-sans" as string]: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
    }}>
      <body className="min-h-full flex flex-col antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
