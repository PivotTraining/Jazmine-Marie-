import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let _serverSupabase: SupabaseClient | null = null;

/**
 * Server-side Supabase client using service role key.
 * Use this for API routes that need to write data (forms, webhooks).
 */
export function getServerSupabase(): SupabaseClient {
  if (!_serverSupabase) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !serviceKey) {
      throw new Error("Supabase URL and Service Role Key must be set");
    }
    _serverSupabase = createClient(url, serviceKey);
  }
  return _serverSupabase;
}

let _browserSupabase: SupabaseClient | null = null;

/**
 * Browser-side Supabase client using anon key.
 * Use this for client components (auth, reads).
 */
export function getBrowserSupabase(): SupabaseClient {
  if (!_browserSupabase) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !anonKey) {
      throw new Error("Supabase URL and Anon Key must be set");
    }
    _browserSupabase = createClient(url, anonKey);
  }
  return _browserSupabase;
}

// Database types
export interface Profile {
  id: string;
  email: string;
  full_name: string;
  avatar_url: string | null;
  bio: string | null;
  created_at: string;
}

export interface Membership {
  id: string;
  user_id: string;
  tier_id: string;
  stripe_subscription_id: string | null;
  status: "active" | "canceled" | "past_due" | "trialing";
  current_period_end: string | null;
}
