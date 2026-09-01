import Link from "next/link";
import { NAV_LINKS, SOCIAL_LINKS, SITE_NAME } from "@/lib/constants";
import { NewsletterForm } from "./newsletter-form";

export function Footer() {
  const legal = [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    { label: "Membership Terms", href: "/membership-terms" },
    { label: "Wellness Disclaimer", href: "/wellness-disclaimer" },
  ];
  return (
    <footer className="bg-berry-800 text-berry-200"><div className="mx-auto max-w-7xl px-6 py-16 lg:px-8"><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12"><div className="lg:col-span-2"><Link href="/" className="text-2xl font-semibold text-white">{SITE_NAME}</Link><p className="mt-4 max-w-md text-berry-300">Practical conversations and experiences for women building self-trust, healthier patterns, emotional clarity, and a more grounded life.</p><div className="mt-6 flex flex-wrap gap-4 text-sm"><a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white">Instagram</a><a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-white">Facebook</a><a href={SOCIAL_LINKS.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-white">YouTube</a><a href={SOCIAL_LINKS.tiktok} target="_blank" rel="noopener noreferrer" className="hover:text-white">TikTok</a></div></div><div><h3 className="text-sm font-semibold uppercase tracking-wider text-berry-400">Navigate</h3><ul className="mt-4 space-y-2">{NAV_LINKS.map((link) => <li key={link.href}><Link href={link.href} className="text-berry-300 hover:text-white">{link.label}</Link></li>)}</ul></div><div><h3 className="text-sm font-semibold uppercase tracking-wider text-berry-400">Stay Connected</h3><p className="mt-4 text-sm text-berry-300">Get updates, reflections, and invitations delivered to your inbox.</p><NewsletterForm /></div></div><div className="mt-12 pt-8 border-t border-berry-700 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-berry-400"><span>&copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.</span><div className="flex flex-wrap justify-center gap-x-4 gap-y-2">{legal.map((item) => <Link key={item.href} href={item.href} className="hover:text-white">{item.label}</Link>)}</div></div></div></footer>
  );
}
