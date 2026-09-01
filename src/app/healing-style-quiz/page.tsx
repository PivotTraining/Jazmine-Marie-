import type { Metadata } from "next";
import { HealingStyleQuiz } from "./quiz-client";

export const metadata: Metadata = {
  title: "Discover Your Healing Style — OvercomeHER",
  description:
    "Take the free Healing Style Quiz to explore how you tend to process difficult experiences, stress, and personal growth, with practical next steps from OvercomeHER.",
};

export default function QuizPage() {
  return <HealingStyleQuiz />;
}
