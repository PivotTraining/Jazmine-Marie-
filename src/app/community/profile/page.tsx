import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  User,
  Mail,
  ArrowUpRight,
  Shield,
  LogOut,
} from "lucide-react";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { getCurrentUser, getCurrentMembership } from "@/lib/auth";
import { MEMBERSHIP_TIERS } from "@/lib/constants";

// Member-specific content: never statically cache this page, or one
// member's dashboard could be served to another.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "My Profile — OvercomeHER Circle",
};

export default async function ProfilePage() {
  const user = await getCurrentUser();
  const membership = user ? await getCurrentMembership(user.id) : null;

  const tier = membership
    ? MEMBERSHIP_TIERS.find((t) => t.id === membership.tierId)
    : null;

  // The next tier up, if any — powers the upgrade button.
  const currentIndex = tier
    ? MEMBERSHIP_TIERS.findIndex((t) => t.id === tier.id)
    : -1;
  const nextTier =
    currentIndex >= 0 && currentIndex < MEMBERSHIP_TIERS.length - 1
      ? MEMBERSHIP_TIERS[currentIndex + 1]
      : null;

  const renewsOn = membership?.currentPeriodEnd
    ? new Date(membership.currentPeriodEnd).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : null;

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
              <div className="flex-1 min-w-0">
                <h2 className="text-2xl font-semibold text-warm-800 truncate">
                  {user?.fullName || "Your Profile"}
                </h2>
                {user?.email ? (
                  <p className="text-warm-400 font-[family-name:var(--font-body)] flex items-center gap-2 truncate">
                    <Mail className="h-4 w-4 flex-shrink-0" /> {user.email}
                  </p>
                ) : (
                  <p className="text-warm-400 font-[family-name:var(--font-body)]">
                    Sign in to see your account details.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Membership */}
          <div className="p-8 rounded-2xl bg-white border border-warm-100">
            <h3 className="text-lg font-semibold text-warm-800 flex items-center gap-2">
              <Shield className="h-5 w-5 text-plum-400" /> Membership
            </h3>

            {membership && tier ? (
              <>
                <div className="mt-4 p-4 rounded-xl bg-warm-50 flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p className="font-semibold text-warm-800 text-lg">
                      {tier.name}
                    </p>
                    <p className="text-sm text-warm-400 font-[family-name:var(--font-body)]">
                      ${tier.priceMonthly}/month
                      {renewsOn ? ` · Renews ${renewsOn}` : ""}
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-sage-100 text-sage-500 text-xs font-semibold uppercase tracking-wider font-[family-name:var(--font-body)] flex-shrink-0">
                    Active
                  </span>
                </div>
                <div className="mt-4 flex flex-wrap gap-3">
                  {nextTier && (
                    <Link href="/overcomeher/membership">
                      <Button variant="outline" size="sm">
                        <ArrowUpRight className="h-4 w-4" /> Upgrade to{" "}
                        {nextTier.name}
                      </Button>
                    </Link>
                  )}
                  <Link href="/contact">
                    <Button variant="ghost" size="sm">
                      Manage Billing
                    </Button>
                  </Link>
                </div>
              </>
            ) : (
              <>
                <p className="mt-4 text-warm-500 font-[family-name:var(--font-body)]">
                  You don&apos;t have an active membership yet. Choose a tier to
                  join the Circle.
                </p>
                <div className="mt-4">
                  <Link href="/overcomeher/membership">
                    <Button variant="primary" size="md">
                      View Membership Options{" "}
                      <ArrowUpRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </>
            )}
          </div>

          {/* Billing note — real invoices live in Stripe's customer portal */}
          <div className="p-6 rounded-2xl bg-white border border-warm-100">
            <p className="text-sm text-warm-500 font-[family-name:var(--font-body)]">
              Receipts and payment method changes are handled securely through
              Stripe. Reach out any time and we&apos;ll send you a direct link to
              your billing portal.
            </p>
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center">
            <Link
              href="/login"
              className="text-sm text-warm-400 hover:text-warm-600 font-[family-name:var(--font-body)] flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" /> Sign Out
            </Link>
            <Link
              href="/contact"
              className="text-sm text-rose-400 hover:text-rose-500 font-[family-name:var(--font-body)]"
            >
              Cancel Membership
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
