"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Footer from "@/components/layouts/Footer";
import { CheckCircle, Clock, XCircle } from "lucide-react";
import { Button } from "@/components/ui";
import api from "@/utils/axiosInstance";
import urlHelper from "@/utils/urlHelper";

export default function BookingConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[var(--accent)]" />
        </div>
      }
    >
      <ConfirmationContent />
    </Suspense>
  );
}

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId");
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!bookingId) {
      setLoading(false);
      return;
    }
    const checkStatus = async () => {
      try {
        const res = await api.get(urlHelper.payments.bookingStatus(Number(bookingId)));
        setStatus(res.data.paymentStatus);
      } catch {
        setStatus("Unknown");
      } finally {
        setLoading(false);
      }
    };
    checkStatus();
    const interval = setInterval(checkStatus, 5000);
    return () => clearInterval(interval);
  }, [bookingId]);

  const icon =
    status === "Paid" ? (
      <CheckCircle size={64} className="text-[var(--accent)]" />
    ) : status === "Failed" ? (
      <XCircle size={64} className="text-red-500" />
    ) : (
      <Clock size={64} style={{ color: "#f59e0b" }} />
    );

  const title =
    status === "Paid"
      ? "Payment Confirmed!"
      : status === "Failed"
        ? "Payment Failed"
        : "Processing Payment...";

  const description =
    status === "Paid"
      ? "Your tattoo session has been booked and paid for. The artist will confirm your appointment shortly."
      : status === "Failed"
        ? "Something went wrong with your payment. Please try again or contact support."
        : "We're confirming your payment. This usually takes a few moments.";

  return (
    <div className="flex min-h-screen flex-col" style={{ background: "var(--bg)" }}>
      <div className="flex flex-1 items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <div className="rounded-2xl border border-[var(--border)] bg-white p-10 shadow-sm">
            {loading ? (
              <div className="flex flex-col items-center gap-4">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-[var(--accent)]" />
                <p className="text-sm" style={{ color: "#666" }}>
                  Checking payment status...
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-5">
                {icon}
                <h1
                  className="text-2xl font-bold"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {title}
                </h1>
                <p className="text-sm leading-relaxed" style={{ color: "#666" }}>
                  {description}
                </p>
                <div className="mt-4 flex flex-col gap-3 w-full">
                  {status === "Paid" && (
                    <Link href="/dashboard/bookings">
                      <Button fullWidth>View My Bookings</Button>
                    </Link>
                  )}
                  {status === "Failed" && (
                    <Link href="/artists">
                      <Button fullWidth>Browse Artists</Button>
                    </Link>
                  )}
                  <Link href="/artists">
                    <Button variant="outline" fullWidth>
                      Back to Artists
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
