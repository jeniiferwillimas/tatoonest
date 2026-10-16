"use client";

import { useEffect, useState } from "react";
import { CalendarDays, Clock, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchBookings } from "@/store/slices/bookingSlice";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default function AppointmentsPage() {
  const dispatch = useAppDispatch();
  const { list: bookings, loading } = useAppSelector((s) => s.bookings);
  const [currentMonth, setCurrentMonth] = useState<Date | null>(null);

  useEffect(() => {
    if (!currentMonth) setCurrentMonth(new Date());
  }, [currentMonth]);

  useEffect(() => {
    dispatch(fetchBookings());
  }, [dispatch]);

  const confirmed = bookings.filter((b) => b.status === "Confirmed");

  if (!currentMonth) {
    return (
      <div className="flex justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[var(--accent)] border-t-transparent" />
      </div>
    );
  }

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => setCurrentMonth(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentMonth(new Date(year, month + 1, 1));

  const getBookingsForDay = (day: number) => {
    return confirmed.filter((b) => {
      const d = new Date(b.preferredDate);
      return d.getFullYear() === year && d.getMonth() === month && d.getDate() === day;
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Appointments</h1>
        <p className="mt-1 text-sm" style={{ color: "#666" }}>Your confirmed upcoming tattoo sessions.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_350px]">
        {/* Calendar */}
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold">{MONTHS[month]} {year}</h2>
            <div className="flex gap-1">
              <button onClick={prevMonth} className="rounded-lg p-1.5 transition-colors hover:bg-gray-100">
                <ChevronLeft size={18} />
              </button>
              <button onClick={nextMonth} className="rounded-lg p-1.5 transition-colors hover:bg-gray-100">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1">
            {DAYS.map((d) => (
              <div key={d} className="py-2 text-center text-xs font-medium" style={{ color: "#999" }}>{d}</div>
            ))}
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const dayBookings = getBookingsForDay(day);
              const isToday = new Date().getDate() === day && new Date().getMonth() === month && new Date().getFullYear() === year;
              return (
                <div
                  key={day}
                  className={`relative rounded-lg p-2 text-center text-sm ${
                    isToday ? "bg-[var(--accent)]/10 font-bold text-[var(--accent)]" : ""
                  } ${dayBookings.length > 0 ? "font-medium" : ""}`}
                >
                  {day}
                  {dayBookings.length > 0 && (
                    <div className="mx-auto mt-0.5 h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming List */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold">Upcoming</h2>
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-[var(--accent)] border-t-transparent" />
            </div>
          ) : confirmed.length === 0 ? (
            <div className="rounded-xl border border-gray-200 bg-white py-12 text-center">
              <CalendarDays size={32} className="mx-auto mb-2" style={{ color: "#ccc" }} />
              <p className="text-sm font-medium">No upcoming appointments</p>
              <p className="mt-1 text-xs" style={{ color: "#999" }}>Confirmed bookings appear here.</p>
            </div>
          ) : (
            confirmed.slice(0, 8).map((booking) => (
              <div key={booking.id} className="rounded-xl border border-gray-200 bg-white p-4">
                <p className="text-sm font-semibold">{booking.artistName}</p>
                <p className="mt-1 text-xs" style={{ color: "#666" }}>{booking.description}</p>
                <div className="mt-2 flex flex-wrap gap-3 text-xs" style={{ color: "#999" }}>
                  <span className="flex items-center gap-1"><CalendarDays size={12} /> {new Date(booking.preferredDate).toLocaleDateString()}</span>
                  <span className="flex items-center gap-1"><Clock size={12} /> {booking.size}</span>
                  <span className="flex items-center gap-1"><MapPin size={12} /> {booking.artistCity}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
