"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  ChevronDown,
  MapPin,
  ArrowRight,
  Send,
  Lightbulb,
  Coins,
  Menu,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button, Input } from "@/components/ui";
import AuthModal from "@/components/AuthModal";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useTranslation } from "@/i18n/context";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchLandingData } from "@/store/slices/landingSlice";
import { useHydrated } from "@/store/Provider";
import { imgSrc } from "@/utils/urlHelper";

/* ─── Nav ─── */

interface NavItem {
  label: string;
  href?: string;
  children?: { label: string; desc?: string; href: string }[];
}

const NAV_ITEMS: NavItem[] = [
  {
    label: "Find Artists",
    children: [
      { label: "By Location", href: "/artists?view=location" },
      { label: "By Style", href: "/artists?view=style" },
      { label: "Browse Studios", href: "/artists?view=studios" },
    ],
  },
  {
    label: "For Artists",
    children: [
      { label: "Join as Artist", href: "/join" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  { label: "Design Tools", href: "/design-tools" },
  { label: "Blog", href: "/blog" },
  { label: "Pricing", href: "/pricing" },
];

const FOOTER_EXPLORE = [
  { label: "Find an Artist", desc: "Connect with verified professionals", href: "/artists" },
  { label: "Browse by Style", desc: "Traditional, realism, fine line & more", href: "/artists?view=style" },
  { label: "Browse by City", desc: "Find artists near you", href: "/artists?view=location" },
  { label: "Browse Studios", desc: "Discover tattoo studios worldwide", href: "/artists?view=studios" },
  { label: "Estimate Your Cost", desc: "Plan your budget confidently", href: "#price-estimator" },
  { label: "Artist Pricing", desc: "Subscription plans for artists", href: "/pricing" },
];

const FOOTER_RESOURCES = [
  { label: "Join as Artist", href: "/join" },
  { label: "Artist Pricing", href: "/pricing" },
  { label: "Artist Dashboard", href: "/dashboard" },
  { label: "Saved Artists", href: "/saved" },
];

const TOP_CITIES = ["New York", "Los Angeles", "Chicago", "Miami", "London", "Paris", "Berlin", "Madrid", "Barcelona", "Rome", "Milan", "Amsterdam", "Tokyo", "Seoul", "Sydney", "Melbourne", "Toronto", "Mexico City", "São Paulo", "Buenos Aires"];

const TOP_STYLES = ["Traditional", "Neo-Traditional", "Realism", "Black & Gray", "Japanese", "Irezumi", "Fine Line", "Minimalist", "Geometric", "Dotwork", "Watercolor", "Illustrative", "Newschool", "Trash Polka", "Tribal", "Lettering", "Sketch", "Anime", "Floral"];

const FEATURED_ARTISTS = ["Dr. Woo", "Kat Von D", "Bang Bang", "Nikko Hurtado", "Megan Massacre", "Oozy", "Mr. K", "Curt Montgomery", "Sasha Unisex", "Hongdam", "Jay Freestyle", "Mira Mariah", "Jess Mascetti", "Robert Pho", "Doctor Woo", "Roxx", "Pony Lawson", "Amanda Wachob", "JonBoy", "Brian Woo"];

const SIZE_OPTIONS = [
  { label: "Tiny", desc: "Wrist or finger" },
  { label: "Small", desc: "Palm-sized" },
  { label: "Medium", desc: "Hand-sized" },
  { label: "Large", desc: "Whole forearm" },
  { label: "Half sleeve", desc: "Upper arm" },
  { label: "Back piece", desc: "Full back" },
];

/* ─── Style card background colors and fonts ─── */
const STYLE_CARD_THEMES: Record<string, { bg: string; text: string; font?: string }> = {
  "black-gray": { bg: "#2d1f3d", text: "#fff", font: "'Playfair Display', serif" },
  illustrative: { bg: "#f5f0e8", text: "#333", font: "'Playfair Display', serif" },
  realism: { bg: "#3a2e28", text: "#fff", font: "'Playfair Display', serif" },
  "fine-line": { bg: "#faf8f5", text: "#333" },
  traditional: { bg: "#f5e6d0", text: "#333", font: "'Playfair Display', serif" },
  watercolor: { bg: "#fef9f0", text: "#333", font: "'Playfair Display', serif" },
  dotwork: { bg: "#f5f5f5", text: "#333" },
  "neo-traditional": { bg: "#0d5c5c", text: "#fff", font: "'Playfair Display', serif" },
  geometric: { bg: "#1a1a2e", text: "#fff" },
  minimalist: { bg: "#fafafa", text: "#333" },
  anime: { bg: "#2d1b4e", text: "#fff" },
  japanese: { bg: "#8b2635", text: "#fff", font: "'Playfair Display', serif" },
};

/* ─── Style → hero images mapping ─── */
const STYLE_HERO_IMAGES: Record<string, { main: string; topRight: string; bottomRight: string }> = {
  "Traditional": { main: "/images/styles/traditional.jpg", topRight: "/images/portfolio/traditional-2.jpg", bottomRight: "/images/portfolio/traditional-3.jpg" },
  "Realism": { main: "/images/styles/realism.jpg", topRight: "/images/portfolio/realism-2.jpg", bottomRight: "/images/portfolio/realism-4.jpg" },
  "Japanese": { main: "/images/styles/japanese.jpg", topRight: "/images/portfolio/japanese-1.jpg", bottomRight: "/images/portfolio/japanese-3.jpg" },
  "Fine Line": { main: "/images/styles/fine-line.jpg", topRight: "/images/portfolio/fine-line-2.jpg", bottomRight: "/images/portfolio/fine-line-4.jpg" },
  "Geometric": { main: "/images/styles/geometric.jpg", topRight: "/images/portfolio/geometric-1.jpg", bottomRight: "/images/portfolio/geometric-3.jpg" },
  "Black & gray": { main: "/images/styles/black-gray.jpg", topRight: "/images/portfolio/black-gray-2.jpg", bottomRight: "/images/portfolio/black-gray-4.jpg" },
  "Illustrative": { main: "/images/styles/illustrative.jpg", topRight: "/images/portfolio/illustrative-1.jpg", bottomRight: "/images/portfolio/illustrative-3.jpg" },
  "Dotwork": { main: "/images/styles/dotwork.jpg", topRight: "/images/portfolio/dotwork-2.jpg", bottomRight: "/images/portfolio/dotwork-4.jpg" },
  "Watercolor": { main: "/images/styles/watercolor.jpg", topRight: "/images/portfolio/watercolor-1.jpg", bottomRight: "/images/portfolio/watercolor-3.jpg" },
  "Neo-traditional": { main: "/images/styles/neo-traditional.jpg", topRight: "/images/portfolio/neo-traditional-2.jpg", bottomRight: "/images/portfolio/neo-traditional-4.jpg" },
  "Minimalist": { main: "/images/styles/minimalist.jpg", topRight: "/images/portfolio/minimalist-1.jpg", bottomRight: "/images/portfolio/minimalist-3.jpg" },
  "Anime": { main: "/images/styles/anime.jpg", topRight: "/images/portfolio/anime-2.jpg", bottomRight: "/images/portfolio/anime-4.jpg" },
};

const DEFAULT_HERO = { main: "/images/styles/realism.jpg", topRight: "/images/styles/japanese.jpg", bottomRight: "/images/styles/neo-traditional.jpg" };

/* ─── City data (country + count) ─── */
const CITY_DATA: Record<string, { country: string; count: number }> = {
  "New York": { country: "United States", count: 20 },
  "Los Angeles": { country: "United States", count: 20 },
  London: { country: "United Kingdom", count: 20 },
  Tokyo: { country: "Japan", count: 20 },
  Toronto: { country: "Canada", count: 20 },
  Paris: { country: "France", count: 20 },
  Berlin: { country: "Germany", count: 20 },
  Seoul: { country: "South Korea", count: 20 },
  Barcelona: { country: "Spain", count: 20 },
  Miami: { country: "United States", count: 20 },
};

/* ─── Page ─── */

export default function Home() {
  const [citySearch, setCitySearch] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("Traditional");
  const [email, setEmail] = useState("");
  const [authModal, setAuthModal] = useState<"login" | "register" | null>(null);
  const [selectedSize, setSelectedSize] = useState("Small");
  const [selectedInk, setSelectedInk] = useState("Black & grey");
  const [selectedDetail, setSelectedDetail] = useState("Detailed");
  const [selectedArtist, setSelectedArtist] = useState("Established");
  const [weekLabel, setWeekLabel] = useState("This Week");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const hydrated = useHydrated();
  const { stats, testimonials, popularCities, styles: allStyles, loading } = useAppSelector((s) => s.landing);
  const { user } = useAppSelector((s) => s.auth);

  useEffect(() => {
    dispatch(fetchLandingData());
    setWeekLabel(`Week of ${new Date().toLocaleDateString("en-US", { month: "long", day: "numeric" })}`);
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[var(--accent)] border-t-transparent" />
      </div>
    );
  }

  const topStyles = allStyles.slice(0, 5);

  return (
    <div className="min-h-screen bg-white">

      {/* ─── Header ─── */}
      <header className="w-full border-b border-[var(--border)] bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="text-xl font-bold tracking-tight">TattooNest</div>

          <nav className="hidden items-center gap-8 md:flex">
            {NAV_ITEMS.map((item) => (
              <div key={item.label} className="group relative">
                {item.children ? (
                  <>
                    <button className="flex items-center text-sm font-medium transition-colors hover:text-[var(--accent)] group-hover:text-[var(--accent)]">
                      {item.label}
                      <ChevronDown size={14} className="ml-1" />
                    </button>
                    <div className="pointer-events-none absolute left-0 top-full pt-2 opacity-0 transition-all group-hover:pointer-events-auto group-hover:opacity-100 z-50">
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

          <div className="flex items-center gap-2 sm:gap-4">
            <div className="hidden md:block">
              <LanguageSwitcher />
            </div>
            {hydrated && user ? (
              <Link href="/dashboard">
                <button className="rounded-full bg-[#e8453c] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#c5372f] sm:px-5">
                  {t("nav.dashboard") || "Dashboard"}
                </button>
              </Link>
            ) : (
              <>
                <Link href="/join" className="hidden sm:block">
                  <button className="rounded-full border border-[#e8453c] px-5 py-2 text-sm font-medium text-[#e8453c] transition-colors hover:bg-[#e8453c] hover:text-white">
                    {t("nav.joinAsArtist")}
                  </button>
                </Link>
                <button onClick={() => setAuthModal("login")} className="rounded-full bg-[#e8453c] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#c5372f] sm:bg-transparent sm:px-0 sm:py-0 sm:text-[#e8453c] sm:hover:bg-transparent sm:hover:text-[#c5372f]">
                  {t("nav.signIn")}
                </button>
              </>
            )}
            <button onClick={() => setMobileMenuOpen(true)} className="ml-1 md:hidden" aria-label="Open menu">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* ─── Mobile Menu Overlay ─── */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileMenuOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-72 bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-4">
              <span className="text-lg font-bold">TattooNest</span>
              <button onClick={() => setMobileMenuOpen(false)} aria-label="Close menu"><X size={22} /></button>
            </div>
            <nav className="flex flex-col gap-1 p-4">
              {NAV_ITEMS.map((item) => (
                <div key={item.label}>
                  {item.children ? (
                    <>
                      <button
                        onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
                        className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-gray-50"
                      >
                        {item.label}
                        <ChevronDown size={14} className={`transition-transform ${mobileExpanded === item.label ? "rotate-180" : ""}`} />
                      </button>
                      {mobileExpanded === item.label && (
                        <div className="ml-3 flex flex-col gap-1 border-l-2 border-[var(--border)] pl-3">
                          {item.children.map((child) => (
                            <Link key={child.label} href={child.href} onClick={() => setMobileMenuOpen(false)} className="rounded-lg px-3 py-2 text-sm hover:bg-gray-50 hover:text-[var(--accent)]">
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link href={item.href || "#"} onClick={() => setMobileMenuOpen(false)} className="block rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-gray-50 hover:text-[var(--accent)]">
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </nav>
            <div className="border-t border-[var(--border)] p-4">
              <LanguageSwitcher />
              <div className="mt-4 flex flex-col gap-2">
                {hydrated && user ? (
                  <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} className="block rounded-full bg-[#e8453c] px-5 py-2.5 text-center text-sm font-medium text-white">
                    Dashboard
                  </Link>
                ) : (
                  <>
                    <Link href="/join" onClick={() => setMobileMenuOpen(false)} className="block rounded-full border border-[#e8453c] px-5 py-2.5 text-center text-sm font-medium text-[#e8453c]">
                      {t("nav.joinAsArtist")}
                    </Link>
                    <button onClick={() => { setAuthModal("login"); setMobileMenuOpen(false); }} className="rounded-full bg-[#e8453c] px-5 py-2.5 text-sm font-medium text-white">
                      {t("nav.signIn")}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16 lg:py-20">
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.1fr]">
          {/* Left: Copy + Search */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="h-[3px] w-8 rounded bg-[#e8453c]" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#e8453c]">
                {t("hero.badge")}
              </span>
            </div>

            <h1 className="text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">
              {t("hero.title1")}
              <span className="italic" style={{ fontFamily: "'Playfair Display', serif" }}>
                {t("hero.titleItalic")}
              </span>
              {t("hero.title2")}
            </h1>

            <p className="max-w-md text-sm leading-relaxed" style={{ color: "#666" }}>
              {t("hero.desc", { artists: stats[0]?.value || "286", styles: stats[2]?.value || "12" })}
            </p>

            {/* Search Bar */}
            <div className="flex max-w-xl flex-col overflow-hidden rounded-lg border border-[var(--border)] sm:flex-row">
              <div className="flex flex-1 flex-col justify-center border-b border-[var(--border)] px-4 py-3 sm:border-b-0 sm:border-r">
                <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "#999" }}>{t("hero.where")}</span>
                <input
                  type="text"
                  placeholder={t("hero.city")}
                  value={citySearch}
                  onChange={(e) => setCitySearch(e.target.value)}
                  className="mt-0.5 bg-transparent text-sm outline-none"
                />
              </div>
              <div className="flex flex-1 flex-col justify-center border-b border-[var(--border)] px-4 py-3 sm:border-b-0">
                <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "#999" }}>{t("hero.style")}</span>
                <p className="mt-0.5 text-sm">{selectedStyle}</p>
              </div>
              <Link href={`/artists?search=${encodeURIComponent(citySearch)}&style=${encodeURIComponent(selectedStyle)}`}>
                <button className="flex w-full items-center justify-center gap-2 bg-[var(--accent)] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[var(--accent-hover)] sm:h-full sm:w-auto sm:py-0">
                  <Search size={16} />
                  {t("hero.findArtists")}
                </button>
              </Link>
            </div>

            {/* Popular Styles */}
            <div>
              <p className="mb-2 text-xs font-medium" style={{ color: "#999" }}>{t("hero.mostListed")}</p>
              <div className="flex flex-wrap gap-2">
                {topStyles.map((style) => (
                  <button
                    key={style.slug}
                    onClick={() => setSelectedStyle(style.name)}
                    className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-all duration-200 ${
                      selectedStyle === style.name
                        ? "border-[var(--accent)] bg-[var(--accent)] text-white shadow-sm"
                        : "border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
                    }`}
                  >
                    {style.name} <span className="ml-1 opacity-70">{style.artists}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 gap-4 border-t border-[var(--border)] pt-6 sm:flex sm:items-center sm:gap-8">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-xl font-bold sm:text-2xl">{stat.value}</p>
                  <p className="text-[10px] sm:text-xs" style={{ color: "#999" }}>{stat.label.toLowerCase()} worldwide</p>
                </div>
              ))}
              <div>
                <p className="text-xl font-bold sm:text-2xl">{popularCities.length || 77}</p>
                <p className="text-[10px] sm:text-xs" style={{ color: "#999" }}>{t("hero.citiesWorldwide")}</p>
              </div>
            </div>
          </div>

          {/* Right: Hero Images — change with selected style */}
          <div className="relative hidden lg:block">
            {(() => {
              const heroImgs = STYLE_HERO_IMAGES[selectedStyle] || DEFAULT_HERO;
              return (
                <div className="grid grid-cols-2 gap-4">
                  {/* Main large image */}
                  <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
                    <Image
                      key={heroImgs.main}
                      src={heroImgs.main}
                      alt={`${selectedStyle} tattoo`}
                      fill
                      sizes="35vw"
                      className="animate-fade-in object-cover"
                      priority
                    />
                    {/* Floating style card */}
                    <div className="absolute -right-4 top-8 z-10 rounded-xl bg-white p-4 shadow-xl">
                      <p className="text-lg font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>{selectedStyle}</p>
                      <p className="text-xs" style={{ color: "#999" }}>
                        {topStyles.find((s) => s.name === selectedStyle)?.artists || "3,000+"} artists worldwide
                      </p>
                    </div>
                    {/* Artist overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-4 pb-4 pt-16">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500 text-xs font-bold text-white">DS</div>
                        <div>
                          <span className="text-xs font-semibold uppercase tracking-wider text-white">Daniel Silva</span>
                          <p className="text-[10px] text-white/60">Los Angeles</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Right column */}
                  <div className="flex flex-col gap-4">
                    <Link href="/artists/blacktattooalicante" className="group relative block aspect-[4/3] overflow-hidden rounded-2xl">
                      <Image
                        key={heroImgs.topRight}
                        src={heroImgs.topRight}
                        alt={`${selectedStyle} tattoo`}
                        fill
                        sizes="20vw"
                        className="animate-fade-in object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
                      <div className="absolute bottom-3 left-3 flex items-center gap-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">BT</div>
                        <span className="text-xs font-bold text-white">BLACK TATTOO STUDIO</span>
                        <span className="text-[10px] text-white/70">Alicante</span>
                      </div>
                    </Link>
                    <div className="relative flex-1 overflow-hidden rounded-2xl">
                      <Image
                        key={heroImgs.bottomRight}
                        src={heroImgs.bottomRight}
                        alt={`${selectedStyle} tattoo`}
                        fill
                        sizes="20vw"
                        className="animate-fade-in object-cover"
                      />
                      <div className="absolute bottom-3 left-3 flex items-center gap-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-teal-500 text-[10px] font-bold text-white">TB</div>
                        <span className="text-xs font-bold text-white">Tatu Baby</span>
                        <span className="text-[10px] text-white/70">Miami</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          THIS WEEK SECTION
      ═══════════════════════════════════════════════════ */}
      <section className="border-t border-[var(--border)]">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16">
          <div className="mb-8 flex items-center gap-3">
            <div className="h-[3px] w-8 rounded bg-[#e8453c]" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#e8453c]">
              {weekLabel}
            </span>
          </div>

          <h2 className="mb-10 text-2xl font-bold tracking-tight sm:text-4xl">
            {t("week.title1")}
            <span className="italic" style={{ fontFamily: "'Playfair Display', serif" }}>
              {t("week.title2")}
            </span>
          </h2>

          <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
            {/* New Artists */}
            <div className="rounded-2xl border border-[var(--border)] p-6">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#e8453c]">
                {t("week.newArtists")}
              </span>
              <h3 className="mt-2 text-xl font-bold">
                <span className="italic" style={{ fontFamily: "'Playfair Display', serif" }}>{t("week.newArtistsCount")}</span>{t("week.thisWeek")}
              </h3>
              <p className="mt-1 text-sm" style={{ color: "#999" }}>
                From Dinkelsbühl, Medellin, Riga, and 5 more cities.
              </p>
              <div className="mt-1 flex justify-end">
                <Link href="/artists" className="text-sm font-medium hover:text-[var(--accent)]">
                  {t("week.seeAll")}
                </Link>
              </div>

              {/* Artist cards row */}
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  { name: "old.dragon.ink", city: "Dinkelsbühl", country: "Germany", initials: "OD", color: "#3b82f6", img: "/images/portfolio/traditional-1.jpg" },
                  { name: "tatuador.sr", city: "Medellin", country: "Colombia", initials: "TS", color: "#10b981", img: "/images/portfolio/realism-2.jpg" },
                  { name: "envy_tat", city: "Riga", country: "Latvia", initials: "ET", color: "#8b5cf6", img: "/images/portfolio/illustrative-3.jpg" },
                  { name: "vladimir_vishar", city: "London", country: "United Kingdom", initials: "VV", color: "#f59e0b", img: "/images/portfolio/black-gray-1.jpg" },
                ].map((artist) => (
                  <Link key={artist.name} href={`/artists`} className="group block cursor-pointer">
                    <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-100">
                      <Image
                        src={artist.img}
                        alt={artist.name}
                        fill
                        sizes="25vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute left-2 top-2 rounded bg-white px-2 py-0.5 text-[10px] font-semibold shadow-sm">
                        New
                      </div>
                      <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full text-[9px] font-bold text-white transition-transform duration-300 group-hover:scale-110" style={{ background: artist.color }}>
                        {artist.initials}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-xs font-medium transition-colors duration-200 group-hover:text-[var(--accent)]">{artist.name}</p>
                        <p className="truncate text-[10px]" style={{ color: "#999" }}>{artist.city}, {artist.country}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Also new row */}
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <span className="text-xs" style={{ color: "#999" }}>Also new:</span>
                {[
                  { name: "visao_tattoo_tatuagem", color: "#6366f1" },
                  { name: "into.studio_", color: "#ec4899" },
                  { name: "bosphorusink", color: "#14b8a6" },
                ].map((a) => (
                  <Link key={a.name} href="/artists" className="group flex items-center gap-1.5">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full text-[7px] font-bold text-white transition-transform duration-200 group-hover:scale-110" style={{ background: a.color }}>
                      {a.name[0].toUpperCase()}
                    </div>
                    <span className="text-xs font-medium transition-colors duration-200 group-hover:text-[var(--accent)]">{a.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Journal / Blog sidebar */}
            <div>
              <div className="rounded-2xl border border-[var(--border)] overflow-hidden">
                <div className="relative aspect-[16/9]">
                  <Image
                    src="/images/portfolio/fine-line-1.jpg"
                    alt="Blog post"
                    fill
                    sizes="380px"
                    className="object-cover"
                  />
                  <div className="absolute left-3 top-3 rounded bg-white px-2 py-0.5 text-[10px] font-semibold">
                    New on the journal
                  </div>
                </div>
                <div className="p-5">
                  <h4 className="text-base font-bold leading-snug">
                    How Much to Tip Your Tattoo Artist, Country by Country
                  </h4>
                  <p className="mt-2 text-xs leading-relaxed" style={{ color: "#666" }}>
                    In the US, 15 to 25 percent is the cultural baseline and tips
                    form real income. In Germany and France, sourced guides put
                    a generous tip at 10 to 20 percent&hellip;
                  </p>
                </div>
              </div>

              <div className="mt-4 space-y-3">
                {[
                  { title: "Cover-Up Tattoos: What Actually Works", img: "/images/portfolio/watercolor-2.jpg" },
                  { title: "Laser Tattoo Removal in 2026: How It Works, What It Costs", img: "/images/portfolio/geometric-3.jpg" },
                ].map((article) => (
                  <div key={article.title} className="flex items-center gap-3 rounded-xl border border-[var(--border)] p-3">
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg">
                      <Image src={article.img} alt={article.title} fill sizes="48px" className="object-cover" />
                    </div>
                    <p className="text-xs font-semibold leading-snug">{article.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          HOW IT WORKS (3 cards)
      ═══════════════════════════════════════════════════ */}
      <section className="border-t border-[var(--border)]">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-6 sm:py-12 md:grid-cols-3">
          {([
            { Icon: MapPin, color: "#e8453c", bg: "#fef2f2", title: t("how.know"), desc: t("how.knowDesc"), link: t("how.knowLink"), href: "/artists", isHash: false },
            { Icon: Lightbulb, color: "#f59e0b", bg: "#fffbeb", title: t("how.ideas"), desc: t("how.ideasDesc"), link: t("how.ideasLink"), href: "/saved", isHash: false },
            { Icon: Coins, color: "#d97706", bg: "#fff7ed", title: t("how.cost"), desc: t("how.costDesc"), link: t("how.costLink"), href: "#price-estimator", isHash: true },
          ] as const).map((card) => {
            const inner = (
              <>
                <card.Icon size={28} style={{ color: card.color }} />
                <h3 className="text-base font-bold">{card.title}</h3>
                <p className="text-sm" style={{ color: "#666" }}>{card.desc}</p>
                <span className="mt-auto text-sm font-medium text-[#e8453c] group-hover:text-[#c5372f]">
                  {card.link}
                </span>
              </>
            );
            return card.isHash ? (
              <a key={card.title} href={card.href} className="group flex flex-col gap-3 rounded-2xl border border-[var(--border)] p-6 transition-shadow hover:shadow-md">
                {inner}
              </a>
            ) : (
              <Link key={card.title} href={card.href} className="group flex flex-col gap-3 rounded-2xl border border-[var(--border)] p-6 transition-shadow hover:shadow-md">
                {inner}
              </Link>
            );
          })}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          BROWSE BY STYLE
      ═══════════════════════════════════════════════════ */}
      <section className="border-t border-[var(--border)]">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16">
          <div className="mb-2 flex items-center gap-3">
            <div className="h-[3px] w-8 rounded bg-[#e8453c]" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#e8453c]">
              {t("styles.badge")}
            </span>
          </div>
          <div className="mb-8 flex flex-col gap-2 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="text-2xl font-bold tracking-tight sm:text-4xl">
              {t("styles.title1")}
              <span className="italic" style={{ fontFamily: "'Playfair Display', serif" }}>
                {t("styles.titleItalic")}
              </span>
              {t("styles.title2")}
            </h2>
            <Link href="/artists" className="text-sm font-medium hover:text-[var(--accent)]">
              {t("styles.all")}
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {allStyles.map((style) => {
              const theme = STYLE_CARD_THEMES[style.slug] || { bg: "#f5f5f5", text: "#333" };
              return (
                <Link
                  key={style.slug}
                  href={`/artists?tags=${encodeURIComponent(style.slug)}`}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl transition-shadow hover:shadow-lg"
                  style={{ minHeight: "160px" }}
                >
                  <Image
                    src={imgSrc(style.imageUrl)}
                    alt={style.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="relative z-10 flex h-full flex-col justify-between p-5">
                    <h3
                      className="text-xl font-bold text-white sm:text-2xl"
                      style={{ fontFamily: theme.font || "inherit" }}
                    >
                      {style.name}
                    </h3>
                    <p className="text-xs text-white/70">
                      {style.artists} {t("styles.artists")}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          POPULAR CITIES
      ═══════════════════════════════════════════════════ */}
      <section className="border-t border-[var(--border)]">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16">
          <div className="mb-2 flex items-center gap-3">
            <div className="h-[3px] w-8 rounded bg-[#e8453c]" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#e8453c]">
              {t("cities.badge")}
            </span>
          </div>
          <div className="mb-8 flex flex-col gap-2 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="text-2xl font-bold tracking-tight sm:text-4xl">
              {t("cities.title1")}
              <span className="italic" style={{ fontFamily: "'Playfair Display', serif" }}>
                {t("cities.titleItalic")}
              </span>
            </h2>
            <Link href="/artists" className="text-sm font-medium hover:text-[var(--accent)]">
              {t("cities.all")}
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
            {Object.entries(CITY_DATA).map(([city, data]) => (
              <Link
                key={city}
                href={`/artists?search=${encodeURIComponent(city)}`}
                className="rounded-xl border border-[var(--border)] p-4 transition-shadow hover:shadow-md"
              >
                <p className="text-sm font-semibold">{city}</p>
                <p className="text-xs" style={{ color: "#999" }}>{data.country}</p>
                <p className="mt-1 text-xs" style={{ color: "#999" }}>{data.count} artists</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          PRICE ESTIMATOR
      ═══════════════════════════════════════════════════ */}
      <section id="price-estimator" className="scroll-mt-8 border-t border-[var(--border)] bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16">
          <div className="mb-2 flex items-center gap-3">
            <div className="h-[3px] w-8 rounded bg-[#e8453c]" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#e8453c]">
              Before You Message Anyone
            </span>
          </div>

          <h2 className="mb-4 text-2xl font-bold tracking-tight sm:text-4xl">
            What will{" "}
            <span className="italic" style={{ fontFamily: "'Playfair Display', serif" }}>
              your
            </span>{" "}
            tattoo cost?
          </h2>
          <p className="mb-8 max-w-lg text-sm" style={{ color: "#666" }}>
            Four things set the price: size, colour, detail and the artist. Pick
            yours to see a typical range.
          </p>

          <div className="grid gap-10 lg:grid-cols-[1fr_400px]">
            <div className="space-y-6">
              {/* City */}
              <div>
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider" style={{ color: "#999" }}>City</p>
                <div className="flex items-center gap-2 rounded-lg border border-[var(--border)] px-4 py-3">
                  <MapPin size={16} style={{ color: "#e8453c" }} />
                  <input
                    type="text"
                    placeholder="Your city"
                    className="flex-1 bg-transparent text-sm outline-none"
                  />
                </div>
              </div>

              {/* Size */}
              <div>
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider" style={{ color: "#999" }}>Size</p>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {SIZE_OPTIONS.map((size) => (
                    <button
                      key={size.label}
                      onClick={() => setSelectedSize(size.label)}
                      className={`rounded-lg border px-4 py-3 text-left transition-colors ${
                        selectedSize === size.label
                          ? "border-[var(--accent)] bg-[var(--accent)] text-white shadow-sm"
                          : "border-[var(--border)] hover:border-[var(--accent)]"
                      }`}
                    >
                      <p className="text-sm font-medium">{size.label}</p>
                      <p className={`text-xs ${selectedSize === size.label ? "text-white/70" : ""}`} style={selectedSize !== size.label ? { color: "#999" } : {}}>
                        {size.desc}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Ink */}
              <div>
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider" style={{ color: "#999" }}>Ink</p>
                <div className="flex gap-2">
                  {["Black & grey", "Colour"].map((ink) => (
                    <button
                      key={ink}
                      onClick={() => setSelectedInk(ink)}
                      className={`flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                        selectedInk === ink
                          ? "bg-[var(--accent)] text-white shadow-sm"
                          : "border border-[var(--border)] hover:border-[var(--accent)]"
                      }`}
                    >
                      {ink === "Colour" && <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-pink-400 via-yellow-400 to-green-400" />}
                      {ink === "Black & grey" && <span className="h-2.5 w-2.5 rounded-full bg-gray-600" />}
                      {ink}
                    </button>
                  ))}
                </div>
              </div>

              {/* Detail */}
              <div>
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider" style={{ color: "#999" }}>Detail</p>
                <div className="flex flex-wrap gap-2">
                  {["Simple", "Detailed", "Very detailed"].map((detail) => (
                    <button
                      key={detail}
                      onClick={() => setSelectedDetail(detail)}
                      className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                        selectedDetail === detail
                          ? "bg-[var(--accent)] text-white shadow-sm"
                          : "border border-[var(--border)] hover:border-[var(--accent)]"
                      }`}
                    >
                      {detail}
                    </button>
                  ))}
                </div>
              </div>

              {/* Artist */}
              <div>
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider" style={{ color: "#999" }}>Artist</p>
                <div className="flex flex-wrap gap-2">
                  {["Rising", "Established", "In demand"].map((artist) => (
                    <button
                      key={artist}
                      onClick={() => setSelectedArtist(artist)}
                      className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                        selectedArtist === artist
                          ? "bg-[var(--accent)] text-white shadow-sm"
                          : "border border-[var(--border)] hover:border-[var(--accent)]"
                      }`}
                    >
                      {artist}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Body silhouette placeholder */}
            <div className="hidden items-center justify-center lg:flex">
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="relative h-72 w-40">
                  <svg viewBox="0 0 120 280" fill="none" className="h-full w-full">
                    <ellipse cx="60" cy="28" rx="18" ry="22" fill="#f5d5d5" />
                    <rect x="42" y="50" width="36" height="55" rx="8" fill="#f5d5d5" />
                    <rect x="20" y="55" width="20" height="60" rx="8" fill="#f5d5d5" transform="rotate(-10 20 55)" />
                    <rect x="80" y="55" width="20" height="60" rx="8" fill="#f5d5d5" transform="rotate(10 100 55)" />
                    <rect x="38" y="105" width="18" height="70" rx="8" fill="#f5d5d5" />
                    <rect x="64" y="105" width="18" height="70" rx="8" fill="#f5d5d5" />
                    <circle cx="68" cy="80" r="6" fill="#e8453c" opacity="0.3" />
                  </svg>
                </div>
                <p className="text-sm" style={{ color: "#999" }}>Add your city to see local prices.</p>
                <div className="flex gap-4">
                  <Link href="/blog" className="text-sm font-medium underline hover:text-[var(--accent)]">Read the full price guide</Link>
                  <Link href="/design-tools" className="text-sm font-medium underline hover:text-[var(--accent)]">Get a Custom Design</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          FOR ARTISTS SECTION
      ═══════════════════════════════════════════════════ */}
      <section className="border-t border-[var(--border)] bg-[var(--section-bg)]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-20">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Left */}
            <div>
              <div className="mb-6 flex items-center gap-3">
                <div className="h-[3px] w-8 rounded bg-[#e8453c]" />
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#e8453c]">
                  {t("artists.badge")}
                </span>
              </div>
              <h2 className="text-2xl font-bold tracking-tight sm:text-4xl">
                {t("artists.title1")}
                <span className="italic" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {t("artists.titleItalic")}
                </span>
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed" style={{ color: "#666" }}>
                {t("artists.desc")}
              </p>

              <div className="mt-8">
                <Link href="/join" className="inline-block rounded-full bg-[#e8453c] px-8 py-3.5 text-sm font-medium text-white transition-colors hover:bg-[#c5372f]">
                  {t("artists.cta")}
                </Link>
              </div>
            </div>

            {/* Right: Steps */}
            <div className="space-y-4">
              {[
                { num: "1", title: t("artists.step1"), desc: t("artists.step1Desc") },
                { num: "2", title: t("artists.step2"), desc: t("artists.step2Desc") },
                { num: "3", title: t("artists.step3"), desc: t("artists.step3Desc") },
              ].map((step) => (
                <div key={step.num} className="flex items-start gap-4 rounded-xl border border-[var(--border)] bg-white p-5 transition-shadow hover:shadow-sm">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#e8453c] text-sm font-bold text-white">
                    {step.num}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{step.title}</p>
                    <p className="mt-1 text-xs" style={{ color: "#666" }}>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          NEWSLETTER
      ═══════════════════════════════════════════════════ */}
      <section className="border-t border-[var(--border)]">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-4 py-10 sm:px-6 sm:py-14 md:flex-row md:justify-between">
          <div>
            <h3 className="text-xl font-bold sm:text-2xl">
              {t("newsletter.title")}
            </h3>
            <p className="mt-1 text-sm" style={{ color: "#999" }}>
              {t("newsletter.desc")}
            </p>
          </div>
          <div className="flex w-full gap-0 overflow-hidden rounded-full border border-[var(--border)] md:w-auto">
            <input
              type="email"
              placeholder={t("newsletter.placeholder")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-transparent px-5 py-3 text-sm outline-none md:w-56"
            />
            <button className="flex items-center gap-2 rounded-full bg-[#e8453c] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#c5372f]">
              {t("newsletter.subscribe")} <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════════════════ */}
      <footer className="border-t border-[var(--border)] bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16">
          {/* Main footer grid */}
          <div className="mb-12 grid grid-cols-2 gap-8 sm:gap-10 md:grid-cols-5">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <div className="mb-4 text-xl font-bold tracking-tight">TattooNest</div>
              <p className="text-sm leading-relaxed" style={{ color: "#666" }}>
                Discover talented tattoo artists and get inspired for your next piece of body art.
              </p>
              {/* Social icons */}
              <div className="mt-4 flex gap-3">
                {["tiktok", "facebook", "pinterest", "twitter"].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] transition-colors hover:border-gray-400"
                  >
                    <span className="text-xs font-medium uppercase">{social[0]}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Explore */}
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-[#e8453c]">Explore</p>
              <ul className="flex flex-col gap-2.5">
                {FOOTER_EXPLORE.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="text-sm font-medium hover:text-[var(--accent)]">{item.label}</Link>
                    <p className="text-xs" style={{ color: "#999" }}>{item.desc}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Popular Cities */}
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-[#e8453c]">Popular Cities</p>
              <ul className="flex flex-col gap-2">
                {popularCities.map((city) => (
                  <li key={city}>
                    <Link href={`/artists?search=${encodeURIComponent(city)}`} className="text-sm transition-colors hover:text-[var(--accent)]">{city}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tattoo Styles */}
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-[#e8453c]">Tattoo Styles</p>
              <ul className="flex flex-col gap-2">
                {allStyles.map((style) => (
                  <li key={style.slug}>
                    <Link href={`/artists?tags=${encodeURIComponent(style.slug)}`} className="text-sm transition-colors hover:text-[var(--accent)]">
                      {style.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-[#e8453c]">Resources</p>
              <ul className="flex flex-col gap-2">
                {FOOTER_RESOURCES.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="text-sm transition-colors hover:text-[var(--accent)]">{item.label}</Link>
                  </li>
                ))}
                <li>
                  <Link href="/join" className="text-sm font-medium text-[#e8453c] transition-colors hover:text-[#c5372f]">
                    Join as an artist
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom links */}
          <div className="space-y-4 border-t border-[var(--border)] pt-8">
            <div className="flex flex-wrap items-baseline gap-x-1 gap-y-1">
              <span className="mr-2 text-xs font-semibold uppercase tracking-wider" style={{ color: "#999" }}>Top Cities</span>
              {TOP_CITIES.map((city, i) => (
                <span key={city}>
                  <Link href={`/artists?search=${encodeURIComponent(city)}`} className="text-xs hover:text-[var(--accent)]">{city}</Link>
                  {i < TOP_CITIES.length - 1 && <span className="text-xs" style={{ color: "#ddd" }}> · </span>}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap items-baseline gap-x-1 gap-y-1">
              <span className="mr-2 text-xs font-semibold uppercase tracking-wider" style={{ color: "#999" }}>Top Styles</span>
              {TOP_STYLES.map((style, i) => (
                <span key={style}>
                  <Link href={`/artists?tags=${encodeURIComponent(style.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-"))}`} className="text-xs hover:text-[var(--accent)]">{style}</Link>
                  {i < TOP_STYLES.length - 1 && <span className="text-xs" style={{ color: "#ddd" }}> · </span>}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap items-baseline gap-x-1 gap-y-1">
              <span className="mr-2 text-xs font-semibold uppercase tracking-wider" style={{ color: "#999" }}>Featured Artists</span>
              {FEATURED_ARTISTS.map((artist, i) => (
                <span key={artist}>
                  <Link href={`/artists?search=${encodeURIComponent(artist)}`} className="text-xs hover:text-[var(--accent)]">{artist}</Link>
                  {i < FEATURED_ARTISTS.length - 1 && <span className="text-xs" style={{ color: "#ddd" }}> · </span>}
                </span>
              ))}
            </div>

            <p className="pt-4 text-xs" style={{ color: "#999" }}>
              &copy; 2026 TattooNest. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      <AuthModal
        mode={authModal || "login"}
        isOpen={authModal !== null}
        onClose={() => setAuthModal(null)}
        onSwitchMode={() => setAuthModal(authModal === "login" ? "register" : "login")}
      />
    </div>
  );
}
