"use client";

export function NewsletterForm() {
  return (
    <form className="mt-4 flex gap-2" onSubmit={(e) => e.preventDefault()}>
      <input
        type="email"
        placeholder="Your email"
        className="flex-1 px-4 py-2 rounded-full bg-warm-700 text-white placeholder:text-warm-400 border border-warm-600 focus:border-warm-400 focus:outline-none text-sm font-[family-name:var(--font-body)]"
        aria-label="Email address"
      />
      <button
        type="submit"
        className="px-5 py-2 rounded-full bg-blush-400 text-white hover:bg-blush-500 transition-colors text-sm font-medium font-[family-name:var(--font-body)]"
      >
        Join
      </button>
    </form>
  );
}
