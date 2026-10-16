"use client";

import { TrendingUp, Users, Palette, CalendarDays, DollarSign, ArrowUpRight, ArrowDownRight } from "lucide-react";

const STATS = [
  { label: "Total Users", value: "12,847", change: "+8.2%", up: true, icon: Users, color: "#2563eb" },
  { label: "Active Artists", value: "1,043", change: "+12.5%", up: true, icon: Palette, color: "#16a34a" },
  { label: "Bookings This Month", value: "486", change: "+23.1%", up: true, icon: CalendarDays, color: "#9333ea" },
  { label: "Monthly Revenue", value: "$24,680", change: "-2.3%", up: false, icon: DollarSign, color: "#f59e0b" },
];

const MONTHLY_DATA = [
  { month: "May", users: 420, bookings: 89 },
  { month: "Jun", users: 510, bookings: 102 },
  { month: "Jul", users: 680, bookings: 145 },
  { month: "Aug", users: 730, bookings: 178 },
  { month: "Sep", users: 890, bookings: 210 },
  { month: "Oct", users: 1043, bookings: 486 },
];

const TOP_STYLES = [
  { name: "Realism", bookings: 142, pct: 29 },
  { name: "Fine Line", bookings: 98, pct: 20 },
  { name: "Traditional", bookings: 87, pct: 18 },
  { name: "Japanese", bookings: 64, pct: 13 },
  { name: "Illustrative", bookings: 52, pct: 11 },
  { name: "Other", bookings: 43, pct: 9 },
];

const TOP_CITIES = [
  { city: "New York", artists: 164, bookings: 98 },
  { city: "Los Angeles", artists: 197, bookings: 76 },
  { city: "London", artists: 303, bookings: 89 },
  { city: "Berlin", artists: 181, bookings: 54 },
  { city: "Barcelona", artists: 179, bookings: 48 },
];

export default function AnalyticsPage() {
  const maxBookings = Math.max(...MONTHLY_DATA.map((d) => d.bookings));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Analytics</h1>
        <p className="mt-1 text-sm" style={{ color: "#666" }}>Platform performance and growth metrics.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat) => (
          <div key={stat.label} className="rounded-xl border border-gray-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium" style={{ color: "#666" }}>{stat.label}</p>
              <stat.icon size={20} style={{ color: stat.color }} />
            </div>
            <p className="mt-2 text-2xl font-bold">{stat.value}</p>
            <div className="mt-1 flex items-center gap-1">
              {stat.up ? <ArrowUpRight size={14} className="text-green-500" /> : <ArrowDownRight size={14} className="text-red-500" />}
              <span className={`text-xs font-medium ${stat.up ? "text-green-500" : "text-red-500"}`}>{stat.change}</span>
              <span className="text-xs" style={{ color: "#999" }}>vs last month</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Bookings Chart */}
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold">Bookings Trend</h2>
            <TrendingUp size={18} style={{ color: "#16a34a" }} />
          </div>
          <div className="flex items-end gap-3" style={{ height: 180 }}>
            {MONTHLY_DATA.map((d) => (
              <div key={d.month} className="flex flex-1 flex-col items-center gap-1">
                <span className="text-xs font-medium">{d.bookings}</span>
                <div
                  className="w-full rounded-t-md bg-[var(--accent)]"
                  style={{ height: `${(d.bookings / maxBookings) * 140}px` }}
                />
                <span className="text-[10px]" style={{ color: "#999" }}>{d.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Styles */}
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-lg font-bold">Popular Styles</h2>
          <div className="space-y-3">
            {TOP_STYLES.map((s) => (
              <div key={s.name} className="flex items-center gap-3">
                <span className="w-24 text-sm font-medium">{s.name}</span>
                <div className="h-3 flex-1 rounded-full bg-gray-100">
                  <div className="h-full rounded-full bg-[var(--accent)]" style={{ width: `${s.pct}%` }} />
                </div>
                <span className="w-12 text-right text-xs" style={{ color: "#999" }}>{s.bookings}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Cities Table */}
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <h2 className="mb-4 text-lg font-bold">Top Cities</h2>
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: "#999" }}>City</th>
              <th className="pb-3 text-right text-xs font-semibold uppercase tracking-wider" style={{ color: "#999" }}>Artists</th>
              <th className="pb-3 text-right text-xs font-semibold uppercase tracking-wider" style={{ color: "#999" }}>Bookings</th>
              <th className="pb-3 text-right text-xs font-semibold uppercase tracking-wider" style={{ color: "#999" }}>Conversion</th>
            </tr>
          </thead>
          <tbody>
            {TOP_CITIES.map((c) => (
              <tr key={c.city} className="border-b border-gray-100">
                <td className="py-3 text-sm font-medium">{c.city}</td>
                <td className="py-3 text-right text-sm">{c.artists}</td>
                <td className="py-3 text-right text-sm">{c.bookings}</td>
                <td className="py-3 text-right text-sm font-medium text-[var(--accent)]">
                  {Math.round((c.bookings / c.artists) * 100)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
