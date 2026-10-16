"use client";

import Link from "next/link";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useTranslation } from "@/i18n/context";

export default function Footer() {
  const { t } = useTranslation();

  const EXPLORE = [
    { label: t("footer.findArtist"), href: "/artists" },
    { label: t("footer.browseStyle"), href: "/artists?view=style" },
    { label: t("footer.browseCity"), href: "/artists?view=location" },
    { label: t("footer.browseStudios"), href: "/artists?view=studios" },
  ];

  const FOR_ARTISTS = [
    { label: t("nav.joinAsArtist"), href: "/join" },
    { label: t("footer.artistDashboard"), href: "/dashboard" },
    { label: t("nav.artistResources"), href: "/join" },
  ];

  const COMPANY = [
    { label: t("nav.blog"), href: "/blog" },
    { label: t("nav.designTools"), href: "/design-tools" },
    { label: t("nav.pricing"), href: "/pricing" },
  ];

  const LEGAL = [
    { label: t("footer.terms"), href: "/terms" },
    { label: t("footer.privacy"), href: "/privacy" },
    { label: t("footer.cookies"), href: "/cookies" },
  ];

  return (
    <footer className="border-t border-[var(--border)] bg-white">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="mb-10 grid gap-10 sm:grid-cols-2 md:grid-cols-5">
          <div className="md:col-span-1">
            <Link href="/" className="mb-4 inline-block text-xl font-bold tracking-tight">
              TattooNest
            </Link>
            <p className="text-sm leading-relaxed" style={{ color: "#666" }}>
              {t("footer.desc")}
            </p>
            <div className="mt-4 flex items-center gap-3">
              {["tiktok", "facebook", "pinterest", "twitter"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] transition-colors hover:border-gray-400"
                >
                  <span className="text-xs font-medium uppercase">{s[0]}</span>
                </a>
              ))}
            </div>
            <div className="mt-4">
              <LanguageSwitcher />
            </div>
          </div>

          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-[#e8453c]">{t("footer.explore")}</p>
            <ul className="flex flex-col gap-2.5">
              {EXPLORE.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm transition-colors hover:text-[var(--accent)]">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-[#e8453c]">{t("nav.forArtists")}</p>
            <ul className="flex flex-col gap-2.5">
              {FOR_ARTISTS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm transition-colors hover:text-[var(--accent)]">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-[#e8453c]">Company</p>
            <ul className="flex flex-col gap-2.5">
              {COMPANY.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm transition-colors hover:text-[var(--accent)]">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-[#e8453c]">Legal</p>
            <ul className="flex flex-col gap-2.5">
              {LEGAL.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm transition-colors hover:text-[var(--accent)]">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-[var(--border)] pt-6">
          <p className="text-xs" style={{ color: "#999" }}>
            {t("footer.copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}
