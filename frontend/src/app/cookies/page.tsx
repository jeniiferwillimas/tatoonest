"use client";

import Link from "next/link";

export default function CookiesPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <Link href="/" className="mb-8 inline-block text-sm text-[var(--accent)] hover:underline">&larr; Back to home</Link>
      <h1 className="mb-2 text-3xl font-bold">Cookie Policy</h1>
      <p className="mb-8 text-sm" style={{ color: "#999" }}>Last updated: October 15, 2026</p>

      <div className="space-y-6 text-sm leading-relaxed" style={{ color: "#444" }}>
        <section>
          <h2 className="mb-2 text-lg font-semibold" style={{ color: "var(--text)" }}>What Are Cookies</h2>
          <p>Cookies are small text files stored on your device when you visit a website. They help the site remember your preferences and improve your experience.</p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold" style={{ color: "var(--text)" }}>Cookies We Use</h2>
          <ul className="ml-4 list-disc space-y-2">
            <li><strong>Essential cookies:</strong> Required for authentication and session management. These cannot be disabled.</li>
            <li><strong>Preference cookies:</strong> Remember your settings such as selected style filters or dashboard layout.</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold" style={{ color: "var(--text)" }}>Third-Party Cookies</h2>
          <p>Payment providers (NOWPayments, Alchemy Pay, MoonPay, Transak) may set their own cookies during the checkout process. We do not control these cookies.</p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold" style={{ color: "var(--text)" }}>Managing Cookies</h2>
          <p>You can control cookies through your browser settings. Disabling essential cookies may prevent you from logging in or completing bookings.</p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold" style={{ color: "var(--text)" }}>Contact</h2>
          <p>Questions about our cookie practices? Contact us at <a href="mailto:hello@tattonest.com" className="text-[var(--accent)] hover:underline">hello@tattonest.com</a>.</p>
        </section>
      </div>
    </div>
  );
}
