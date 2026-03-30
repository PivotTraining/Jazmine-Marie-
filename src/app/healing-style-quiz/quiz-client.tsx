"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ArrowLeft,
  Heart,
  Sparkles,
  Shield,
  Users,
  Flame,
  RefreshCw,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import {
  QUIZ_QUESTIONS,
  HEALING_STYLE_RESULTS,
  calculateResult,
  type HealingStyle,
} from "@/lib/quiz-data";
import { MEMBERSHIP_TIERS, IMAGES } from "@/lib/constants";

const styleIcons: Record<HealingStyle, React.ElementType> = {
  "the-nurturer": Heart,
  "the-warrior": Shield,
  "the-reflector": Sparkles,
  "the-connector": Users,
  "the-rebuilder": Flame,
};

const styleColors: Record<string, string> = {
  blush: "from-blush-100 to-blush-200 text-blush-600",
  plum: "from-plum-100 to-plum-200 text-plum-600",
  sage: "from-sage-100 to-sage-200 text-sage-600",
  gold: "from-gold-100 to-gold-200 text-gold-600",
  warm: "from-warm-200 to-warm-300 text-warm-700",
};

const styleBgColors: Record<string, string> = {
  blush: "bg-blush-50",
  plum: "bg-plum-50",
  sage: "bg-sage-50",
  gold: "bg-gold-50",
  warm: "bg-warm-100",
};

