"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchLandingData } from "@/store/slices/landingSlice";

export default function ByStylePage() {
  const dispatch = useAppDispatch();
  const { styles, loading } = useAppSelector((s) => s.landing);

  useEffect(() => {
    dispatch(fetchLandingData());
  }, [dispatch]);

  if (loading && styles.length === 0) {
    return (
      <div className="flex justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[var(--accent)] border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Find by Style</h1>
        <p className="mt-1 text-sm" style={{ color: "#666" }}>Discover artists specializing in your preferred tattoo style.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {styles.map((style) => (
          <Link
            key={style.slug}
            href={`/artists?tags=${encodeURIComponent(style.slug)}`}
            className="group relative overflow-hidden rounded-xl border border-gray-200 transition-shadow hover:shadow-md"
          >
            <div className="relative aspect-[16/9]">
              <Image
                src={style.imageUrl}
                alt={style.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-lg font-bold text-white">{style.name}</h3>
                <p className="text-xs text-white/70">{style.artists} artists</p>
              </div>
            </div>
            {style.description && (
              <div className="bg-white p-4">
                <p className="text-xs leading-relaxed" style={{ color: "#666" }}>{style.description}</p>
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
