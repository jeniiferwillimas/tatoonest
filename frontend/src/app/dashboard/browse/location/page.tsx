"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin, Search, ArrowRight } from "lucide-react";

const CITIES = [
  { name: "London", country: "United Kingdom", artists: 303 },
  { name: "Sao Paulo", country: "Brazil", artists: 246 },
  { name: "Los Angeles", country: "United States", artists: 197 },
  { name: "Berlin", country: "Germany", artists: 181 },
  { name: "Barcelona", country: "Spain", artists: 179 },
  { name: "New York", country: "United States", artists: 164 },
  { name: "Moscow", country: "Russia", artists: 130 },
  { name: "San Diego", country: "United States", artists: 128 },
  { name: "Melbourne", country: "Australia", artists: 128 },
  { name: "Madrid", country: "Spain", artists: 126 },
  { name: "Paris", country: "France", artists: 118 },
  { name: "Tokyo", country: "Japan", artists: 105 },
  { name: "Seoul", country: "South Korea", artists: 98 },
  { name: "Miami", country: "United States", artists: 94 },
  { name: "Amsterdam", country: "Netherlands", artists: 87 },
  { name: "Rome", country: "Italy", artists: 82 },
  { name: "Toronto", country: "Canada", artists: 76 },
  { name: "Chicago", country: "United States", artists: 71 },
];

export default function ByLocationPage() {
  const [search, setSearch] = useState("");

  const filtered = CITIES.filter((c) =>
    !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.country.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Find by Location</h1>
        <p className="mt-1 text-sm" style={{ color: "#666" }}>Browse tattoo artists in your city.</p>
      </div>

      <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5">
        <Search size={18} style={{ color: "#999" }} />
        <input
          type="text"
          placeholder="Search a city or country..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-transparent text-sm outline-none"
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((city) => (
          <Link
            key={city.name}
            href={`/artists?search=${encodeURIComponent(city.name)}`}
            className="group flex items-center justify-between rounded-xl border border-gray-200 bg-white p-5 transition-all hover:border-[var(--accent)] hover:shadow-sm"
          >
            <div className="flex items-center gap-3">
              <MapPin size={20} style={{ color: "#e8453c" }} />
              <div>
                <p className="text-sm font-semibold group-hover:text-[var(--accent)]">{city.name}</p>
                <p className="text-xs" style={{ color: "#999" }}>{city.country}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">{city.artists}</span>
              <ArrowRight size={14} className="text-gray-300 transition-colors group-hover:text-[var(--accent)]" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
