"use client";

import { Suspense, useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Footer from "@/components/layouts/Footer";
import {
  ArrowLeft,
  Heart,
  Share2,
  MapPin,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { Button } from "@/components/ui";
import BookingModal from "@/components/BookingModal";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchArtistBySlug } from "@/store/slices/artistSlice";
import { imgSrc } from "@/utils/urlHelper";

function getInitials(name: string) {
  return name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
}

export default function ArtistDetailWrapper() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[var(--accent)]" /></div>}>
      <ArtistDetailPage />
    </Suspense>
  );
}

function ArtistDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const dispatch = useAppDispatch();
  const { current: artist, detailLoading, error } = useAppSelector((s) => s.artists);
  const [selectedStyle, setSelectedStyle] = useState("");
  const [saved, setSaved] = useState(false);
  const [showFullBio, setShowFullBio] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);

  useEffect(() => {
    if (slug) dispatch(fetchArtistBySlug(slug));
  }, [slug, dispatch]);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight" && artist?.images) {
        setLightboxIndex((prev) => (prev !== null ? (prev + 1) % artist.images.length : null));
      }
      if (e.key === "ArrowLeft" && artist?.images) {
        setLightboxIndex((prev) => (prev !== null ? (prev - 1 + artist.images.length) % artist.images.length : null));
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxIndex, artist?.images, closeLightbox]);

  if (detailLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center" style={{ background: "var(--bg)" }}>
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[var(--accent)]" />
      </div>
    );
  }

  if (error || !artist) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4" style={{ background: "var(--bg)" }}>
        <p className="text-lg font-medium" style={{ color: "var(--text)" }}>Artist not found</p>
        <Link href="/artists" className="text-sm underline" style={{ color: "var(--accent)" }}>
          Back to artists
        </Link>
      </div>
    );
  }

  const formatPrice = (n: number) => `$${n.toLocaleString()}`;
  const images = artist.images ?? [];

  const stats = [
    { label: "STYLES", value: artist.styles.length.toString() },
    {
      label: "SMALL TATTOO EST.",
      value: artist.priceMin ? formatPrice(artist.priceMin) : "N/A",
    },
    { label: "PIECES", value: artist.pieceCount?.toLocaleString() || "0" },
    { label: "FOLLOWERS", value: artist.followers || "—" },
  ];

  const lightboxImage = lightboxIndex !== null ? images[lightboxIndex] : null;

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)", color: "var(--text)" }}>
      {/* Lightbox Modal */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          onClick={closeLightbox}
        >
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-4 top-4 !text-white"
            onClick={closeLightbox}
          >
            <X size={24} />
          </Button>

          {images.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="sm"
                className="absolute left-4 top-1/2 -translate-y-1/2 !text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((lightboxIndex! - 1 + images.length) % images.length);
                }}
              >
                <ChevronLeft size={32} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-4 top-1/2 -translate-y-1/2 !text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((lightboxIndex! + 1) % images.length);
                }}
              >
                <ChevronRight size={32} />
              </Button>
            </>
          )}

          <div className="flex flex-col items-center gap-4" onClick={(e) => e.stopPropagation()}>
            <img
              src={imgSrc(lightboxImage.imageUrl)}
              alt={`${artist.name} tattoo`}
              className="max-h-[80vh] max-w-[90vw] rounded-lg object-contain"
            />
            <div className="flex items-center gap-4 text-white">
              {lightboxImage.price && (
                <span className="text-xl font-bold">{formatPrice(lightboxImage.price)}</span>
              )}
              <span className="text-sm opacity-60">
                {lightboxIndex! + 1} / {images.length}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Top nav */}
      <div className="border-b" style={{ borderColor: "var(--border)" }}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <Link href="/artists" className="flex items-center gap-2 text-sm font-medium hover:text-[var(--accent)] transition-colors">
            <ArrowLeft size={18} />
            Back to artists
          </Link>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              className="rounded-full"
              onClick={() => navigator.clipboard.writeText(window.location.href)}
            >
              <Share2 size={14} />
              Share
            </Button>
            <Button
              variant={saved ? "primary" : "outline"}
              size="sm"
              className="rounded-full"
              onClick={() => setSaved(!saved)}
            >
              <Heart size={14} fill={saved ? "currentColor" : "none"} />
              {saved ? "Saved" : "Save"}
            </Button>
          </div>
        </div>
      </div>

      {/* Artist Header */}
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex items-center gap-5">
          {artist.profileImageUrl ? (
            <img
              src={imgSrc(artist.profileImageUrl)}
              alt={artist.name}
              className="h-20 w-20 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-200 text-2xl font-bold" style={{ color: "#666" }}>
              {getInitials(artist.name)}
            </div>
          )}
          <div>
            <h1 className="text-2xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>
              {artist.name}
            </h1>
            <p className="mt-1 flex items-center gap-1.5 text-sm" style={{ color: "#666" }}>
              <MapPin size={14} />
              {artist.isStudio ? "Tattoo studio in " : "Tattoo artist in "}
              {artist.city}, {artist.country}
            </p>
          </div>
        </div>

        {/* Stats Row */}
        <div className="mt-6 grid grid-cols-2 gap-4 rounded-xl border p-4 sm:grid-cols-4" style={{ borderColor: "var(--border)" }}>
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-lg font-bold">{stat.value}</p>
              <p className="text-[10px] font-medium tracking-wider" style={{ color: "#999" }}>{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Style Pills */}
        <div className="mt-6 flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedStyle("")}
            className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-colors ${
              !selectedStyle ? "bg-[var(--text)] text-white border-[var(--text)]" : "hover:bg-gray-50"
            }`}
            style={!selectedStyle ? {} : { borderColor: "var(--border)" }}
          >
            All work
          </button>
          {artist.styles.map((style) => (
            <button
              key={style}
              onClick={() => setSelectedStyle(style === selectedStyle ? "" : style)}
              className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-colors ${
                selectedStyle === style ? "bg-[var(--text)] text-white border-[var(--text)]" : "hover:bg-gray-50"
              }`}
              style={selectedStyle === style ? {} : { borderColor: "var(--border)" }}
            >
              {style}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content: Grid + Sidebar */}
      <div className="mx-auto max-w-7xl px-4 pb-16">
        <div className="flex gap-8">
          {/* Photo Grid */}
          <div className="flex-1">
            {images.length > 0 ? (
              <div className="columns-2 gap-3 sm:columns-3">
                {images.map((img, i) => (
                  <div
                    key={img.id}
                    className="group mb-3 cursor-pointer break-inside-avoid overflow-hidden rounded-lg relative"
                    onClick={() => setLightboxIndex(i)}
                  >
                    <img
                      src={imgSrc(img.imageUrl)}
                      alt={`${artist.name} tattoo ${i + 1}`}
                      className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      style={{ aspectRatio: i % 3 === 0 ? "3/4" : i % 3 === 1 ? "1/1" : "4/5" }}
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-end bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 px-3 pb-3">
                      <button
                        onClick={(e) => { e.stopPropagation(); setBookingOpen(true); }}
                        className="mb-1 w-full rounded-full bg-[var(--accent)] px-4 py-2 text-xs font-bold uppercase tracking-wide text-white transition-transform hover:scale-105"
                      >
                        Book a Tattoo
                      </button>
                      {img.price && (
                        <span className="text-sm font-bold text-white">{formatPrice(img.price)}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center rounded-xl border border-dashed py-20" style={{ borderColor: "var(--border)" }}>
                <p className="text-sm" style={{ color: "#999" }}>No portfolio images yet</p>
              </div>
            )}
          </div>

          {/* Sticky Sidebar */}
          <div className="hidden w-80 shrink-0 lg:block">
            <div className="sticky top-8 space-y-6">
              {/* Pricing Card */}
              <div className="rounded-xl border p-5" style={{ borderColor: "var(--border)" }}>
                <p className="text-xs font-medium tracking-wider" style={{ color: "#999" }}>PRICING</p>
                <p className="mt-1 text-2xl font-bold">
                  {artist.priceMin && artist.priceMax
                    ? `${formatPrice(artist.priceMin)} – ${formatPrice(artist.priceMax)}`
                    : "Contact for pricing"}
                </p>
                <p className="mt-0.5 text-xs" style={{ color: "#999" }}>Estimated price range</p>

                <div className="mt-4 space-y-2.5">
                  <p className="text-xs font-medium tracking-wider" style={{ color: "#999" }}>AREA</p>
                  <p className="text-sm font-medium flex items-center gap-1.5">
                    <MapPin size={14} />
                    {artist.city}, {artist.country}
                  </p>
                </div>

                <div className="mt-4 space-y-2">
                  <p className="text-xs font-medium tracking-wider" style={{ color: "#999" }}>STYLES</p>
                  <div className="flex flex-wrap gap-1.5">
                    {artist.styles.map((style) => (
                      <span
                        key={style}
                        className="rounded-full border px-2.5 py-0.5 text-xs"
                        style={{ borderColor: "var(--border)" }}
                      >
                        {style}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <Button
                fullWidth
                className="rounded-full"
                onClick={() => setBookingOpen(true)}
              >
                Book &amp; Pay
              </Button>

              <Button
                variant={saved ? "primary" : "outline"}
                fullWidth
                className="rounded-full"
                onClick={() => setSaved(!saved)}
              >
                <Heart size={16} fill={saved ? "currentColor" : "none"} />
                {saved ? "Saved" : "Save artist"}
              </Button>
            </div>
          </div>
        </div>

        {/* About Section */}
        {artist.bio && (
          <div className="mt-12 max-w-2xl">
            <h2 className="text-lg font-bold" style={{ fontFamily: "var(--font-heading)" }}>About</h2>
            <p
              className={`mt-3 text-sm leading-relaxed ${!showFullBio ? "line-clamp-4" : ""}`}
              style={{ color: "#555" }}
            >
              {artist.bio}
            </p>
            {artist.bio.length > 250 && (
              <Button
                variant="ghost"
                size="sm"
                className="mt-2 !text-[var(--accent)]"
                onClick={() => setShowFullBio(!showFullBio)}
              >
                {showFullBio ? (
                  <>Show less <ChevronUp size={14} /></>
                ) : (
                  <>Show more <ChevronDown size={14} /></>
                )}
              </Button>
            )}
          </div>
        )}

        {/* Mobile sticky bottom bar */}
        <div className="fixed bottom-0 left-0 right-0 border-t p-4 lg:hidden" style={{ background: "var(--bg)", borderColor: "var(--border)" }}>
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <p className="text-xs font-medium" style={{ color: "#999" }}>Starting at</p>
              <p className="text-lg font-bold">
                {artist.priceMin ? formatPrice(artist.priceMin) : "Contact"}
              </p>
            </div>
            <Button className="rounded-full" onClick={() => setBookingOpen(true)}>
              Book &amp; Pay
            </Button>
          </div>
        </div>
      </div>

      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        artistName={artist.name}
        amount={artist.priceMin || 150}
      />

      <Footer />
    </div>
  );
}
