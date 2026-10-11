"use client";

import { Suspense, useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Search,
  ChevronDown,
  Globe,
  X,
  Star,
  BadgeCheck,
  MapPin,
} from "lucide-react";
import { Button, Input } from "@/components/ui";
import AuthModal from "@/components/AuthModal";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchLandingData } from "@/store/slices/landingSlice";
import { fetchArtists } from "@/store/slices/artistSlice";

const STYLE_IMAGE_MAP: Record<string, string> = {
  "Traditional": "/images/styles/traditional.jpg",
  "Fine line": "/images/styles/fine-line.jpg",
  "Dotwork": "/images/styles/dotwork.jpg",
  "Illustrative": "/images/styles/illustrative.jpg",
  "Japanese": "/images/styles/japanese.jpg",
  "Realism": "/images/styles/realism.jpg",
  "Black & Gray": "/images/styles/black-gray.jpg",
  "Blackwork": "/images/styles/black-gray.jpg",
  "Geometric": "/images/styles/geometric.jpg",
  "Watercolor": "/images/styles/watercolor.jpg",
  "Neo Traditional": "/images/styles/neo-traditional.jpg",
  "Neo-Traditional": "/images/styles/neo-traditional.jpg",
  "Minimalist": "/images/styles/minimalist.jpg",
  "Anime": "/images/styles/anime.jpg",
};

const ALL_STYLE_IMAGES = Object.values(STYLE_IMAGE_MAP).filter((v, i, a) => a.indexOf(v) === i);

function getStyleImages(styles: string[], artistIndex: number): string[] {
  const matched: string[] = [];
  for (const s of styles) {
    if (STYLE_IMAGE_MAP[s] && !matched.includes(STYLE_IMAGE_MAP[s])) {
      matched.push(STYLE_IMAGE_MAP[s]);
    }
  }
  const pool = matched.length > 0 ? matched : ALL_STYLE_IMAGES;
  const offset = artistIndex * 3;
  const result: string[] = [];
  for (let i = 0; i < 4; i++) {
    result.push(ALL_STYLE_IMAGES[(offset + i) % ALL_STYLE_IMAGES.length]);
  }
  result[0] = pool[artistIndex % pool.length];
  return result;
}

const AVATAR_COLORS = [
  "#16a34a", "#2563eb", "#9333ea", "#dc2626", "#ea580c",
  "#0891b2", "#4f46e5", "#be185d", "#65a30d", "#0d9488",
  "#7c3aed", "#c2410c",
];

function getInitials(name: string) {
  return name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
}

function getAvatarColor(idx: number) {
  return AVATAR_COLORS[idx % AVATAR_COLORS.length];
}

export default function ArtistsPageWrapper() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading...</div>}>
      <ArtistsPage />
    </Suspense>
  );
}

