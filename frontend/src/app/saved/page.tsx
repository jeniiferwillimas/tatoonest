"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  ArrowRight,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui";
import Footer from "@/components/layouts/Footer";
import AuthModal from "@/components/AuthModal";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useTranslation } from "@/i18n/context";

const NAV_ITEMS = [
  {
    label: "Find Artists",
    children: [
      { label: "By Location", href: "/artists?view=location" },
      { label: "By Style", href: "/artists?view=style" },
      { label: "Browse Studios", href: "/artists?view=studios" },
    ],
  },
  {
    label: "Design Tools",
    children: [
      { label: "AI Tattoo Generator", href: "/artists" },
      { label: "Custom Design", href: "/artists" },
    ],
  },
  {
    label: "For Artists",
    children: [
      { label: "Free Artist Profile", href: "/join" },
      { label: "Artist Resources", href: "/join" },
    ],
  },
  { label: "Blog", href: "/artists" },
];

export default function SavedPage() {
  const { t } = useTranslation();
  const [authModal, setAuthModal] = useState<"login" | "register" | null>(null);
  const [email, setEmail] = useState("");

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Header */}
      <header className="w-full border-b border-[var(--border)] bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-xl font-bold tracking-tight">
            TattooNest
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {NAV_ITEMS.map((item) => (
              <div key={item.label} className="group relative">
                {item.children ? (
                  <>
                    <button className="flex items-center text-sm font-medium transition-colors hover:text-[var(--accent)] group-hover:text-[var(--accent)]">
                      {item.label}
                      <ChevronDown size={14} className="ml-1" />
                    </button>
                    <div className="pointer-events-none absolute left-0 top-full z-50 pt-2 opacity-0 transition-all group-hover:pointer-events-auto group-hover:opacity-100">
                      <div className="min-w-[180px] rounded-lg border border-[var(--border)] bg-white py-2 shadow-lg">
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            className="block px-4 py-2.5 text-sm transition-colors hover:bg-gray-50 hover:text-[var(--accent)]"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href || "#"}
                    className="text-sm font-medium transition-colors hover:text-[var(--accent)]"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <LanguageSwitcher />
            </div>
            <Link href="/join">
              <button className="rounded-full border border-[#e8453c] px-5 py-2 text-sm font-medium text-[#e8453c] transition-colors hover:bg-[#e8453c] hover:text-white">
                {t("nav.joinAsArtist")}
              </button>
            </Link>
            <button
              onClick={() => setAuthModal("login")}
              className="text-sm font-medium text-[#e8453c] transition-colors hover:text-[#c5372f]"
            >
              {t("nav.signIn")}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-6 py-12">
          {/* Section label */}
          <div className="mb-4 flex items-center gap-3">
            <div className="h-[3px] w-8 rounded bg-[#e8453c]" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#e8453c]">
              {t("saved.badge")}
            </span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t("saved.title1")}
            <span className="italic" style={{ fontFamily: "'Playfair Display', serif" }}>
              {t("saved.titleItalic")}
            </span>
          </h1>
          <p className="mt-3 max-w-lg text-sm leading-relaxed" style={{ color: "#666" }}>
            {t("saved.desc")}
          </p>

          {/* Empty State */}
          <div className="mt-8 flex flex-col items-center rounded-2xl border border-[var(--border)] py-20">
            {/* Placeholder cards */}
            <div className="mb-6 flex gap-2">
              <div className="h-14 w-12 rounded-lg" style={{ background: "#e8ddd0" }} />
              <div className="h-14 w-12 rounded-lg" style={{ background: "#eaddd5" }} />
              <div className="h-14 w-12 rounded-lg" style={{ background: "#d8cfc6" }} />
            </div>

            <h2 className="text-lg font-bold">{t("saved.emptyTitle")}</h2>
            <p className="mt-2 text-sm" style={{ color: "#999" }}>
              {t("saved.emptyDesc")}
            </p>

            <button
              onClick={() => setAuthModal("login")}
              className="mt-6 rounded-lg bg-black px-8 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-800"
            >
              {t("nav.signIn")}
            </button>
          </div>
        </div>
      </main>

      {/* Newsletter */}
      <section className="border-t border-[var(--border)] bg-[var(--section-bg)]">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-6 py-14 md:flex-row md:justify-between">
          <div>
            <h3 className="text-xl font-bold sm:text-2xl">
              Get tattoo inspiration delivered weekly
            </h3>
            <p className="mt-1 text-sm" style={{ color: "#999" }}>
              One short email a week with new artists and guides. No spam, unsubscribe anytime.
            </p>
          </div>
          <div className="flex w-full gap-0 overflow-hidden rounded-full border border-[var(--border)] bg-white md:w-auto">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-transparent px-5 py-3 text-sm outline-none md:w-56"
            />
            <button className="flex items-center gap-2 rounded-full bg-[#e8453c] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#c5372f]">
              Subscribe <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>

      <Footer />

      <AuthModal
        mode={authModal || "login"}
        isOpen={authModal !== null}
        onClose={() => setAuthModal(null)}
        onSwitchMode={() => setAuthModal(authModal === "login" ? "register" : "login")}
      />
    </div>
  );
}
