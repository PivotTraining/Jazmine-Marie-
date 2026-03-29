import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let _supabase: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (!_supabase) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) {
      throw new Error("Supabase URL and Anon Key must be set");
    }
    _supabase = createClient(url, key);
  }
  return _supabase;
}

// Database types (matching our schema)
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

export interface Tier {
  id: string;
  name: string;
  slug: string;
  description: string;
  price_monthly: number;
  price_yearly: number;
  stripe_price_id_monthly: string | null;
  stripe_price_id_yearly: string | null;
  features: string[];
  sort_order: number;
}

export interface Room {
  id: string;
  name: string;
  slug: string;
  description: string;
  type: "discussion" | "library" | "events" | "announcement";
  tier_required: string;
  icon: string;
  sort_order: number;
}

export interface Post {
  id: string;
  room_id: string;
  author_id: string;
  title: string;
  content: string;
  pinned: boolean;
  created_at: string;
  author?: Profile;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: "replay" | "worksheet" | "guide" | "audio" | "video";
  url: string;
  tier_required: string;
  room_id: string | null;
  created_at: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  duration: number;
  type: "workshop" | "gathering" | "teaching" | "special";
  tier_required: string;
  recording_url: string | null;
}

export interface SpeakingInquiry {
  id: string;
  name: string;
  email: string;
  organization: string;
  event_type: string;
  date: string;
  audience_size: string;
  message: string;
  created_at: string;
}
