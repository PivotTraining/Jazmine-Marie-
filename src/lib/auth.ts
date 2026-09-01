import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";

export interface CurrentUser {
  id: string;
  email: string;
  fullName: string;
  avatarUrl: string | null;
}

export interface CurrentMembership {
  tierId: string;
  tierName: string;
  status: string;
  currentPeriodEnd: string | null;
}

export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
      process.env.SUPABASE_SERVICE_ROLE_KEY
  );
}

export async function getCurrentUser(): Promise<CurrentUser | null> {
  if (!isSupabaseConfigured()) return null;

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("sb-access-token")?.value;
  if (!accessToken) return null;

  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    if (error || !user) return null;

    return {
      id: user.id,
      email: user.email ?? "",
      fullName: (user.user_metadata?.full_name as string | undefined) ?? user.email?.split("@")[0] ?? "",
      avatarUrl: (user.user_metadata?.avatar_url as string | undefined) ?? null,
    };
  } catch {
    return null;
  }
}

export async function getCurrentMembership(userId: string): Promise<CurrentMembership | null> {
  if (!isSupabaseConfigured()) return null;

  try {
    const { getServerSupabase } = await import("./supabase");
    const { data, error } = await getServerSupabase()
      .from("memberships")
      .select("tier_id, status, current_period_end, tiers(name)")
      .eq("user_id", userId)
      .in("status", ["active", "trialing"])
      .maybeSingle();

    if (error || !data) return null;
    const tier = data.tiers as unknown as { name?: string } | null;

    return {
      tierId: data.tier_id,
      tierName: tier?.name ?? data.tier_id,
      status: data.status,
      currentPeriodEnd: data.current_period_end,
    };
  } catch {
    return null;
  }
}

const TIER_RANK: Record<string, number> = { nurturher: 1, transformher: 2, ascendher: 3 };

export function tierAllows(memberTierId: string | null, requiredTier: string): boolean {
  if (!memberTierId) return false;
  return (TIER_RANK[memberTierId] ?? 0) >= (TIER_RANK[requiredTier] ?? 0);
}
