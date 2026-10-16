"use client";

import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <Link href="/" className="mb-8 inline-block text-sm text-[var(--accent)] hover:underline">&larr; Back to home</Link>
      <h1 className="mb-2 text-3xl font-bold">Privacy Policy</h1>
      <p className="mb-8 text-sm" style={{ color: "#999" }}>Last updated: October 15, 2026</p>

      <div className="space-y-6 text-sm leading-relaxed" style={{ color: "#444" }}>
        <section>
          <h2 className="mb-2 text-lg font-semibold" style={{ color: "var(--text)" }}>1. Information We Collect</h2>
          <p>We collect information you provide directly: name, email address, and profile information. We also collect usage data such as pages visited, browser type, and IP address.</p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold" style={{ color: "var(--text)" }}>2. How We Use Your Information</h2>
          <p>We use your information to: provide and improve the Platform, process bookings and payments, send transactional emails (booking confirmations, payment receipts), and communicate important updates.</p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold" style={{ color: "var(--text)" }}>3. Information Sharing</h2>
          <p>We share your information with: tattoo artists you book with (name, email, booking details), payment processors to complete transactions, and service providers that help us operate the Platform (email delivery, hosting).</p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold" style={{ color: "var(--text)" }}>4. Data Security</h2>
          <p>We implement industry-standard security measures including encrypted connections (HTTPS), secure password hashing, and access controls. However, no system is 100% secure.</p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold" style={{ color: "var(--text)" }}>5. Your Rights</h2>
          <p>You may access, update, or delete your account information at any time through your dashboard settings. To request complete data deletion, contact us at <a href="mailto:hello@tattonest.com" className="text-[var(--accent)] hover:underline">hello@tattonest.com</a>.</p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold" style={{ color: "var(--text)" }}>6. Cookies</h2>
          <p>We use essential cookies for authentication and session management. See our <Link href="/cookies" className="text-[var(--accent)] hover:underline">Cookie Policy</Link> for details.</p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold" style={{ color: "var(--text)" }}>7. Changes</h2>
          <p>We may update this policy periodically. We will notify you of significant changes via email or a notice on the Platform.</p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold" style={{ color: "var(--text)" }}>8. Contact</h2>
          <p>For privacy-related questions, contact us at <a href="mailto:hello@tattonest.com" className="text-[var(--accent)] hover:underline">hello@tattonest.com</a>.</p>
        </section>
      </div>
    </div>
  );
}
