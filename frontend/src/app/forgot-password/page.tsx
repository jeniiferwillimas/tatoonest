"use client";

import { useState } from "react";
import Link from "next/link";
import Footer from "@/components/layouts/Footer";
import { ArrowLeft, Mail } from "lucide-react";
import { Button, Input } from "@/components/ui";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { forgotPassword, clearError } from "@/store/slices/authSlice";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [resetToken, setResetToken] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((s) => s.auth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(clearError());

    const result = await dispatch(forgotPassword({ email }));
    if (result.meta.requestStatus === "fulfilled") {
      setSent(true);
      const payload = result.payload as { resetToken?: string };
      if (payload.resetToken) {
        setResetToken(payload.resetToken);
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--section-bg)] px-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-[var(--border)] bg-white p-8 shadow-sm">
          {!sent ? (
            <>
              <Link
                href="/"
                className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-[var(--accent)] transition-colors hover:text-[var(--accent-hover)]"
              >
                <ArrowLeft size={16} /> Back to home
              </Link>

              <h1
                className="mb-2 text-2xl font-bold"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Forgot your password?
              </h1>
              <p className="mb-6 text-sm" style={{ color: "#666" }}>
                Enter your email address and we&apos;ll send you a link to reset your password.
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <Input
                  label="Email address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                />

                {error && <p className="text-sm text-red-500">{error}</p>}

                <Button type="submit" disabled={loading} fullWidth>
                  {loading ? "Sending..." : "Send reset link"}
                </Button>
              </form>

              <div className="mt-6 border-t border-[var(--border)] pt-4 text-center text-sm">
                Remember your password?{" "}
                <Link href="/" className="font-medium text-[var(--accent)]">
                  Sign in
                </Link>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center gap-4 py-4 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--accent)]/10">
                <Mail size={28} className="text-[var(--accent)]" />
              </div>
              <h2 className="text-xl font-bold">Check your email</h2>
              <p className="text-sm" style={{ color: "#666" }}>
                If an account exists for <strong>{email}</strong>, we&apos;ve sent a password reset link.
              </p>

              {resetToken && (
                <div className="mt-4 w-full rounded-lg border border-[var(--border)] bg-[var(--section-bg)] p-4">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider" style={{ color: "#999" }}>
                    Dev mode — reset link
                  </p>
                  <Link
                    href={`/reset-password?email=${encodeURIComponent(email)}&token=${encodeURIComponent(resetToken)}`}
                    className="break-all text-sm font-medium text-[var(--accent)] underline"
                  >
                    Click here to reset your password
                  </Link>
                </div>
              )}

              <button
                onClick={() => { setSent(false); setResetToken(null); dispatch(clearError()); }}
                className="mt-2 text-sm font-medium text-[var(--accent)]"
              >
                Try a different email
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
