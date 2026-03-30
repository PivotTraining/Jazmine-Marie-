"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Heart, Mail, Lock, ArrowRight, Eye, EyeOff, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getBrowserSupabase } from "@/lib/supabase";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") ?? "/community";
  const errorParam = searchParams.get("error");

  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(errorParam === "auth_failed" ? "Authentication failed. Please try again." : "");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const supabase = getBrowserSupabase();

      if (isSignUp) {
        const name = formData.get("name") as string;
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: name },
            emailRedirectTo: `${window.location.origin}/api/auth/callback?next=${redirect}`,
          },
        });
        if (signUpError) throw signUpError;
        setError("");
        alert("Check your email for a confirmation link!");
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (signInError) throw signInError;
        router.push(redirect);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleLogin() {
    setLoading(true);
    setError("");
    try {
      const supabase = getBrowserSupabase();
      const { error: oauthError } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/api/auth/callback?next=${redirect}`,
        },
      });
      if (oauthError) throw oauthError;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Google login failed");
      setLoading(false);
    }
  }

  async function handleFacebookLogin() {
    setLoading(true);
    setError("");
    try {
      const supabase = getBrowserSupabase();
      const { error: oauthError } = await supabase.auth.signInWithOAuth({
        provider: "facebook",
        options: {
          redirectTo: `${window.location.origin}/api/auth/callback?next=${redirect}`,
        },
      });
      if (oauthError) throw oauthError;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Facebook login failed");
      setLoading(false);
    }
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
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-rose-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-rose-600 font-[family-name:var(--font-body)]">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {isSignUp && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-warm-700 mb-1.5 font-[family-name:var(--font-body)]">
                  Full Name
                </label>
                <div className="relative">
                  <Heart className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-warm-300" />
                  <input id="name" name="name" type="text" required placeholder="Your full name" className={inputClass} />
                </div>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-warm-700 mb-1.5 font-[family-name:var(--font-body)]">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-warm-300" />
                <input id="email" name="email" type="email" required placeholder="you@example.com" className={inputClass} />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-warm-700 mb-1.5 font-[family-name:var(--font-body)]">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-warm-300" />
                <input
                  id="password" name="password" type={showPassword ? "text" : "password"}
                  required minLength={8} placeholder="Min. 8 characters"
                  className={`${inputClass} pr-11`}
                />
                <button
                  type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-warm-300 hover:text-warm-500"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <Button type="submit" variant="primary" size="lg" className="w-full" disabled={loading}>
              {loading ? "Please wait..." : isSignUp ? "Create Account" : "Sign In"}
              {!loading && <ArrowRight className="h-5 w-5" />}
            </Button>
          </form>

          <div className="mt-6 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-warm-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-warm-400 font-[family-name:var(--font-body)]">or continue with</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <button
              type="button" onClick={handleGoogleLogin} disabled={loading}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-warm-200 text-warm-600 hover:bg-warm-50 transition-colors text-sm font-medium font-[family-name:var(--font-body)] disabled:opacity-50"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google
            </button>
            <button
              type="button" onClick={handleFacebookLogin} disabled={loading}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-warm-200 text-warm-600 hover:bg-warm-50 transition-colors text-sm font-medium font-[family-name:var(--font-body)] disabled:opacity-50"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="#1877F2">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Facebook
            </button>
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-warm-500 font-[family-name:var(--font-body)]">
          {isSignUp ? (
            <>
              Already have an account?{" "}
              <button type="button" onClick={() => { setIsSignUp(false); setError(""); }} className="text-plum-400 hover:text-plum-500 font-medium">
                Sign in
              </button>
            </>
          ) : (
            <>
              New to OvercomeHER?{" "}
              <button type="button" onClick={() => { setIsSignUp(true); setError(""); }} className="text-plum-400 hover:text-plum-500 font-medium">
                Create an account
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
