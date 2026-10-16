"use client";

import { useEffect } from "react";
import Link from "next/link";
import { MapPin, Users, Star } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchArtists } from "@/store/slices/artistSlice";

export default function BrowseStudiosPage() {
  const dispatch = useAppDispatch();
  const { list: artists, loading } = useAppSelector((s) => s.artists);

  useEffect(() => {
    dispatch(fetchArtists({}));
  }, [dispatch]);

  const studios = artists.filter((a) => a.isStudio);
  const soloArtists = artists.filter((a) => !a.isStudio);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Browse Studios</h1>
        <p className="mt-1 text-sm" style={{ color: "#666" }}>Explore tattoo studios and independent artists.</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[var(--accent)] border-t-transparent" />
        </div>
      ) : (
        <>
          {/* Studios */}
          <div>
            <h2 className="mb-4 text-lg font-bold">Studios ({studios.length})</h2>
            {studios.length === 0 ? (
              <div className="rounded-xl border border-gray-200 bg-white py-12 text-center">
                <Users size={32} className="mx-auto mb-2" style={{ color: "#ccc" }} />
                <p className="text-sm font-medium">No studios listed yet</p>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {studios.map((studio) => (
                  <Link
                    key={studio.slug}
                    href={`/artists/${studio.slug}`}
                    className="group rounded-xl border border-gray-200 bg-white p-5 transition-all hover:border-[var(--accent)] hover:shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--accent)] text-sm font-bold text-white">
                        {studio.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold group-hover:text-[var(--accent)]">{studio.name}</p>
                        <p className="flex items-center gap-1 text-xs" style={{ color: "#999" }}>
                          <MapPin size={11} /> {studio.location}
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-3 text-xs" style={{ color: "#666" }}>
                      <span className="flex items-center gap-1"><Star size={12} className="fill-yellow-400 text-yellow-400" /> {studio.rating.toFixed(1)}</span>
                      {studio.followers && <span>{studio.followers} followers</span>}
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {studio.styles.slice(0, 3).map((s) => (
                        <span key={s} className="rounded-full border border-gray-200 px-2 py-0.5 text-[10px]">{s}</span>
                      ))}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Independent Artists */}
          <div>
            <h2 className="mb-4 text-lg font-bold">Independent Artists ({soloArtists.length})</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {soloArtists.map((artist) => (
                <Link
                  key={artist.slug}
                  href={`/artists/${artist.slug}`}
                  className="group rounded-xl border border-gray-200 bg-white p-5 transition-all hover:border-[var(--accent)] hover:shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-xs font-bold">
                      {artist.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold group-hover:text-[var(--accent)]">{artist.name}</p>
                      <p className="flex items-center gap-1 text-xs" style={{ color: "#999" }}>
                        <MapPin size={11} /> {artist.location}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {artist.styles.slice(0, 3).map((s) => (
                      <span key={s} className="rounded-full border border-gray-200 px-2 py-0.5 text-[10px]">{s}</span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
