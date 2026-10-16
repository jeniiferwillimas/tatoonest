"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchSubscriptionStatus } from "@/store/slices/paymentSlice";

export default function SubscriptionConfirmationPage() {
  const dispatch = useAppDispatch();
  const { subscription } = useAppSelector((s) => s.payments);
  const [polling, setPolling] = useState(true);

  useEffect(() => {
    dispatch(fetchSubscriptionStatus());
    const interval = setInterval(() => {
      dispatch(fetchSubscriptionStatus());
    }, 5000);

    const timeout = setTimeout(() => {
      clearInterval(interval);
      setPolling(false);
    }, 60000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [dispatch]);

  useEffect(() => {
    if (subscription?.status === "Active") setPolling(false);
  }, [subscription]);

  const isActive = subscription?.status === "Active";

  return (
    <div className="flex min-h-screen items-center justify-center px-4" style={{ background: "var(--bg)" }}>
      <div className="w-full max-w-md text-center">
        <div className="rounded-2xl border border-[var(--border)] bg-white p-10 shadow-sm">
          <div className="flex flex-col items-center gap-5">
            {isActive ? (
              <CheckCircle size={64} className="text-[var(--accent)]" />
            ) : (
              <Clock size={64} style={{ color: "#f59e0b" }} className={polling ? "animate-pulse" : ""} />
            )}
            <h1
              className="text-2xl font-bold"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {isActive ? "Subscription Active!" : "Processing Subscription..."}
            </h1>
            <p className="text-sm leading-relaxed" style={{ color: "#666" }}>
              {isActive
                ? `Your ${subscription.plan} plan is now active. You're listed in the marketplace and ready to receive bookings.`
                : "We're confirming your subscription. This usually takes a few moments."}
            </p>
            {subscription?.plan && (
              <div className="rounded-lg border border-[var(--border)] bg-[var(--section-bg)] px-6 py-3">
                <p className="text-xs font-medium tracking-wider" style={{ color: "#999" }}>
                  PLAN
                </p>
                <p className="text-lg font-bold">{subscription.plan}</p>
              </div>
            )}
            <div className="mt-4 flex flex-col gap-3 w-full">
              <Link href="/dashboard">
                <Button fullWidth>Go to Dashboard</Button>
              </Link>
              <Link href="/dashboard/portfolio">
                <Button variant="outline" fullWidth>
                  Manage Portfolio
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
