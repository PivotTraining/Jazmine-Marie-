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
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(searchParams.get("error") === "auth_failed" ? "Authentication failed. Please try again." : "");
  const [email, setEmail] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setLoading(true); setError("");
    const formData = new FormData(e.currentTarget);
    const submittedEmail = String(formData.get("email") || "");
    const password = String(formData.get("password") || "");
    try {
      if (isSignUp) {
        const name = String(formData.get("name") || "");
        const { error: signUpError } = await getBrowserSupabase().auth.signUp({ email: submittedEmail, password, options: { data: { full_name: name }, emailRedirectTo: `${window.location.origin}/api/auth/callback?next=${encodeURIComponent(redirect)}` } });
        if (signUpError) throw signUpError;
        setIsSignUp(false); setError("Check your email to confirm your account, then return here to sign in.");
      } else {
        const response = await fetch("/api/auth/password", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: submittedEmail, password }) });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Sign in failed");
        router.replace(redirect); router.refresh();
      }
    } catch (err) { setError(err instanceof Error ? err.message : "Something went wrong. Please try again."); }
    finally { setLoading(false); }
  }

  async function handleOAuth(provider: "google" | "facebook") {
    setLoading(true); setError("");
    try {
      const { error: oauthError } = await getBrowserSupabase().auth.signInWithOAuth({ provider, options: { redirectTo: `${window.location.origin}/api/auth/callback?next=${encodeURIComponent(redirect)}` } });
      if (oauthError) throw oauthError;
    } catch (err) { setError(err instanceof Error ? err.message : `${provider} sign in failed`); setLoading(false); }
  }

  async function handlePasswordReset() {
    if (!email.trim()) { setError("Enter your email address first, then choose Forgot password."); return; }
    setLoading(true); setError("");
    try {
      const { error: resetError } = await getBrowserSupabase().auth.resetPasswordForEmail(email.trim(), { redirectTo: `${window.location.origin}/reset-password` });
      if (resetError) throw resetError;
      setError("Password reset email sent. Check your inbox.");
    } catch (err) { setError(err instanceof Error ? err.message : "Could not send password reset email."); }
    finally { setLoading(false); }
  }

  const inputClass = "w-full pl-11 pr-4 py-3 rounded-xl bg-warm-50 border border-warm-200 text-warm-800 placeholder:text-warm-300 focus:border-plum-300 focus:ring-2 focus:ring-plum-100 focus:outline-none transition-all";
  return <div className="min-h-[80vh] flex items-center justify-center bg-warm-50 px-6 py-16"><div className="w-full max-w-md"><div className="text-center mb-8"><div className="w-16 h-16 rounded-2xl bg-blush-100 flex items-center justify-center mx-auto mb-4"><Heart className="h-8 w-8 text-blush-400"/></div><h1 className="text-3xl font-semibold text-warm-900">{isSignUp ? "Join the Circle" : "Welcome Back"}</h1><p className="mt-2 text-warm-500">{isSignUp ? "Create your account before choosing a membership" : "Sign in to your OvercomeHER account"}</p></div><div className="bg-white rounded-2xl shadow-sm border border-warm-100 p-8">{error && <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-3"><AlertCircle className="h-5 w-5 text-rose-500 flex-shrink-0 mt-0.5"/><p className="text-sm text-rose-600">{error}</p></div>}<form onSubmit={handleSubmit} className="space-y-5">{isSignUp && <div><label className="block text-sm font-medium text-warm-700 mb-1.5">Full Name</label><div className="relative"><Heart className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-warm-300"/><input name="name" required className={inputClass} placeholder="Your full name"/></div></div>}<div><label className="block text-sm font-medium text-warm-700 mb-1.5">Email</label><div className="relative"><Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-warm-300"/><input name="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} placeholder="you@example.com"/></div></div><div><div className="flex items-center justify-between mb-1.5"><label className="text-sm font-medium text-warm-700">Password</label>{!isSignUp && <button type="button" onClick={handlePasswordReset} className="text-xs text-plum-400 hover:text-plum-500">Forgot password?</button>}</div><div className="relative"><Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-warm-300"/><input name="password" type={showPassword ? "text" : "password"} required minLength={8} className={`${inputClass} pr-11`} placeholder="Min. 8 characters"/><button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-warm-300" aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? <EyeOff className="h-5 w-5"/> : <Eye className="h-5 w-5"/>}</button></div></div><Button type="submit" size="lg" className="w-full" disabled={loading}>{loading ? "Please wait..." : isSignUp ? "Create Account" : "Sign In"}{!loading && <ArrowRight className="h-5 w-5"/>}</Button></form><div className="my-6 flex items-center gap-4"><div className="h-px flex-1 bg-warm-200"/><span className="text-xs text-warm-400">or continue with</span><div className="h-px flex-1 bg-warm-200"/></div><div className="grid grid-cols-2 gap-3"><button type="button" onClick={() => handleOAuth("google")} disabled={loading} className="px-4 py-3 rounded-xl border border-warm-200 text-sm font-medium hover:bg-warm-50">Google</button><button type="button" onClick={() => handleOAuth("facebook")} disabled={loading} className="px-4 py-3 rounded-xl border border-warm-200 text-sm font-medium hover:bg-warm-50">Facebook</button></div></div><p className="mt-6 text-center text-sm text-warm-500">{isSignUp ? <>Already have an account? <button onClick={() => { setIsSignUp(false); setError(""); }} className="text-plum-400 font-medium">Sign in</button></> : <>New to OvercomeHER? <button onClick={() => { setIsSignUp(true); setError(""); }} className="text-plum-400 font-medium">Create an account</button></>}</p></div></div>;
}
