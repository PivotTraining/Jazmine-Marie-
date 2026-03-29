import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  User,
  Mail,
  CreditCard,
  ArrowUpRight,
  Shield,
  LogOut,
  Settings,
  Heart,
} from "lucide-react";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "My Profile — OvercomeHER Circle",
};

export default function ProfilePage() {
  return (
    <>
      <section className="bg-warm-800">
        <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
          <Link
            href="/community"
            className="inline-flex items-center gap-2 text-warm-300 hover:text-white transition-colors text-sm font-[family-name:var(--font-body)] mb-4"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Dashboard
          </Link>
          <h1 className="text-3xl font-semibold text-white">My Profile</h1>
        </div>
      </section>

      <Section variant="warm" size="md">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Profile Info */}
          <div className="p-8 rounded-2xl bg-white border border-warm-100">
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 rounded-2xl bg-plum-100 flex items-center justify-center flex-shrink-0">
                <User className="h-10 w-10 text-plum-400" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-warm-800">Member Name</h2>
                <p className="text-warm-400 font-[family-name:var(--font-body)] flex items-center gap-2">
                  <Mail className="h-4 w-4" /> member@example.com
                </p>
                <p className="mt-2 text-sm text-warm-400 font-[family-name:var(--font-body)]">
                  Member since March 2026
                </p>
              </div>
              <button className="text-warm-400 hover:text-warm-600">
                <Settings className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Membership */}
          <div className="p-8 rounded-2xl bg-white border border-warm-100">
            <h3 className="text-lg font-semibold text-warm-800 flex items-center gap-2">
              <Shield className="h-5 w-5 text-plum-400" /> Membership
            </h3>
            <div className="mt-4 p-4 rounded-xl bg-warm-50 flex items-center justify-between">
              <div>
                <p className="font-semibold text-warm-800 text-lg">Rooted Tier</p>
                <p className="text-sm text-warm-400 font-[family-name:var(--font-body)]">
                  $39/month &middot; Next billing: April 15, 2026
                </p>
              </div>
              <span className="px-3 py-1 rounded-full bg-sage-100 text-sage-500 text-xs font-semibold uppercase tracking-wider font-[family-name:var(--font-body)]">
                Active
              </span>
            </div>
            <div className="mt-4 flex gap-3">
              <Button variant="outline" size="sm">
                <ArrowUpRight className="h-4 w-4" /> Upgrade to Whole
              </Button>
              <Button variant="ghost" size="sm">
                Manage Billing
              </Button>
            </div>
          </div>

          {/* Billing */}
          <div className="p-8 rounded-2xl bg-white border border-warm-100">
            <h3 className="text-lg font-semibold text-warm-800 flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-plum-400" /> Billing History
            </h3>
            <div className="mt-4 space-y-3">
              {[
                { date: "Mar 15, 2026", amount: "$39.00", status: "Paid" },
                { date: "Feb 15, 2026", amount: "$39.00", status: "Paid" },
                { date: "Jan 15, 2026", amount: "$39.00", status: "Paid" },
              ].map((bill) => (
                <div
                  key={bill.date}
                  className="flex items-center justify-between py-3 border-b border-warm-100 last:border-0"
                >
                  <div>
                    <p className="text-sm font-medium text-warm-700 font-[family-name:var(--font-body)]">
                      {bill.date}
                    </p>
                    <p className="text-xs text-warm-400 font-[family-name:var(--font-body)]">
                      OvercomeHER Circle — Rooted
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-warm-700 font-[family-name:var(--font-body)]">
                      {bill.amount}
                    </p>
                    <p className="text-xs text-sage-400 font-[family-name:var(--font-body)]">
                      {bill.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center">
            <button className="text-sm text-warm-400 hover:text-warm-600 font-[family-name:var(--font-body)] flex items-center gap-2">
              <LogOut className="h-4 w-4" /> Sign Out
            </button>
            <button className="text-sm text-rose-400 hover:text-rose-500 font-[family-name:var(--font-body)]">
              Cancel Membership
            </button>
          </div>
        </div>
      </Section>
    </>
  );
}
