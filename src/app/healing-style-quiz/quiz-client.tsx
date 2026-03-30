"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowLeft, Check, Heart, Mail, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import {
  QUIZ_QUESTIONS,
  HEALING_STYLE_RESULTS,
  calculateResult,
  type HealingStyle,
} from "@/lib/quiz-data";
import { IMAGES } from "@/lib/constants";

type Stage = "intro" | "quiz" | "email" | "result";

export function HealingStyleQuiz() {
  const [stage, setStage] = useState<Stage>("intro");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<HealingStyle[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [result, setResult] = useState<HealingStyle | null>(null);
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailError, setEmailError] = useState("");

  function startQuiz() {
    setStage("quiz");
    setCurrentQuestion(0);
    setAnswers([]);
    setResult(null);
    setFirstName("");
    setEmail("");
    setEmailError("");
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
        setStage("email");
      }
    }, 400);
  }

  function goBack() {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setAnswers(answers.slice(0, -1));
    }
  }

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!firstName.trim() || !email.trim()) return;
    setEmailLoading(true);
    setEmailError("");

    // Build score breakdown
    const scores: Record<string, number> = {};
    for (const a of answers) {
      scores[a] = (scores[a] || 0) + 1;
    }

    try {
      const res = await fetch("/api/quiz-submission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: firstName.trim(),
          email: email.trim(),
          result,
          answers,
          scores,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to submit");
      }
      setStage("result");
    } catch (err) {
      setEmailError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setEmailLoading(false);
    }
  }

  // ================================================================
  // INTRO PAGE
  // ================================================================
  if (stage === "intro") {
    return (
      <>
        <section className="bg-warm-50">
          <div className="mx-auto max-w-3xl px-6 py-20 md:py-28 lg:px-8">
            <div className="text-center mb-12">
              <Image
                src={IMAGES.pinkBrushLogo}
                alt="OvercomeHER"
                width={56}
                height={56}
                className="mx-auto mb-6 rounded-full"
              />
              <h1 className="text-5xl md:text-6xl font-semibold text-warm-900 leading-tight">
                What&apos;s Your{" "}
                <span className="italic text-blush-400">Healing Style</span>?
              </h1>
              <p className="mt-4 text-xl text-warm-500 font-[family-name:var(--font-body)] leading-relaxed">
                Discover how you naturally process, heal, and grow so you can
                stop forcing healing that doesn&apos;t fit you.
              </p>
            </div>

            <div className="max-w-2xl mx-auto space-y-10">
              {/* Explanation */}
              <div className="space-y-4 text-warm-600 font-[family-name:var(--font-body)] leading-relaxed text-lg">
                <p>Healing is not one-size-fits-all.</p>
                <p>
                  Some women heal by talking.{" "}
                  Some need quiet and reflection.{" "}
                  Some need movement, understanding, creativity, connection, or
                  space to breathe.
                </p>
                <p>
                  The truth is, you may have been trying to heal in ways that
                  don&apos;t actually match how you&apos;re wired.
                </p>
                <p>
                  This quiz will help you understand your natural healing style
                  so you can better recognize what you need, why certain things
                  have or haven&apos;t worked for you, and what kind of support
                  helps you grow.
                </p>
              </div>

              {/* Why this matters */}
              <div>
                <h2 className="text-2xl font-semibold text-warm-800 mb-4">
                  Why this matters
                </h2>
                <div className="space-y-4 text-warm-600 font-[family-name:var(--font-body)] leading-relaxed text-lg">
                  <p>
                    When you understand how you naturally process life, pain,
                    stress, and growth, you can stop judging yourself and start
                    healing with more clarity, grace, and intention.
                  </p>
                  <p>This is not about boxing you in.</p>
                  <p>
                    It&apos;s about giving you language, direction, and a more
                    honest starting point.
                  </p>
                </div>
              </div>

              {/* What to expect */}
              <div className="p-6 rounded-2xl bg-white border border-warm-100">
                <h3 className="text-lg font-semibold text-warm-800 mb-3 font-[family-name:var(--font-body)]">
                  What to expect:
                </h3>
                <ul className="space-y-2 text-warm-500 font-[family-name:var(--font-body)]">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-sage-400 flex-shrink-0" />
                    25 multiple-choice questions
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-sage-400 flex-shrink-0" />
                    About 4 to 6 minutes
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-sage-400 flex-shrink-0" />
                    One primary healing style result
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-sage-400 flex-shrink-0" />
                    Optional email delivery of your results and next steps
                  </li>
                </ul>
              </div>

              {/* CTA */}
              <div className="text-center pt-4">
                <Button variant="primary" size="lg" onClick={startQuiz}>
                  Start the Quiz <ArrowRight className="h-5 w-5" />
                </Button>
                <p className="mt-3 text-sm text-warm-400 font-[family-name:var(--font-body)] italic">
                  A gentle first step toward understanding yourself better.
                </p>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  // ================================================================
  // QUIZ QUESTIONS
  // ================================================================
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
                Question {currentQuestion + 1} of {QUIZ_QUESTIONS.length}
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
                        option.label
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

  // ================================================================
  // EMAIL CAPTURE
  // ================================================================
  if (stage === "email") {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-warm-50 px-6 py-20">
        <div className="w-full max-w-md text-center">
          <div className="w-16 h-16 rounded-2xl bg-blush-100 flex items-center justify-center mx-auto mb-6">
            <Heart className="h-8 w-8 text-blush-400" />
          </div>
          <h1 className="text-3xl md:text-4xl font-semibold text-warm-900">
            Your Healing Style Is Ready
          </h1>
          <p className="mt-4 text-warm-500 font-[family-name:var(--font-body)] leading-relaxed">
            Enter your email to see your results and get a copy sent to your
            inbox with thoughtful next steps.
          </p>

          <form
            onSubmit={handleEmailSubmit}
            className="mt-8 space-y-4 text-left"
          >
            {emailError && (
              <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-sm text-rose-600 font-[family-name:var(--font-body)]">
                {emailError}
              </div>
            )}
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-warm-700 mb-1.5 font-[family-name:var(--font-body)]"
              >
                First Name
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-warm-300" />
                <input
                  id="firstName"
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Your first name"
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-warm-200 text-warm-800 placeholder:text-warm-300 focus:border-plum-300 focus:ring-2 focus:ring-plum-100 focus:outline-none transition-all font-[family-name:var(--font-body)]"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="quizEmail"
                className="block text-sm font-medium text-warm-700 mb-1.5 font-[family-name:var(--font-body)]"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-warm-300" />
                <input
                  id="quizEmail"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-warm-200 text-warm-800 placeholder:text-warm-300 focus:border-plum-300 focus:ring-2 focus:ring-plum-100 focus:outline-none transition-all font-[family-name:var(--font-body)]"
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              disabled={emailLoading}
            >
              {emailLoading ? "Submitting..." : "See My Results"}
              {!emailLoading && <ArrowRight className="h-5 w-5" />}
            </Button>

            <p className="text-sm text-warm-400 font-[family-name:var(--font-body)] text-center">
              We&apos;ll also send a gentle follow-up to help you take the next
              right step.
            </p>
            <p className="text-xs text-warm-300 font-[family-name:var(--font-body)] text-center">
              By continuing, you agree to receive your quiz result and occasional
              OvercomeHER emails. You can unsubscribe anytime.
            </p>
          </form>
        </div>
      </div>
    );
  }

  // ================================================================
  // RESULT PAGE
  // ================================================================
  if (stage === "result" && result) {
    const style = HEALING_STYLE_RESULTS[result];

    return (
      <>
        {/* Result Header */}
        <section className="bg-warm-50">
          <div className="mx-auto max-w-3xl px-6 py-20 md:py-28 lg:px-8 text-center">
            <p className="text-sm uppercase tracking-[0.25em] text-plum-400 font-[family-name:var(--font-body)] font-medium">
              Your Healing Style Is
            </p>
            <h1 className="mt-4 text-5xl md:text-6xl font-semibold text-warm-900">
              {style.title}
            </h1>
            <p className="mt-6 text-xl text-warm-600 italic font-[family-name:var(--font-body)] leading-relaxed max-w-xl mx-auto">
              {style.identityHook}
            </p>
          </div>
        </section>

        {/* What This Means */}
        <Section variant="default" size="lg">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-semibold text-warm-900 mb-6">
              What this means
            </h2>
            <div className="space-y-4 text-lg text-warm-600 font-[family-name:var(--font-body)] leading-relaxed">
              {style.whatThisMeans.map((p, i) => (
                <p key={i} style={{ whiteSpace: "pre-line" }}>{p}</p>
              ))}
            </div>
          </div>
        </Section>

        {/* Core Needs */}
        <Section variant="warm" size="lg">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-semibold text-warm-900 mb-6">
              Your Core Needs
            </h2>
            <ul className="space-y-3">
              {style.coreNeeds.map((need) => (
                <li
                  key={need}
                  className="flex items-start gap-3 text-warm-600 font-[family-name:var(--font-body)] text-lg"
                >
                  <Heart className="h-5 w-5 text-blush-400 flex-shrink-0 mt-1" />
                  {need}
                </li>
              ))}
            </ul>
          </div>
        </Section>

        {/* What This Looks Like */}
        <Section variant="default" size="lg">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-semibold text-warm-900 mb-6">
              What this looks like
            </h2>
            <ul className="space-y-3">
              {style.whatThisLooksLike.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-warm-600 font-[family-name:var(--font-body)] text-lg"
                >
                  <Check className="h-5 w-5 text-sage-400 flex-shrink-0 mt-1" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Section>

        {/* How This Shows Up */}
        <Section variant="warm" size="lg">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-semibold text-warm-900 mb-6">
              How this shows up
            </h2>
            <ul className="space-y-3">
              {style.howThisShowsUp.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-warm-600 font-[family-name:var(--font-body)] text-lg"
                >
                  <ArrowRight className="h-5 w-5 text-plum-400 flex-shrink-0 mt-1" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Section>

        {/* Strengths */}
        <Section variant="default" size="lg">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-semibold text-warm-900 mb-6">
              Your Strengths
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {style.strengths.map((s) => (
                <div
                  key={s}
                  className="p-5 rounded-xl bg-warm-50 border border-warm-100 text-warm-700 font-[family-name:var(--font-body)] text-lg font-medium"
                >
                  {s}
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Growth Edge */}
        <Section variant="warm" size="lg">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-semibold text-warm-900 mb-6">
              Growth Edge
            </h2>
            <div className="space-y-2 text-lg text-warm-600 font-[family-name:var(--font-body)] leading-relaxed">
              {style.growthEdge.map((line, i) => (
                <p key={i} className={i > 0 ? "font-medium text-warm-800" : ""}>
                  {line}
                </p>
              ))}
            </div>
          </div>
        </Section>

        {/* What Actually Helps */}
        <Section variant="default" size="lg">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-semibold text-warm-900 mb-6">
              What Actually Helps You Heal
            </h2>
            <ul className="space-y-3">
              {style.whatActuallyHelps.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-warm-600 font-[family-name:var(--font-body)] text-lg"
                >
                  <Heart className="h-5 w-5 text-blush-400 flex-shrink-0 mt-1" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-warm-800 via-warm-900 to-warm-800">
          <div className="mx-auto max-w-3xl px-6 py-20 md:py-28 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-semibold text-white leading-snug">
              {style.ctaHeading}
            </h2>
            <div className="mt-6 text-lg text-warm-300 font-[family-name:var(--font-body)] leading-relaxed whitespace-pre-line max-w-xl mx-auto">
              {style.ctaBody}
            </div>
            <div className="mt-8">
              <Link href="/overcomeher/join">
                <Button variant="warm" size="lg">
                  {style.ctaButton} <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
            <p className="mt-4 text-warm-400 font-[family-name:var(--font-body)] italic">
              {style.ctaSupportingLine}
            </p>
          </div>
        </section>
      </>
    );
  }

  return null;
}
