"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Check, Eye, EyeOff } from "lucide-react";
import { Button, Input } from "@/components/ui";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { resetPassword, clearError } from "@/store/slices/authSlice";

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-[var(--section-bg)]">
        <p className="text-sm" style={{ color: "#666" }}>Loading...</p>
      </div>
    }>
      <ResetPasswordForm />
    </Suspense>
  );
}

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const emailParam = searchParams.get("email") || "";
  const tokenParam = searchParams.get("token") || "";

  const [email, setEmail] = useState(emailParam);
  const [token, setToken] = useState(tokenParam);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((s) => s.auth);

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);
    dispatch(clearError());

    if (newPassword !== confirmPassword) {
      setValidationError("Passwords do not match.");
      return;
    }

    if (newPassword.length < 6) {
      setValidationError("Password must be at least 6 characters.");
      return;
    }

    if (!token) {
      setValidationError("Reset token is missing. Please use the link from your email.");
      return;
    }

    const result = await dispatch(resetPassword({ email, token, newPassword }));
    if (result.meta.requestStatus === "fulfilled") {
      setSuccess(true);
    }
  };

  if (!tokenParam && !token) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--section-bg)] px-4">
        <div className="w-full max-w-md rounded-2xl border border-[var(--border)] bg-white p-8 shadow-sm text-center">
          <h1 className="mb-4 text-xl font-bold">Invalid reset link</h1>
          <p className="mb-6 text-sm" style={{ color: "#666" }}>
            This password reset link is invalid or has expired.
          </p>
          <Link href="/forgot-password">
            <Button fullWidth>Request a new link</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--section-bg)] px-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-[var(--border)] bg-white p-8 shadow-sm">
          {!success ? (
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
                Set a new password
              </h1>
              <p className="mb-6 text-sm" style={{ color: "#666" }}>
                Enter your new password below. It must be at least 6 characters.
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <Input
                  label="Email address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={!!emailParam}
                />

                <input type="hidden" value={token} onChange={(e) => setToken(e.target.value)} />

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium">New password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      minLength={6}
                      className="w-full rounded-lg border border-[var(--border)] bg-[var(--card-bg)] px-4 py-2.5 pr-10 text-sm outline-none transition-colors hover:border-[var(--accent)] focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                      style={{ color: "#999" }}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  <p className="text-xs" style={{ color: "#999" }}>At least 6 characters</p>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium">Confirm new password</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={6}
                    className="w-full rounded-lg border border-[var(--border)] bg-[var(--card-bg)] px-4 py-2.5 text-sm outline-none transition-colors hover:border-[var(--accent)] focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]"
                  />
                </div>

                {(validationError || error) && (
                  <p className="text-sm text-red-500">{validationError || error}</p>
                )}

                <Button type="submit" disabled={loading} fullWidth>
                  {loading ? "Resetting..." : "Reset password"}
                </Button>
              </form>
            </>
          ) : (
            <div className="flex flex-col items-center gap-4 py-4 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full" style={{ backgroundColor: "color-mix(in srgb, var(--accent) 10%, transparent)" }}>
                <Check size={28} className="text-[var(--accent)]" />
              </div>
              <h2 className="text-xl font-bold">Password reset!</h2>
              <p className="text-sm" style={{ color: "#666" }}>
                Your password has been changed successfully. You can now sign in with your new password.
              </p>
              <Link href="/" className="mt-2">
                <Button>Go to sign in</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
