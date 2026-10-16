"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X, Eye, EyeOff } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { registerUser, loginUser, clearError } from "@/store/slices/authSlice";
import { useTranslation } from "@/i18n/context";

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

  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(clearError());
  }, [mode, dispatch]);

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
          {isLogin ? t("auth.welcomeBack") : t("auth.createAccount")}
        </h2>
        <p className="mb-6 text-sm" style={{ color: "#666" }}>
          {isLogin
            ? t("auth.loginDesc")
            : t("auth.registerDesc")}
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {!isLogin && (
            <div>
              <label className="mb-1.5 block text-sm font-medium">{t("auth.name")}</label>
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
            <label className="mb-1.5 block text-sm font-medium">{t("auth.email")}</label>
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
              <label className="text-sm font-medium">{t("auth.password")}</label>
              {isLogin && (
                <Link href="/forgot-password" onClick={onClose} className="text-xs font-medium text-[var(--accent)]">
                  {t("auth.forgotPassword")}
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
              <p className="mt-1 text-xs" style={{ color: "#999" }}>{t("auth.minChars")}</p>
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
              ? t("auth.loading")
              : isLogin
                ? t("auth.login")
                : t("auth.register")}
          </button>
        </form>

        {!isLogin && (
          <p className="mt-4 text-center text-xs" style={{ color: "#999" }}>
            {t("auth.termsAgree")}{" "}
            <a href="/terms" className="underline">{t("auth.termsLink")}</a> and{" "}
            <a href="/privacy" className="underline">{t("auth.privacyLink")}</a>.
          </p>
        )}

        <div className="mt-6 border-t border-[var(--border)] pt-4 text-center text-sm">
          {isLogin ? (
            <>
              {t("auth.notMember")}{" "}
              <button onClick={onSwitchMode} className="font-medium text-[var(--accent)]">
                {t("auth.signUp")}
              </button>
            </>
          ) : (
            <>
              {t("auth.alreadyMember")}{" "}
              <button onClick={onSwitchMode} className="font-medium text-[var(--accent)]">
                {t("auth.login")}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
