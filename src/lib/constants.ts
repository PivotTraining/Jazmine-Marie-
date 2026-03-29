// ============================================================
// PROJECT DOCUMENTATION
// ============================================================
//
// PROJECT VISION
// Jazmine Marie's website is a unified digital home that positions her
// as a trusted voice in women's wellness, healing, and transformation.
// OvercomeHER Circle lives as an integrated community section — not a
// separate brand — creating a seamless journey from discovery to deep
// membership engagement. The site communicates warmth, authority, and
// emotional intelligence at every touchpoint.
//
// BRAND ARCHITECTURE
// Parent Brand: Jazmine Marie — Host, Speaker, Women's Wellness Voice
// Sub-Brand: OvercomeHER Circle — The membership community and movement
// Relationship: OvercomeHER is Jazmine's signature community offering,
// nested within her personal brand. It carries its own visual identity
// (logo, accent colors) but inherits the parent brand's typography,
// tone, and design system.
//
// USER JOURNEYS
// 1. Visitor → Speaking Inquiry: Home → Speaking → Inquiry Form → Confirmation
// 2. Visitor → Member: Home → OvercomeHER → Membership → Checkout → Dashboard
// 3. Member → Content: Login → Dashboard → Room → Discussion/Resource
// 4. Member → Upgrade: Dashboard → Profile → Upgrade → Checkout → Enhanced Access
//
// DATABASE SCHEMA (Supabase/PostgreSQL)
// - profiles: id, email, full_name, avatar_url, bio, created_at
// - memberships: id, user_id, tier_id, stripe_subscription_id, status, current_period_end
// - tiers: id, name, slug, description, price_monthly, price_yearly, stripe_price_id_monthly, stripe_price_id_yearly, features, sort_order
// - rooms: id, name, slug, description, type, tier_required, icon, sort_order
// - posts: id, room_id, author_id, title, content, pinned, created_at
// - comments: id, post_id, author_id, content, created_at
// - resources: id, title, description, type, url, tier_required, room_id, created_at
// - events: id, title, description, date, duration, type, tier_required, recording_url
// - speaking_inquiries: id, name, email, organization, event_type, date, audience_size, message, created_at
// ============================================================

export const SITE_NAME = "Jazmine Marie";
export const SITE_TAGLINE = "Host. Speaker. Healing Advocate.";
export const SITE_DESCRIPTION =
  "Jazmine Marie is a host, speaker, and women's wellness voice helping women heal, grow, and step into wholeness through transformative spaces and the OvercomeHER Circle community.";
export const SITE_URL = "https://jazminemarie.com";

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Speaking", href: "/speaking" },
  { label: "OvercomeHER", href: "/overcomeher" },
  { label: "Community", href: "/community" },
  { label: "Resources", href: "/resources" },
  { label: "Contact", href: "/contact" },
] as const;

export const MEMBERSHIP_TIERS = [
  {
    id: "bloom",
    name: "Bloom",
    tagline: "Where your healing journey begins",
    description:
      "For the woman ready to stop surviving and start growing. Bloom gives you a seat at the table — access to community, encouragement, and curated content to help you take your first brave steps.",
    priceMonthly: 19,
    priceYearly: 190,
    features: [
      "Welcome Room access",
      "Monthly Theme Room",
      "Prayer & Encouragement Room",
      "Announcements & community updates",
      "Monthly group gathering (virtual)",
      "Curated resource library (starter)",
    ],
    highlighted: false,
    cta: "Start Blooming",
  },
  {
    id: "rooted",
    name: "Rooted",
    tagline: "Go deeper. Grow stronger.",
    description:
      "For the woman who is ready to do the real work — journaling, healing conversations, book club discussions, and deeper community connection. Rooted is where transformation takes hold.",
    priceMonthly: 39,
    priceYearly: 390,
    features: [
      "Everything in Bloom, plus:",
      "Journaling & Reflection Room",
      "Healing Conversations Room",
      "Book Club / Devotional Room",
      "Teaching replay library (full access)",
      "Monthly live workshop or teaching",
      "Moms / Marriage / Womanhood room",
      "Priority event access",
    ],
    highlighted: true,
    cta: "Get Rooted",
  },
  {
    id: "whole",
    name: "Whole",
    tagline: "Step fully into who you were made to be",
    description:
      "For the woman who wants the full experience — intimate group mentorship, exclusive events, direct access to Jazmine, and every resource the community offers. Whole is the invitation to become.",
    priceMonthly: 79,
    priceYearly: 790,
    features: [
      "Everything in Rooted, plus:",
      "Small-group mentorship sessions",
      "Quarterly 1-on-1 check-in with Jazmine",
      "Exclusive Whole-tier events & retreats info",
      "Early access to all new content",
      "Private accountability partnerships",
      "Full resource & workshop archive",
      "VIP access to live events",
    ],
    highlighted: false,
    cta: "Become Whole",
  },
] as const;

