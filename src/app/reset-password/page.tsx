"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getBrowserSupabase } from "@/lib/supabase";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (password.length < 8) return setMessage("Use at least 8 characters.");
    if (password !== confirm) return setMessage("Passwords do not match.");
    setLoading(true); setMessage("");
    try {
      const { error } = await getBrowserSupabase().auth.updateUser({ password });
      if (error) throw error;
      setMessage("Password updated. You can sign in now.");
      setTimeout(() => router.replace("/login"), 1200);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not update password.");
    } finally { setLoading(false); }
  }

  return <div className="min-h-[75vh] flex items-center justify-center bg-warm-50 px-6"><div className="w-full max-w-md bg-white border border-warm-100 rounded-2xl p-8"><Lock className="h-8 w-8 text-blush-400"/><h1 className="mt-4 text-3xl font-semibold text-warm-900">Set a new password</h1><p className="mt-2 text-sm text-warm-500">Open this page from the secure password-reset link sent to your email.</p>{message && <p className="mt-4 text-sm text-plum-500">{message}</p>}<form onSubmit={submit} className="mt-6 space-y-4"><input type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="New password" className="w-full px-4 py-3 rounded-xl border border-warm-200"/><input type="password" required minLength={8} value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder="Confirm new password" className="w-full px-4 py-3 rounded-xl border border-warm-200"/><Button type="submit" className="w-full" size="lg" disabled={loading}>{loading ? "Updating..." : "Update Password"}</Button></form></div></div>;
}
