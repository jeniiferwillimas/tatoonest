"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ChevronDown,
  Globe,
  Check,
  Star,
  Send,
  ArrowRight,
} from "lucide-react";
import { Button, Input, Text } from "@/components/ui";
import AuthModal from "@/components/AuthModal";

const STEPS = [
  { title: "Create your account", desc: "Email or Google, takes a minute" },
  { title: "Start your profile", desc: "Your Instagram handle, or your name" },
  { title: "Show it's you", desc: "Add a code to your Instagram bio" },
  { title: "Add your photos", desc: "0 of 6 minimum" },
  { title: "Add your details", desc: "Name, bio, location, styles" },
  { title: "Submit for review", desc: "Finish the steps above first" },
];

export default function JoinPage() {
  const router = useRouter();
  const [authModal, setAuthModal] = useState<"login" | "register" | null>(null);
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen bg-white">
      {/* ─── Header ─── */}
      <header className="w-full border-b border-[var(--border)] bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex flex-col leading-tight">
            <span className="text-sm font-medium tracking-widest">TATTOOS</span>
            <span className="text-2xl font-bold tracking-tight">WIZARD</span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            <div className="group relative">
              <button className="flex items-center text-sm font-medium transition-colors hover:text-[var(--accent)]">
                Find Artists <ChevronDown size={14} className="ml-1" />
              </button>
              <div className="pointer-events-none absolute left-0 top-full pt-2 opacity-0 transition-all group-hover:pointer-events-auto group-hover:opacity-100">
                <div className="min-w-[180px] rounded-lg border border-[var(--border)] bg-white py-2 shadow-lg">
                  <Link href="/artists?view=location" className="block px-4 py-2.5 text-sm hover:bg-gray-50 hover:text-[var(--accent)]">By Location</Link>
                  <Link href="/artists?view=style" className="block px-4 py-2.5 text-sm hover:bg-gray-50 hover:text-[var(--accent)]">By Style</Link>
                  <Link href="/artists?view=studios" className="block px-4 py-2.5 text-sm hover:bg-gray-50 hover:text-[var(--accent)]">Browse Studios</Link>
                </div>
              </div>
            </div>
            <div className="group relative">
              <button className="flex items-center text-sm font-medium transition-colors hover:text-[var(--accent)]">
                Design Tools <ChevronDown size={14} className="ml-1" />
              </button>
              <div className="pointer-events-none absolute left-0 top-full pt-2 opacity-0 transition-all group-hover:pointer-events-auto group-hover:opacity-100">
                <div className="min-w-[180px] rounded-lg border border-[var(--border)] bg-white py-2 shadow-lg">
                  <Link href="#" className="block px-4 py-2.5 text-sm hover:bg-gray-50 hover:text-[var(--accent)]">AI Tattoo Generator</Link>
                  <Link href="#" className="block px-4 py-2.5 text-sm hover:bg-gray-50 hover:text-[var(--accent)]">Custom Design</Link>
                </div>
              </div>
            </div>
            <div className="group relative">
              <button className="flex items-center text-sm font-medium transition-colors hover:text-[var(--accent)]">
                For Artists <ChevronDown size={14} className="ml-1" />
              </button>
              <div className="pointer-events-none absolute left-0 top-full pt-2 opacity-0 transition-all group-hover:pointer-events-auto group-hover:opacity-100">
                <div className="min-w-[180px] rounded-lg border border-[var(--border)] bg-white py-2 shadow-lg">
                  <Link href="#" className="block px-4 py-2.5 text-sm hover:bg-gray-50 hover:text-[var(--accent)]">Free Artist Profile</Link>
                  <Link href="#" className="block px-4 py-2.5 text-sm hover:bg-gray-50 hover:text-[var(--accent)]">Artist Resources</Link>
                </div>
              </div>
            </div>
            <Link href="#" className="text-sm font-medium transition-colors hover:text-[var(--accent)]">Blog</Link>
          </nav>

          <div className="flex items-center gap-4">
            <button className="hidden items-center gap-1.5 text-sm md:flex">
              <Globe size={18} /> EN
            </button>
            <Link href="/join">
              <Button variant="accent-outline" size="sm" className="rounded-full">
                Join as Artist
              </Button>
            </Link>
            <button onClick={() => setAuthModal("login")} className="text-sm font-medium text-[var(--accent)] transition-colors hover:text-[var(--accent-hover)]">
              Sign In
            </button>
          </div>
        </div>
      </header>

      {/* ─── Main Content ─── */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
        <div className="grid items-start gap-16 lg:grid-cols-2">
          {/* Left Column */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="h-0.5 w-8 bg-[var(--accent)]" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: "var(--accent)" }}>
                For Tattoo Artists
              </span>
            </div>

            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              Get listed on{" "}
              <span className="italic text-[var(--accent)]" style={{ fontFamily: "'Playfair Display', serif" }}>
                Tattoos Wizard
              </span>
            </h1>

            <p className="max-w-lg text-base leading-relaxed" style={{ color: "#555" }}>
              A free profile where people looking for their next tattoo can find you. Set it up in a few minutes. Our team checks every profile before it goes live.
            </p>

            <ul className="flex flex-col gap-3 mt-2">
              <li className="flex items-center gap-3 text-sm">
                <Check size={18} className="text-[var(--accent)] shrink-0" />
                Free, no subscription
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Check size={18} className="text-[var(--accent)] shrink-0" />
                Start from your Instagram, or without it
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Check size={18} className="text-[var(--accent)] shrink-0" />
                Reviewed by a real person
              </li>
            </ul>

            <div className="flex flex-wrap items-center gap-4 mt-4">
              <Button size="lg" onClick={() => setAuthModal("register")}>
                Create a free account
              </Button>
              <button
                onClick={() => setAuthModal("login")}
                className="rounded-lg border border-[var(--border)] px-6 py-3 text-sm font-medium transition-colors hover:border-gray-400"
              >
                I already have an account
              </button>
            </div>

            <p className="text-xs mt-1" style={{ color: "#999" }}>
              You need an account so only you can edit your profile.
            </p>
          </div>

          {/* Right Column — Steps Card */}
          <div className="rounded-2xl border border-[var(--border)] bg-white p-8 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <Star size={20} className="text-[var(--accent)]" />
                <span className="text-lg font-bold">Studio</span>
              </div>
              <span className="text-sm" style={{ color: "#999" }}>What you will do</span>
            </div>

            <div className="flex flex-col gap-0">
              {STEPS.map((step, idx) => (
                <div key={step.title} className="flex items-start gap-4 py-5 border-t border-[var(--border)] first:border-t-0 first:pt-0 last:pb-0">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-gray-200">
                    <span className="text-xs font-medium" style={{ color: "#ccc" }}>{idx + 1}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{step.title}</p>
                    <p className="text-sm mt-0.5" style={{ color: "#999" }}>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Newsletter ─── */}
      <section className="border-t border-[var(--border)] bg-white">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 px-6 py-16 md:flex-row md:justify-between">
          <div>
            <h3 className="text-2xl font-bold italic" style={{ fontFamily: "'Playfair Display', serif" }}>
              Get tattoo inspiration delivered weekly
            </h3>
            <Text variant="body-sm" className="mt-2">
              Join 50,000+ tattoo enthusiasts. No spam, unsubscribe anytime.
            </Text>
          </div>
          <div className="flex w-full gap-3 md:w-auto">
            <Input
              placeholder="Enter your email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="md:w-64"
            />
            <Button size="lg">
              Subscribe <Send size={14} />
            </Button>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="border-t border-[var(--border)] bg-[var(--section-bg)]">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
            <p className="text-sm" style={{ color: "#666" }}>&copy; 2026 Tattoos Wizard. All rights reserved.</p>
            <div className="flex gap-4 text-sm" style={{ color: "#666" }}>
              <a className="transition-colors hover:text-[var(--accent)]">Terms of Service</a>
              <span>&middot;</span>
              <a className="transition-colors hover:text-[var(--accent)]">Privacy Policy</a>
            </div>
          </div>
        </div>
      </footer>

      <AuthModal
        mode={authModal || "login"}
        isOpen={authModal !== null}
        onClose={() => setAuthModal(null)}
        onSwitchMode={() => setAuthModal(authModal === "login" ? "register" : "login")}
        role="Artist"
        onSuccess={() => router.push("/onboarding")}
      />
    </div>
  );
}
