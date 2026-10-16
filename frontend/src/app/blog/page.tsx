"use client";

import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/layouts/Footer";
import { ArrowRight, Clock } from "lucide-react";

const POSTS = [
  {
    slug: "how-much-to-tip-your-tattoo-artist",
    title: "How Much to Tip Your Tattoo Artist, Country by Country",
    excerpt:
      "In the US, 15 to 25 percent is the cultural baseline and tips form real income. In Germany and France, sourced guides put a generous tip at 10 to 20 percent. Here's a breakdown for every major market.",
    image: "/images/portfolio/fine-line-1.jpg",
    category: "Guides",
    readTime: "6 min read",
    date: "Oct 8, 2026",
    featured: true,
  },
  {
    slug: "first-tattoo-what-to-expect",
    title: "Your First Tattoo: What to Expect and How to Prepare",
    excerpt:
      "From choosing your artist to aftercare essentials — everything you need to know before sitting in the chair for the first time.",
    image: "/images/portfolio/minimalist-3.jpg",
    category: "Beginners",
    readTime: "8 min read",
    date: "Oct 3, 2026",
  },
  {
    slug: "tattoo-styles-explained",
    title: "12 Tattoo Styles Explained: Find Your Perfect Match",
    excerpt:
      "Traditional, realism, fine line, Japanese, geometric — we break down every major style so you can speak your artist's language.",
    image: "/images/portfolio/japanese-5.jpg",
    category: "Styles",
    readTime: "10 min read",
    date: "Sep 27, 2026",
  },
  {
    slug: "tattoo-aftercare-guide",
    title: "The Complete Tattoo Aftercare Guide for 2026",
    excerpt:
      "Proper aftercare is the difference between a tattoo that heals beautifully and one that fades. Follow this timeline from day one through week six.",
    image: "/images/portfolio/black-gray-7.jpg",
    category: "Aftercare",
    readTime: "7 min read",
    date: "Sep 20, 2026",
  },
  {
    slug: "tattoo-placement-guide",
    title: "Tattoo Placement Guide: Pain Levels, Aging & Visibility",
    excerpt:
      "Where you put your tattoo matters as much as the design itself. We cover pain tolerance zones, how ink ages on different body parts, and professional visibility tips.",
    image: "/images/portfolio/geometric-9.jpg",
    category: "Guides",
    readTime: "9 min read",
    date: "Sep 14, 2026",
  },
  {
    slug: "cover-up-tattoos-what-works",
    title: "Cover-Up Tattoos: What Works, What Doesn't, and What to Expect",
    excerpt:
      "Not every tattoo can be covered. Learn which designs work best for cover-ups, how to find a specialist, and realistic expectations for the result.",
    image: "/images/portfolio/illustrative-11.jpg",
    category: "Guides",
    readTime: "6 min read",
    date: "Sep 8, 2026",
  },
];

export default function BlogPage() {
  const featured = POSTS[0];
  const rest = POSTS.slice(1);

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

      <section className="mx-auto w-full max-w-5xl px-4 pt-12 pb-6">
        <h1
          className="text-3xl font-bold md:text-4xl"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          The Journal
        </h1>
        <p className="mt-2 text-sm" style={{ color: "#666" }}>
          Guides, inspiration, and everything tattoo.
        </p>
      </section>

      {/* Featured post */}
      <section className="mx-auto w-full max-w-5xl px-4 pb-12">
        <div className="grid gap-6 md:grid-cols-2 rounded-2xl border overflow-hidden" style={{ borderColor: "var(--border)" }}>
          <div className="relative aspect-[4/3] md:aspect-auto">
            <Image src={featured.image} alt={featured.title} fill sizes="600px" className="object-cover" />
            <span className="absolute left-4 top-4 rounded bg-[var(--accent)] px-2.5 py-1 text-[10px] font-bold uppercase text-white">
              {featured.category}
            </span>
          </div>
          <div className="flex flex-col justify-center p-6 md:p-8">
            <div className="mb-3 flex items-center gap-3 text-xs" style={{ color: "#999" }}>
              <span>{featured.date}</span>
              <span className="flex items-center gap-1"><Clock size={12} /> {featured.readTime}</span>
            </div>
            <h2 className="text-2xl font-bold leading-snug" style={{ fontFamily: "'Playfair Display', serif" }}>
              {featured.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed" style={{ color: "#666" }}>
              {featured.excerpt}
            </p>
            <div className="mt-5">
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--accent)] cursor-pointer hover:underline">
                Read article <ArrowRight size={14} />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="mx-auto w-full max-w-5xl px-4 pb-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((post) => (
            <article
              key={post.slug}
              className="group flex flex-col rounded-2xl border overflow-hidden transition-shadow hover:shadow-md"
              style={{ borderColor: "var(--border)" }}
            >
              <div className="relative aspect-[16/10]">
                <Image src={post.image} alt={post.title} fill sizes="350px" className="object-cover transition-transform duration-300 group-hover:scale-105" />
                <span className="absolute left-3 top-3 rounded bg-white px-2 py-0.5 text-[10px] font-semibold">
                  {post.category}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="mb-2 flex items-center gap-3 text-[11px]" style={{ color: "#999" }}>
                  <span>{post.date}</span>
                  <span className="flex items-center gap-1"><Clock size={10} /> {post.readTime}</span>
                </div>
                <h3 className="text-base font-bold leading-snug">{post.title}</h3>
                <p className="mt-2 flex-1 text-xs leading-relaxed" style={{ color: "#666" }}>
                  {post.excerpt}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[var(--accent)] cursor-pointer group-hover:underline">
                  Read more <ArrowRight size={12} />
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
