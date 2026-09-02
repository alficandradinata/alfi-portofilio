"use client";

import { useState } from "react";
import { Mail, Send, Copy, Check, ArrowUpRight } from "lucide-react";
import {
  GithubIcon,
  LinkedinIcon,
  InstagramIcon,
  WhatsappIcon,
} from "@/components/Icons";
import { PERSONAL_INFO } from "@/data/portfolioData";

const CATEGORIES = [
  "Aplikasi web (Next.js / React)",
  "Aplikasi mobile (React Native)",
  "Data & dasbor Python",
  "Tawaran pekerjaan / kolaborasi",
  "Lainnya",
];

const CHANNELS = [
  {
    label: "WhatsApp",
    href: PERSONAL_INFO.socials.whatsapp,
    Icon: WhatsappIcon,
  },
  {
    label: "LinkedIn",
    href: PERSONAL_INFO.socials.linkedin,
    Icon: LinkedinIcon,
  },
  { label: "GitHub", href: PERSONAL_INFO.socials.github, Icon: GithubIcon },
  {
    label: "Instagram",
    href: PERSONAL_INFO.socials.instagram,
    Icon: InstagramIcon,
  },
];

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: CATEGORIES[0],
    message: "",
  });

  const [copied, setCopied] = useState(false);
  const [handedOff, setHandedOff] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PERSONAL_INFO.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Clipboard tidak tersedia — alamat email tetap terlihat untuk disalin manual.
    }
  };

  /**
   * Situs ini tidak memiliki backend, jadi pesan disusun sebagai email
   * lalu diserahkan ke aplikasi email pengunjung. Tidak ada data yang
   * dikirim ke server mana pun.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const subject = `[Portofolio] ${formData.category} — ${formData.name}`;
    const body = [
      `Nama    : ${formData.name}`,
      `Email   : ${formData.email}`,
      `Kategori: ${formData.category}`,
      "",
      formData.message,
    ].join("\n");

    window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    setHandedOff(true);
  };

  return (
    <section id="contact" className="scroll-mt-24 py-20 border-t border-line">
      <div className="max-w-5xl mx-auto px-5 sm:px-6">
        {/* Judul bagian */}
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-brand">Kontak</p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-ink">
            Mari mulai percakapan
          </h2>
          <p className="mt-4 text-base sm:text-lg text-ink-soft leading-relaxed">
            Punya ide proyek, kebutuhan sistem baru, atau ingin berdiskusi
            seputar rekayasa perangkat lunak? Silakan hubungi melalui saluran
            berikut.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Informasi kontak */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-xl border border-line bg-surface">
              <p className="text-sm font-semibold text-ink-muted uppercase tracking-wide">
                Email langsung
              </p>

              <div className="mt-3 flex items-center justify-between gap-3 p-3 rounded-lg border border-line bg-surface-subtle">
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="text-sm sm:text-base font-medium text-ink truncate hover:text-brand transition-colors"
                >
                  {PERSONAL_INFO.email}
                </a>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium border transition-colors shrink-0 ${
                    copied
                      ? "bg-positive-soft border-positive-line text-positive"
                      : "bg-surface border-line text-ink-soft hover:bg-surface-sunken hover:text-ink"
                  }`}
                >
                  {copied ? (
                    <Check className="w-4 h-4" aria-hidden="true" />
                  ) : (
                    <Copy className="w-4 h-4" aria-hidden="true" />
                  )}
                  {copied ? "Tersalin" : "Salin"}
                </button>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-line bg-surface">
              <p className="text-sm font-semibold text-ink-muted uppercase tracking-wide">
                Saluran lain
              </p>

              <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {CHANNELS.map(({ label, href, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center justify-between gap-2 p-3 rounded-lg border border-line bg-surface-subtle hover:border-brand-line hover:bg-brand-soft transition-colors"
                    >
                      <span className="flex items-center gap-2 text-sm font-medium text-ink-soft group-hover:text-brand">
                        <Icon className="w-4 h-4 shrink-0" />
                        {label}
                      </span>
                      <ArrowUpRight
                        className="w-4 h-4 text-ink-muted group-hover:text-brand shrink-0"
                        aria-hidden="true"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <p className="flex items-center gap-2 p-4 rounded-lg bg-surface-subtle border border-line text-sm text-ink-soft">
              <span
                className="w-2 h-2 rounded-full bg-positive shrink-0"
                aria-hidden="true"
              />
              Biasanya membalas dalam waktu kurang dari 24 jam.
            </p>
          </div>

          {/* Formulir */}
          <div className="lg:col-span-7 p-6 sm:p-7 rounded-xl border border-line bg-surface">
            {handedOff ? (
              <div className="py-10 text-center">
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-positive-soft border border-positive-line text-positive">
                  <Mail className="w-6 h-6" aria-hidden="true" />
                </span>

                <h3 className="mt-4 text-xl font-bold text-ink">
                  Aplikasi email telah dibuka
                </h3>
                <p className="mt-2 text-base text-ink-soft leading-relaxed max-w-md mx-auto">
                  Pesan Anda sudah tersusun di aplikasi email. Tekan kirim di
                  sana untuk menyelesaikannya. Jika aplikasi email tidak
                  terbuka, silakan hubungi lewat WhatsApp atau salin alamat
                  email di samping.
                </p>

                <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                  <a
                    href={PERSONAL_INFO.socials.whatsapp}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-brand hover:bg-brand-strong text-white text-sm font-semibold transition-colors"
                  >
                    <WhatsappIcon className="w-4 h-4" />
                    Kirim lewat WhatsApp
                  </a>

                  <button
                    type="button"
                    onClick={() => setHandedOff(false)}
                    className="px-4 py-2.5 rounded-lg border border-line-strong text-sm font-semibold text-ink hover:bg-surface-sunken transition-colors"
                  >
                    Ubah pesan
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-sm font-medium text-ink"
                    >
                      Nama lengkap <span aria-hidden="true">*</span>
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Budi Santoso"
                      className="mt-1.5 w-full px-3.5 py-2.5 rounded-lg border border-line-strong bg-surface text-base text-ink placeholder:text-ink-faint focus:border-brand focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-sm font-medium text-ink"
                    >
                      Alamat email <span aria-hidden="true">*</span>
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="budi@perusahaan.com"
                      className="mt-1.5 w-full px-3.5 py-2.5 rounded-lg border border-line-strong bg-surface text-base text-ink placeholder:text-ink-faint focus:border-brand focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-category"
                    className="block text-sm font-medium text-ink"
                  >
                    Topik
                  </label>
                  <select
                    id="contact-category"
                    name="category"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="mt-1.5 w-full px-3.5 py-2.5 rounded-lg border border-line-strong bg-surface text-base text-ink focus:border-brand focus:outline-none transition-colors"
                  >
                    {CATEGORIES.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-sm font-medium text-ink"
                  >
                    Pesan <span aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Ceritakan ide proyek, kebutuhan, atau pertanyaan Anda."
                    className="mt-1.5 w-full px-3.5 py-2.5 rounded-lg border border-line-strong bg-surface text-base text-ink placeholder:text-ink-faint focus:border-brand focus:outline-none transition-colors resize-y"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-lg bg-brand hover:bg-brand-strong text-white text-base font-semibold transition-colors"
                >
                  <Send className="w-4 h-4" aria-hidden="true" />
                  Susun email
                </button>

                <p className="text-sm text-ink-muted text-center">
                  Menekan tombol ini akan membuka aplikasi email Anda dengan
                  pesan yang sudah terisi. Tidak ada data yang dikirim ke server.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