export const COMMUNITY_ROOMS = [
  {
    name: "Welcome Room",
    slug: "welcome",
    description: "Introduce yourself and get welcomed into the community.",
    type: "discussion",
    tierRequired: "bloom",
    icon: "Heart",
  },
  {
    name: "Monthly Theme",
    slug: "monthly-theme",
    description: "Each month we explore a new healing or growth theme together.",
    type: "discussion",
    tierRequired: "bloom",
    icon: "Sparkles",
  },
  {
    name: "Prayer & Encouragement",
    slug: "prayer-encouragement",
    description: "A sacred space to share prayer requests and uplift one another.",
    type: "discussion",
    tierRequired: "bloom",
    icon: "HandHeart",
  },
  {
    name: "Journaling & Reflection",
    slug: "journaling",
    description: "Guided prompts and space for deep personal reflection.",
    type: "discussion",
    tierRequired: "rooted",
    icon: "BookOpen",
  },
  {
    name: "Healing Conversations",
    slug: "healing-conversations",
    description: "Real talk about real healing — shame, guilt, identity, and becoming.",
    type: "discussion",
    tierRequired: "rooted",
    icon: "MessageCircle",
  },
  {
    name: "Book Club & Devotional",
    slug: "book-club",
    description: "Monthly reads and devotional studies for soul-deep growth.",
    type: "discussion",
    tierRequired: "rooted",
    icon: "BookMarked",
  },
  {
    name: "Teaching Replays",
    slug: "replays",
    description: "Full library of past workshops, teachings, and live session recordings.",
    type: "library",
    tierRequired: "rooted",
    icon: "Play",
  },
  {
    name: "Moms, Marriage & Womanhood",
    slug: "moms-marriage-womanhood",
    description: "For the woman navigating motherhood, marriage, and identity.",
    type: "discussion",
    tierRequired: "rooted",
    icon: "Users",
  },
  {
    name: "Announcements",
    slug: "announcements",
    description: "Community news, upcoming events, and important updates.",
    type: "announcement",
    tierRequired: "bloom",
    icon: "Megaphone",
  },
  {
    name: "Events & Live Sessions",
    slug: "events",
    description: "Upcoming live gatherings, workshops, and special events.",
    type: "events",
    tierRequired: "bloom",
    icon: "Calendar",
  },
] as const;

export const SIGNATURE_TOPICS = [
  "Overcoming Shame & Guilt",
  "Healing After Hardship",
  "The Power of Vulnerability",
  "Wholeness for High-Capacity Women",
  "Motherhood & Identity",
  "Self-Trust & Emotional Health",
  "Building Healing Communities",
  "Faith, Growth & Becoming",
] as const;

export const SOCIAL_LINKS = {
  instagram: "https://instagram.com/jazminemarie",
  facebook: "https://facebook.com/jazminemarie",
  youtube: "https://youtube.com/@jazminemarie",
  tiktok: "https://tiktok.com/@jazminemarie",
} as const;
