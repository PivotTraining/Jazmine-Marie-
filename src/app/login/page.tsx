import { Suspense } from "react";
import { LoginForm } from "./login-form";

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[80vh] flex items-center justify-center bg-warm-50">
        <div className="text-warm-400 font-[family-name:var(--font-body)]">Loading...</div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
