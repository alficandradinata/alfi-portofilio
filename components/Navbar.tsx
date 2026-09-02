"use client";

import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolioData";

const NAV_LINKS = [
  { name: "Beranda", href: "#top", id: "top" },
  { name: "Proyek", href: "#work", id: "work" },
  { name: "Keahlian", href: "#skills", id: "skills" },
  { name: "Tentang", href: "#about", id: "about" },
  { name: "Perjalanan", href: "#journey", id: "journey" },
  { name: "Kontak", href: "#contact", id: "contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("top");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 16);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Tandai tautan navigasi sesuai bagian yang sedang dibaca
  useEffect(() => {
    const sections = NAV_LINKS.map((link) =>
      document.getElementById(link.id)
    ).filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-shadow duration-200 ${
        isScrolled
          ? "bg-surface/95 backdrop-blur-md border-b border-line shadow-sm"
          : "bg-surface border-b border-transparent"
      }`}
    >
      <div className="max-w-5xl mx-auto px-5 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Identitas */}
        <a
          href="#top"
          className="flex items-center gap-3 shrink-0 rounded-lg"
          aria-label={`${PERSONAL_INFO.name} — beranda`}
        >
          <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-brand text-white font-semibold text-sm tracking-tight">
            AC
          </span>
          <span className="hidden sm:flex flex-col leading-tight">
            <span className="text-sm font-semibold text-ink">
              {PERSONAL_INFO.name}
            </span>
            <span className="text-xs text-ink-muted">{PERSONAL_INFO.role}</span>
          </span>
        </a>

        {/* Navigasi desktop */}
        <nav aria-label="Navigasi utama" className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.name}
                href={link.href}
                aria-current={isActive ? "true" : undefined}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "text-brand bg-brand-soft"
                    : "text-ink-soft hover:text-ink hover:bg-surface-sunken"
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-brand hover:bg-brand-strong text-white text-sm font-semibold transition-colors"
          >
            Hubungi saya
            <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="md:hidden p-2 rounded-lg border border-line text-ink-soft hover:bg-surface-sunken transition-colors"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={mobileMenuOpen ? "Tutup menu" : "Buka menu"}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden border-t border-line bg-surface px-5 py-4 shadow-sm"
        >
          <nav aria-label="Navigasi mobile" className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === link.id
                    ? "text-brand bg-brand-soft"
                    : "text-ink-soft hover:bg-surface-sunken"
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="mt-4 pt-4 border-t border-line flex flex-col gap-3">
            <p className="flex items-center gap-2 text-sm text-ink-muted">
              <span
                className="w-2 h-2 rounded-full bg-positive shrink-0"
                aria-hidden="true"
              />
              {PERSONAL_INFO.status}
            </p>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-brand hover:bg-brand-strong text-white text-sm font-semibold transition-colors"
            >
              Hubungi saya
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
