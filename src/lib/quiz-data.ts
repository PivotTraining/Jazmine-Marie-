export type HealingStyle =
  | "the-nurturer"
  | "the-warrior"
  | "the-reflector"
  | "the-connector"
  | "the-rebuilder";

export interface QuizQuestion {
  id: number;
  question: string;
  options: {
    text: string;
    style: HealingStyle;
  }[];
}

export interface HealingStyleResult {
  id: HealingStyle;
  name: string;
  tagline: string;
  description: string;
  strengths: string[];
  growthAreas: string[];
  practicesForYou: string[];
  recommendedTier: string;
  color: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "When you're going through a hard season, what do you do first?",
    options: [
      { text: "I pour into someone else — helping others helps me cope", style: "the-nurturer" },
      { text: "I push through and keep moving — I'll process later", style: "the-warrior" },
      { text: "I pull back and get quiet — I need space to think", style: "the-reflector" },
      { text: "I call someone I trust — I need to talk it out", style: "the-connector" },
      { text: "I start making changes — something needs to shift", style: "the-rebuilder" },
    ],
  },
  {
    id: 2,
    question: "What does healing look like for you right now?",
    options: [
      { text: "Learning to receive the same care I give everyone else", style: "the-nurturer" },
      { text: "Giving myself permission to slow down and feel", style: "the-warrior" },
      { text: "Making sense of what happened and finding meaning in it", style: "the-reflector" },
      { text: "Finding safe people who understand what I've been through", style: "the-connector" },
      { text: "Letting go of old patterns and rebuilding my life intentionally", style: "the-rebuilder" },
    ],
  },
  {
    id: 3,
    question: "What's the hardest thing for you to do?",
    options: [
      { text: "Set boundaries with people I love", style: "the-nurturer" },
      { text: "Admit that I'm struggling", style: "the-warrior" },
      { text: "Stop overthinking and just take action", style: "the-reflector" },
      { text: "Open up to new people after being hurt", style: "the-connector" },
      { text: "Forgive myself for past decisions", style: "the-rebuilder" },
    ],
  },
  {
    id: 4,
    question: "Which sentence sounds most like something you'd say?",
    options: [
      { text: "I just want everyone around me to be okay", style: "the-nurturer" },
      { text: "I can handle this — I've handled worse", style: "the-warrior" },
      { text: "I need to understand why before I can move forward", style: "the-reflector" },
      { text: "I just want someone to really see me", style: "the-connector" },
      { text: "I'm not going back to who I was — I'm building something new", style: "the-rebuilder" },
    ],
  },
  {
    id: 5,
    question: "What kind of community support would help you most?",
    options: [
      { text: "A space where I'm cared for — not just the one caring", style: "the-nurturer" },
      { text: "Honest accountability that challenges me to grow", style: "the-warrior" },
      { text: "Guided journaling and space for deep reflection", style: "the-reflector" },
      { text: "Genuine sisterhood and emotional safety", style: "the-connector" },
      { text: "Structure, goals, and a clear path forward", style: "the-rebuilder" },
    ],
  },
  {
    id: 6,
    question: "What triggers you the most?",
    options: [
      { text: "Feeling unappreciated after giving so much", style: "the-nurturer" },
      { text: "Feeling weak or out of control", style: "the-warrior" },
      { text: "Being misunderstood or not having space to process", style: "the-reflector" },
      { text: "Feeling invisible, left out, or abandoned", style: "the-connector" },
      { text: "Being stuck in the same situation with no progress", style: "the-rebuilder" },
    ],
  },
  {
    id: 7,
    question: "If you could have one breakthrough this year, what would it be?",
    options: [
      { text: "Learning to put myself first without feeling guilty", style: "the-nurturer" },
      { text: "Finally letting my guard down and being vulnerable", style: "the-warrior" },
      { text: "Turning my understanding into real, lasting change", style: "the-reflector" },
      { text: "Building deep, trustworthy relationships that last", style: "the-connector" },
      { text: "Creating a life that reflects who I'm actually becoming", style: "the-rebuilder" },
    ],
  },
];