export function HealingStyleQuiz() {
  const [stage, setStage] = useState<"intro" | "quiz" | "result">("intro");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<HealingStyle[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [result, setResult] = useState<HealingStyle | null>(null);

  function startQuiz() {
    setStage("quiz");
    setCurrentQuestion(0);
    setAnswers([]);
    setResult(null);
  }

  function selectAnswer(style: HealingStyle, optionIndex: number) {
    setSelectedOption(optionIndex);

    setTimeout(() => {
      const newAnswers = [...answers, style];
      setAnswers(newAnswers);
      setSelectedOption(null);

      if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        const finalResult = calculateResult(newAnswers);
        setResult(finalResult);
        setStage("result");
      }
    }, 400);
  }

  function goBack() {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setAnswers(answers.slice(0, -1));
    }
  }

  // ===== INTRO =====
  if (stage === "intro") {
    return (
      <>
        <section className="relative bg-gradient-to-br from-warm-800 via-warm-900 to-warm-800 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(232,147,106,0.2),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(185,152,194,0.15),transparent_50%)]" />
          <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32 lg:py-40 lg:px-8 text-center">
            <Image
              src={IMAGES.pinkBrushLogo}
              alt="OvercomeHER"
              width={64}
              height={64}
              className="mx-auto mb-6 rounded-full"
            />
            <p className="text-sm uppercase tracking-[0.3em] text-blush-300 font-[family-name:var(--font-body)] font-medium">
              Free Quiz
            </p>
            <h1 className="mt-4 text-5xl md:text-6xl lg:text-7xl font-semibold text-white leading-tight max-w-3xl mx-auto">
              Discover your{" "}
              <span className="italic text-blush-300">healing style</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg text-warm-300 leading-relaxed font-[family-name:var(--font-body)]">
              Every woman heals differently. This 2-minute quiz will help you
              understand how you process, what you need, and which path forward
              is right for you.
            </p>
            <div className="mt-8">
              <Button variant="warm" size="lg" onClick={startQuiz}>
                Take the Quiz <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
            <p className="mt-4 text-sm text-warm-400 font-[family-name:var(--font-body)]">
              7 questions &middot; Takes about 2 minutes &middot; No email
              required
            </p>
          </div>
        </section>

        <Section variant="default" size="md">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-semibold text-warm-800">
              There are 5 healing styles
            </h2>
            <p className="mt-4 text-warm-500 font-[family-name:var(--font-body)]">
              Each one reflects how you naturally process pain, grow, and move
              forward. None is better or worse — they&apos;re all powerful.
            </p>
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-5 gap-4">
              {Object.values(HEALING_STYLE_RESULTS).map((style) => {
                const Icon = styleIcons[style.id];
                return (
                  <div
                    key={style.id}
                    className="p-4 rounded-2xl bg-warm-50 text-center"
                  >
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${styleColors[style.color]} flex items-center justify-center mx-auto`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <p className="mt-2 text-sm font-semibold text-warm-700 font-[family-name:var(--font-body)]">
                      {style.name}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </Section>
      </>
    );
  }

  // ===== QUIZ =====
  if (stage === "quiz") {
    const question = QUIZ_QUESTIONS[currentQuestion];
    const progress = ((currentQuestion + 1) / QUIZ_QUESTIONS.length) * 100;

    return (
      <div className="min-h-[85vh] flex flex-col bg-warm-50">
        {/* Progress bar */}
        <div className="sticky top-0 z-10 bg-white border-b border-warm-100">
          <div className="mx-auto max-w-3xl px-6 py-4">
            <div className="flex items-center justify-between mb-2">
              <button
                onClick={goBack}
                disabled={currentQuestion === 0}
                className="text-sm text-warm-400 hover:text-warm-600 disabled:opacity-30 disabled:cursor-not-allowed font-[family-name:var(--font-body)] flex items-center gap-1"
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </button>
              <span className="text-sm text-warm-400 font-[family-name:var(--font-body)]">
                {currentQuestion + 1} of {QUIZ_QUESTIONS.length}
              </span>
            </div>
            <div className="w-full h-2 bg-warm-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blush-400 to-plum-400 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Question */}
        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-semibold text-warm-900 text-center leading-snug">
              {question.question}
            </h2>
            <div className="mt-8 space-y-3">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => selectAnswer(option.style, index)}
                  disabled={selectedOption !== null}
                  className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-300 font-[family-name:var(--font-body)] ${
                    selectedOption === index
                      ? "border-blush-400 bg-blush-50 scale-[1.02]"
                      : "border-warm-200 bg-white hover:border-warm-300 hover:bg-warm-50"
                  } ${selectedOption !== null && selectedOption !== index ? "opacity-50" : ""}`}
                >
                  <div className="flex items-start gap-4">
                    <span
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-semibold ${
                        selectedOption === index
                          ? "bg-blush-400 text-white"
                          : "bg-warm-100 text-warm-500"
                      }`}
                    >
                      {selectedOption === index ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        String.fromCharCode(65 + index)
                      )}
                    </span>
                    <span className="text-warm-700 leading-relaxed pt-1">
                      {option.text}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ===== RESULT =====
  if (stage === "result" && result) {
    const style = HEALING_STYLE_RESULTS[result];
    const Icon = styleIcons[result];
    const recommendedTier = MEMBERSHIP_TIERS.find(
      (t) => t.id === style.recommendedTier
    );

    return (
      <>
        {/* Result Hero */}
        <section
          className={`relative overflow-hidden ${styleBgColors[style.color]}`}
        >
          <div className="mx-auto max-w-7xl px-6 py-20 md:py-28 lg:px-8 text-center">
            <div
              className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${styleColors[style.color]} flex items-center justify-center mx-auto mb-6`}
            >
              <Icon className="h-10 w-10" />
            </div>
            <p className="text-sm uppercase tracking-[0.25em] text-warm-400 font-[family-name:var(--font-body)] font-medium">
              Your Healing Style Is
            </p>
            <h1 className="mt-2 text-5xl md:text-6xl font-semibold text-warm-900">
              {style.name}
            </h1>
            <p className="mt-4 text-xl text-warm-600 italic font-[family-name:var(--font-body)]">
              {style.tagline}
            </p>
          </div>
        </section>

        {/* Description */}
        <Section variant="default" size="lg">
          <div className="max-w-3xl mx-auto">
            <AnimateOnScroll animation="fade-up">
              <p className="text-lg text-warm-600 leading-relaxed font-[family-name:var(--font-body)]">
                {style.description}
              </p>
            </AnimateOnScroll>
          </div>
        </Section>

        {/* Strengths & Growth */}
        <Section variant="warm" size="lg">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <AnimateOnScroll animation="fade-up">
              <div className="p-8 rounded-2xl bg-white">
                <h3 className="text-xl font-semibold text-warm-800 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-blush-400" /> Your Strengths
                </h3>
                <ul className="mt-4 space-y-3">
                  {style.strengths.map((s) => (
                    <li
                      key={s}
                      className="flex items-start gap-2 text-warm-600 font-[family-name:var(--font-body)]"
                    >
                      <Check className="h-4 w-4 text-sage-400 flex-shrink-0 mt-1" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll animation="fade-up" delay={150}>
              <div className="p-8 rounded-2xl bg-white">
                <h3 className="text-xl font-semibold text-warm-800 flex items-center gap-2">
                  <Heart className="h-5 w-5 text-plum-400" /> Growth Areas
                </h3>
                <ul className="mt-4 space-y-3">
                  {style.growthAreas.map((g) => (
                    <li
                      key={g}
                      className="flex items-start gap-2 text-warm-600 font-[family-name:var(--font-body)]"
                    >
                      <ArrowRight className="h-4 w-4 text-blush-400 flex-shrink-0 mt-1" />
                      {g}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimateOnScroll>
          </div>
        </Section>

        {/* Practices */}
        <Section variant="default" size="lg">
          <AnimateOnScroll animation="fade-up">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-semibold text-warm-900">
                Healing practices{" "}
                <span className="italic text-blush-400">for you</span>
              </h2>
              <div className="mt-8 space-y-4">
                {style.practicesForYou.map((practice, i) => (
                  <div
                    key={practice}
                    className="p-5 rounded-xl bg-warm-50 border border-warm-100 text-left flex items-start gap-4"
                  >
                    <span className="w-8 h-8 rounded-full bg-blush-100 text-blush-500 flex items-center justify-center flex-shrink-0 text-sm font-bold font-[family-name:var(--font-body)]">
                      {i + 1}
                    </span>
                    <span className="text-warm-600 font-[family-name:var(--font-body)]">
                      {practice}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </AnimateOnScroll>
        </Section>

        {/* Recommended Tier */}
        {recommendedTier && (
          <Section variant="warm" size="lg">
            <AnimateOnScroll animation="scale">
              <div className="max-w-2xl mx-auto text-center p-8 md:p-12 rounded-3xl bg-warm-800 text-white">
                <p className="text-sm uppercase tracking-[0.25em] text-blush-300 font-[family-name:var(--font-body)] font-medium">
                  Recommended For You
                </p>
                <h2 className="mt-4 text-3xl md:text-4xl font-semibold">
                  {recommendedTier.name}
                </h2>
                <p className="mt-2 text-warm-300 italic font-[family-name:var(--font-body)]">
                  {recommendedTier.tagline}
                </p>
                <p className="mt-4 text-warm-300 font-[family-name:var(--font-body)] leading-relaxed">
                  Based on your healing style, {recommendedTier.name} is the
                  best fit to support your growth journey. It includes the
                  practices, community, and structure that {style.name}s thrive
                  in.
                </p>
                <div className="mt-6 flex items-center justify-center gap-2 text-2xl font-bold">
                  ${recommendedTier.priceMonthly}
                  <span className="text-sm font-normal text-warm-400">
                    /month
                  </span>
                </div>
                <p className="text-sm text-blush-300 font-[family-name:var(--font-body)]">
                  {recommendedTier.trialText}
                </p>
                <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                  <Link href="/overcomeher/membership">
                    <Button variant="warm" size="lg">
                      View All Tiers <ArrowRight className="h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href="/overcomeher/join">
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-warm-500 text-warm-200 hover:bg-warm-700"
                    >
                      Join {recommendedTier.name}
                    </Button>
                  </Link>
                </div>
              </div>
            </AnimateOnScroll>
          </Section>
        )}

        {/* Retake / Share */}
        <Section variant="default" size="sm">
          <div className="text-center">
            <button
              onClick={startQuiz}
              className="inline-flex items-center gap-2 text-warm-400 hover:text-warm-600 transition-colors font-[family-name:var(--font-body)]"
            >
              <RefreshCw className="h-4 w-4" /> Retake the quiz
            </button>
          </div>
        </Section>
      </>
    );
  }

  return null;
}
