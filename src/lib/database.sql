-- OvercomeHER Circle Database Schema
-- Run this in your Supabase SQL editor to set up the database

-- Enable UUID generation
create extension if not exists "uuid-ossp";

-- Profiles (extends Supabase auth.users)
create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  email text not null,
  full_name text not null default '',
  avatar_url text,
  bio text,
  created_at timestamptz default now() not null
);

alter table public.profiles enable row level security;
create policy "Public profiles are viewable by everyone" on public.profiles for select using (true);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);

-- Tiers
create table public.tiers (
  id text primary key,
  name text not null,
  slug text unique not null,
  description text not null default '',
  price_monthly integer not null default 0,
  price_yearly integer not null default 0,
  stripe_price_id_monthly text,
  stripe_price_id_yearly text,
  features jsonb not null default '[]',
  sort_order integer not null default 0
);

alter table public.tiers enable row level security;
create policy "Tiers are viewable by everyone" on public.tiers for select using (true);

-- Seed tiers
-- Prices are stored in cents to avoid floating-point rounding on money.
insert into public.tiers (id, name, slug, description, price_monthly, price_yearly, features, sort_order) values
  ('nurturher', 'NurturHER', 'nurturher', 'A gentle, self-paced entry into your healing journey', 1997, 19900, '["Monthly healing theme + journaling prompts", "Access to community support spaces", "Guided challenges for building habits", "Entry to the ReadHER Book Club", "Monthly group gathering (virtual)"]', 1),
  ('transformher', 'TransformHER', 'transformher', 'For the woman who''s doing the work and ready for more', 4797, 47900, '["Everything in NurturHER, plus:", "Monthly Live Community Sessions", "Guided group reflection + intentional conversation", "Weekly journal prompts + accountability check-ins", "Integration activities + practice space", "Priority event access"]', 2),
  ('ascendher', 'AscendHER', 'ascendher', 'High-touch coaching, deep transformation, intimate access', 9700, 97000, '["Everything in TransformHER, plus:", "Live Coaching with Jazmine + Chris Marvel", "Private coaching community for direct support", "Hot seat coaching + Q&A sessions", "Exclusive Deep Work exercises & assignments", "VIP access to live events"]', 3);

-- Memberships
create table public.memberships (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  tier_id text references public.tiers(id) not null,
  stripe_subscription_id text,
  status text not null default 'active' check (status in ('active', 'canceled', 'past_due', 'trialing')),
  current_period_end timestamptz,
  created_at timestamptz default now() not null
);

alter table public.memberships enable row level security;
create policy "Users can view own membership" on public.memberships for select using (auth.uid() = user_id);
create policy "Service role can manage memberships" on public.memberships for all using (auth.role() = 'service_role');

-- Rooms
create table public.rooms (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  slug text unique not null,
  description text not null default '',
  type text not null default 'discussion' check (type in ('discussion', 'library', 'events', 'announcement')),
  tier_required text references public.tiers(id) not null,
  icon text not null default 'MessageCircle',
  sort_order integer not null default 0
);

alter table public.rooms enable row level security;
create policy "Rooms are viewable by authenticated users" on public.rooms for select using (auth.role() = 'authenticated');

-- Seed rooms (must match COMMUNITY_ROOMS in src/lib/constants.ts)
insert into public.rooms (name, slug, description, type, tier_required, icon, sort_order) values
  ('Welcome Room', 'welcome', 'Introduce yourself and get welcomed into the community.', 'discussion', 'nurturher', 'Heart', 1),
  ('Monthly Theme', 'monthly-theme', 'Each month we explore a new healing or growth theme together.', 'discussion', 'nurturher', 'Sparkles', 2),
  ('Prayer & Encouragement', 'prayer-encouragement', 'A sacred space to share prayer requests and uplift one another.', 'discussion', 'nurturher', 'HandHeart', 3),
  ('ReadHER Book Club', 'book-club', 'Monthly reads and devotional studies for soul-deep growth.', 'discussion', 'nurturher', 'BookMarked', 4),
  ('Journaling & Reflection', 'journaling', 'Guided prompts and space for deep personal reflection.', 'discussion', 'transformher', 'BookOpen', 5),
  ('Healing Conversations', 'healing-conversations', 'Real talk about real healing — shame, guilt, identity, and becoming.', 'discussion', 'transformher', 'MessageCircle', 6),
  ('Teaching Replays', 'replays', 'Full library of past workshops, teachings, and live session recordings.', 'library', 'transformher', 'Play', 7),
  ('Moms, Marriage & Womanhood', 'moms-marriage-womanhood', 'For the woman navigating motherhood, marriage, and identity.', 'discussion', 'transformher', 'Users', 8),
  ('Announcements', 'announcements', 'Community news, upcoming events, and important updates.', 'announcement', 'nurturher', 'Megaphone', 9),
  ('Events & Live Sessions', 'events', 'Upcoming live gatherings, workshops, and special events.', 'events', 'nurturher', 'Calendar', 10);

