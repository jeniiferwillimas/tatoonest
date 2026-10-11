"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  ChevronDown,
  Globe,
  Star,
  Quote,
  Check,
  ArrowRight,
  Send,
} from "lucide-react";
import { Button, Input, Text } from "@/components/ui";
import AuthModal from "@/components/AuthModal";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchLandingData } from "@/store/slices/landingSlice";

/* ─── Types ─── */

interface NavItem {
  label: string;
  href?: string;
  children?: { label: string; href: string }[];
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
    label: "Design Tools",
    children: [
      { label: "AI Tattoo Generator", href: "/design-tools/ai-generator" },
      { label: "Custom Design", href: "/design-tools/custom" },
    ],
  },
  {
    label: "For Artists",
    children: [
      { label: "Free Artist Profile", href: "/for-artists/profile" },
      { label: "Artist Resources", href: "/for-artists/resources" },
    ],
  },
  { label: "Blog", href: "/blog" },
];

const FOOTER_EXPLORE = [
  "Browse Designs",
  "AI Tattoo Generator",
  "Get a Custom Design",
  "Find an Artist",
  "Estimate Your Cost",
  "Read the Blog",
];

const FOOTER_RESOURCES = ["Tattoo Wiki", "FAQ", "Contact Us", "About Us", "Careers", "Creators", "Collaborate"];

