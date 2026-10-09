"use client";

import { useState } from "react";

const NAV_ITEMS = [
  { label: "Find Artists", hasDropdown: true },
  { label: "Design Tools", hasDropdown: true },
  { label: "For Artists", hasDropdown: true },
  { label: "Blog", hasDropdown: false },
];

const POPULAR_STYLES = ["Traditional", "Realism", "Japanese", "Fine Line"];

const STATS = [
  { value: "10,000", label: "ARTISTS" },
  { value: "50,000", label: "TATTOOS" },
  { value: "50", label: "STYLES" },
];

function ChevronDown() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="ml-1">
      <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-muted">
      <path d="M9 17A8 8 0 109 1a8 8 0 000 16zM19 19l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-muted">
      <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" />
      <path d="M2 10h16M10 2c2.5 3 3 5 3 8s-.5 5-3 8c-2.5-3-3-5-3-8s.5-5 3-8z" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="#facc15" className="inline-block">
      <path d="M7 1l1.76 3.57 3.94.57-2.85 2.78.67 3.93L7 10.27l-3.52 1.58.67-3.93L1.3 5.14l3.94-.57L7 1z" />
    </svg>
  );
}

function ImagePlaceholder({ size = 64 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="text-muted">
      <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M21 15l-5-5L5 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="w-full border-b border-[var(--border)]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-medium tracking-widest text-muted">TATTOOS</span>
            <span className="text-2xl font-bold tracking-tight">WIZARD</span>
          </div>

          <nav className="hidden items-center gap-8 md:flex">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.label}
                className="flex items-center text-sm font-medium text-foreground transition-colors hover:text-accent"
              >
                {item.label}
                {item.hasDropdown && <ChevronDown />}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button className="hidden items-center gap-1.5 text-sm text-muted md:flex">
              <GlobeIcon />
              EN
            </button>
            <button className="rounded-full border border-accent px-5 py-2 text-sm font-medium text-accent transition-colors hover:bg-accent hover:text-white">
              Join as Artist
            </button>
            <button className="text-sm font-medium text-accent transition-colors hover:text-accent-hover">
              Sign In
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="h-0.5 w-8 bg-accent" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                Discover Ink Artists
              </span>
            </div>

            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Find Your{" "}
              <span className="font-display italic">Perfect</span>
              <br />
              Tattoo Artist
            </h1>

            <p className="max-w-md text-lg leading-relaxed text-muted">
              Browse thousands of artists in your city. Compare styles, prices, and reviews.
            </p>

            {/* Search */}
            <div className="flex max-w-xl items-center gap-3">
              <div className="flex flex-1 items-center gap-3 rounded-lg border border-[var(--border)] bg-card-bg px-4 py-3">
                <SearchIcon />
                <input
                  type="text"
                  placeholder="Where do you want to get tattooed?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted"
                />
              </div>
              <button className="rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover">
                Find Artists
              </button>
            </div>

            {/* Popular */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-muted">Popular:</span>
              {POPULAR_STYLES.map((style) => (
                <button
                  key={style}
                  className="rounded-full border border-[var(--border)] px-4 py-1.5 text-sm text-foreground transition-colors hover:border-accent hover:text-accent"
                >
                  {style}
                </button>
              ))}
            </div>
          </div>

          {/* Right - Image Grid */}
          <div className="relative hidden lg:block">
            <div className="grid grid-cols-[2fr_1fr] gap-4">
              {/* Main image */}
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100">
                <div className="flex h-full items-center justify-center">
                  <div className="text-center">
                    <ImagePlaceholder size={64} />
                    <p className="mt-2 text-sm font-medium text-muted">Featured Tattoo</p>
                  </div>
                </div>
              </div>

              {/* Right column */}
              <div className="flex flex-col gap-4">
                {/* Artist card */}
                <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-card-bg">
                  <div className="aspect-[4/3] bg-gradient-to-br from-blue-100 to-blue-200">
                    <div className="flex h-full items-center justify-center">
                      <ImagePlaceholder size={40} />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-3">
                    <div className="h-8 w-8 rounded-full bg-accent/20" />
                    <div>
                      <p className="text-xs font-medium">Tattooist _ saegeem</p>
                      <p className="flex items-center gap-1 text-xs">
                        <StarIcon /> 4.9
                      </p>
                    </div>
                  </div>
                </div>

                {/* Style card */}
                <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-card-bg">
                  <div className="aspect-[4/3] bg-gradient-to-br from-amber-100 to-amber-200">
                    <div className="flex h-full items-center justify-center">
                      <ImagePlaceholder size={40} />
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="text-xs font-semibold uppercase tracking-wider">Illustrative</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-t border-[var(--border)] bg-section-bg">
        <div className="mx-auto grid max-w-4xl grid-cols-3 gap-8 px-6 py-16">
          {STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-3 text-center">
              <p className="text-3xl font-bold sm:text-4xl lg:text-5xl">
                {stat.value}
                <span className="text-accent">+</span>
              </p>
              <div className="h-0.5 w-8 bg-accent" />
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] px-6 py-8">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-sm text-muted">
            &copy; 2026 Wizard Tattoo. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
