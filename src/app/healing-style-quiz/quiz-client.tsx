"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Heart, Mail, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QUIZ_QUESTIONS, HEALING_STYLE_RESULTS, calculateResult, type HealingStyle } from "@/lib/quiz-data";

type Stage = "intro" | "quiz" | "email" | "result";

function shuffle<T>(items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function HealingStyleQuiz() {
  const [stage, setStage] = useState<Stage>("intro");
  const [questions, setQuestions] = useState(() => QUIZ_QUESTIONS.map((q) => ({ ...q, options: shuffle(q.options) })));
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<HealingStyle[]>([]);
  const [result, setResult] = useState<HealingStyle | null>(null);
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function start() {
    setQuestions(QUIZ_QUESTIONS.map((q) => ({ ...q, options: shuffle(q.options) })));
    setAnswers([]); setIndex(0); setResult(null); setError(""); setStage("quiz");
  }

  function answer(style: HealingStyle) {
    const next = [...answers, style];
    setAnswers(next);
    if (index === questions.length - 1) {
      setResult(calculateResult(next));
      setStage("email");
    } else setIndex(index + 1);
  }

  function back() {
    if (index > 0) { setIndex(index - 1); setAnswers(answers.slice(0, -1)); }
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!result) return;
    setLoading(true); setError("");
    const scores: Record<string, number> = {};
    answers.forEach((item) => { scores[item] = (scores[item] || 0) + 1; });
    try {
      const response = await fetch("/api/quiz-submission", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ firstName: firstName.trim(), email: email.trim(), result, answers, scores }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not save your results");
      setStage("result");
    } catch (err) { setError(err instanceof Error ? err.message : "Something went wrong. Please try again."); }
    finally { setLoading(false); }
  }

  if (stage === "intro") return (
    <section className="bg-warm-50 min-h-[80vh]"><div className="mx-auto max-w-3xl px-6 py-20 md:py-28 text-center"><p className="text-sm uppercase tracking-[0.25em] text-plum-400 font-medium">A reflective self-discovery tool</p><h1 className="mt-4 text-5xl md:text-6xl font-semibold text-warm-900">What&apos;s Your <span className="italic text-blush-400">Healing Style</span>?</h1><p className="mt-6 text-xl text-warm-500 leading-relaxed">Explore how you tend to process difficult experiences, stress, and personal growth—and what kinds of support may fit you best.</p><div className="mt-10 mx-auto max-w-xl text-left p-6 rounded-2xl bg-white border border-warm-100"><ul className="space-y-3 text-warm-600"><li className="flex gap-2"><Check className="h-5 w-5 text-sage-400"/>25 multiple-choice questions</li><li className="flex gap-2"><Check className="h-5 w-5 text-sage-400"/>About 4–6 minutes</li><li className="flex gap-2"><Check className="h-5 w-5 text-sage-400"/>One primary style with practical next steps</li><li className="flex gap-2"><Mail className="h-5 w-5 text-sage-400"/>Email is required to unlock your saved result and join the OvercomeHER email list</li></ul></div><p className="mt-5 text-sm text-warm-400">This quiz is for reflection and personal development. It is not a clinical or diagnostic assessment.</p><div className="mt-8"><Button size="lg" onClick={start}>Start the Quiz <ArrowRight className="h-5 w-5"/></Button></div></div></section>
  );

  if (stage === "quiz") {
    const q = questions[index];
    return <div className="min-h-[80vh] bg-warm-50"><div className="mx-auto max-w-3xl px-6 py-8"><div className="flex items-center justify-between"><button onClick={back} disabled={index === 0} className="flex items-center gap-1 text-sm text-warm-400 disabled:opacity-30"><ArrowLeft className="h-4 w-4"/>Back</button><span className="text-sm text-warm-400">Question {index + 1} of {questions.length}</span></div><div className="mt-3 h-2 bg-warm-100 rounded-full overflow-hidden"><div className="h-full bg-blush-400 transition-all" style={{ width: `${((index + 1) / questions.length) * 100}%` }}/></div><h2 className="mt-16 text-2xl md:text-3xl font-semibold text-warm-900 text-center">{q.question}</h2><div className="mt-8 space-y-3">{q.options.map((option, optionIndex) => <button key={`${q.id}-${option.style}-${optionIndex}`} onClick={() => answer(option.style)} className="w-full text-left p-5 rounded-2xl border-2 border-warm-200 bg-white hover:border-blush-300 hover:bg-blush-50 transition"><span className="inline-flex w-8 h-8 mr-3 rounded-full bg-warm-100 items-center justify-center text-sm font-semibold">{String.fromCharCode(65 + optionIndex)}</span>{option.text}</button>)}</div></div></div>;
  }

  if (stage === "email") return (
    <div className="min-h-[80vh] flex items-center justify-center bg-warm-50 px-6 py-20"><div className="w-full max-w-md text-center"><div className="w-16 h-16 rounded-2xl bg-blush-100 flex items-center justify-center mx-auto mb-6"><Heart className="h-8 w-8 text-blush-400"/></div><h1 className="text-3xl md:text-4xl font-semibold text-warm-900">Your result is ready</h1><p className="mt-4 text-warm-500">Enter your name and email to unlock your result. You&apos;ll also receive OvercomeHER reflections, resources, and invitations. You can unsubscribe anytime.</p><form onSubmit={submit} className="mt-8 space-y-4 text-left">{error && <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-sm text-rose-600">{error}</div>}<label className="block text-sm font-medium text-warm-700">First name<div className="relative mt-1.5"><User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-warm-300"/><input required value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-warm-200"/></div></label><label className="block text-sm font-medium text-warm-700">Email address<div className="relative mt-1.5"><Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-warm-300"/><input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-warm-200"/></div></label><Button type="submit" size="lg" className="w-full" disabled={loading}>{loading ? "Saving..." : "See My Result"}<ArrowRight className="h-5 w-5"/></Button></form><p className="mt-4 text-xs text-warm-400">Your responses are used to calculate and save your result. See our <Link href="/privacy" className="underline">Privacy Policy</Link>.</p></div></div>
  );

  if (!result) return null;
  const details = HEALING_STYLE_RESULTS[result];
  return (
    <section className="bg-warm-50"><div className="mx-auto max-w-4xl px-6 py-20"><div className="text-center"><p className="text-sm uppercase tracking-[0.25em] text-plum-400">Your Healing Style</p><h1 className="mt-4 text-4xl md:text-6xl font-semibold text-warm-900">{details.title}</h1><p className="mt-5 text-xl text-warm-500 italic">{details.identityHook}</p></div><div className="mt-12 grid md:grid-cols-2 gap-6"><div className="p-7 rounded-2xl bg-white border border-warm-100"><h2 className="text-2xl font-semibold text-warm-900">What this may mean for you</h2><div className="mt-4 space-y-3 text-warm-600">{details.whatThisMeans.map((item) => <p key={item}>{item}</p>)}</div></div><div className="p-7 rounded-2xl bg-white border border-warm-100"><h2 className="text-2xl font-semibold text-warm-900">What tends to help</h2><ul className="mt-4 space-y-3 text-warm-600">{details.whatActuallyHelps.map((item) => <li key={item} className="flex gap-2"><Check className="h-4 w-4 mt-1 text-sage-400"/>{item}</li>)}</ul></div><div className="p-7 rounded-2xl bg-white border border-warm-100"><h2 className="text-2xl font-semibold text-warm-900">Strengths</h2><ul className="mt-4 space-y-2 text-warm-600">{details.strengths.map((item) => <li key={item}>• {item}</li>)}</ul></div><div className="p-7 rounded-2xl bg-white border border-warm-100"><h2 className="text-2xl font-semibold text-warm-900">Growth edge</h2><div className="mt-4 space-y-3 text-warm-600">{details.growthEdge.map((item) => <p key={item}>{item}</p>)}</div></div></div><div className="mt-10 p-8 rounded-3xl bg-warm-800 text-white text-center"><h2 className="text-3xl font-semibold">{details.ctaHeading}</h2><p className="mt-4 max-w-2xl mx-auto text-warm-200">{details.ctaBody}</p><Link href="/overcomeher/membership" className="inline-block mt-7"><Button variant="warm" size="lg">{details.ctaButton} <ArrowRight className="h-5 w-5"/></Button></Link><p className="mt-4 text-sm text-warm-300">{details.ctaSupportingLine}</p></div><p className="mt-8 text-center text-xs text-warm-400">This result is a reflective personal-development tool, not a diagnosis or treatment recommendation.</p></div></section>
  );
}
