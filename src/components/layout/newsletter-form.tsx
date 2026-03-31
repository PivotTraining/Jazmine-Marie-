"use client";

import { useState } from "react";
import { Check } from "lucide-react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to subscribe");
      }
      setSuccess(true);
      setEmail("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="mt-4 flex items-center gap-2 text-sage-400 font-[family-name:var(--font-body)] text-sm">
        <Check className="h-4 w-4" /> You&apos;re subscribed!
      </div>
    );
  }

  return (
    <form className="mt-4 flex gap-2" onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email"
        required
        className="flex-1 px-4 py-2 rounded-full bg-berry-700 text-white placeholder:text-berry-400 border border-berry-600 focus:border-pink-400 focus:outline-none text-sm font-[family-name:var(--font-body)]"
        aria-label="Email address"
      />
      <button
        type="submit"
        disabled={loading}
        className="px-5 py-2 rounded-full bg-pink-500 text-white hover:bg-pink-600 transition-colors text-sm font-medium font-[family-name:var(--font-body)] disabled:opacity-50"
      >
        {loading ? "..." : "Join"}
      </button>
      {error && (
        <p className="text-rose-400 text-xs mt-1">{error}</p>
      )}
    </form>
  );
}
