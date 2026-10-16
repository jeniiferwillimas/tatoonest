"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Footer from "@/components/layouts/Footer";
import { Check, Zap, Crown, Star, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchPlans } from "@/store/slices/paymentSlice";
import PaymentOptions from "@/components/PaymentOptions";

const PLAN_ICONS: Record<string, React.ReactNode> = {
  Basic: <Star size={28} />,
  Pro: <Zap size={28} />,
  Premium: <Crown size={28} />,
};

const PLAN_COLORS: Record<string, string> = {
  Basic: "#16a34a",
  Pro: "#2563eb",
  Premium: "#9333ea",
};

export default function PricingPage() {
  const dispatch = useAppDispatch();
  const { plans, loading, error } = useAppSelector((s) => s.payments);
  const { user } = useAppSelector((s) => s.auth);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchPlans());
  }, [dispatch]);

  const handleSubscribe = (planName: string) => {
    if (!user) {
      window.location.href = "/?login=true";
      return;
    }
    setSelectedPlan(planName);
  };

  const activePlan = plans.find((p) => p.name === selectedPlan);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--bg)", color: "var(--text)" }}>
      {/* Header */}
      <div className="border-b" style={{ borderColor: "var(--border)" }}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <Link href="/" className="text-xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
            TattooNest
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/artists">
              <Button variant="outline" size="sm">Browse Artists</Button>
            </Link>
            {!user && (
              <Link href="/join">
                <Button size="sm">Join as Artist</Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {selectedPlan && activePlan ? (
        <>
          {/* Payment view */}
          <div className="mx-auto w-full max-w-2xl px-4 pt-8 pb-4">
            <button
              onClick={() => setSelectedPlan(null)}
              className="mb-4 flex items-center gap-1.5 text-sm font-medium hover:text-[var(--accent)]"
              style={{ color: "#666" }}
            >
              <ArrowLeft size={16} /> Back to plans
            </button>
            <h1
              className="text-2xl font-bold md:text-3xl"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Subscribe to {activePlan.name}
            </h1>
            <p className="mt-2 text-sm" style={{ color: "#666" }}>
              ${activePlan.price}/month &middot; Cancel anytime
            </p>
          </div>
          <PaymentOptions
            amount={activePlan.price}
            productName={`TattooNest ${activePlan.name} Plan — Monthly`}
          />
          <div className="pb-16" />
        </>
      ) : (
        <>
          {/* Hero */}
          <section className="mx-auto max-w-4xl px-4 pt-16 pb-12 text-center">
            <h1
              className="text-4xl font-bold md:text-5xl"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Grow your tattoo business
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg" style={{ color: "#666" }}>
              Get listed in our marketplace, reach thousands of clients, and manage
              your bookings — all in one place.
            </p>
          </section>

          {/* Plans */}
          <section className="mx-auto max-w-5xl px-4 pb-20">
            {error && (
              <p className="mb-6 text-center text-sm text-red-500">{error}</p>
            )}
            <div className="grid gap-6 md:grid-cols-3">
              {plans.map((plan) => {
                const color = PLAN_COLORS[plan.name] || "#16a34a";
                const isPro = plan.name === "Pro";
                return (
                  <div
                    key={plan.name}
                    className="relative flex flex-col rounded-2xl border bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
                    style={{
                      borderColor: isPro ? color : "var(--border)",
                      borderWidth: isPro ? 2 : 1,
                    }}
                  >
                    {isPro && (
                      <div
                        className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-xs font-bold text-white"
                        style={{ background: color }}
                      >
                        MOST POPULAR
                      </div>
                    )}
                    <div className="flex items-center gap-3 mb-4" style={{ color }}>
                      {PLAN_ICONS[plan.name]}
                      <h2 className="text-xl font-bold" style={{ color: "var(--text)" }}>
                        {plan.name}
                      </h2>
                    </div>
                    <div className="mb-6">
                      <span className="text-4xl font-bold">${plan.price}</span>
                      <span className="text-sm" style={{ color: "#999" }}>
                        /month
                      </span>
                    </div>
                    <ul className="mb-8 flex-1 space-y-3">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2.5 text-sm">
                          <Check
                            size={16}
                            className="mt-0.5 shrink-0"
                            style={{ color }}
                          />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button
                      fullWidth
                      variant={isPro ? "primary" : "outline"}
                      disabled={loading}
                      onClick={() => handleSubscribe(plan.name)}
                      style={isPro ? { background: color, borderColor: color } : {}}
                    >
                      Get {plan.name}
                    </Button>
                  </div>
                );
              })}
            </div>

            {/* FAQ */}
            <div className="mt-16 mx-auto max-w-2xl space-y-6 text-center">
              <h3 className="text-lg font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
                Frequently Asked Questions
              </h3>
              <div className="space-y-4 text-sm" style={{ color: "#666" }}>
                <div>
                  <p className="font-medium" style={{ color: "var(--text)" }}>
                    Can I cancel anytime?
                  </p>
                  <p>
                    Yes, you can cancel your subscription at any time. Your listing
                    stays active until the end of your billing period.
                  </p>
                </div>
                <div>
                  <p className="font-medium" style={{ color: "var(--text)" }}>
                    How do client payments work?
                  </p>
                  <p>
                    Clients can pay via crypto or card/wallet when booking through the
                    platform. Funds are transferred to your account after the session
                    is completed.
                  </p>
                </div>
                <div>
                  <p className="font-medium" style={{ color: "var(--text)" }}>
                    Is there a free trial?
                  </p>
                  <p>
                    We offer a 14-day free trial on the Basic plan so you can try
                    the platform risk-free.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      <Footer />
    </div>
  );
}
