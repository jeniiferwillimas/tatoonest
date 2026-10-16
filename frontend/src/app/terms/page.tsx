"use client";

import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <Link href="/" className="mb-8 inline-block text-sm text-[var(--accent)] hover:underline">&larr; Back to home</Link>
      <h1 className="mb-2 text-3xl font-bold">Terms of Service</h1>
      <p className="mb-8 text-sm" style={{ color: "#999" }}>Last updated: October 15, 2026</p>

      <div className="space-y-6 text-sm leading-relaxed" style={{ color: "#444" }}>
        <section>
          <h2 className="mb-2 text-lg font-semibold" style={{ color: "var(--text)" }}>1. Acceptance of Terms</h2>
          <p>By accessing or using TattooNest (&quot;the Platform&quot;), you agree to be bound by these Terms of Service. If you do not agree, do not use the Platform.</p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold" style={{ color: "var(--text)" }}>2. Description of Service</h2>
          <p>TattooNest is a marketplace that connects tattoo artists with clients. We facilitate discovery, booking, and payment between artists and clients but are not a party to the tattoo service itself.</p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold" style={{ color: "var(--text)" }}>3. User Accounts</h2>
          <p>You must provide accurate information when creating an account. You are responsible for maintaining the confidentiality of your login credentials and for all activity under your account.</p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold" style={{ color: "var(--text)" }}>4. Artist Listings</h2>
          <p>Artists are responsible for the accuracy of their profiles, portfolio images, pricing, and availability. TattooNest does not verify or endorse any artist&apos;s qualifications, licenses, or work quality.</p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold" style={{ color: "var(--text)" }}>5. Payments</h2>
          <p>Payments are processed through third-party providers (NOWPayments, Alchemy Pay, MoonPay, Transak). TattooNest does not store payment card information. All transactions are final unless otherwise agreed by the artist.</p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold" style={{ color: "var(--text)" }}>6. Cancellations &amp; Refunds</h2>
          <p>Cancellation and refund policies are set by individual artists. TattooNest may mediate disputes but is not obligated to issue refunds on behalf of artists.</p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold" style={{ color: "var(--text)" }}>7. Prohibited Conduct</h2>
          <p>You may not use the Platform to: post false or misleading information, harass other users, infringe on intellectual property, or engage in any unlawful activity.</p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold" style={{ color: "var(--text)" }}>8. Limitation of Liability</h2>
          <p>TattooNest is provided &quot;as is&quot; without warranties. We are not liable for any damages arising from your use of the Platform, including but not limited to the quality of tattoo services received.</p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold" style={{ color: "var(--text)" }}>9. Changes to Terms</h2>
          <p>We may update these terms at any time. Continued use of the Platform after changes constitutes acceptance of the updated terms.</p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold" style={{ color: "var(--text)" }}>10. Contact</h2>
          <p>For questions about these Terms, contact us at <a href="mailto:hello@tattonest.com" className="text-[var(--accent)] hover:underline">hello@tattonest.com</a>.</p>
        </section>
      </div>
    </div>
  );
}
