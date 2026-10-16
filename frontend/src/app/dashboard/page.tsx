"use client";

import { useEffect } from "react";
import Link from "next/link";
import {
  CalendarDays,
  MessageSquare,
  Star,
  Image,
  TrendingUp,
  Users,
  Eye,
  Bookmark,
} from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { fetchBookings } from "@/store/slices/bookingSlice";

const QUICK_ACTIONS = [
  { label: "Portfolio", href: "/dashboard/portfolio", icon: Image, color: "#16a34a" },
  { label: "Bookings", href: "/dashboard/bookings", icon: CalendarDays, color: "#2563eb" },
  { label: "Messages", href: "/dashboard/messages", icon: MessageSquare, color: "#9333ea" },
  { label: "Reviews", href: "/dashboard/reviews", icon: Star, color: "#f59e0b" },
];

export default function DashboardPage() {
  const { user } = useAppSelector((state) => state.auth);
  const { list: bookings } = useAppSelector((state) => state.bookings);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchBookings());
  }, [dispatch]);

  const pendingBookings = bookings.filter((b) => b.status === "Pending").length;
  const confirmedBookings = bookings.filter((b) => b.status === "Confirmed").length;

  const stats = [
    { label: "Profile Views", value: "1,247", change: "+12%", icon: Eye, color: "#16a34a" },
    { label: "Total Bookings", value: String(bookings.length || 0), change: "+3", icon: CalendarDays, color: "#2563eb" },
    { label: "Messages", value: "24", change: "5 unread", icon: MessageSquare, color: "#9333ea" },
    { label: "Saved by Users", value: "89", change: "+7 this week", icon: Bookmark, color: "#f59e0b" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Welcome back, {user?.name || "User"}</h1>
        <p className="mt-1 text-sm" style={{ color: "#666" }}>
          Here&apos;s what&apos;s happening with your profile today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-xl border border-gray-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium" style={{ color: "#666" }}>{stat.label}</p>
              <stat.icon size={20} style={{ color: stat.color }} />
            </div>
            <p className="mt-2 text-2xl font-bold">{stat.value}</p>
            <p className="mt-1 text-xs" style={{ color: stat.color }}>{stat.change}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
        {/* Recent Activity */}
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold">Recent Activity</h2>
            <Link href="/dashboard/bookings" className="text-sm font-medium text-[var(--accent)] hover:underline">
              View all
            </Link>
          </div>

          {bookings.length === 0 ? (
            <div className="py-8 text-center">
              <CalendarDays size={32} className="mx-auto mb-3" style={{ color: "#ccc" }} />
              <p className="text-sm font-medium">No bookings yet</p>
              <p className="mt-1 text-xs" style={{ color: "#999" }}>
                Your booking requests will appear here.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {bookings.slice(0, 5).map((booking) => (
                <div key={booking.id} className="flex items-center gap-4 rounded-lg border border-gray-100 p-3">
                  <div className={`h-2 w-2 shrink-0 rounded-full ${
                    booking.status === "Confirmed" ? "bg-green-500" :
                    booking.status === "Pending" ? "bg-yellow-500" :
                    booking.status === "Cancelled" ? "bg-red-500" : "bg-gray-400"
                  }`} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{booking.artistName}</p>
                    <p className="truncate text-xs" style={{ color: "#999" }}>{booking.description}</p>
                  </div>
                  <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    booking.status === "Confirmed" ? "bg-green-50 text-green-700" :
                    booking.status === "Pending" ? "bg-yellow-50 text-yellow-700" :
                    booking.status === "Cancelled" ? "bg-red-50 text-red-700" :
                    "bg-gray-50 text-gray-700"
                  }`}>
                    {booking.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions + Summary */}
        <div className="space-y-6">
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="mb-4 text-lg font-bold">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              {QUICK_ACTIONS.map((action) => (
                <Link
                  key={action.label}
                  href={action.href}
                  className="flex flex-col items-center gap-2 rounded-lg border border-gray-100 p-4 transition-all hover:border-[var(--accent)] hover:shadow-sm"
                >
                  <action.icon size={24} style={{ color: action.color }} />
                  <span className="text-xs font-medium">{action.label}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="mb-3 text-lg font-bold">At a Glance</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm" style={{ color: "#666" }}>Pending requests</span>
                <span className="text-sm font-bold">{pendingBookings}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm" style={{ color: "#666" }}>Confirmed upcoming</span>
                <span className="text-sm font-bold">{confirmedBookings}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm" style={{ color: "#666" }}>Profile completion</span>
                <span className="text-sm font-bold text-[var(--accent)]">85%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
