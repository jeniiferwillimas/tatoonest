"use client";

import { useEffect, useState } from "react";
import { Search, CheckCircle, ExternalLink } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchArtists } from "@/store/slices/artistSlice";

const STATUS_FILTERS = ["All", "Active", "Pending", "Suspended"];

export default function ArtistsManagementPage() {
  const dispatch = useAppDispatch();
  const { list: artists, loading } = useAppSelector((s) => s.artists);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    dispatch(fetchArtists({}));
  }, [dispatch]);

  const filtered = artists.filter((a) => {
    if (search && !a.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Artists Management</h1>
        <p className="mt-1 text-sm" style={{ color: "#666" }}>Review and manage artist profiles.</p>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-2">
          {STATUS_FILTERS.map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-all ${
                filter === s ? "border-[var(--accent)] bg-[var(--accent)] text-white" : "border-gray-200 hover:border-[var(--accent)]"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2">
          <Search size={16} style={{ color: "#999" }} />
          <input
            type="text"
            placeholder="Search artists..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent text-sm outline-none"
          />
        </div>
      </div>

      {/* Artists Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-[var(--accent)] border-t-transparent" />
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: "#999" }}>Artist</th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: "#999" }}>Location</th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: "#999" }}>Styles</th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: "#999" }}>Rating</th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: "#999" }}>Status</th>
                <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider" style={{ color: "#999" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((artist) => (
                <tr key={artist.slug} className="border-b border-gray-100 transition-colors hover:bg-gray-50">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--accent)] text-xs font-bold text-white">
                        {artist.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{artist.name}</p>
                        <p className="text-xs" style={{ color: "#999" }}>{artist.followers || "—"} followers</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm">{artist.location}</td>
                  <td className="px-5 py-4">
                    <div className="flex flex-wrap gap-1">
                      {artist.styles.slice(0, 2).map((s) => (
                        <span key={s} className="rounded-full border border-gray-200 px-2 py-0.5 text-[10px]">{s}</span>
                      ))}
                      {artist.styles.length > 2 && (
                        <span className="text-[10px]" style={{ color: "#999" }}>+{artist.styles.length - 2}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm font-medium">{artist.rating.toFixed(1)}</td>
                  <td className="px-5 py-4">
                    <span className="flex items-center gap-1 text-xs font-medium text-green-600">
                      <CheckCircle size={14} /> Active
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <a href={`/artists/${artist.slug}`} className="text-xs font-medium text-[var(--accent)] hover:underline">
                      View <ExternalLink size={11} className="mb-0.5 inline" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
