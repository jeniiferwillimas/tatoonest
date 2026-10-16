"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/layouts/Footer";
import { Button } from "@/components/ui";
import {
  Palette,
  Ruler,
  Layers,
  RotateCcw,
  Sparkles,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

const STYLE_PREVIEW = [
  { style: "Fine Line", slug: "fine-line", img: "/images/portfolio/fine-line-2.jpg" },
  { style: "Traditional", slug: "traditional", img: "/images/portfolio/traditional-4.jpg" },
  { style: "Japanese", slug: "japanese", img: "/images/portfolio/japanese-8.jpg" },
  { style: "Geometric", slug: "geometric", img: "/images/portfolio/geometric-6.jpg" },
  { style: "Realism", slug: "realism", img: "/images/portfolio/realism-3.jpg" },
  { style: "Minimalist", slug: "minimalist", img: "/images/portfolio/minimalist-5.jpg" },
  { style: "Dotwork", slug: "dotwork", img: "/images/portfolio/dotwork-7.jpg" },
  { style: "Watercolor", slug: "watercolor", img: "/images/portfolio/watercolor-2.jpg" },
];

const BODY_PLACEMENTS = [
  "Forearm", "Upper Arm", "Shoulder", "Back", "Chest", "Ribs",
  "Thigh", "Calf", "Ankle", "Wrist", "Neck", "Finger",
];

const SIZE_GUIDE = [
  { label: "Tiny", range: "1–2 inches", price: "$80–$150", desc: "Finger, wrist, behind ear" },
  { label: "Small", range: "2–4 inches", price: "$150–$300", desc: "Inner wrist, ankle, collarbone" },
  { label: "Medium", range: "4–6 inches", price: "$300–$600", desc: "Forearm, upper arm, shoulder" },
  { label: "Large", range: "6–10 inches", price: "$600–$1,200", desc: "Half sleeve, thigh, back panel" },
  { label: "XL / Sleeve", range: "10+ inches", price: "$1,200+", desc: "Full sleeve, back piece, leg" },
];

export default function DesignToolsPage() {
  const [selectedStyle, setSelectedStyle] = useState("Fine Line");
  const [selectedPlacement, setSelectedPlacement] = useState("Forearm");

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--bg)", color: "var(--text)" }}>
      <div className="border-b" style={{ borderColor: "var(--border)" }}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <Link href="/" className="text-xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
            TattooNest
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/artists" className="text-sm font-medium hover:text-[var(--accent)]">
              Browse Artists
            </Link>
            <Link href="/pricing" className="text-sm font-medium hover:text-[var(--accent)]">
              Pricing
            </Link>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="mx-auto w-full max-w-5xl px-4 pt-14 pb-10 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-medium mb-6" style={{ borderColor: "var(--border)", color: "#666" }}>
          <Sparkles size={14} className="text-[var(--accent)]" /> Design Planning Tools
        </div>
        <h1 className="text-3xl font-bold md:text-5xl" style={{ fontFamily: "'Playfair Display', serif" }}>
          Plan Your Perfect Tattoo
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base" style={{ color: "#666" }}>
          Explore styles, choose placement, estimate pricing, and find the right artist — all before you book.
        </p>
      </section>

      {/* Style Explorer */}
      <section className="mx-auto w-full max-w-5xl px-4 pb-14">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--accent)]/10">
            <Palette size={18} className="text-[var(--accent)]" />
          </div>
          <div>
            <h2 className="text-lg font-bold">Style Explorer</h2>
            <p className="text-xs" style={{ color: "#666" }}>Tap a style to preview and find matching artists.</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {STYLE_PREVIEW.map((s) => (
            <button
              key={s.style}
              onClick={() => setSelectedStyle(s.style)}
              className={`group relative overflow-hidden rounded-xl border transition-all ${
                selectedStyle === s.style
                  ? "border-[var(--accent)] ring-2 ring-[var(--accent)]/20"
                  : "border-[var(--border)] hover:border-gray-300"
              }`}
            >
              <div className="relative aspect-square">
                <Image src={s.img} alt={s.style} fill sizes="250px" className="object-cover transition-transform group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="text-sm font-bold text-white">{s.style}</p>
                </div>
                {selectedStyle === s.style && (
                  <div className="absolute right-2 top-2">
                    <CheckCircle size={20} className="text-[var(--accent)]" fill="white" />
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
        <div className="mt-4 text-center">
          <Link href={`/artists?style=${encodeURIComponent(selectedStyle)}`}>
            <Button variant="outline" size="sm">
              Browse {selectedStyle} artists <ArrowRight size={14} className="ml-1" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Placement Picker */}
      <section className="mx-auto w-full max-w-5xl px-4 pb-14">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--accent)]/10">
            <Layers size={18} className="text-[var(--accent)]" />
          </div>
          <div>
            <h2 className="text-lg font-bold">Body Placement</h2>
            <p className="text-xs" style={{ color: "#666" }}>Choose where you want your tattoo.</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {BODY_PLACEMENTS.map((p) => (
            <button
              key={p}
              onClick={() => setSelectedPlacement(p)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                selectedPlacement === p
                  ? "border-[var(--accent)] bg-[var(--accent)] text-white"
                  : "border-[var(--border)] hover:border-gray-400"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </section>

      {/* Size & Price Guide */}
      <section className="mx-auto w-full max-w-5xl px-4 pb-14">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--accent)]/10">
            <Ruler size={18} className="text-[var(--accent)]" />
          </div>
          <div>
            <h2 className="text-lg font-bold">Size & Price Guide</h2>
            <p className="text-xs" style={{ color: "#666" }}>Estimated pricing by tattoo size.</p>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {SIZE_GUIDE.map((s) => (
            <div
              key={s.label}
              className="rounded-xl border p-4 transition-shadow hover:shadow-sm"
              style={{ borderColor: "var(--border)" }}
            >
              <p className="text-sm font-bold">{s.label}</p>
              <p className="text-xs" style={{ color: "#666" }}>{s.range}</p>
              <p className="mt-2 text-lg font-bold text-[var(--accent)]">{s.price}</p>
              <p className="mt-1 text-[11px]" style={{ color: "#999" }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto w-full max-w-3xl px-4 pb-20 text-center">
        <div className="rounded-2xl border p-8 md:p-12" style={{ borderColor: "var(--border)", background: "var(--section-bg)" }}>
          <RotateCcw size={28} className="mx-auto mb-4 text-[var(--accent)]" />
          <h2 className="text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
            Ready to bring your idea to life?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm" style={{ color: "#666" }}>
            Browse artists who specialize in {selectedStyle} tattoos on the {selectedPlacement.toLowerCase()} and book a session today.
          </p>
          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link href={`/artists?style=${encodeURIComponent(selectedStyle)}`}>
              <Button>Find an Artist</Button>
            </Link>
            <Link href="/pricing">
              <Button variant="outline">See Artist Plans</Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
