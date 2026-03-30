import type { Metadata } from "next";
import { HealingStyleQuiz } from "./quiz-client";

export const metadata: Metadata = {
  title: "Discover Your Healing Style — OvercomeHER",
  description:
    "Take the free Healing Style Quiz to discover how you heal, what you need, and which OvercomeHER Circle tier is right for you.",
};

export default function QuizPage() {
  return <HealingStyleQuiz />;
}
