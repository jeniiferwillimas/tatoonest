import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4" style={{ background: "var(--background)" }}>
      <div className="animate-fade-in-up text-center">
        <div className="relative mx-auto mb-8 h-48 w-48">
          <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
            <circle cx="100" cy="100" r="90" stroke="var(--border)" strokeWidth="2" strokeDasharray="8 6" />
            <circle cx="100" cy="100" r="70" fill="var(--section-bg)" />
            <text x="100" y="90" textAnchor="middle" fontSize="48" fontWeight="800" fill="var(--accent)" fontFamily="Inter, sans-serif">404</text>
            <text x="100" y="115" textAnchor="middle" fontSize="11" fontWeight="500" fill="#999" fontFamily="Inter, sans-serif">PAGE NOT FOUND</text>
            <path d="M60 140 C60 140, 80 155, 100 150 C120 145, 140 155, 140 155" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.5" />
          </svg>
        </div>

        <h1 className="text-3xl font-bold sm:text-4xl" style={{ fontFamily: "'Playfair Display', serif" }}>
          Lost in the ink
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed" style={{ color: "#666" }}>
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--accent)] px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[var(--accent-hover)]"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            Back to home
          </Link>
          <Link
            href="/artists"
            className="inline-flex items-center justify-center gap-2 rounded-lg border px-6 py-2.5 text-sm font-medium transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
            style={{ borderColor: "var(--border)" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            Browse artists
          </Link>
        </div>
      </div>
    </div>
  );
}
