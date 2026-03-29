import Link from "next/link";
import { Globe, Share, Video } from "lucide-react";
import { NAV_LINKS, SOCIAL_LINKS, SITE_NAME } from "@/lib/constants";
import { NewsletterForm } from "./newsletter-form";

export function Footer() {
  return (
    <footer className="bg-warm-800 text-warm-200">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-semibold text-white font-[family-name:var(--font-sans)]">
                {SITE_NAME}
              </span>
            </Link>
            <p className="mt-4 max-w-md text-warm-300 font-[family-name:var(--font-body)] leading-relaxed">
              Creating transformative spaces where women find healing, wholeness,
              and the courage to become who they were always meant to be.
            </p>
            <div className="mt-6 flex gap-4">
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-warm-700 text-warm-300 hover:bg-warm-600 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Globe className="h-5 w-5" />
              </a>
              <a
                href={SOCIAL_LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-warm-700 text-warm-300 hover:bg-warm-600 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Share className="h-5 w-5" />
              </a>
              <a
                href={SOCIAL_LINKS.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-warm-700 text-warm-300 hover:bg-warm-600 hover:text-white transition-colors"
                aria-label="YouTube"
              >
                <Video className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-warm-400 font-[family-name:var(--font-body)]">
              Navigate
            </h3>
            <ul className="mt-4 space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-warm-300 hover:text-white transition-colors font-[family-name:var(--font-body)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-warm-400 font-[family-name:var(--font-body)]">
              Stay Connected
            </h3>
            <p className="mt-4 text-sm text-warm-300 font-[family-name:var(--font-body)]">
              Get encouragement, updates, and invitations delivered to your inbox.
            </p>
            <NewsletterForm />
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-warm-700 text-center text-sm text-warm-400 font-[family-name:var(--font-body)]">
          &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
