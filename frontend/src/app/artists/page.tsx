"use client";

import { Suspense, useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Search,
  ChevronDown,
  X,
  Star,
  MapPin,
} from "lucide-react";
import AuthModal from "@/components/AuthModal";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useTranslation } from "@/i18n/context";
import Footer from "@/components/layouts/Footer";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useHydrated } from "@/store/Provider";
import { fetchLandingData } from "@/store/slices/landingSlice";
import { fetchArtists } from "@/store/slices/artistSlice";
import { imgSrc } from "@/utils/urlHelper";

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
      { label: "AI Tattoo Generator", href: "/design-tools" },
      { label: "Custom Design", href: "/design-tools#custom" },
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

const STYLE_SLUG_MAP: Record<string, string> = {
  "Traditional": "traditional", "Fine line": "fine-line", "Dotwork": "dotwork",
  "Illustrative": "illustrative", "Japanese": "japanese", "Realism": "realism",
  "Black & grey": "black-gray", "Geometric": "geometric", "Watercolor": "watercolor",
  "Neo Traditional": "neo-traditional", "Minimalist": "minimalist", "Anime": "anime",
};

function getArtistImages(artist: { images?: { imageUrl: string }[]; styles: string[] }, artistIndex: number): string[] {
  if (artist.images && artist.images.length >= 4) {
    return artist.images.slice(0, 4).map(i => imgSrc(i.imageUrl));
  }
  const imgs = artist.images?.map(i => imgSrc(i.imageUrl)) || [];
  const slug = STYLE_SLUG_MAP[artist.styles[0]] || "illustrative";
  while (imgs.length < 4) {
    const v = ((artistIndex * 7 + imgs.length) % 50) + 1;
    imgs.push(`/images/portfolio/${slug}-${v}.jpg`);
  }
  return imgs;
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
  const initialSearch = searchParams.get("search") || "";
  const { t } = useTranslation();
  const hydrated = useHydrated();
  const { user } = useAppSelector((s) => s.auth);
  const isLoggedIn = hydrated && !!user;
  const [searchQuery, setSearchQuery] = useState(initialSearch);
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
    } else if (initialSearch) {
      dispatch(fetchArtists({ search: initialSearch }));
    } else {
      dispatch(fetchArtists({}));
    }
  }, [dispatch, activeTag, initialSearch]);

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
            {isLoggedIn ? (
              <Link href="/dashboard">
                <button className="rounded-full bg-[var(--accent)] px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-[var(--accent-hover)]">
                  Dashboard
                </button>
              </Link>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
      </header>

      {/* ─── Style Pills Row ─── */}
      <div className="border-b border-[var(--border)]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex gap-2 overflow-x-auto py-4 scrollbar-hide">
            {sortedStyles.map((style) => (
              <button
                key={style.slug}
                onClick={() => handleStyleFilter(style.name)}
                className={`shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-200 ${
                  selectedStyle === style.name
                    ? "border-[var(--accent)] bg-[var(--accent)] text-white shadow-sm"
                    : "border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
                }`}
              >
                {style.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Search + Filter Bar ─── */}
      <div className="border-b border-[var(--border)]">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 items-center gap-2 rounded-lg border border-[var(--border)] px-4 py-2.5">
            <Search size={18} style={{ color: "#999" }} className="shrink-0" />
            {selectedStyle && (
              <span className="flex shrink-0 items-center gap-1.5 rounded border border-[var(--border)] bg-gray-50 px-2.5 py-1 text-sm">
                {selectedStyle}
                <button
                  onClick={() => { setSelectedStyle(""); dispatch(fetchArtists({})); }}
                  className="text-gray-400 transition-colors hover:text-gray-700"
                >
                  <X size={14} />
                </button>
              </span>
            )}
            <input
              type="text"
              placeholder="Add a city, style or artist"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-gray-400"
            />
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 rounded-lg border border-[var(--border)] px-4 py-2.5 text-sm font-medium transition-colors hover:border-gray-400">
              Artists and studios <ChevronDown size={14} />
            </button>
            <button className="flex items-center gap-2 rounded-lg border border-[var(--border)] px-4 py-2.5 text-sm font-medium transition-colors hover:border-gray-400">
              Recommended <ChevronDown size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* ─── Results Count ─── */}
      <div className="mx-auto max-w-7xl px-6 py-4">
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
          <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {filteredArtists.map((artist, idx) => {
              const imgs = getArtistImages(artist, idx);
              const avatarBg = getAvatarColor(idx);
              const isFeatured = artist.rating >= 4.5;
              return (
                <Link
                  href={`/artists/${artist.slug}`}
                  key={artist.slug + idx}
                  className="group block animate-fade-in-up"
                  style={{ animationDelay: `${idx * 60}ms` }}
                >
                  {/* Portfolio Grid — 1 large left + 3 small right */}
                  <div className="relative mb-3 grid grid-cols-[2fr_1fr] gap-0.5 overflow-hidden rounded-xl">
                    <div className="relative aspect-square overflow-hidden">
                      <img
                        src={imgs[0]}
                        alt={artist.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <div className="relative flex-1 overflow-hidden">
                        <img
                          src={imgs[1]}
                          alt=""
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="relative flex-1 overflow-hidden">
                        <img
                          src={imgs[2]}
                          alt=""
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="relative flex-1 overflow-hidden">
                        <img
                          src={imgs[3]}
                          alt=""
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    </div>
                    <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 p-3">
                      <span className="rounded-full bg-[var(--accent)] px-5 py-2 text-xs font-bold uppercase tracking-wide text-white">
                        Book a Tattoo
                      </span>
                    </div>
                  </div>

                  {/* Artist Info */}
                  <div className="flex items-center gap-3">
                    {artist.profileImageUrl ? (
                      <img
                        src={imgSrc(artist.profileImageUrl)}
                        alt={artist.name}
                        className="h-10 w-10 shrink-0 rounded-full object-cover"
                      />
                    ) : (
                      <div
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                        style={{ background: avatarBg }}
                      >
                        {getInitials(artist.name)}
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold transition-colors duration-200 group-hover:text-[var(--accent)]">
                        {artist.name}
                      </p>
                      <p className="flex items-center gap-1 text-xs" style={{ color: "#666" }}>
                        <MapPin size={11} />
                        {artist.location}
                      </p>
                    </div>
                  </div>

                  {/* Style Tags */}
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {artist.styles.slice(0, 3).map((style) => (
                      <span
                        key={style}
                        className="rounded-full border border-[var(--border)] px-3 py-0.5 text-xs"
                      >
                        {style}
                      </span>
                    ))}
                    {artist.styles.length > 3 && (
                      <span className="rounded-full border border-[var(--border)] px-2 py-0.5 text-xs" style={{ color: "#999" }}>
                        +{artist.styles.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Featured + Followers + Price */}
                  <div className="mt-2.5 flex items-center gap-3">
                    {isFeatured && (
                      <span className="flex items-center gap-1 text-xs font-semibold text-[#e8453c]">
                        <Star size={12} className="fill-[#e8453c]" />
                        FEATURED
                      </span>
                    )}
                    {artist.followers && (
                      <span className="text-xs" style={{ color: "#666" }}>{artist.followers} followers</span>
                    )}
                    {artist.priceMin && artist.priceMax ? (
                      <span className="ml-auto inline-flex items-center gap-1.5 text-sm font-semibold">
                        ${artist.priceMin.toLocaleString()}&ndash;${artist.priceMax.toLocaleString()}
                        <span className="rounded-full border border-[var(--accent)] px-1.5 py-0.5 text-[10px] font-bold text-[var(--accent)]">
                          EST
                        </span>
                      </span>
                    ) : (
                      <span className="ml-auto text-xs" style={{ color: "#999" }}>
                        Contact for pricing
                      </span>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>

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
