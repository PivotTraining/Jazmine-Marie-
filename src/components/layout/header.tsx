"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const PRIMARY_LINKS = [
  { label: "About", href: "/about" },
  { label: "Speaking", href: "/speaking" },
  { label: "OvercomeHER", href: "/overcomeher" },
  { label: "Resources", href: "/resources" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const activeClass = (href: string) => pathname === href || pathname.startsWith(`${href}/`) ? "bg-pink-100 text-pink-700" : "text-cream-700 hover:text-berry-800 hover:bg-cream-100";

  return <header className="sticky top-0 z-50 bg-cream-50/90 backdrop-blur-md border-b border-cream-200"><nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8"><Link href="/" className="flex flex-col leading-tight" onClick={() => setMobileOpen(false)}><span className="text-2xl font-semibold tracking-tight text-berry-800">Jazmine Marie</span><span className="text-[11px] uppercase tracking-[0.2em] text-cream-500">Speaker · Facilitator · Founder of OvercomeHER</span></Link><div className="hidden lg:flex items-center gap-1">{PRIMARY_LINKS.map((link) => <Link key={link.href} href={link.href} className={`px-3 py-2 rounded-full text-sm font-medium transition-colors ${activeClass(link.href)}`}>{link.label}</Link>)}<Link href="/healing-style-quiz" className="ml-2 px-4 py-2 rounded-full text-sm font-medium bg-pink-500 text-white hover:bg-pink-600">Take the Quiz</Link><Link href="/login" className="px-3 py-2 text-sm font-medium text-berry-800 hover:text-pink-600">Sign In</Link></div><button type="button" className="lg:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)} aria-label={mobileOpen ? "Close menu" : "Open menu"}>{mobileOpen ? <X className="h-6 w-6"/> : <Menu className="h-6 w-6"/>}</button></nav>{mobileOpen && <div className="lg:hidden border-t border-cream-200 bg-cream-50"><div className="space-y-1 px-6 py-4">{PRIMARY_LINKS.map((link) => <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className={`block px-4 py-3 rounded-lg text-base font-medium ${activeClass(link.href)}`}>{link.label}</Link>)}<Link href="/healing-style-quiz" onClick={() => setMobileOpen(false)} className="block mt-2 px-4 py-3 rounded-lg bg-pink-500 text-white text-center">Take the Healing Style Quiz</Link><Link href="/login" onClick={() => setMobileOpen(false)} className="block px-4 py-3 text-center text-berry-800">Sign In</Link><Link href="/contact" onClick={() => setMobileOpen(false)} className="block px-4 py-3 text-center text-sm text-cream-500">Contact</Link></div></div>}</header>;
}
