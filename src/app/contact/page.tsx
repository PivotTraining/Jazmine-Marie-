"use client";

import { useState, type FormEvent } from "react";
import {
  Heart,
  Mail,
  MapPin,
  Globe,
  Share,
  Send,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { SOCIAL_LINKS } from "@/lib/constants";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: new FormData(e.currentTarget).get("name"),
          email: new FormData(e.currentTarget).get("email"),
          subject: new FormData(e.currentTarget).get("subject"),
          message: new FormData(e.currentTarget).get("message"),
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to send");
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full px-4 py-3 rounded-xl bg-white border border-warm-200 text-warm-800 placeholder:text-warm-300 focus:border-plum-300 focus:ring-2 focus:ring-plum-100 focus:outline-none transition-all font-[family-name:var(--font-body)]";

  return (
    <>
      <section className="bg-warm-50">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-24 lg:px-8 text-center">
          <p className="text-sm uppercase tracking-[0.25em] text-plum-400 font-[family-name:var(--font-body)] font-medium">
            Get In Touch
          </p>
          <h1 className="mt-4 text-5xl md:text-6xl font-semibold text-warm-900 leading-tight">
            Let&apos;s{" "}
            <span className="italic text-blush-400">connect</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-warm-500 font-[family-name:var(--font-body)]">
            Whether you have a question, want to collaborate, or just want to
            say hello — I&apos;d love to hear from you.
          </p>
        </div>
      </section>

      <Section variant="default" size="lg">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Contact Info */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold text-warm-800">
              Other ways to reach me
            </h2>
            <div className="mt-8 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blush-50 flex items-center justify-center flex-shrink-0">
                  <Mail className="h-5 w-5 text-blush-400" />
                </div>
                <div>
                  <p className="font-medium text-warm-700 font-[family-name:var(--font-body)]">
                    Email
                  </p>
                  <p className="text-warm-500 font-[family-name:var(--font-body)]">
                    hello@jazminemarie.com
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-plum-50 flex items-center justify-center flex-shrink-0">
                  <Globe className="h-5 w-5 text-plum-400" />
                </div>
                <div>
                  <p className="font-medium text-warm-700 font-[family-name:var(--font-body)]">
                    Instagram
                  </p>
                  <a
                    href={SOCIAL_LINKS.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-plum-400 hover:text-plum-500 font-[family-name:var(--font-body)]"
                  >
                    @jazminemarie
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-sage-50 flex items-center justify-center flex-shrink-0">
                  <Share className="h-5 w-5 text-sage-400" />
                </div>
                <div>
                  <p className="font-medium text-warm-700 font-[family-name:var(--font-body)]">
                    Facebook
                  </p>
                  <a
                    href={SOCIAL_LINKS.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-plum-400 hover:text-plum-500 font-[family-name:var(--font-body)]"
                  >
                    Jazmine Marie
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-12 p-6 rounded-2xl bg-warm-50 border border-warm-100">
              <Heart className="h-8 w-8 text-blush-400 mb-3" />
              <h3 className="font-semibold text-warm-800">
                Looking to book Jazmine for an event?
              </h3>
              <p className="mt-2 text-sm text-warm-500 font-[family-name:var(--font-body)]">
                Head over to the{" "}
                <a
                  href="/speaking"
                  className="text-plum-400 hover:text-plum-500 font-medium"
                >
                  Speaking page
                </a>{" "}
                for details and the booking inquiry form.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div className="text-center py-16 px-8 rounded-2xl bg-warm-50 border border-warm-100">
                <CheckCircle2 className="h-16 w-16 text-sage-400 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-warm-800">
                  Message sent!
                </h3>
                <p className="mt-2 text-warm-500 font-[family-name:var(--font-body)]">
                  Thank you for reaching out. I&apos;ll get back to you as soon as I can.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-6 p-8 rounded-2xl bg-warm-50 border border-warm-100"
              >
                {error && (
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-sm font-[family-name:var(--font-body)]">
                    <AlertCircle className="h-5 w-5 flex-shrink-0" />
                    {error}
                  </div>
                )}
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-warm-700 mb-1.5 font-[family-name:var(--font-body)]"
                    >
                      Name *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Your name"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-warm-700 mb-1.5 font-[family-name:var(--font-body)]"
                    >
                      Email *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="you@example.com"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-warm-700 mb-1.5 font-[family-name:var(--font-body)]"
                  >
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="What's this about?"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-warm-700 mb-1.5 font-[family-name:var(--font-body)]"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    placeholder="Share what's on your mind..."
                    className={inputClass}
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message <Send className="h-5 w-5" />
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </Section>
    </>
  );
}
