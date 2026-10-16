"use client";

import { X } from "lucide-react";
import PaymentOptions from "@/components/PaymentOptions";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  artistName: string;
  amount: number;
}

export default function BookingModal({
  isOpen,
  onClose,
  artistName,
  amount,
}: BookingModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="relative w-full max-h-[90vh] overflow-y-auto rounded-2xl border border-gray-200 bg-white shadow-xl" style={{ maxWidth: "640px" }}>
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full p-1 transition-colors hover:bg-gray-100"
        >
          <X size={20} className="text-gray-400" />
        </button>

        <div className="px-6 pt-6">
          <h2
            className="text-xl font-bold"
            style={{ fontFamily: "'Playfair Display', serif", color: "var(--text)" }}
          >
            Book &amp; Pay
          </h2>
          <p className="mb-2 text-sm" style={{ color: "#666" }}>
            Booking with {artistName}
          </p>
        </div>

        <PaymentOptions
          amount={amount}
          productName={`Tattoo Session — ${artistName}`}
        />
      </div>
    </div>
  );
}