/* ─── Page ─── */

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [email, setEmail] = useState("");
  const [authModal, setAuthModal] = useState<"login" | "register" | null>(null);

  const dispatch = useAppDispatch();
  const { stats, testimonials, popularCities, styles: allStyles, loading } = useAppSelector((s) => s.landing);

  useEffect(() => {
    dispatch(fetchLandingData());
  }, [dispatch]);

  const featuredStyle = allStyles.find((s) => s.isFeatured);
  const popularStyles = allStyles.filter((s) => s.isFeatured || ["traditional", "realism", "japanese", "fine-line"].includes(s.slug)).slice(0, 4);
  const gridStyles = allStyles.filter((s) => !s.isFeatured);

  if (loading) {
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
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-medium tracking-widest">TATTOOS</span>
            <span className="text-2xl font-bold tracking-tight">WIZARD</span>
          </div>

          <nav className="hidden items-center gap-8 md:flex">
            {NAV_ITEMS.map((item) => (
              <div key={item.label} className="group relative">
                {item.children ? (
                  <>
                    <button className="flex items-center text-sm font-medium transition-colors hover:text-[var(--accent)] group-hover:text-[var(--accent)]">
                      {item.label}
                      <ChevronDown size={14} className="ml-1" />
                    </button>
                    <div className="pointer-events-none absolute left-0 top-full pt-2 opacity-0 transition-all group-hover:pointer-events-auto group-hover:opacity-100">
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

      {/* ─── Hero ─── */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="h-0.5 w-8 bg-[var(--accent)]" />
              <Text variant="overline">Discover Ink Artists</Text>
            </div>

            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Find Your{" "}
              <span className="italic" style={{ fontFamily: "'Playfair Display', serif" }}>
                Perfect
              </span>
              <br />
              Tattoo Artist
            </h1>

            <Text variant="body" className="max-w-md">
              Browse thousands of artists in your city. Compare styles, prices, and reviews.
            </Text>

            <div className="flex max-w-xl items-center gap-3">
              <div className="flex flex-1 items-center gap-3 rounded-lg border border-[var(--border)] bg-white px-4 py-3">
                <Search size={20} />
                <input
                  type="text"
                  placeholder="Where do you want to get tattooed?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent text-sm outline-none"
                />
              </div>
              <Link href={`/artists?tags=${encodeURIComponent(searchQuery || "traditional")}`}>
                <Button size="lg">Find Artists</Button>
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Text variant="body-sm">Popular:</Text>
              {popularStyles.map((style) => (
                <Link key={style.slug} href={`/artists?tags=${encodeURIComponent(style.slug)}`}>
                  <Button variant="outline" size="sm" className="rounded-full">
                    {style.name}
                  </Button>
                </Link>
              ))}
            </div>
          </div>

          {/* Hero Images */}
          <div className="relative hidden lg:block">
            <div className="grid grid-cols-[2fr_1fr] gap-4">
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
                <Image
                  src="/images/hero/main.jpg"
                  alt="Featured tattoo artwork"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
              </div>
              <div className="flex flex-col gap-4">
                <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white">
                  <div className="relative aspect-[4/3]">
                    <Image
                      src="/images/hero/artist-card.jpg"
                      alt="Tattoo by Tattooist saegeem"
                      fill
                      sizes="25vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex items-center gap-2 p-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--accent)]/20 text-xs font-bold text-[var(--accent)]">
                      S
                    </div>
                    <div>
                      <p className="text-xs font-medium">Tattooist _ saegeem</p>
                      <p className="flex items-center gap-1 text-xs">
                        <Star size={12} fill="#facc15" stroke="#facc15" /> 4.9
                      </p>
                    </div>
                  </div>
                </div>
                <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white">
                  <div className="relative aspect-[4/3]">
                    <Image
                      src="/images/hero/style-card.jpg"
                      alt="Illustrative tattoo style"
                      fill
                      sizes="25vw"
                      className="object-cover"
                    />
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

      {/* ─── Stats ─── */}
      <section className="border-y border-[var(--border)] bg-white">
        <div className="mx-auto grid max-w-4xl grid-cols-3 gap-8 px-6 py-16">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-3 text-center">
              <p className="text-3xl font-bold sm:text-4xl lg:text-5xl">
                {stat.value}<span className="text-[var(--accent)]">+</span>
              </p>
              <div className="h-0.5 w-8 bg-[var(--accent)]" />
              <Text variant="overline">{stat.label}</Text>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Testimonials ─── */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-12 text-center">
          <Text variant="overline" className="mb-3 block">Real Stories</Text>
          <Text variant="h2">What Clients Are Saying</Text>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.initials}
              className="flex flex-col gap-4 rounded-2xl border border-[var(--border)] bg-white p-6 transition-shadow hover:shadow-lg"
            >
              <Quote size={28} className="text-[var(--accent)] opacity-30" />
              <Text variant="body-sm" className="flex-1">&ldquo;{t.quote}&rdquo;</Text>
              <div className="flex items-center gap-3 border-t border-[var(--border)] pt-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent)] text-sm font-bold text-white">
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-medium">{t.name}</p>
                  <p className="text-xs">{t.city}</p>
                </div>
                {t.verified && (
                  <span className="ml-auto flex items-center gap-1 text-xs text-[var(--accent)]">
                    <Check size={14} /> Verified
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CTA Banner ─── */}
      <section className="bg-[var(--accent)]">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 px-6 py-14 text-center text-white sm:flex-row sm:justify-between sm:text-left">
          <div className="flex flex-col items-center gap-1 sm:items-start">
            <Check size={20} />
            <p className="text-lg font-semibold">Verified Artists</p>
          </div>
          <div className="flex flex-col items-center gap-1 sm:items-start">
            <Check size={20} />
            <p className="text-lg font-semibold">Book in Minutes</p>
          </div>
          <div className="flex flex-col items-center gap-1 sm:items-start">
            <Check size={20} />
            <p className="text-lg font-semibold">50,000+ Satisfied Clients</p>
          </div>
          <Button variant="secondary" size="lg" className="bg-white text-[var(--accent)] hover:bg-gray-100">
            Find Your Artist
          </Button>
        </div>
      </section>

      {/* ─── Everything You Need ─── */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-12 text-center">
          <Text variant="overline" className="mb-3 block">Your Journey</Text>
          <Text variant="h2" className="mb-4">Everything You Need for Your Next Tattoo</Text>
          <Text variant="body" className="mx-auto max-w-2xl">
            Whether it&apos;s your first tattoo or your hundredth, we&apos;re here to make the process effortless.
          </Text>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="flex flex-col gap-4 rounded-2xl border border-[var(--border)] bg-white p-8 md:col-span-1 md:row-span-2">
            <Text variant="h3">Find Your Perfect Artist</Text>
            <Text variant="body-sm">
              Connect with verified artists who specialize in your style. Read reviews, compare portfolios, and book with confidence.
            </Text>
            <ul className="mt-2 flex flex-col gap-2">
              <li className="flex items-center gap-2 text-sm"><Check size={16} className="text-[var(--accent)]" /> 10,000+ verified artists</li>
              <li className="flex items-center gap-2 text-sm"><Check size={16} className="text-[var(--accent)]" /> Real client reviews</li>
            </ul>
            <Button className="mt-4" fullWidth>Browse Artists</Button>
          </div>

          <div className="flex flex-col gap-4 rounded-2xl border border-[var(--border)] bg-white p-6 transition-shadow hover:shadow-lg">
            <Text variant="h4">Get a Custom Design</Text>
            <Text variant="body-sm">
              Professional artists create your unique design in 48 hours. From $150.
            </Text>
            <button className="mt-auto flex items-center gap-2 text-sm font-medium text-[var(--accent)] transition-colors hover:text-[var(--accent-hover)]">
              Start Your Design <ArrowRight size={16} />
            </button>
          </div>

          <div className="flex flex-col gap-4 rounded-2xl border border-[var(--border)] bg-white p-6 transition-shadow hover:shadow-lg">
            <Text variant="h4">Know Your Budget</Text>
            <Text variant="body-sm">
              Get realistic price estimates based on size, style, and complexity.
            </Text>
            <button className="mt-auto flex items-center gap-2 text-sm font-medium text-[var(--accent)] transition-colors hover:text-[var(--accent-hover)]">
              Calculate Cost <ArrowRight size={16} />
            </button>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-[var(--border)] bg-[var(--section-bg)] p-6 text-center">
          <p className="text-sm">Are you a tattoo artist?</p>
          <button className="mt-1 flex items-center justify-center gap-2 text-sm font-semibold text-[var(--accent)] transition-colors hover:text-[var(--accent-hover)] w-full">
            Grow your business with us <ArrowRight size={14} />
          </button>
        </div>
      </section>

      {/* ─── Styles Grid ─── */}
      <section className="border-t border-[var(--border)] bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <Text variant="overline" className="mb-4 block">50+ Tattoo Styles</Text>
          <Text variant="h2" className="mb-4">Find Your Style</Text>
          <Text variant="body" className="mb-12 max-w-xl">
            From bold traditional to delicate fine line. Discover the aesthetic that speaks to you.
          </Text>

          {/* Featured style */}
          {featuredStyle && (
            <div className="mb-8 grid gap-6 overflow-hidden rounded-2xl border border-[var(--border)] bg-white md:grid-cols-2">
              <div className="relative aspect-[16/9] md:aspect-auto">
                <Image
                  src="/images/hero/featured-style.jpg"
                  alt={`${featuredStyle.name} tattoo style`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-center gap-4 p-8">
                <Text variant="h3">{featuredStyle.name}</Text>
                <Text variant="body-sm">{featuredStyle.description}</Text>
                <span className="w-fit rounded-full border border-[var(--accent)] px-3 py-1 text-xs font-medium text-[var(--accent)]">
                  {featuredStyle.artists}+ artists
                </span>
                <Link
                  href={`/artists?tags=${encodeURIComponent(featuredStyle.slug)}`}
                  className="flex items-center gap-2 text-sm font-medium text-[var(--accent)] transition-colors hover:text-[var(--accent-hover)] w-fit"
                >
                  Explore {featuredStyle.name} <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          )}

          {/* Style grid */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {gridStyles.map((style) => (
              <Link
                key={style.slug}
                href={`/artists?tags=${encodeURIComponent(style.slug)}`}
                className="group overflow-hidden rounded-xl border border-[var(--border)] bg-white transition-shadow hover:shadow-lg"
              >
                <div className="relative aspect-square">
                  <Image
                    src={style.imageUrl}
                    alt={`${style.name} tattoo style`}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="p-3">
                  <p className="text-sm font-medium">{style.name}</p>
                  <p className="text-xs">{style.artists}+ artists</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-6">
            <Button variant="primary" size="lg">Browse All Styles</Button>
            <button className="flex items-center gap-2 text-sm font-medium text-[var(--accent)] transition-colors hover:text-[var(--accent-hover)]">
              Not sure? Take our Style Quiz <ArrowRight size={14} />
            </button>
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
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="mb-12 grid gap-12 md:grid-cols-5">
            <div className="md:col-span-1">
              <div className="mb-4 flex flex-col leading-tight">
                <span className="text-sm font-medium tracking-widest">TATTOOS</span>
                <span className="text-2xl font-bold tracking-tight">WIZARD</span>
              </div>
              <Text variant="body-sm">
                Discover talented tattoo artists and get inspired for your next piece of body art.
              </Text>
            </div>

            <div>
              <p className="mb-4 text-sm font-semibold">Explore</p>
              <ul className="flex flex-col gap-2">
                {FOOTER_EXPLORE.map((item) => (
                  <li key={item}>
                    <a className="text-sm transition-colors hover:text-[var(--accent)]">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="mb-4 text-sm font-semibold">Popular Cities</p>
              <ul className="flex flex-col gap-2">
                {popularCities.map((city) => (
                  <li key={city}>
                    <a className="text-sm transition-colors hover:text-[var(--accent)]">{city}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="mb-4 text-sm font-semibold">Tattoo Styles</p>
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

            <div>
              <p className="mb-4 text-sm font-semibold">Resources</p>
              <ul className="flex flex-col gap-2">
                {FOOTER_RESOURCES.map((item) => (
                  <li key={item}>
                    <a className="text-sm transition-colors hover:text-[var(--accent)]">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4 border-t border-[var(--border)] pt-8 sm:flex-row sm:justify-between">
            <p className="text-sm">&copy; 2026 Tattoos Wizard. All rights reserved.</p>
            <div className="flex gap-4 text-sm">
              <a className="transition-colors hover:text-[var(--accent)]">Terms of Service</a>
              <span>&middot;</span>
              <a className="transition-colors hover:text-[var(--accent)]">Privacy Policy</a>
              <span>&middot;</span>
              <a className="transition-colors hover:text-[var(--accent)]">Cookie Settings</a>
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