function ArtistsPage() {
  const searchParams = useSearchParams();
  const activeTag = searchParams.get("tags") || "";
  const [searchQuery, setSearchQuery] = useState("");
  const [authModal, setAuthModal] = useState<"login" | "register" | null>(null);
  const [selectedStyle, setSelectedStyle] = useState("");

  const dispatch = useAppDispatch();
  const { styles, loading: landingLoading } = useAppSelector((s) => s.landing);
  const { list: artists, loading: artistsLoading } = useAppSelector((s) => s.artists);

  useEffect(() => {
    dispatch(fetchLandingData());
  }, [dispatch]);

  useEffect(() => {
    if (activeTag) {
      setSelectedStyle(activeTag);
      dispatch(fetchArtists({ style: activeTag }));
    } else {
      dispatch(fetchArtists({}));
    }
  }, [dispatch, activeTag]);

  const handleStyleFilter = (styleName: string) => {
    if (selectedStyle === styleName) {
      setSelectedStyle("");
      dispatch(fetchArtists({}));
    } else {
      setSelectedStyle(styleName);
      dispatch(fetchArtists({ style: styleName }));
    }
  };

  const totalArtists = useMemo(
    () => styles.reduce((sum, s) => sum + parseInt(s.artists?.replace(/,/g, "") || "0", 10), 0),
    [styles]
  );

  const totalStudios = useMemo(
    () => Math.round(totalArtists * 0.25),
    [totalArtists]
  );

  const topStyle = useMemo(
    () => [...styles].sort((a, b) => parseInt(b.artists?.replace(/,/g, "") || "0", 10) - parseInt(a.artists?.replace(/,/g, "") || "0", 10))[0],
    [styles]
  );

  const sortedStyles = useMemo(
    () => [...styles].sort((a, b) => parseInt(b.artists?.replace(/,/g, "") || "0", 10) - parseInt(a.artists?.replace(/,/g, "") || "0", 10)),
    [styles]
  );

  const filteredArtists = useMemo(() => {
    return artists.filter((a) => {
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return a.name.toLowerCase().includes(q) || a.location.toLowerCase().includes(q);
      }
      return true;
    });
  }, [artists, searchQuery]);

  const loading = landingLoading || artistsLoading;

  if (loading && styles.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[var(--accent)] border-t-transparent" />
      </div>
    );
  }

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
            <Button variant="ghost" size="sm" className="hidden md:flex">
              <Globe size={18} /> EN
            </Button>
            <Link href="/join">
              <Button variant="accent-outline" size="sm" className="rounded-full">
                Join as Artist
              </Button>
            </Link>
            <Button variant="ghost" size="sm" onClick={() => setAuthModal("login")}>
              Sign In
            </Button>
          </div>
        </div>
      </header>

      {/* ─── Breadcrumb ─── */}
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center gap-2 text-sm" style={{ color: "#666" }}>
          <Link href="/" className="hover:text-[var(--accent)]">Home</Link>
          <span>/</span>
          <span className="font-medium" style={{ color: "#000" }}>Artists</span>
        </div>
      </div>

      {/* ─── Directory Header ─── */}
      <div className="mx-auto max-w-7xl px-6 pb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-0.5 w-8 bg-[var(--accent)]" />
          <span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: "var(--accent)" }}>
            Tattoo Artist Directory
          </span>
        </div>

        <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
          Browse tattoo artists by{" "}
          <span className="italic" style={{ fontFamily: "'Playfair Display', serif" }}>
            style
          </span>
        </h1>

        <p className="mt-4 text-base" style={{ color: "#666" }}>
          {totalArtists.toLocaleString()} artists and studios worldwide. Search a city or a style to start.
        </p>

        {/* Stats row */}
        <div className="mt-8 flex items-center gap-12 border-t border-[var(--border)] pt-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#999" }}>Artists</p>
            <p className="text-2xl font-bold">{totalArtists.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#999" }}>Studios</p>
            <p className="text-2xl font-bold">{totalStudios.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#999" }}>Top Style</p>
            <p className="text-2xl font-bold">{topStyle?.name || "—"}</p>
          </div>
        </div>
      </div>

      {/* ─── Style Grid ─── */}
      <div className="mx-auto max-w-7xl px-6 pb-8">
        <div className="grid grid-cols-2 gap-x-12 gap-y-1 border-t border-[var(--border)] pt-6 sm:grid-cols-4">
          {sortedStyles.map((style) => {
            const count = parseInt(style.artists?.replace(/,/g, "") || "0", 10);
            return (
              <button
                key={style.slug}
                onClick={() => handleStyleFilter(style.name)}
                className={`flex items-center justify-between py-3 text-left transition-colors hover:text-[var(--accent)] ${selectedStyle === style.name ? "text-[var(--accent)] font-semibold" : ""}`}
              >
                <span className="text-sm font-medium">{style.name}</span>
                {count > 0 && (
                  <span className="text-sm" style={{ color: "#999" }}>{count.toLocaleString()} artists</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── Filter Pills ─── */}
      <div className="mx-auto max-w-7xl px-6 pb-6">
        <div className="flex flex-wrap items-center gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => { setSelectedStyle(""); dispatch(fetchArtists({})); }}
            className={`shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${!selectedStyle ? "border-[var(--accent)] bg-[var(--accent)] text-white" : "border-[var(--border)] hover:border-[var(--accent)]"}`}
          >
            All
          </button>
          {sortedStyles.map((style) => {
            const count = parseInt(style.artists?.replace(/,/g, "") || "0", 10);
            return (
              <button
                key={style.slug}
                onClick={() => handleStyleFilter(style.name)}
                className={`shrink-0 rounded-full border px-4 py-1.5 text-sm transition-colors ${selectedStyle === style.name ? "border-[var(--accent)] bg-[var(--accent)] text-white" : "border-[var(--border)] hover:border-[var(--accent)]"}`}
              >
                {style.name}{" "}
                {count > 0 && <span style={{ opacity: 0.7 }}>{count.toLocaleString()}</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── Search + Sort Bar ─── */}
      <div className="mx-auto max-w-7xl px-6 pb-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 items-center gap-2">
            {selectedStyle && (
              <span className="flex shrink-0 items-center gap-1 rounded-full bg-[var(--accent)] px-3 py-1 text-sm text-white">
                {selectedStyle}
                <Button variant="ghost" size="sm" className="!p-0 !text-white" onClick={() => { setSelectedStyle(""); dispatch(fetchArtists({})); }}>
                  <X size={14} />
                </Button>
              </span>
            )}
            <Input
              type="text"
              placeholder="Search a city, style or artist"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search size={18} style={{ color: "#999" }} />}
            />
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              Artists and studios <ChevronDown size={14} />
            </Button>
            <Button variant="outline" size="sm">
              Recommended <ChevronDown size={14} />
            </Button>
          </div>
        </div>
      </div>

      {/* ─── Results Count ─── */}
      <div className="mx-auto max-w-7xl px-6 pb-6">
        <p className="text-sm" style={{ color: "#666" }}>
          Showing 1&ndash;{Math.min(24, filteredArtists.length)} of {totalArtists.toLocaleString()}
        </p>
      </div>

      {/* ─── Artist Cards Grid ─── */}
      <div className="mx-auto max-w-7xl px-6 pb-16">
        {artistsLoading ? (
          <div className="flex justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-[var(--accent)] border-t-transparent" />
          </div>
        ) : filteredArtists.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-lg font-semibold">No artists found</p>
            <p className="mt-2 text-sm" style={{ color: "#666" }}>Try a different style or search term.</p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredArtists.map((artist, idx) => {
              const imgs = getStyleImages(artist.styles, idx);
              const avatarBg = getAvatarColor(idx);
              const isTopRated = artist.rating >= 4.8;
              return (
              <Link
                href={`/artists/${artist.slug}`}
                key={artist.slug + idx}
                className="group block animate-fade-in-up"
                style={{ animationDelay: `${idx * 80}ms` }}
              >
                {/* Portfolio Grid */}
                <div className="relative mb-3 grid grid-cols-[2fr_1fr] gap-1 overflow-hidden rounded-xl">
                  <div className="relative aspect-square overflow-hidden">
                    <img src={imgs[0]} alt={artist.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="relative flex-1 overflow-hidden">
                      <img src={imgs[1]} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    </div>
                    <div className="relative flex-1 overflow-hidden">
                      <img src={imgs[2]} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    </div>
                    <div className="relative flex-1 overflow-hidden">
                      <img src={imgs[3]} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    </div>
                  </div>
                  {/* Price overlay */}
                  {artist.priceMin && (
                    <div className="absolute bottom-2 left-2 rounded-full bg-[var(--accent)] px-3 py-1.5 text-xs font-bold text-white shadow-lg">
                      From ${artist.priceMin.toLocaleString()}
                    </div>
                  )}
                  {/* Rating badge */}
                  {isTopRated && (
                    <div className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-white/90 px-2 py-0.5 text-xs font-semibold backdrop-blur-sm">
                      <Star size={12} className="fill-yellow-400 text-yellow-400" />
                      {artist.rating}
                    </div>
                  )}
                </div>

                {/* Artist Info */}
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white transition-transform duration-300 group-hover:scale-110"
                    style={{ background: avatarBg }}
                  >
                    {getInitials(artist.name)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className="truncate text-sm font-semibold transition-colors duration-200 group-hover:text-[var(--accent)]">{artist.name}</p>
                      {isTopRated && <BadgeCheck size={14} className="shrink-0 text-[var(--accent)]" />}
                    </div>
                    <p className="flex items-center gap-1 text-xs" style={{ color: "#666" }}>
                      <MapPin size={11} />
                      {artist.location}
                    </p>
                  </div>
                </div>

                {/* Style Tags */}
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {artist.styles.slice(0, 4).map((style) => (
                    <span
                      key={style}
                      className={`rounded-full border px-3 py-0.5 text-xs transition-colors duration-200 group-hover:border-[var(--accent)]/40 ${style === "Studio" ? "border-gray-400 bg-gray-100 font-medium" : "border-[var(--border)]"}`}
                    >
                      {style}
                    </span>
                  ))}
                  {artist.styles.length > 4 && (
                    <span className="rounded-full border border-[var(--border)] px-2 py-0.5 text-xs" style={{ color: "#999" }}>
                      +{artist.styles.length - 4}
                    </span>
                  )}
                </div>

                {/* Pricing + Followers */}
                <div className="mt-3 flex items-center justify-between gap-2">
                  {artist.priceMin && artist.priceMax ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--accent)] px-4 py-1.5 text-sm font-bold text-white shadow-sm transition-all duration-200 group-hover:shadow-md group-hover:brightness-110">
                      ${artist.priceMin.toLocaleString()}&ndash;${artist.priceMax.toLocaleString()}
                      <span className="rounded bg-white/20 px-1.5 py-0.5 text-[10px] font-semibold">EST</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-full border border-dashed px-4 py-1.5 text-xs font-medium" style={{ borderColor: "var(--border)", color: "#999" }}>
                      Contact for pricing
                    </span>
                  )}
                  {artist.followers && (
                    <span className="text-xs font-medium" style={{ color: "#666" }}>{artist.followers} followers</span>
                  )}
                </div>
              </Link>
              );
            })}
          </div>
        )}
      </div>

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
      />
    </div>
  );
}
