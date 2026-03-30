export type HealingStyle =
  | "verbal"
  | "reflective"
  | "embodied"
  | "creative"
  | "communal"
  | "intellectual"
  | "nature";

export interface QuizQuestion {
  id: number;
  question: string;
  options: {
    label: string;
    text: string;
    style: HealingStyle;
  }[];
}

export interface HealingStyleResult {
  id: HealingStyle;
  title: string;
  identityHook: string;
  whatThisMeans: string[];
  coreNeeds: string[];
  whatThisLooksLike: string[];
  howThisShowsUp: string[];
  strengths: string[];
  growthEdge: string[];
  whatActuallyHelps: string[];
  ctaHeading: string;
  ctaBody: string;
  ctaButton: string;
  ctaSupportingLine: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "When something emotionally heavy hits you, what do you instinctively do first?",
    options: [
      { label: "A", text: "Call or text someone to talk it out", style: "verbal" },
      { label: "B", text: "Sit with it and think it through", style: "reflective" },
      { label: "C", text: "Go for a walk, workout, or move around", style: "embodied" },
      { label: "D", text: "Distract yourself with something creative or expressive", style: "creative" },
    ],
  },
  {
    id: 2,
    question: "When you're overwhelmed, what feels most natural?",
    options: [
      { label: "A", text: "Talking through it with someone", style: "verbal" },
      { label: "B", text: "Being alone to process", style: "reflective" },
      { label: "C", text: "Releasing tension physically", style: "embodied" },
      { label: "D", text: "Writing, creating, or expressing it indirectly", style: "creative" },
    ],
  },
  {
    id: 3,
    question: "What actually helps you calm down?",
    options: [
      { label: "A", text: "Being heard", style: "verbal" },
      { label: "B", text: "Quiet time", style: "reflective" },
      { label: "C", text: "Movement or physical reset", style: "embodied" },
      { label: "D", text: "Expressing it creatively", style: "creative" },
    ],
  },
  {
    id: 4,
    question: "How do you make sense of your emotions?",
    options: [
      { label: "A", text: "Talking them out", style: "verbal" },
      { label: "B", text: "Thinking deeply about them", style: "reflective" },
      { label: "C", text: "Feeling them in your body", style: "embodied" },
      { label: "D", text: "Turning them into something creative", style: "creative" },
    ],
  },
  {
    id: 5,
    question: "When something bothers you, you tend to\u2026",
    options: [
      { label: "A", text: "Say it out loud quickly", style: "verbal" },
      { label: "B", text: "Replay it in your head", style: "reflective" },
      { label: "C", text: "Feel it physically (tight chest, tension, etc.)", style: "embodied" },
      { label: "D", text: "Channel it into something else", style: "creative" },
    ],
  },
  {
    id: 6,
    question: "You feel most understood when\u2026",
    options: [
      { label: "A", text: "Someone listens to you", style: "verbal" },
      { label: "B", text: "Someone gives you space", style: "reflective" },
      { label: "C", text: "Someone helps you physically reset", style: "embodied" },
      { label: "D", text: "Someone sees your expression (writing, art, etc.)", style: "creative" },
    ],
  },
  {
    id: 7,
    question: "When going through something hard, what do you need most?",
    options: [
      { label: "A", text: "A conversation", style: "verbal" },
      { label: "B", text: "Time alone", style: "reflective" },
      { label: "C", text: "Movement or release", style: "embodied" },
      { label: "D", text: "Expression", style: "creative" },
    ],
  },
  {
    id: 8,
    question: "Your ideal support system looks like\u2026",
    options: [
      { label: "A", text: "People I can talk openly with", style: "communal" },
      { label: "B", text: "Space with minimal interruption", style: "reflective" },
      { label: "C", text: "Activities that help me release stress", style: "embodied" },
      { label: "D", text: "Freedom to express myself", style: "creative" },
    ],
  },
  {
    id: 9,
    question: "What makes you feel safe?",
    options: [
      { label: "A", text: "Being able to talk freely", style: "verbal" },
      { label: "B", text: "Not being rushed", style: "reflective" },
      { label: "C", text: "Being physically relaxed", style: "embodied" },
      { label: "D", text: "Being able to express without judgment", style: "creative" },
    ],
  },
  {
    id: 10,
    question: "When something confusing happens, you\u2026",
    options: [
      { label: "A", text: "Talk through it", style: "verbal" },
      { label: "B", text: "Think through it", style: "reflective" },
      { label: "C", text: "Feel through it", style: "embodied" },
      { label: "D", text: "Express through it", style: "creative" },
    ],
  },
  {
    id: 11,
    question: "What helps you move forward after a hard moment?",
    options: [
      { label: "A", text: "Processing it out loud", style: "verbal" },
      { label: "B", text: "Understanding it internally", style: "reflective" },
      { label: "C", text: "Releasing it physically", style: "embodied" },
      { label: "D", text: "Creating something from it", style: "creative" },
    ],
  },
  {
    id: 12,
    question: "You grow the most when\u2026",
    options: [
      { label: "A", text: "You talk through your experiences", style: "verbal" },
      { label: "B", text: "You reflect deeply", style: "reflective" },
      { label: "C", text: "You take action physically", style: "embodied" },
      { label: "D", text: "You express creatively", style: "creative" },
    ],
  },
  {
    id: 13,
    question: "What helps you heal faster?",
    options: [
      { label: "A", text: "Talking with others", style: "communal" },
      { label: "B", text: "Being alone", style: "reflective" },
      { label: "C", text: "Moving your body", style: "embodied" },
      { label: "D", text: "Creating or expressing", style: "creative" },
    ],
  },
  {
    id: 14,
    question: "When you learn something new about yourself, you\u2026",
    options: [
      { label: "A", text: "Want to talk about it", style: "verbal" },
      { label: "B", text: "Sit with it quietly", style: "reflective" },
      { label: "C", text: "Apply it physically", style: "embodied" },
      { label: "D", text: "Express it creatively", style: "creative" },
    ],
  },
  {
    id: 15,
    question: "What feels most draining?",
    options: [
      { label: "A", text: "Not being heard", style: "verbal" },
      { label: "B", text: "Too much noise/people", style: "reflective" },
      { label: "C", text: "Sitting still too long", style: "embodied" },
      { label: "D", text: "Not being able to express yourself", style: "creative" },
    ],
  },
  {
    id: 16,
    question: "When something hurts you, you want to know\u2026",
    options: [
      { label: "A", text: "How to talk through it", style: "verbal" },
      { label: "B", text: "Why it affected you", style: "intellectual" },
      { label: "C", text: "How to release it", style: "embodied" },
      { label: "D", text: "How to express it", style: "creative" },
    ],
  },
  {
    id: 17,
    question: "You feel most at peace when\u2026",
    options: [
      { label: "A", text: "You've said everything you needed to say", style: "verbal" },
      { label: "B", text: "You've understood what happened", style: "intellectual" },
      { label: "C", text: "Your body feels calm", style: "embodied" },
      { label: "D", text: "You've expressed what you felt", style: "creative" },
    ],
  },
  {
    id: 18,
    question: "You're the type of person who\u2026",
    options: [
      { label: "A", text: "Needs to process out loud", style: "verbal" },
      { label: "B", text: "Needs to understand deeply", style: "intellectual" },
      { label: "C", text: "Needs to release physically", style: "embodied" },
      { label: "D", text: "Needs to express creatively", style: "creative" },
    ],
  },
  {
    id: 19,
    question: "When life feels heavy, you crave\u2026",
    options: [
      { label: "A", text: "A real conversation", style: "verbal" },
      { label: "B", text: "Quiet and stillness", style: "reflective" },
      { label: "C", text: "Movement or physical release", style: "embodied" },
      { label: "D", text: "Creative space", style: "creative" },
    ],
  },
  {
    id: 20,
    question: "What resets you the fastest?",
    options: [
      { label: "A", text: "Talking it out", style: "verbal" },
      { label: "B", text: "Being alone", style: "reflective" },
      { label: "C", text: "Moving your body", style: "embodied" },
      { label: "D", text: "Creating something", style: "creative" },
    ],
  },
  {
    id: 21,
    question: "Where do you feel most like yourself?",
    options: [
      { label: "A", text: "In conversation", style: "communal" },
      { label: "B", text: "In solitude", style: "reflective" },
      { label: "C", text: "In motion", style: "embodied" },
      { label: "D", text: "In expression", style: "creative" },
    ],
  },
  {
    id: 22,
    question: "When you need clarity, you\u2026",
    options: [
      { label: "A", text: "Talk it out", style: "verbal" },
      { label: "B", text: "Sit and think", style: "reflective" },
      { label: "C", text: "Move your body", style: "embodied" },
      { label: "D", text: "Step outside or change environments", style: "nature" },
    ],
  },
  {
    id: 23,
    question: "Peace feels like\u2026",
    options: [
      { label: "A", text: "Being heard", style: "verbal" },
      { label: "B", text: "Quiet clarity", style: "reflective" },
      { label: "C", text: "Physical calm", style: "embodied" },
      { label: "D", text: "Stillness and space", style: "nature" },
    ],
  },
  {
    id: 24,
    question: "When you're burnt out, you need\u2026",
    options: [
      { label: "A", text: "Someone to talk to", style: "verbal" },
      { label: "B", text: "Time alone", style: "reflective" },
      { label: "C", text: "Physical reset", style: "embodied" },
      { label: "D", text: "Nature and space", style: "nature" },
    ],
  },
  {
    id: 25,
    question: "If you had to choose one, what helps you feel most like yourself again?",
    options: [
      { label: "A", text: "Talking it out", style: "verbal" },
      { label: "B", text: "Sitting with it", style: "reflective" },
      { label: "C", text: "Moving through it", style: "embodied" },
      { label: "D", text: "Stepping away into quiet or nature", style: "nature" },
    ],
  },
];