-- Posts
create table public.posts (
  id uuid default uuid_generate_v4() primary key,
  room_id uuid references public.rooms(id) on delete cascade not null,
  author_id uuid references public.profiles(id) on delete cascade not null,
  title text not null default '',
  content text not null,
  pinned boolean not null default false,
  created_at timestamptz default now() not null
);

alter table public.posts enable row level security;
create policy "Posts viewable by authenticated users" on public.posts for select using (auth.role() = 'authenticated');
create policy "Users can create posts" on public.posts for insert with check (auth.uid() = author_id);
create policy "Users can update own posts" on public.posts for update using (auth.uid() = author_id);

-- Comments
create table public.comments (
  id uuid default uuid_generate_v4() primary key,
  post_id uuid references public.posts(id) on delete cascade not null,
  author_id uuid references public.profiles(id) on delete cascade not null,
  content text not null,
  created_at timestamptz default now() not null
);

alter table public.comments enable row level security;
create policy "Comments viewable by authenticated users" on public.comments for select using (auth.role() = 'authenticated');
create policy "Users can create comments" on public.comments for insert with check (auth.uid() = author_id);

-- Resources
create table public.resources (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text not null default '',
  type text not null default 'guide' check (type in ('replay', 'worksheet', 'guide', 'audio', 'video')),
  url text not null default '',
  tier_required text references public.tiers(id) not null,
  room_id uuid references public.rooms(id) on delete set null,
  created_at timestamptz default now() not null
);

alter table public.resources enable row level security;
create policy "Resources viewable by authenticated users" on public.resources for select using (auth.role() = 'authenticated');

-- Events
create table public.events (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text not null default '',
  date timestamptz not null,
  duration integer not null default 60,
  type text not null default 'gathering' check (type in ('workshop', 'gathering', 'teaching', 'special')),
  tier_required text references public.tiers(id) not null,
  recording_url text,
  created_at timestamptz default now() not null
);

alter table public.events enable row level security;
create policy "Events viewable by authenticated users" on public.events for select using (auth.role() = 'authenticated');

-- Speaking Inquiries
create table public.speaking_inquiries (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  email text not null,
  organization text not null default '',
  event_type text not null default '',
  date text not null default '',
  audience_size text not null default '',
  message text not null,
  created_at timestamptz default now() not null
);

alter table public.speaking_inquiries enable row level security;
create policy "Service role can manage inquiries" on public.speaking_inquiries for all using (auth.role() = 'service_role');

-- Quiz Submissions
create table public.quiz_submissions (
  id uuid default uuid_generate_v4() primary key,
  first_name text not null,
  email text not null,
  result text not null,
  answers jsonb not null default '[]',
  scores jsonb not null default '{}',
  source text not null default '',
  created_at timestamptz default now() not null
);

alter table public.quiz_submissions enable row level security;
create policy "Service role can manage quiz submissions" on public.quiz_submissions for all using (auth.role() = 'service_role');

-- Contact Messages
create table public.contact_messages (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  email text not null,
  subject text not null default '',
  message text not null,
  created_at timestamptz default now() not null
);

alter table public.contact_messages enable row level security;
create policy "Service role can manage contact messages" on public.contact_messages for all using (auth.role() = 'service_role');

-- Newsletter Subscribers
create table public.newsletter_subscribers (
  id uuid default uuid_generate_v4() primary key,
  email text unique not null,
  subscribed_at timestamptz default now() not null,
  unsubscribed_at timestamptz
);

alter table public.newsletter_subscribers enable row level security;
create policy "Service role can manage newsletter" on public.newsletter_subscribers for all using (auth.role() = 'service_role');

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'full_name', ''));
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
