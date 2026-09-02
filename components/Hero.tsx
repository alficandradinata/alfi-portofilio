import type { CSSProperties } from "react";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { GithubIcon, SOCIAL_BRANDS } from "@/components/Icons";
import { PERSONAL_INFO } from "@/data/portfolioData";
import Terminal from "./Terminal";

const FOCUS_AREAS = [
  "Arsitektur web full-stack",
  "Aplikasi mobile React Native",
  "Analitik data dengan Python",
];

export default function Hero() {
  return (
    <section id="top" className="scroll-mt-24 pt-28 pb-16 sm:pt-32 sm:pb-20">
      <div className="max-w-5xl mx-auto px-5 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Kolom kiri: perkenalan */}
          <div className="lg:col-span-7">
            <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-positive-line bg-positive-soft text-sm font-medium text-positive">
              <span
                className="w-2 h-2 rounded-full bg-positive shrink-0"
                aria-hidden="true"
              />
              {PERSONAL_INFO.status}
            </p>

            <h1 className="mt-6 text-4xl sm:text-5xl font-bold text-ink leading-tight">
              {PERSONAL_INFO.name}
            </h1>

            <p className="mt-3 text-xl sm:text-2xl text-brand font-medium">
              {PERSONAL_INFO.role}
            </p>

            <p className="mt-5 text-base sm:text-lg text-ink-soft leading-relaxed max-w-xl">
              {PERSONAL_INFO.bio}
            </p>

            {/* Bidang fokus */}
            <ul className="mt-6 flex flex-wrap gap-2">
              {FOCUS_AREAS.map((area) => (
                <li
                  key={area}
                  className="px-3 py-1.5 rounded-lg border border-line bg-surface-subtle text-sm text-ink-soft"
                >
                  {area}
                </li>
              ))}
            </ul>

            {/* Tombol aksi */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#work"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-brand hover:bg-brand-strong text-white text-base font-semibold transition-colors"
              >
                Lihat proyek
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-line-strong bg-surface hover:bg-surface-sunken text-ink text-base font-semibold transition-colors"
              >
                <Mail className="w-4 h-4 text-ink-muted" aria-hidden="true" />
                Diskusikan proyek
              </a>
            </div>

            {/* Tautan profil dan lokasi */}
            <div className="mt-8 pt-6 border-t border-line flex flex-wrap items-center gap-x-5 gap-y-3">
              {/* Hanya GitHub di sini — kode adalah bukti kerja, dan tautan
                  sosial selengkapnya tersedia di footer. */}
              <a
                href={PERSONAL_INFO.socials.github}
                target="_blank"
                rel="noreferrer"
                style={
                  {
                    "--social": SOCIAL_BRANDS.github.color,
                    "--social-soft": SOCIAL_BRANDS.github.soft,
                  } as CSSProperties
                }
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-line text-sm font-medium text-[var(--social)] hover:border-[var(--social)] hover:bg-[var(--social-soft)] transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
                GitHub
              </a>

              <p className="flex items-center gap-1.5 text-sm text-ink-muted">
                <MapPin className="w-4 h-4 shrink-0" aria-hidden="true" />
                {PERSONAL_INFO.location}
              </p>
            </div>
          </div>

          {/* Kolom kanan: terminal interaktif */}
          <div className="lg:col-span-5 w-full">
            <Terminal />
          </div>
        </div>

        {/* Ringkasan angka */}
        <dl className="mt-16 pt-10 border-t border-line grid grid-cols-2 sm:grid-cols-4 gap-6">
          {PERSONAL_INFO.stats.map((stat) => (
            <div key={stat.label}>
              <dt className="text-sm text-ink-muted">{stat.label}</dt>
              <dd className="mt-1 text-3xl font-bold text-ink">
                {stat.value}
                {stat.suffix}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