export const HEALING_STYLE_RESULTS: Record<HealingStyle, HealingStyleResult> = {
  "the-nurturer": {
    id: "the-nurturer",
    name: "The Nurturer",
    tagline: "You heal by learning to receive what you've always given",
    description:
      "You're the woman everyone leans on — the friend who listens, the mom who sacrifices, the leader who holds it all together. Your instinct is to pour into others, and your heart is big enough to carry the room. But here's the truth: you can't pour from a cup you never refill. Your healing journey is about learning that receiving isn't selfish — it's sacred.",
    strengths: [
      "Deep empathy and emotional intelligence",
      "Natural ability to create safe spaces for others",
      "Strong sense of purpose through service",
      "Resilient and dependable",
    ],
    growthAreas: [
      "Setting boundaries without guilt",
      "Accepting help and care from others",
      "Recognizing when giving is actually avoidance",
      "Prioritizing your own needs",
    ],
    practicesForYou: [
      "Daily self-care that isn't negotiable",
      "Journaling about your own needs (not others')",
      "Practicing saying 'no' in low-stakes situations",
      "Receiving prayer and encouragement instead of always giving it",
    ],
    recommendedTier: "transformher",
    color: "blush",
  },
  "the-warrior": {
    id: "the-warrior",
    name: "The Warrior",
    tagline: "You heal by trading your armor for authenticity",
    description:
      "You're strong. You've been through things that would break most people, and you're still standing. People admire your resilience. But what they don't see is the weight of always being 'the strong one.' Your healing isn't about becoming tougher — it's about letting yourself be soft. Vulnerability isn't weakness. It's your next superpower.",
    strengths: [
      "Incredible inner strength and resilience",
      "Ability to lead and inspire through action",
      "Determination to keep going no matter what",
      "Natural protector and advocate",
    ],
    growthAreas: [
      "Allowing yourself to feel without fixing",
      "Asking for help before you're in crisis",
      "Releasing the need to be strong for everyone",
      "Embracing vulnerability as strength",
    ],
    practicesForYou: [
      "Guided vulnerability exercises in safe community",
      "Honest accountability partnerships",
      "Somatic practices to release stored tension",
      "Sharing your real story — not just the highlight reel",
    ],
    recommendedTier: "ascendher",
    color: "plum",
  },
  "the-reflector": {
    id: "the-reflector",
    name: "The Reflector",
    tagline: "You heal by turning your wisdom into action",
    description:
      "You're a deep thinker. You process everything — the past, the present, the meaning behind it all. You've probably read the books, listened to the podcasts, and journaled your way through seasons of pain. You understand your patterns. But understanding isn't the same as healing. Your breakthrough comes when you stop analyzing and start living what you know.",
    strengths: [
      "Deep self-awareness and introspection",
      "Ability to find meaning in difficult experiences",
      "Natural wisdom and thoughtfulness",
      "Rich inner world and spiritual depth",
    ],
    growthAreas: [
      "Moving from knowledge to embodied change",
      "Avoiding analysis paralysis",
      "Sharing your insights instead of keeping them inside",
      "Taking imperfect action",
    ],
    practicesForYou: [
      "Action-based challenges (not just journaling)",
      "Community accountability for follow-through",
      "Teaching or mentoring others from your wisdom",
      "Body-based practices alongside mind-based ones",
    ],
    recommendedTier: "transformher",
    color: "sage",
  },
  "the-connector": {
    id: "the-connector",
    name: "The Connector",
    tagline: "You heal by finding your people and letting them in",
    description:
      "You were made for deep connection. You crave being truly seen, known, and understood — not surface-level networking, but real soul-level sisterhood. Past hurt may have made you cautious, but isolation isn't protecting you — it's starving you. Your healing happens in relationship. When you find safe people, you bloom.",
    strengths: [
      "Ability to create genuine, deep connections",
      "High emotional awareness and sensitivity",
      "Gift for making others feel valued and seen",
      "Loyalty and commitment to relationships",
    ],
    growthAreas: [
      "Trusting new people after betrayal",
      "Not losing yourself in relationships",
      "Distinguishing between loneliness and solitude",
      "Building a support system you can rely on",
    ],
    practicesForYou: [
      "Small-group sisterhood spaces",
      "Gradual vulnerability with safe women",
      "Guided community discussions and sharing",
      "Learning to be seen without performing",
    ],
    recommendedTier: "nurturher",
    color: "gold",
  },
  "the-rebuilder": {
    id: "the-rebuilder",
    name: "The Rebuilder",
    tagline: "You heal by creating the life you were always meant to live",
    description:
      "Something shifted in you. Maybe it was a loss, a wake-up call, or just a quiet realization that the life you were living wasn't the life you were made for. You're not looking backward — you're building forward. You want structure, clarity, and a plan. Your healing is active, intentional, and transformational. You're not just surviving anymore — you're becoming.",
    strengths: [
      "Vision and clarity about who you want to become",
      "Willingness to do the hard work of change",
      "Goal-oriented and disciplined",
      "Courageous enough to start over",
    ],
    growthAreas: [
      "Being patient with the process",
      "Grieving what you lost before moving forward",
      "Allowing rest to be part of the rebuild",
      "Accepting that setbacks aren't failures",
    ],
    practicesForYou: [
      "Monthly goal-setting with accountability",
      "Coaching and guided mentorship",
      "Structured healing curriculum and challenges",
      "Celebration of small wins and progress",
    ],
    recommendedTier: "ascendher",
    color: "warm",
  },
};

export function calculateResult(answers: HealingStyle[]): HealingStyle {
  const counts: Record<HealingStyle, number> = {
    "the-nurturer": 0,
    "the-warrior": 0,
    "the-reflector": 0,
    "the-connector": 0,
    "the-rebuilder": 0,
  };

  for (const answer of answers) {
    counts[answer]++;
  }

  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as HealingStyle;
}
