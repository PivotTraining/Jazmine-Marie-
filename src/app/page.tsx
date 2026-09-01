import Link from "next/link";
import Image from "next/image";
import { Mic, Users, Heart, ArrowRight, Sparkles, ShieldCheck, Check } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import { SIGNATURE_TOPICS, MEMBERSHIP_TIERS, IMAGES } from "@/lib/constants";

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-warm-50">
        <div className="absolute inset-0 bg-gradient-to-br from-blush-50/60 via-transparent to-plum-50/30" />
        <div className="relative mx-auto max-w-7xl px-6 pt-10 pb-24 md:pt-14 md:pb-32 lg:pt-16 lg:pb-40 lg:px-8">
          <p className="text-5xl md:text-6xl lg:text-7xl text-pink-500 font-[family-name:var(--font-script)] mb-10 md:mb-14 animate-script-reveal">
            Hey sis, you belong here.
          </p>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-blush-500 font-medium">
                Speaker · Facilitator · Founder of OvercomeHER
              </p>
              <h1 className="mt-4 text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.1] tracking-tight text-warm-900">
                Build more self-trust. Break healthier patterns. Live with more <span className="text-blush-400 italic">clarity</span>.
              </h1>
              <p className="mt-6 max-w-xl text-lg text-warm-500 leading-relaxed">
                I create honest, practical spaces for women navigating identity, guilt, boundaries, burnout, relationships, faith, and personal growth—through speaking, facilitated experiences, and the OvercomeHER Circle.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/healing-style-quiz"><Button variant="primary" size="lg">Take the Healing Style Quiz <ArrowRight className="h-5 w-5" /></Button></Link>
                <Link href="/speaking"><Button variant="outline" size="lg">Book Jazmine</Button></Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                <Image src={IMAGES.jazmineHero} alt="Jazmine Marie — speaker, facilitator, and founder of OvercomeHER" fill className="object-cover" priority sizes="(max-width: 1024px) 0vw, 50vw" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section variant="default" size="lg">
        <AnimateOnScroll animation="fade-up">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.25em] text-plum-400 font-medium">Two clear ways to work together</p>
            <h2 className="mt-4 text-4xl md:text-5xl font-semibold text-warm-900">For women. For <span className="italic text-blush-400">rooms that matter</span>.</h2>
          </div>
        </AnimateOnScroll>
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          <AnimateOnScroll animation="fade-up">
            <div className="p-8 rounded-3xl bg-warm-50 border border-warm-100 h-full">
              <div className="w-14 h-14 rounded-2xl bg-blush-100 flex items-center justify-center"><Heart className="h-7 w-7 text-blush-500" /></div>
              <h3 className="mt-6 text-3xl font-semibold text-warm-900">For Women</h3>
              <p className="mt-3 text-warm-500 leading-relaxed">Use the Healing Style Quiz as your starting point, then explore OvercomeHER for community, reflection, accountability, live experiences, and deeper support.</p>
              <div className="mt-6 flex flex-wrap gap-3"><Link href="/healing-style-quiz"><Button variant="primary">Take the Quiz</Button></Link><Link href="/overcomeher"><Button variant="outline">Explore OvercomeHER</Button></Link></div>
            </div>
          </AnimateOnScroll>
          <AnimateOnScroll animation="fade-up" delay={120}>
            <div className="p-8 rounded-3xl bg-warm-800 text-white h-full">
              <div className="w-14 h-14 rounded-2xl bg-blush-400/20 flex items-center justify-center"><Mic className="h-7 w-7 text-blush-300" /></div>
              <h3 className="mt-6 text-3xl font-semibold">For Organizations & Events</h3>
              <p className="mt-3 text-warm-200 leading-relaxed">Book Jazmine for conferences, retreats, panels, women’s events, and facilitated conversations designed to move people beyond inspiration into reflection and action.</p>
              <div className="mt-6"><Link href="/speaking"><Button variant="warm">Explore Speaking <ArrowRight className="h-4 w-4" /></Button></Link></div>
            </div>
          </AnimateOnScroll>
        </div>
      </Section>

      <section className="bg-warm-800 py-6 overflow-hidden">
        <div className="flex gap-8 whitespace-nowrap animate-[scroll_30s_linear_infinite]">
          {[...SIGNATURE_TOPICS, ...SIGNATURE_TOPICS].map((topic, i) => (
            <span key={i} className="flex items-center gap-3 text-warm-300 text-sm uppercase tracking-widest"><Sparkles className="h-4 w-4 text-blush-400 flex-shrink-0" />{topic}</span>
          ))}
        </div>
      </section>

      <Section variant="warm" size="lg">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <AnimateOnScroll animation="slide-right">
            <div>
              <div className="flex items-center gap-3 mb-4"><Image src={IMAGES.overcomeherLogo} alt="OvercomeHER Logo" width={48} height={48} className="rounded-lg" /><p className="text-sm uppercase tracking-[0.25em] text-plum-400 font-medium">OvercomeHER Circle</p></div>
              <h2 className="text-4xl md:text-5xl font-semibold text-warm-900 leading-tight">A community for women who want growth that shows up in <span className="italic text-blush-400">real life</span>.</h2>
              <p className="mt-6 text-lg text-warm-500 leading-relaxed">Build self-trust, strengthen boundaries, understand your patterns, practice healthier responses, and stay connected to women who are working on themselves too.</p>
              <ul className="mt-6 space-y-3">
                {["Guided reflection and practical prompts", "Community spaces for honest conversation", "Live sessions and shared accountability", "Multiple membership levels as your needs change"].map((item) => <li key={item} className="flex items-start gap-3 text-warm-600"><Check className="h-5 w-5 text-sage-500 flex-shrink-0 mt-0.5" />{item}</li>)}
              </ul>
              <div className="mt-8"><Link href="/overcomeher"><Button variant="warm" size="lg">Explore OvercomeHER <ArrowRight className="h-5 w-5" /></Button></Link></div>
            </div>
          </AnimateOnScroll>
          <AnimateOnScroll animation="slide-left">
            <div className="flex flex-col gap-4">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-md"><Image src={IMAGES.communityCelebration} alt="Women celebrating at an OvercomeHER event" width={600} height={450} className="w-full h-full object-cover" /></div>
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-md"><Image src={IMAGES.communitySisterhood} alt="Women connecting together" width={600} height={450} className="w-full h-full object-cover" /></div>
            </div>
          </AnimateOnScroll>
        </div>
      </Section>

      <section className="relative overflow-hidden bg-gradient-to-r from-warm-800 via-warm-900 to-warm-800">
        <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <p className="text-sm uppercase tracking-[0.25em] text-blush-300 font-medium">Book Jazmine</p>
              <h2 className="mt-4 text-4xl md:text-5xl font-semibold text-white leading-tight">She doesn&apos;t just speak. <span className="italic text-blush-300">She shifts the room.</span></h2>
              <p className="mt-6 max-w-2xl text-lg text-warm-300 leading-relaxed">Bring Jazmine in for candid, audience-centered conversations on shame, vulnerability, motherhood, identity, self-trust, emotional wellness, and what it takes to change familiar patterns.</p>
              <div className="mt-8"><Link href="/speaking"><Button variant="warm" size="lg">Inquire About Speaking <ArrowRight className="h-5 w-5" /></Button></Link></div>
            </div>
            <div className="hidden lg:block"><div className="rounded-2xl overflow-hidden aspect-[3/2]"><Image src={IMAGES.jazmineSpeakerCta} alt="Jazmine Marie speaking on stage" width={800} height={530} className="w-full h-full object-cover" /></div></div>
          </div>
        </div>
      </section>

      <Section variant="warm" size="lg">
        <AnimateOnScroll animation="fade-up">
          <div className="text-center mb-16"><Image src={IMAGES.pinkBrushLogo} alt="OvercomeHER" width={64} height={64} className="mx-auto mb-4 rounded-full" /><p className="text-sm uppercase tracking-[0.25em] text-plum-400 font-medium">Membership</p><h2 className="mt-4 text-4xl md:text-5xl font-semibold text-warm-900">Find your place in <span className="italic text-blush-400">the circle</span></h2><p className="mt-4 max-w-2xl mx-auto text-lg text-warm-500">Start with the level of support that fits now. Monthly and annual billing are available, and every tier begins with a 7-day free trial.</p></div>
        </AnimateOnScroll>
        <div className="grid md:grid-cols-3 gap-8">
          {MEMBERSHIP_TIERS.map((tier, i) => (
            <AnimateOnScroll key={tier.id} animation="fade-up" delay={i * 120}>
              <div className={`relative p-8 rounded-2xl h-full flex flex-col ${tier.highlighted ? "bg-warm-800 text-white ring-2 ring-blush-400" : "bg-white shadow-sm"}`}>
                {tier.highlighted && <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-blush-400 text-white text-xs font-semibold uppercase tracking-wider">Most Popular</span>}
                <h3 className="text-3xl font-semibold">{tier.name}</h3><p className={`mt-2 text-sm ${tier.highlighted ? "text-warm-200" : "text-warm-500"}`}>{tier.tagline}</p>
                <div className="mt-6"><span className="text-4xl font-bold">${tier.priceMonthly}</span><span className={`text-sm ${tier.highlighted ? "text-warm-300" : "text-warm-400"}`}>/month</span></div>
                <p className={`mt-1 text-sm ${tier.highlighted ? "text-blush-300" : "text-sage-500"}`}>7-day free trial</p>
                <ul className="mt-6 space-y-2 flex-1">{tier.features.slice(0, 5).map((feature) => <li key={feature} className={`flex items-start gap-2 text-sm ${tier.highlighted ? "text-warm-200" : "text-warm-500"}`}><Heart className="h-4 w-4 flex-shrink-0 mt-0.5 text-blush-400" />{feature}</li>)}</ul>
                <div className="mt-8"><Link href="/overcomeher/membership" className="block"><Button variant={tier.highlighted ? "warm" : "outline"} className="w-full">View {tier.name}</Button></Link></div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </Section>

      <section className="relative overflow-hidden bg-gradient-to-br from-plum-50 via-blush-50 to-warm-50">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20 lg:px-8">
          <AnimateOnScroll animation="fade-up">
            <div className="max-w-2xl mx-auto text-center"><p className="text-sm uppercase tracking-[0.25em] text-plum-400 font-medium">Free Quiz</p><h2 className="mt-4 text-3xl md:text-4xl font-semibold text-warm-900">Not sure where to start? <span className="italic text-blush-400">Discover your healing style.</span></h2><p className="mt-4 text-warm-500">Take the 25-question, 4–6 minute reflective quiz to explore how you tend to process difficult experiences and personal growth. Your email is required to unlock and save your result.</p><p className="mt-2 text-xs text-warm-400">For personal development only; not a clinical or diagnostic assessment.</p><div className="mt-6"><Link href="/healing-style-quiz"><Button variant="primary" size="lg">Take the Quiz <ArrowRight className="h-5 w-5" /></Button></Link></div></div>
          </AnimateOnScroll>
        </div>
      </section>

      <Section variant="default" size="md">
        <AnimateOnScroll animation="scale">
          <div className="max-w-2xl mx-auto text-center p-8 md:p-12 rounded-3xl bg-warm-50 border border-warm-100"><ShieldCheck className="h-10 w-10 text-sage-500 mx-auto" /><p className="mt-4 text-sm uppercase tracking-[0.25em] text-sage-500 font-semibold">Try before billing begins</p><h3 className="mt-4 text-2xl md:text-3xl font-semibold text-warm-900">Every membership starts with a 7-day free trial.</h3><p className="mt-4 text-warm-500 leading-relaxed">Your payment method is collected securely by Stripe. Cancel before the trial ends and you will not begin paid billing. If you continue, your chosen monthly or annual plan renews automatically until canceled.</p><div className="mt-6"><Link href="/overcomeher/membership"><Button variant="primary" size="lg">Explore Membership <ArrowRight className="h-5 w-5" /></Button></Link></div><p className="mt-4 text-xs text-warm-400">See Membership Terms for billing and cancellation details.</p></div>
        </AnimateOnScroll>
      </Section>
    </>
  );
}
