"use client";

import { useState, type FormEvent } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SpeakingInquiryForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    // In production, this would POST to an API route that saves to Supabase
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="text-center py-12 px-8 rounded-2xl bg-white">
        <CheckCircle2 className="h-16 w-16 text-sage-400 mx-auto mb-4" />
        <h3 className="text-2xl font-semibold text-warm-800">
          Thank you for your inquiry!
        </h3>
        <p className="mt-2 text-warm-500 font-[family-name:var(--font-body)]">
          We&apos;ll review your request and get back to you within 48 hours.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full px-4 py-3 rounded-xl bg-white border border-warm-200 text-warm-800 placeholder:text-warm-300 focus:border-plum-300 focus:ring-2 focus:ring-plum-100 focus:outline-none transition-all font-[family-name:var(--font-body)]";
  const labelClass =
    "block text-sm font-medium text-warm-700 mb-1.5 font-[family-name:var(--font-body)]";

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-8 rounded-2xl bg-white shadow-sm">
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className={labelClass}>
            Your Name *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Full name"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
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
        <label htmlFor="organization" className={labelClass}>
          Organization / Church / Company
        </label>
        <input
          id="organization"
          name="organization"
          type="text"
          placeholder="Organization name"
          className={inputClass}
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="eventType" className={labelClass}>
            Event Type *
          </label>
          <select id="eventType" name="eventType" required className={inputClass}>
            <option value="">Select event type</option>
            <option value="conference">Conference / Summit</option>
            <option value="retreat">Women&apos;s Retreat</option>
            <option value="workshop">Workshop</option>
            <option value="church">Church Event</option>
            <option value="corporate">Corporate / Wellness Event</option>
            <option value="panel">Panel / Moderation</option>
            <option value="podcast">Podcast / Media</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="date" className={labelClass}>
            Preferred Date
          </label>
          <input id="date" name="date" type="date" className={inputClass} />
        </div>
      </div>

      <div>
        <label htmlFor="audienceSize" className={labelClass}>
          Expected Audience Size
        </label>
        <select id="audienceSize" name="audienceSize" className={inputClass}>
          <option value="">Select audience size</option>
          <option value="under-50">Under 50</option>
          <option value="50-100">50 - 100</option>
          <option value="100-300">100 - 300</option>
          <option value="300-500">300 - 500</option>
          <option value="500+">500+</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          Tell us about your event *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Share details about your event, audience, and what you're hoping Jazmine will speak on..."
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
            Send Inquiry <Send className="h-5 w-5" />
          </>
        )}
      </Button>
    </form>
  );
}
