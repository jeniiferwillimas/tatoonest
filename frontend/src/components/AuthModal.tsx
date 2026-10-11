"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { X, Eye, EyeOff } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { registerUser, loginUser, googleLogin, clearError } from "@/store/slices/authSlice";

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: { client_id: string; callback: (response: { credential: string }) => void }) => void;
          renderButton: (element: HTMLElement, config: { theme: string; size: string; width: number; text: string; shape: string }) => void;
        };
      };
    };
  }
}

interface AuthModalProps {
  mode: "login" | "register";
  isOpen: boolean;
  onClose: () => void;
  onSwitchMode: () => void;
  role?: string;
  onSuccess?: () => void;
}

export default function AuthModal({ mode, isOpen, onClose, onSwitchMode, role, onSuccess }: AuthModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);

  const handleGoogleResponse = useCallback(
    async (response: { credential: string }) => {
      const result = await dispatch(googleLogin(response.credential));
      if (result.meta.requestStatus === "fulfilled") {
        onClose();
        if (onSuccess) {
          onSuccess();
        } else {
          window.location.reload();
        }
      }
    },
    [dispatch, onClose, onSuccess]
  );

  useEffect(() => {
    dispatch(clearError());
  }, [mode, dispatch]);

  useEffect(() => {
    if (!isOpen) return;

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => {
      const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
      if (!clientId || !window.google) return;

      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: handleGoogleResponse,
      });

      const btnContainer = document.getElementById("google-signin-btn");
      if (btnContainer) {
        window.google.accounts.id.renderButton(btnContainer, {
          theme: "outline",
          size: "large",
          width: 400,
          text: "continue_with",
          shape: "rectangular",
        });
      }
    };
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, [isOpen, handleGoogleResponse]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const action = mode === "register"
      ? dispatch(registerUser({ name, email, password, role }))
      : dispatch(loginUser({ email, password }));

    const result = await action;
    if (!result.meta.requestStatus || result.meta.requestStatus === "fulfilled") {
      onClose();
      if (onSuccess) {
        onSuccess();
      } else {
        window.location.reload();
      }
    }
  };

  const isLogin = mode === "login";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1 transition-colors hover:bg-gray-100"
        >
          <X size={20} />
        </button>

        <h2
          className="mb-1 text-2xl font-bold"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {isLogin ? "Welcome back" : "Create your account"}
        </h2>
        <p className="mb-6 text-sm" style={{ color: "#666" }}>
          {isLogin
            ? "Log in to your Tattoos Wizard account."
            : "It's free and takes less than a minute."}
        </p>

        <div id="google-signin-btn" className="mb-4 flex w-full justify-center" />

        <div className="mb-4 flex items-center gap-4">
          <div className="h-px flex-1 bg-[var(--border)]" />
          <span className="text-xs" style={{ color: "#999" }}>or</span>
          <div className="h-px flex-1 bg-[var(--border)]" />
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {!isLogin && (
            <div>
              <label className="mb-1.5 block text-sm font-medium">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full rounded-lg border border-[var(--border)] px-4 py-2.5 text-sm outline-none transition-colors hover:border-[var(--accent)] focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]"
              />
            </div>
          )}

          <div>
            <label className="mb-1.5 block text-sm font-medium">Email address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-lg border border-[var(--border)] px-4 py-2.5 text-sm outline-none transition-colors hover:border-[var(--accent)] focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]"
            />
          </div>

          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label className="text-sm font-medium">Password</label>
              {isLogin && (
                <Link href="/forgot-password" onClick={onClose} className="text-xs font-medium text-[var(--accent)]">
                  Forgot password?
                </Link>
              )}
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full rounded-lg border border-[var(--border)] px-4 py-2.5 pr-10 text-sm outline-none transition-colors hover:border-[var(--accent)] focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]"
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
            {!isLogin && (
              <p className="mt-1 text-xs" style={{ color: "#999" }}>At least 6 characters</p>
            )}
          </div>

          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-[var(--accent)] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--accent-hover)] disabled:opacity-50"
          >
            {loading
              ? "Please wait..."
              : isLogin
                ? "Log in"
                : "Create account"}
          </button>
        </form>

        {!isLogin && (
          <p className="mt-4 text-center text-xs" style={{ color: "#999" }}>
            By creating an account you agree to our{" "}
            <a className="underline">Terms of Service</a> and{" "}
            <a className="underline">Privacy Policy</a>.
          </p>
        )}

        <div className="mt-6 border-t border-[var(--border)] pt-4 text-center text-sm">
          {isLogin ? (
            <>
              Not a member?{" "}
              <button onClick={onSwitchMode} className="font-medium text-[var(--accent)]">
                Sign up
              </button>
            </>
          ) : (
            <>
              Already a member?{" "}
              <button onClick={onSwitchMode} className="font-medium text-[var(--accent)]">
                Log in
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
