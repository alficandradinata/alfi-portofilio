"use client";

import React, { useState } from "react";
import {
  Mail,
  Send,
  Copy,
  Check,
  MessageSquare,
  Sparkles,
  MapPin,
  Clock,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon, WhatsappIcon } from "@/components/Icons";
import confetti from "canvas-confetti";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { sound } from "@/lib/soundEffects";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "Web Application",
    message: "",
  });

  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = () => {
    sound.playSuccess();
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    sound.playWebShoot();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      sound.playSuccess();

      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#ff3366", "#00f0ff", "#fbbf24", "#10b981"],
      });
    }, 1200);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      
      {/* Ambient background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-rose-600/10 blur-[150px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono font-bold uppercase tracking-wider">
              <MessageSquare className="w-3.5 h-3.5" /> Start a Conversation
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Let&apos;s Build <br />
              <span className="bg-gradient-to-r from-rose-500 via-amber-400 to-cyan-400 bg-clip-text text-transparent">
                Something Extraordinary.
              </span>
            </h2>
          </div>
          <p className="text-slate-400 text-sm max-w-md font-mono">
            Punya ide proyek, kebutuhan sistem baru, atau ingin berdiskusi seputar software engineering? Pintu komunikasi selalu terbuka!
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Info & Quick Channels */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick 1-Click Copy Email Card */}
            <div
              onMouseEnter={() => sound.playHover()}
              className="p-6 sm:p-7 rounded-3xl bg-slate-950/80 border border-slate-800/80 hover:border-rose-500/40 backdrop-blur-xl transition-all duration-300 shadow-xl shadow-rose-950/10"
            >
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-2">
                Direct Email (Klik untuk Salin)
              </span>

              <div className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-slate-900 border border-slate-800">
                <span className="font-mono text-sm sm:text-base font-bold text-white truncate">
                  {PERSONAL_INFO.email}
                </span>

                <button
                  onClick={handleCopyEmail}
                  className={`p-2.5 rounded-xl font-mono text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                    copied
                      ? "bg-emerald-500 text-white font-bold"
                      : "bg-slate-800 hover:bg-rose-600 text-slate-200 hover:text-white"
                  }`}
                  title="Salin Alamat Email"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span className="hidden sm:inline">Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span className="hidden sm:inline">Salin</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Direct Instant Channels Card */}
            <div className="p-6 sm:p-7 rounded-3xl bg-slate-950/80 border border-slate-800/80 backdrop-blur-xl space-y-4">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block font-bold">
                ⚡ Saluran Komunikasi Instan
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* WhatsApp */}
                <a
                  href={PERSONAL_INFO.socials.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => sound.playClick()}
                  onMouseEnter={() => sound.playHover()}
                  className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20 text-emerald-300 font-semibold text-xs flex items-center justify-between transition-all group"
                >
                  <div className="flex items-center gap-2">
                    <WhatsappIcon className="w-4 h-4 text-emerald-400" />
                    <span>WhatsApp</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                {/* LinkedIn */}
                <a
                  href={PERSONAL_INFO.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => sound.playClick()}
                  onMouseEnter={() => sound.playHover()}
                  className="p-3.5 rounded-2xl bg-blue-500/10 border border-blue-500/30 hover:bg-blue-500/20 text-blue-300 font-semibold text-xs flex items-center justify-between transition-all group"
                >
                  <div className="flex items-center gap-2">
                    <LinkedinIcon className="w-4 h-4 text-blue-400" />
                    <span>LinkedIn</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                {/* GitHub */}
                <a
                  href={PERSONAL_INFO.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => sound.playClick()}
                  onMouseEnter={() => sound.playHover()}
                  className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 font-semibold text-xs flex items-center justify-between transition-all group"
                >
                  <div className="flex items-center gap-2">
                    <GithubIcon className="w-4 h-4 text-slate-300" />
                    <span>GitHub</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                {/* Instagram */}
                <a
                  href={PERSONAL_INFO.socials.instagram}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => sound.playClick()}
                  onMouseEnter={() => sound.playHover()}
                  className="p-3.5 rounded-2xl bg-pink-500/10 border border-pink-500/30 hover:bg-pink-500/20 text-pink-300 font-semibold text-xs flex items-center justify-between transition-all group"
                >
                  <div className="flex items-center gap-2">
                    <InstagramIcon className="w-4 h-4 text-pink-400" />
                    <span>Instagram</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>

            {/* Availability status badge */}
            <div className="p-5 rounded-2xl bg-slate-900/40 border border-white/5 flex items-center gap-3 text-xs text-slate-400 font-mono">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Responsif: Biasanya membalas dalam waktu &lt; 24 jam</span>
            </div>

          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-7 sm:p-9 rounded-3xl bg-slate-950/80 border border-slate-800/80 backdrop-blur-xl shadow-2xl shadow-rose-950/20">
              
              {submitted ? (
                <div className="py-12 text-center space-y-4 animate-in zoom-in-95 duration-300">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-black text-white">Pesan Berhasil Terkirim!</h3>
                  <p className="text-sm text-slate-300 max-w-md mx-auto">
                    Terima kasih telah menghubungi, {formData.name}. Saya akan segera meninjau pesan Anda dan merespons secepatnya.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: "", email: "", category: "Web Application", message: "" });
                    }}
                    className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs font-bold transition-all mt-4 cursor-pointer"
                  >
                    Kirim Pesan Lainnya
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-slate-300 font-medium">
                        Nama Lengkap *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Budi Santoso"
                        className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700/80 focus:border-rose-500 focus:outline-none text-white text-sm placeholder:text-slate-600 transition-colors"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-slate-300 font-medium">
                        Alamat Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. budi@company.com"
                        className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700/80 focus:border-rose-500 focus:outline-none text-white text-sm placeholder:text-slate-600 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Project Category */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-300 font-medium">
                      Topik Diskusi / Kategori Proyek
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700/80 focus:border-rose-500 focus:outline-none text-white text-sm transition-colors"
                    >
                      <option value="Web Application">Web Application (Next.js / React)</option>
                      <option value="Mobile App">Mobile Application (React Native)</option>
                      <option value="Data Analytics">Data Science & Python Dashboard</option>
                      <option value="Collaboration">Tawaran Pekerjaan / Kolaborasi</option>
                      <option value="Other">Lainnya / Say Hello 👋</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-300 font-medium">
                      Detail Pesan *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Ceritakan tentang ide proyek, spesifikasi, atau pertanyaan Anda..."
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700/80 focus:border-rose-500 focus:outline-none text-white text-sm placeholder:text-slate-600 transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    onMouseEnter={() => sound.playHover()}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-rose-600 via-red-500 to-rose-700 hover:from-rose-500 hover:to-red-400 text-white font-bold text-sm uppercase tracking-wider shadow-lg shadow-rose-600/30 hover:shadow-rose-600/50 transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Mengirim Pesan...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="w-4 h-4" />
                        Kirim Pesan Sekarang
                      </span>
                    )}
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
