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
  { label: "Resources", href: "/resources" },
  { label: "Contact", href: "/contact" },
] as const;

export const MEMBERSHIP_TIERS = [
  {
    id: "nurturher",
    name: "NurturHER",
    tagline: "A gentle, self-paced entry into your healing journey",
    description:
      "For the woman who's just getting started on her growth journey. NurturHER gives you structure without pressure — a soft space to stay encouraged and consistent.",
    priceMonthly: 19.97,
    priceYearly: 199,
    stripePaymentLink: "https://buy.stripe.com/fZu14nc4deM02b59nna3u0n",
    stripePriceId: "price_1TGfZBERWdPcDJ1ZZZHaFMpa",
    features: [
      "Monthly healing theme + journaling prompts",
      "Access to community support spaces",
      "Guided challenges for building habits",
      "Entry to the ReadHER Book Club",
      "Monthly group gathering (virtual)",
    ],
    perfectFor: [
      "Are just getting started on your growth journey",
      "Want structure without pressure",
      "Need a soft space to stay encouraged & consistent",
    ],
    highlighted: false,
    cta: "Join NurturHER",
    trialText: "7-day free trial",
  },
  {
    id: "transformher",
    name: "TransformHER",
    tagline: "For the woman who's doing the work and ready for more",
    description:
      "You're beyond surface-level. You learn best in community and guided conversation. TransformHER gives you consistency, structure, and deeper self-discovery.",
    priceMonthly: 47.97,
    priceYearly: 479,
    stripePaymentLink: "https://buy.stripe.com/9B628rd8h0Va7vp8jja3u0o",
    stripePriceId: "price_1TGfZGERWdPcDJ1Z0stqmgbU",
    features: [
      "Everything in NurturHER, plus:",
      "Monthly Live Community Sessions",
      "Guided group reflection + intentional conversation",
      "Weekly journal prompts + accountability check-ins",
      "Integration activities + practice space",
      "Priority event access",
    ],
    perfectFor: [
      "Are ready to move beyond surface-level healing",
      "Learn best in community and guided conversation",
      "Crave consistency, structure, and deeper self-discovery",
      "Want to stay accountable to your own evolution",
    ],
    highlighted: true,
    cta: "Join TransformHER",
    trialText: "7-day free trial",
  },
  {
    id: "ascendher",
    name: "AscendHER",
    tagline: "High-touch coaching, deep transformation, intimate access",
    description:
      "You're ready to move beyond survival and step fully into your power. AscendHER is for women who want hands-on guidance, spiritual alignment, and next-level breakthroughs.",
    priceMonthly: 97,
    priceYearly: 970,
    stripePaymentLink: "https://buy.stripe.com/bJebJ1gktgU8cPJeHHa3u0p",
    stripePriceId: "price_1TGfZHERWdPcDJ1ZsmdjbzSv",
    features: [
      "Everything in TransformHER, plus:",
      "Live Coaching with Jazmine + Chris Marvel",
      "Private coaching community for direct support",
      "Hot seat coaching + Q&A sessions",
      "Exclusive Deep Work exercises & assignments",
      "VIP access to live events",
    ],
    perfectFor: [
      "Are ready to move beyond survival and step fully into your power",
      "Want hands-on guidance & spiritual alignment",
      "Crave deep accountability and next-level breakthroughs",
    ],
    highlighted: false,
    cta: "Join AscendHER",
    trialText: "7-day free trial",
  },
] as const;

export const COMMUNITY_ROOMS = [
  {
    name: "Welcome Room",
    slug: "welcome",
    description: "Introduce yourself and get welcomed into the community.",
    type: "discussion",
    tierRequired: "nurturher",
    icon: "Heart",
  },
  {
    name: "Monthly Theme",
    slug: "monthly-theme",
    description: "Each month we explore a new healing or growth theme together.",
    type: "discussion",
    tierRequired: "nurturher",
    icon: "Sparkles",
  },
  {
    name: "Prayer & Encouragement",
    slug: "prayer-encouragement",
    description: "A sacred space to share prayer requests and uplift one another.",
    type: "discussion",
    tierRequired: "nurturher",
    icon: "HandHeart",
  },
  {
    name: "ReadHER Book Club",
    slug: "book-club",
    description: "Monthly reads and devotional studies for soul-deep growth. Currently reading: The Let Them Theory by Mel Robbins.",
    type: "discussion",
    tierRequired: "nurturher",
    icon: "BookMarked",
  },
  {
    name: "Journaling & Reflection",
    slug: "journaling",
    description: "Guided prompts and space for deep personal reflection. Your journal is your mirror.",
    type: "discussion",
    tierRequired: "transformher",
    icon: "BookOpen",
  },
  {
    name: "Healing Conversations",
    slug: "healing-conversations",
    description: "Real talk about real healing — shame, guilt, identity, and becoming.",
    type: "discussion",
    tierRequired: "transformher",
    icon: "MessageCircle",
  },
  {
    name: "Teaching Replays",
    slug: "replays",
    description: "Full library of past workshops, teachings, and live session recordings.",
    type: "library",
    tierRequired: "transformher",
    icon: "Play",
  },
  {
    name: "Moms, Marriage & Womanhood",
    slug: "moms-marriage-womanhood",
    description: "For the woman navigating motherhood, marriage, and identity.",
    type: "discussion",
    tierRequired: "transformher",
    icon: "Users",
  },
  {
    name: "Announcements",
    slug: "announcements",
    description: "Community news, upcoming events, and important updates.",
    type: "announcement",
    tierRequired: "nurturher",
    icon: "Megaphone",
  },
  {
    name: "Events & Live Sessions",
    slug: "events",
    description: "Upcoming live gatherings, workshops, and special events.",
    type: "events",
    tierRequired: "nurturher",
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
  instagram: "https://instagram.com/MRSJazmineMarie",
  facebook: "https://facebook.com/jazminemarie",
  youtube: "https://youtube.com/@jazminemarie",
  tiktok: "https://tiktok.com/@jazminemarie",
  overcomeher_ig: "https://instagram.com/IAMANOVERCOMEHER",
} as const;

export const IMAGES = {
  overcomeherLogo: "/images/overcomeher-logo-pink.svg",
  overcomeherLogoAlt: "/images/overcomeher-logo-pink.svg",
  pinkBrushLogo: "/images/overcomeher-logo-pink.svg",
  // Jazmine portraits & headshots
  jazmineHero: "/images/jazmine-hero-new.jpg",
  jazmineJournaling: "/images/jazmine-journaling.png",
  jazmineLaptopRed: "/images/jazmine-laptop-red.jpg",
  jazmineGodTee: "/images/jazmine-god-tee.jpg",
  jazmineTealWall: "/images/jazmine-teal-wall.jpg",
  jazmineBookClub: "/images/jazmine-book-club.jpg",
  // Jazmine speaking & hosting
  jazmineSpeakingRed: "/images/jazmine-speaking-red.jpg",
  jazmineSpeakingBlue: "/images/jazmine-speaking-blue.jpg",
  jazmineSpeakingMic: "/images/jazmine-speaking-mic.jpg",
  jazmineShameTalk: "/images/jazmine-shame-talk.jpg",
  jazmineHosting: "/images/jazmine-hosting.jpg",
  jazmineWithGuest: "/images/jazmine-with-guest.jpg",
  // Community & events
  womenCircle: "/images/women-circle.jpg",
  womenEmbrace: "/images/women-embrace.jpg",
  eventRoom: "/images/event-room.jpg",
  eventWorkshop: "/images/event-workshop.jpg",
  eventWomenMeeting: "/images/event-women-meeting.jpg",
} as const;