export const HEALING_STYLE_RESULTS: Record<HealingStyle, HealingStyleResult> = {
  verbal: {
    id: "verbal",
    title: "The Verbal Processor",
    identityHook: "You don\u2019t just feel things\u2026 you have to say them to understand them.",
    whatThisMeans: [
      "Your healing lives in your voice.",
      "You process in real time. Thoughts become clear when they leave your mouth. What feels overwhelming inside starts to organize itself when it\u2019s spoken out loud.",
      "Silence doesn\u2019t always help you. Expression does.",
    ],
    coreNeeds: [
      "Safe spaces to speak freely without judgment",
      "People who listen, not fix",
      "Emotional release through conversation",
      "Spiritual anchoring through spoken truth, prayer, and verbal processing with God",
    ],
    whatThisLooksLike: [
      "Talking things through with someone you trust",
      "Praying out loud, not just in your head",
      "Saying what you feel instead of bottling it",
      "Processing in real time instead of \u201Cfiguring it out first\u201D",
    ],
    howThisShowsUp: [
      "You feel relief after a conversation",
      "You get more clarity mid-sentence than before you started",
      "You can feel stuck if you don\u2019t have an outlet",
      "You may overshare when you don\u2019t feel grounded",
    ],
    strengths: [
      "Emotionally expressive",
      "Honest and transparent",
      "Able to release instead of suppress",
      "Strong communicator",
    ],
    growthEdge: [
      "Not every space is a safe space.",
      "You don\u2019t just need to talk\u2026",
      "you need to discern who gets access to your voice.",
    ],
    whatActuallyHelps: [
      "Safe, structured conversations",
      "Speaking your truth in prayer",
      "Saying what you feel before it builds pressure",
      "Being in spaces where your voice is held with care",
    ],
    ctaHeading: "You\u2019re not meant to process life alone.",
    ctaBody: "OvercomeHER is a space where your voice isn\u2019t too much\u2026\nit\u2019s actually welcomed, held, and guided.\n\nIf you\u2019ve been carrying things you haven\u2019t had the right place to say out loud\u2026\n\nthis is that place.",
    ctaButton: "Join OvercomeHER",
    ctaSupportingLine: "Step into the kind of healing support that matches how you actually grow.",
  },
  reflective: {
    id: "reflective",
    title: "The Reflective Soul",
    identityHook: "You don\u2019t need noise to heal\u2026 you need space.",
    whatThisMeans: [
      "You process deeply, internally, and often quietly.",
      "You don\u2019t rush your emotions. You sit with them, turn them over, and make meaning from them.",
      "Healing for you is not loud. It\u2019s layered.",
    ],
    coreNeeds: [
      "Time and space to think",
      "Freedom to process without pressure",
      "Depth, not surface-level interaction",
      "Spiritual anchoring through quiet time with God, reflection, and inner alignment",
    ],
    whatThisLooksLike: [
      "Journaling your thoughts",
      "Sitting in stillness",
      "Processing before speaking",
      "Spending intentional time with God in quiet",
    ],
    howThisShowsUp: [
      "You may go quiet when something is heavy",
      "You don\u2019t always share right away",
      "You need time to understand what you feel",
      "You can feel overwhelmed by too much input",
    ],
    strengths: [
      "Deep thinker",
      "Self-aware",
      "Emotionally grounded",
      "Able to process at a meaningful level",
    ],
    growthEdge: [
      "You can stay inside your head too long.",
      "At some point, healing requires:",
      "expression, not just reflection.",
    ],
    whatActuallyHelps: [
      "Structured journaling",
      "Quiet time with intention",
      "Reflecting with purpose, not looping",
      "Bringing your thoughts into safe conversation when ready",
    ],
    ctaHeading: "You don\u2019t need to rush your healing\u2026",
    ctaBody: "but you also don\u2019t need to do it alone.\n\nOvercomeHER gives you space to process and guidance to move forward.\n\nIf you\u2019ve been sitting with things quietly\u2026\n\nthis is your place to process and grow without pressure.",
    ctaButton: "Join OvercomeHER",
    ctaSupportingLine: "Step into the kind of healing support that matches how you actually grow.",
  },
  embodied: {
    id: "embodied",
    title: "The Embodied Healer",
    identityHook: "Your body feels everything\u2026 even what your mind hasn\u2019t processed yet.",
    whatThisMeans: [
      "You don\u2019t just think your emotions\u2026 you carry them.",
      "Stress, anxiety, tension\u2026 it shows up physically for you.",
      "And healing doesn\u2019t fully happen until your body releases what it\u2019s holding.",
    ],
    coreNeeds: [
      "Physical release",
      "Movement to process emotion",
      "Nervous system regulation",
      "Spiritual anchoring through grounding, breath, and reconnecting your body with God\u2019s peace",
    ],
    whatThisLooksLike: [
      "Walking to clear your mind",
      "Working out to release tension",
      "Deep breathing or slowing your body down",
      "Physically stepping away from chaos",
    ],
    howThisShowsUp: [
      "You feel stress in your body quickly",
      "You get restless when overwhelmed",
      "Sitting still makes things worse sometimes",
      "Movement helps you reset",
    ],
    strengths: [
      "Highly aware of your body",
      "Able to release instead of hold",
      "Action-oriented",
      "Responsive to change",
    ],
    growthEdge: [
      "You can move too fast past emotions.",
      "Not everything needs to be released quickly\u2026",
      "some things need to be understood too.",
    ],
    whatActuallyHelps: [
      "Intentional movement",
      "Slowing your nervous system",
      "Pairing physical release with reflection",
      "Grounding yourself spiritually, not just physically",
    ],
    ctaHeading: "You don\u2019t just need motivation\u2026",
    ctaBody: "you need regulation.\n\nOvercomeHER helps you not just push through life\u2026\nbut actually feel, release, and reset.\n\nIf you\u2019ve been carrying stress in your body\u2026\n\nit\u2019s time to learn how to let it go the right way.",
    ctaButton: "Join OvercomeHER",
    ctaSupportingLine: "Step into the kind of healing support that matches how you actually grow.",
  },
  creative: {
    id: "creative",
    title: "The Creative Translator",
    identityHook: "You don\u2019t always say what you feel\u2026 you create it.",
    whatThisMeans: [
      "Your emotions don\u2019t always come out directly.",
      "They come out through expression.",
      "You turn what you feel into something, and that\u2019s how you process.",
    ],
    coreNeeds: [
      "Expression without pressure",
      "Freedom to create",
      "Space to translate emotion into something meaningful",
      "Spiritual anchoring through creative connection with God and purpose",
    ],
    whatThisLooksLike: [
      "Writing your thoughts",
      "Expressing through creativity",
      "Processing through storytelling or imagery",
      "Letting your emotions take form outside of you",
    ],
    howThisShowsUp: [
      "You feel better after creating something",
      "You struggle to explain things directly sometimes",
      "You process through expression, not just conversation",
      "You need space to let things flow",
    ],
    strengths: [
      "Deep emotional awareness",
      "Creative intelligence",
      "Ability to transform pain into meaning",
      "Expressive and insightful",
    ],
    growthEdge: [
      "You can hide inside your creativity.",
      "Sometimes healing requires:",
      "clarity and directness, not just expression.",
    ],
    whatActuallyHelps: [
      "Intentional creative outlets",
      "Bringing meaning to what you create",
      "Sharing your expression in safe spaces",
      "Staying grounded in truth, not just emotion",
    ],
    ctaHeading: "Your creativity isn\u2019t random\u2026",
    ctaBody: "it\u2019s part of how you heal.\n\nOvercomeHER gives you space to express, process, and grow\nwithout feeling like you have to explain everything perfectly.\n\nIf you\u2019ve been holding things you don\u2019t know how to say\u2026\n\nthis is where you can finally express them.",
    ctaButton: "Join OvercomeHER",
    ctaSupportingLine: "Step into the kind of healing support that matches how you actually grow.",
  },
  communal: {
    id: "communal",
    title: "The Communal Restorer",
    identityHook: "You don\u2019t heal in isolation\u2026 you heal in the right connection.",
    whatThisMeans: [
      "You\u2019re not meant to carry life alone.",
      "You need safe, intentional relationships where you can be seen, supported, and strengthened.",
      "Not just people\u2026 but the right people.",
    ],
    coreNeeds: [
      "Safe, trustworthy connection",
      "Shared experiences",
      "Emotional support",
      "Spiritual anchoring through community, accountability, and shared faith",
    ],
    whatThisLooksLike: [
      "Talking with women who understand you",
      "Being in spaces where you\u2019re not judged",
      "Processing life in community",
      "Growing alongside others",
    ],
    howThisShowsUp: [
      "You feel stronger when you\u2019re connected",
      "Isolation makes things heavier",
      "You crave meaningful relationships",
      "You need to feel seen",
    ],
    strengths: [
      "Relational",
      "Supportive",
      "Loyal",
      "Able to build strong connections",
    ],
    growthEdge: [
      "Not everyone is your people.",
      "You don\u2019t just need community\u2026",
      "you need aligned community.",
    ],
    whatActuallyHelps: [
      "Consistent, safe connection",
      "Being in spaces where growth is normal",
      "Accountability and shared healing",
      "Community rooted in truth, not just venting",
    ],
    ctaHeading: "You were never meant to do life by yourself.",
    ctaBody: "OvercomeHER isn\u2019t just content\u2026\nit\u2019s a space full of women doing the work alongside you.\n\nIf you\u2019ve been craving real connection\u2026\n\nthis is where you find it.",
    ctaButton: "Join OvercomeHER",
    ctaSupportingLine: "Step into the kind of healing support that matches how you actually grow.",
  },
  intellectual: {
    id: "intellectual",
    title: "The Intellectual Rebuilder",
    identityHook: "You don\u2019t just want to feel better\u2026 you want to understand.",
    whatThisMeans: [
      "You process by making sense of things.",
      "You ask:\n\u201CWhy did this happen?\u201D\n\u201CWhat does this mean?\u201D\n\u201CHow do I fix this?\u201D",
      "Understanding gives you control, clarity, and peace.",
    ],
    coreNeeds: [
      "Insight and understanding",
      "Frameworks and clarity",
      "Logical processing",
      "Spiritual anchoring through truth, wisdom, and renewing your mind",
    ],
    whatThisLooksLike: [
      "Learning about your patterns",
      "Breaking things down mentally",
      "Listening to teachings or structured guidance",
      "Reframing your thinking",
    ],
    howThisShowsUp: [
      "You analyze your experiences",
      "You want answers, not just comfort",
      "You seek clarity before action",
      "You feel stuck without understanding",
    ],
    strengths: [
      "Analytical",
      "Self-aware",
      "Strategic thinker",
      "Growth-oriented",
    ],
    growthEdge: [
      "Understanding is not the same as transformation.",
      "At some point, you have to:",
      "live what you know.",
    ],
    whatActuallyHelps: [
      "Structured learning",
      "Applying what you understand",
      "Renewing your thinking patterns",
      "Aligning truth with action",
    ],
    ctaHeading: "You already think deeply.",
    ctaBody: "Now it\u2019s time to apply what you know.\n\nOvercomeHER helps you move from:\nunderstanding \u2192 transformation\n\nIf you\u2019re ready to stop just analyzing your life\u2026\n\nand actually shift it\u2026",
    ctaButton: "Join OvercomeHER",
    ctaSupportingLine: "Step into the kind of healing support that matches how you actually grow.",
  },
  nature: {
    id: "nature",
    title: "The Nature-Based Healer",
    identityHook: "You find yourself again when you step away from everything else.",
    whatThisMeans: [
      "You don\u2019t heal well in chaos.",
      "You heal in stillness, space, and simplicity.",
      "When life gets loud, you need to step out of it to hear yourself again.",
    ],
    coreNeeds: [
      "Stillness",
      "Space",
      "Environmental reset",
      "Spiritual anchoring through quiet time, presence, and connection with God in stillness",
    ],
    whatThisLooksLike: [
      "Being outside",
      "Sitting in quiet",
      "Slowing down your environment",
      "Stepping away from noise",
    ],
    howThisShowsUp: [
      "You get overwhelmed by too much stimulation",
      "You need space to think clearly",
      "You reset when things slow down",
      "You feel grounded in quiet environments",
    ],
    strengths: [
      "Grounded",
      "Peace-seeking",
      "Emotionally aware",
      "Introspective",
    ],
    growthEdge: [
      "You can withdraw too much.",
      "Healing requires:",
      "re-entry, not just escape.",
    ],
    whatActuallyHelps: [
      "Intentional stillness",
      "Quiet time with God",
      "Slowing your pace",
      "Re-engaging with life after resetting",
    ],
    ctaHeading: "You don\u2019t need more noise\u2026",
    ctaBody: "you need the right kind of space.\n\nOvercomeHER gives you room to breathe, process, and grow\nwithout pressure or overwhelm.\n\nIf you\u2019ve been craving peace\u2026\n\nthis is where you come back to yourself.",
    ctaButton: "Join OvercomeHER",
    ctaSupportingLine: "Step into the kind of healing support that matches how you actually grow.",
  },
};

export function calculateResult(answers: HealingStyle[]): HealingStyle {
  const counts: Record<HealingStyle, number> = {
    verbal: 0,
    reflective: 0,
    embodied: 0,
    creative: 0,
    communal: 0,
    intellectual: 0,
    nature: 0,
  };

  for (const answer of answers) {
    counts[answer]++;
  }

  const maxScore = Math.max(...Object.values(counts));
  const tied = (Object.entries(counts) as [HealingStyle, number][]).filter(
    ([, score]) => score === maxScore
  );

  // If no tie, return the winner
  if (tied.length === 1) {
    return tied[0][0];
  }

  // Tie-break 1: Use Q25 answer (last question, index 24)
  const q25Answer = answers[24];
  if (q25Answer && tied.some(([style]) => style === q25Answer)) {
    return q25Answer;
  }

  // Tie-break 2: Most recent question among tied categories
  const tiedStyles = new Set(tied.map(([style]) => style));
  for (let i = answers.length - 1; i >= 0; i--) {
    if (tiedStyles.has(answers[i])) {
      return answers[i];
    }
  }

  return tied[0][0];
}
