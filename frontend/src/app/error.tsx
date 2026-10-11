"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4" style={{ background: "var(--background)" }}>
      <div className="animate-fade-in-up text-center">
        <div className="relative mx-auto mb-8 h-48 w-48">
          <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
            <circle cx="100" cy="100" r="90" stroke="var(--border)" strokeWidth="2" strokeDasharray="8 6" />
            <circle cx="100" cy="100" r="70" fill="var(--section-bg)" />
            <circle cx="75" cy="85" r="5" fill="#999" />
            <circle cx="125" cy="85" r="5" fill="#999" />
            <path d="M75 125 C85 115, 115 115, 125 125" stroke="#999" strokeWidth="3" strokeLinecap="round" fill="none" />
            <line x1="65" y1="75" x2="85" y2="75" stroke="#999" strokeWidth="2" strokeLinecap="round" />
            <line x1="115" y1="75" x2="135" y2="75" stroke="#999" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>

        <h1 className="text-3xl font-bold sm:text-4xl" style={{ fontFamily: "'Playfair Display', serif" }}>
          Something went wrong
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed" style={{ color: "#666" }}>
          An unexpected error occurred. Don&apos;t worry, your progress is safe.
          Try again or head back to the homepage.
        </p>

        {error.digest && (
          <p className="mt-3 text-xs font-mono" style={{ color: "#999" }}>
            Error ID: {error.digest}
          </p>
        )}

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button onClick={reset}>
            Try again
          </Button>
          <a href="/">
            <Button variant="outline">
              Back to home
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
