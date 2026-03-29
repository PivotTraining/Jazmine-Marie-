"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // In production: call Supabase auth
    setTimeout(() => setLoading(false), 1500);
  }

  const inputClass =
    "w-full pl-11 pr-4 py-3 rounded-xl bg-warm-50 border border-warm-200 text-warm-800 placeholder:text-warm-300 focus:border-plum-300 focus:ring-2 focus:ring-plum-100 focus:outline-none transition-all font-[family-name:var(--font-body)]";

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-warm-50 px-6 py-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-blush-100 flex items-center justify-center mx-auto mb-4">
            <Heart className="h-8 w-8 text-blush-400" />
          </div>
          <h1 className="text-3xl font-semibold text-warm-900">
            {isSignUp ? "Join the Circle" : "Welcome Back"}
          </h1>
          <p className="mt-2 text-warm-500 font-[family-name:var(--font-body)]">
            {isSignUp
              ? "Create your account to get started"
              : "Sign in to your OvercomeHER account"}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-warm-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {isSignUp && (
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-warm-700 mb-1.5 font-[family-name:var(--font-body)]"
                >
                  Full Name
                </label>
                <div className="relative">
                  <Heart className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-warm-300" />
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Your full name"
                    className={inputClass}
                  />
                </div>
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-warm-700 mb-1.5 font-[family-name:var(--font-body)]"
              >
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-warm-300" />
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
                htmlFor="password"
                className="block text-sm font-medium text-warm-700 mb-1.5 font-[family-name:var(--font-body)]"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-warm-300" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Your password"
                  className={`${inputClass} pr-11`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-warm-300 hover:text-warm-500"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              disabled={loading}
            >
              {loading
                ? "Please wait..."
                : isSignUp
                  ? "Create Account"
                  : "Sign In"}
              {!loading && <ArrowRight className="h-5 w-5" />}
            </Button>
          </form>

          <div className="mt-6 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-warm-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-warm-400 font-[family-name:var(--font-body)]">
                or continue with
              </span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <button
              type="button"
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-warm-200 text-warm-600 hover:bg-warm-50 transition-colors text-sm font-medium font-[family-name:var(--font-body)]"
            >
              Google
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-warm-200 text-warm-600 hover:bg-warm-50 transition-colors text-sm font-medium font-[family-name:var(--font-body)]"
            >
              Facebook
            </button>
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-warm-500 font-[family-name:var(--font-body)]">
          {isSignUp ? (
            <>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setIsSignUp(false)}
                className="text-plum-400 hover:text-plum-500 font-medium"
              >
                Sign in
              </button>
            </>
          ) : (
            <>
              New to OvercomeHER?{" "}
              <button
                type="button"
                onClick={() => setIsSignUp(true)}
                className="text-plum-400 hover:text-plum-500 font-medium"
              >
                Create an account
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
