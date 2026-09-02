"use client";

import { useState, useEffect } from "react";
import { Globe, Smartphone, Database, MapPin, Clock } from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolioData";

const DISCIPLINES = [
  {
    icon: Globe,
    title: "Arsitektur web",
    detail: "Next.js, React, Tailwind CSS, Server Components",
  },
  {
    icon: Smartphone,
    title: "Rekayasa mobile",
    detail: "React Native, Expo, integrasi perangkat keras",
  },
  {
    icon: Database,
    title: "Backend & data",
    detail: "Python, FastAPI, Streamlit, sistem basis data",
  },
];

const PRINCIPLES = [
  {
    title: "Kecepatan dan keandalan",
    detail:
      "Menulis kode yang efisien, teruji, dan mudah dipelihara dalam jangka panjang.",
  },
  {
    title: "Perhatian pada detail antarmuka",
    detail:
      "Memastikan setiap interaksi, umpan balik visual, dan responsivitas layar berjalan baik.",
  },
  {
    title: "Peningkatan berkelanjutan",
    detail:
      "Terus mempelajari teknologi baru untuk memberikan solusi yang tepat pada setiap tantangan.",
  },
  {
    title: "Komunikasi yang transparan",
    detail:
      "Memberikan pembaruan progres secara proaktif dan berkolaborasi secara konstruktif.",
  },
];

export default function AboutSection() {
  const [timeString, setTimeString] = useState<string | null>(null);

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("id-ID", {
      timeZone: "Asia/Jakarta",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });

    const updateTime = () => setTimeString(formatter.format(new Date()));

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="about" className="scroll-mt-24 py-20 border-t border-line">
      <div className="max-w-5xl mx-auto px-5 sm:px-6">
        {/* Judul bagian */}
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-brand">Tentang</p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-ink">
            Latar belakang dan cara kerja
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Narasi utama */}
          <div className="lg:col-span-2 p-6 sm:p-7 rounded-xl border border-line bg-surface">
            <p className="text-lg sm:text-xl font-semibold text-ink leading-snug">
              Membangun perangkat lunak yang jelas kegunaannya, bukan sekadar
              tampak menarik.
            </p>

            <p className="mt-4 text-base text-ink-soft leading-relaxed">
              Saya seorang software engineer yang berbasis di Pekanbaru, dengan
              minat pada titik temu antara desain antarmuka yang rapi dan
              rekayasa perangkat lunak yang kokoh.
            </p>

            <p className="mt-3 text-base text-ink-soft leading-relaxed">
              Keseharian saya diisi dengan merancang arsitektur web modern,
              membangun aplikasi mobile lintas platform, mengolah data
              menggunakan Python, serta menyelesaikan penelitian tugas akhir di
              bidang teknologi informasi.
            </p>

            <ul className="mt-6 pt-5 border-t border-line grid grid-cols-1 sm:grid-cols-3 gap-4">
              {DISCIPLINES.map(({ icon: Icon, title, detail }) => (
                <li key={title}>
                  <p className="flex items-center gap-2 text-sm font-semibold text-ink">
                    <Icon
                      className="w-4 h-4 text-brand shrink-0"
                      aria-hidden="true"
                    />
                    {title}
                  </p>
                  <p className="mt-1 text-sm text-ink-muted leading-relaxed">
                    {detail}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Kartu lokasi dan waktu */}
          <aside className="p-6 rounded-xl border border-line bg-surface-subtle">
            <p className="flex items-center gap-2 text-sm font-semibold text-ink-muted">
              <Clock className="w-4 h-4 shrink-0" aria-hidden="true" />
              Waktu setempat
            </p>

            <p
              className="mt-3 text-3xl font-bold text-ink font-mono tabular-nums"
              aria-live="off"
            >
              {timeString ?? "--:--:--"}
            </p>
            <p className="mt-1 text-sm text-ink-muted">
              {PERSONAL_INFO.timezone}
            </p>

            <div className="mt-6 pt-5 border-t border-line">
              <p className="flex items-center gap-2 text-sm font-semibold text-ink">
                <MapPin
                  className="w-4 h-4 text-brand shrink-0"
                  aria-hidden="true"
                />
                {PERSONAL_INFO.location}
              </p>
              <p className="mt-1.5 text-sm text-ink-soft leading-relaxed">
                Terbuka untuk kolaborasi jarak jauh di dalam maupun luar negeri.
              </p>
            </div>

            <p className="mt-6 pt-5 border-t border-line flex items-center gap-2 text-sm text-positive font-medium">
              <span
                className="w-2 h-2 rounded-full bg-positive shrink-0"
                aria-hidden="true"
              />
              {PERSONAL_INFO.status}
            </p>
          </aside>
        </div>

        {/* Prinsip kerja */}
        <div className="mt-6 p-6 sm:p-7 rounded-xl border border-line bg-surface">
          <h3 className="text-sm font-semibold text-ink-muted uppercase tracking-wide">
            Prinsip kerja
          </h3>

          <dl className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
            {PRINCIPLES.map(({ title, detail }) => (
              <div key={title}>
                <dt className="text-base font-semibold text-ink">{title}</dt>
                <dd className="mt-1 text-sm text-ink-soft leading-relaxed">
                  {detail}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
