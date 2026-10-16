"use client";

import { useEffect, useState } from "react";
import { CalendarDays, Clock, MapPin, Filter } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchBookings } from "@/store/slices/bookingSlice";

const STATUS_FILTERS = ["All", "Pending", "Confirmed", "Completed", "Cancelled"];

export default function BookingsPage() {
  const dispatch = useAppDispatch();
  const { list: bookings, loading } = useAppSelector((s) => s.bookings);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    dispatch(fetchBookings());
  }, [dispatch]);

  const filtered = filter === "All" ? bookings : bookings.filter((b) => b.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">My Bookings</h1>
          <p className="mt-1 text-sm" style={{ color: "#666" }}>View and manage your booking requests.</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto">
        {STATUS_FILTERS.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium transition-all ${
              filter === s
                ? "border-[var(--accent)] bg-[var(--accent)] text-white"
                : "border-gray-200 hover:border-[var(--accent)]"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Bookings List */}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[var(--accent)] border-t-transparent" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-white py-16 text-center">
          <CalendarDays size={40} className="mx-auto mb-3" style={{ color: "#ccc" }} />
          <p className="text-lg font-semibold">No bookings found</p>
          <p className="mt-1 text-sm" style={{ color: "#999" }}>
            {filter === "All" ? "You haven't made any booking requests yet." : `No ${filter.toLowerCase()} bookings.`}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((booking) => (
            <div key={booking.id} className="rounded-xl border border-gray-200 bg-white p-5 transition-shadow hover:shadow-sm">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-base font-semibold">{booking.artistName}</h3>
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      booking.status === "Confirmed" ? "bg-green-50 text-green-700" :
                      booking.status === "Pending" ? "bg-yellow-50 text-yellow-700" :
                      booking.status === "Completed" ? "bg-blue-50 text-blue-700" :
                      booking.status === "Cancelled" ? "bg-red-50 text-red-700" :
                      "bg-gray-50 text-gray-700"
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                  <p className="mt-1 text-sm" style={{ color: "#666" }}>{booking.description}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-4 text-xs" style={{ color: "#999" }}>
                    <span className="flex items-center gap-1"><CalendarDays size={12} /> {new Date(booking.preferredDate).toLocaleDateString()}</span>
                    <span className="flex items-center gap-1"><MapPin size={12} /> {booking.artistCity}</span>
                    <span className="flex items-center gap-1"><Clock size={12} /> {booking.style} · {booking.size}</span>
                  </div>
                </div>
                {booking.estimatedPrice && (
                  <div className="text-right">
                    <p className="text-lg font-bold text-[var(--accent)]">${booking.estimatedPrice}</p>
                    <p className="text-xs" style={{ color: "#999" }}>estimated</p>
                  </div>
                )}
              </div>
              {booking.notes && (
                <div className="mt-3 rounded-lg bg-gray-50 p-3">
                  <p className="text-xs" style={{ color: "#666" }}>{booking.notes}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
