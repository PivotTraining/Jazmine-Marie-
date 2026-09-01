import type { Metadata } from "next";
import Image from "next/image";
import {
  Mic,
  Users,
  Heart,
  ArrowRight,
  Sparkles,
  Calendar,
  MapPin,
  CheckCircle2,
} from "lucide-react";
import { Section } from "@/components/ui/section";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import { SIGNATURE_TOPICS, IMAGES } from "@/lib/constants";
import { SpeakingInquiryForm } from "./inquiry-form";

export const metadata: Metadata = {
  title: "Book Jazmine to Speak",
  description:
    "Book Jazmine Marie for your next conference, retreat, women's event, workshop, or gathering. She speaks on healing, vulnerability, motherhood, identity, and wholeness.",
};

export default function SpeakingPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-warm-800 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(232,147,106,0.2),transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.25em] text-blush-300 font-[family-name:var(--font-body)] font-medium">
              Speaking & Events
            </p>
            <h1 className="mt-4 text-5xl md:text-6xl font-semibold text-white leading-tight">
              She doesn&apos;t just speak.{" "}
              <span className="italic text-blush-300">She shifts the room.</span>
            </h1>
            <p className="mt-6 text-lg text-warm-300 leading-relaxed font-[family-name:var(--font-body)]">
              Jazmine Marie brings a rare combination of warmth, wisdom, and raw
              honesty to every stage she touches. Her talks aren&apos;t performances
              — they&apos;re invitations for women to exhale, feel seen, and leave
              changed.
            </p>
          </div>
        </div>
      </section>

      {/* Signature Topics */}
      <Section variant="default" size="lg">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.25em] text-plum-400 font-[family-name:var(--font-body)] font-medium">
            Signature Topics
          </p>
          <h2 className="mt-4 text-4xl md:text-5xl font-semibold text-warm-900">
            What Jazmine speaks{" "}
            <span className="italic text-blush-400">about</span>
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SIGNATURE_TOPICS.map((topic) => (
            <div
              key={topic}
              className="p-6 rounded-2xl bg-warm-50 border border-warm-100 hover:border-blush-200 hover:bg-blush-50 transition-all duration-300 flex items-center gap-3"
            >
              <Sparkles className="h-5 w-5 text-blush-400 flex-shrink-0" />
              <span className="font-medium text-warm-700 font-[family-name:var(--font-body)]">
                {topic}
              </span>
            </div>
          ))}
        </div>
      </Section>

      {/* Speaker Bio */}
      <Section variant="warm" size="lg">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-xl order-2 lg:order-1">
            <Image
              src={IMAGES.speakingEvent5}
              alt="Jazmine Marie speaking on stage"
              width={600}
              height={750}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-4xl md:text-5xl font-semibold text-warm-900 leading-tight">
              More than a speaker —{" "}
              <span className="italic text-blush-400">a catalyst</span>
            </h2>
            <div className="mt-6 space-y-4 text-warm-500 leading-relaxed font-[family-name:var(--font-body)]">
              <p>
                Jazmine Marie is a host, speaker, and women&apos;s wellness voice
                whose work lives at the intersection of faith, healing, and
                emotional intelligence. She has spoken at conferences, women&apos;s
                retreats, church events, corporate wellness workshops, and
                community gatherings.
              </p>
              <p>
                What makes Jazmine different is her ability to hold space. She
                doesn&apos;t deliver motivational soundbites — she creates
                environments where women feel safe enough to be honest, brave
                enough to feel, and empowered enough to start healing.
              </p>
              <p>
                As the founder of OvercomeHER Circle, Jazmine brings deep
                community-building expertise and a genuine understanding of what
                women need — not more advice, but more space to become.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Ideal Audiences & What to Book For */}
      <Section variant="default" size="lg">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-semibold text-warm-900">
              Ideal <span className="italic text-blush-400">Audiences</span>
            </h2>
            <ul className="mt-6 space-y-3">
              {[
                "Women's conferences & retreats",
                "Church events & ministry gatherings",
                "Corporate wellness & employee resource groups",
                "Nonprofit galas & community events",
                "Mother-daughter events",
                "Small group workshops & panels",
                "Podcast & media appearances",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-warm-600 font-[family-name:var(--font-body)]"
                >
                  <CheckCircle2 className="h-5 w-5 text-sage-400 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-3xl font-semibold text-warm-900">
              What You <span className="italic text-blush-400">Get</span>
            </h2>
            <ul className="mt-6 space-y-3">
              {[
                "A keynote or breakout session tailored to your audience",
                "Pre-event consultation call",
                "Customized talk around your event theme",
                "Interactive elements (Q&A, guided exercises, prayer)",
                "Social media promotion of the event",
                "Post-event follow-up resources for attendees",
                "Optional workshop or small group add-on",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-warm-600 font-[family-name:var(--font-body)]"
                >
                  <Heart className="h-5 w-5 text-blush-400 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Event Photos */}
      <Section variant="warm" size="md">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { src: IMAGES.speakingEvent1, alt: "Jazmine hosting Valentine's event with heart balloons", position: "center", tall: false },
            { src: IMAGES.speakingEvent2, alt: "Jazmine speaking in hot pink with women laughing", position: "center", tall: false },
            { src: IMAGES.speakingEvent4, alt: "Jazmine presenting Overcoming Shame to become an OvercomeHER", position: "center", tall: false },
            { src: IMAGES.speakingEvent3, alt: "Jazmine speaking with mic in white blouse", position: "center", tall: false },
            { src: IMAGES.jazmineSpeakerCta, alt: "Jazmine speaking in hot pink on stage", position: "center", tall: false },
            { src: IMAGES.speakingEvent6, alt: "Jazmine speaking at PIVOT event with hand raised", position: "center", tall: true },
          ].map((img) => (
            <div
              key={img.alt}
              className={`rounded-2xl overflow-hidden ${img.tall ? "aspect-[3/4]" : "aspect-video"}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={600}
                height={img.tall ? 800 : 340}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </Section>

      {/* Testimonials */}
      <Section variant="default" size="lg">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold text-warm-900">
            What organizers are{" "}
            <span className="italic text-blush-400">saying</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {[
            {
              quote:
                "Jazmine was the highlight of our entire conference. Women were in tears — the good kind. She has a gift for making a room of 300 women feel like an intimate conversation.",
              name: "Pastor Michelle T.",
              role: "Annual Women's Conference",
            },
            {
              quote:
                "We've never had a speaker connect with our team the way Jazmine did. She didn't just motivate — she gave us language for the things we were all feeling but couldn't name.",
              name: "Sandra K.",
              role: "Corporate Wellness Event",
            },
          ].map((testimonial) => (
            <div
              key={testimonial.name}
              className="p-8 rounded-2xl bg-warm-50 border border-warm-100"
            >
              <p className="text-warm-600 leading-relaxed font-[family-name:var(--font-body)] italic">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="mt-6 pt-4 border-t border-warm-200">
                <p className="font-semibold text-warm-800 font-[family-name:var(--font-body)]">
                  {testimonial.name}
                </p>
                <p className="text-sm text-warm-400 font-[family-name:var(--font-body)]">
                  {testimonial.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Inquiry Form */}
      <Section variant="warm" size="lg">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.25em] text-plum-400 font-[family-name:var(--font-body)] font-medium">
              Get In Touch
            </p>
            <h2 className="mt-4 text-4xl md:text-5xl font-semibold text-warm-900">
              Book Jazmine for your{" "}
              <span className="italic text-blush-400">event</span>
            </h2>
            <p className="mt-4 text-warm-500 font-[family-name:var(--font-body)]">
              Fill out the form below and we&apos;ll be in touch within 48 hours.
            </p>
          </div>
          <SpeakingInquiryForm />
        </div>
      </Section>
    </>
  );
}
