"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-warm-100">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex flex-col leading-tight"
          onClick={() => setMobileOpen(false)}
        >
          <span className="text-2xl font-semibold tracking-tight text-warm-800 font-[family-name:var(--font-sans)]">
            Jazmine Marie
          </span>
          <span className="text-[11px] uppercase tracking-[0.2em] text-warm-400 font-[family-name:var(--font-body)]">
            Host &middot; Speaker &middot; Healing Advocate
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-full text-sm font-medium font-[family-name:var(--font-body)] transition-colors whitespace-nowrap ${
                  active
                    ? "bg-warm-100 text-warm-800"
                    : "text-warm-600 hover:text-warm-800 hover:bg-warm-50"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="ml-2 flex items-center gap-2 flex-shrink-0">
            <Link
              href="/healing-style-quiz"
              className="px-4 py-2 rounded-full text-sm font-medium bg-blush-400 text-white hover:bg-blush-500 transition-colors font-[family-name:var(--font-body)] whitespace-nowrap"
            >
              Take the Quiz
            </Link>
            <Link
              href="/login"
              className="px-4 py-2 rounded-full text-sm font-medium bg-warm-800 text-white hover:bg-warm-900 transition-colors font-[family-name:var(--font-body)] whitespace-nowrap"
            >
              Sign In
            </Link>
          </div>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="lg:hidden p-2 rounded-lg text-warm-600 hover:bg-warm-100 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-warm-100 bg-white">
          <div className="space-y-1 px-6 py-4">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href || pathname.startsWith(link.href + "/");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-base font-medium font-[family-name:var(--font-body)] transition-colors ${
                    active
                      ? "bg-warm-100 text-warm-800"
                      : "text-warm-600 hover:text-warm-800 hover:bg-warm-50"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/healing-style-quiz"
              onClick={() => setMobileOpen(false)}
              className="block mt-2 px-4 py-3 rounded-lg text-base font-medium bg-blush-400 text-white text-center hover:bg-blush-500 transition-colors font-[family-name:var(--font-body)]"
            >
              Take the Quiz
            </Link>
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="block mt-2 px-4 py-3 rounded-lg text-base font-medium bg-warm-800 text-white text-center hover:bg-warm-900 transition-colors font-[family-name:var(--font-body)]"
            >
              Sign In
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
