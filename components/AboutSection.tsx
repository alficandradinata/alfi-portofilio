"use client";

import React, { useState, useEffect } from "react";
import {
  Compass,
  Code,
  Sparkles,
  Clock,
  MapPin,
  Heart,
  Laptop,
  CheckCircle2,
  Terminal,
  Coffee,
} from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { sound } from "@/lib/soundEffects";

export default function AboutSection() {
  const [timeString, setTimeString] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Jakarta",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setTimeString(new Intl.DateTimeFormat("id-ID", options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5" /> Identity & Philosophy
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              About Me & <br />
              <span className="bg-gradient-to-r from-emerald-400 via-lime-300 to-cyan-400 bg-clip-text text-transparent">
                The Engineering Mindset.
              </span>
            </h2>
          </div>
          <p className="text-slate-400 text-sm max-w-md font-mono">
            Filosofi berkarya di balik setiap baris kode: mengutamakan kejelasan, performa, dan kegunaan nyata bagi pengguna.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Main Story Card (Large 8 cols) */}
          <div
            onMouseEnter={() => sound.playHover()}
            className="md:col-span-8 p-7 sm:p-9 rounded-3xl bg-slate-950/80 border border-slate-800/80 hover:border-emerald-500/40 backdrop-blur-xl flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-950/20"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4" /> Filosofi Rekayasa
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white leading-snug">
                &ldquo;Curious by default. <br />
                <span className="text-emerald-400">Useful on purpose.&rdquo;</span>
              </h3>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Saya adalah software engineer berbasis di Pekanbaru yang terobsesi dengan titik temu antara desain antarmuka yang elegan dan rekayasa perangkat lunak yang kokoh.
              </p>

              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Keseharian saya diisi dengan merancang arsitektur web modern (Next.js/React), membangun aplikasi mobile responsif dengan React Native, mengeksplorasi automasi dan data insight menggunakan Python, serta menyelesaikan riset skripsi di bidang teknologi informasi.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-300">
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800">
                <Coffee className="w-3.5 h-3.5 text-amber-400" />
                Problem Solver
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800">
                <Laptop className="w-3.5 h-3.5 text-cyan-400" />
                Full-Stack Focused
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800">
                <Code className="w-3.5 h-3.5 text-emerald-400" />
                Clean Code Obsessed
              </span>
            </div>
          </div>

          {/* Live Time & Location Card (4 cols) */}
          <div
            onMouseEnter={() => sound.playHover()}
            className="md:col-span-4 p-7 rounded-3xl bg-slate-950/80 border border-slate-800/80 hover:border-emerald-500/40 backdrop-blur-xl flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-950/20"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" /> Live Clock
                </span>
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
              </div>

              <div className="space-y-1">
                <p className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight">
                  {timeString || "10:00:00"}
                </p>
                <p className="text-xs font-mono text-slate-400">
                  WIB (UTC+7) • Sumatra, Indonesia
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
                <p className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  Pekanbaru
                </p>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Terbuka untuk kolaborasi remote di seluruh Indonesia dan global.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80 text-[11px] font-mono text-emerald-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Active & Coding today
            </div>
          </div>

          {/* Focus Pillars (4 cols) */}
          <div
            onMouseEnter={() => sound.playHover()}
            className="md:col-span-4 p-6 sm:p-7 rounded-3xl bg-slate-950/80 border border-slate-800/80 hover:border-amber-500/40 backdrop-blur-xl transition-all duration-300"
          >
            <div className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <Code className="w-3.5 h-3.5" /> Core Disciplines
            </div>

            <div className="space-y-3">
              <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800">
                <p className="text-xs font-bold text-white mb-0.5">🌐 Web Architecture</p>
                <p className="text-[11px] text-slate-400">Next.js, React, Tailwind, Server Components</p>
              </div>
              <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800">
                <p className="text-xs font-bold text-white mb-0.5">📱 Mobile Engineering</p>
                <p className="text-[11px] text-slate-400">React Native, Expo, Hardware Integrations</p>
              </div>
              <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800">
                <p className="text-xs font-bold text-white mb-0.5">📊 Data & Backend</p>
                <p className="text-[11px] text-slate-400">Python, Streamlit, FastAPI, Database Systems</p>
              </div>
            </div>
          </div>

          {/* Workflow & Habits (8 cols) */}
          <div
            onMouseEnter={() => sound.playHover()}
            className="md:col-span-8 p-6 sm:p-7 rounded-3xl bg-slate-950/80 border border-slate-800/80 hover:border-emerald-500/40 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div className="text-xs font-mono text-lime-400 font-bold uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" /> Prinsip & Etos Kerja
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm font-bold text-white">⚡ Speed & Reliability</p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Menulis kode yang efisien, teruji, dan mudah dipelihara dalam jangka panjang.
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-bold text-white">🎨 Detail-Oriented UI/UX</p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Memperhatikan setiap micro-interaction, feedback visual, dan responsivitas layar.
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-bold text-white">📚 Continuous Improvement</p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Selalu belajar teknologi baru untuk memberikan solusi terbaik pada setiap tantangan.
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-bold text-white">🤝 Transparent Communication</p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Proaktif memberikan update progres dan berkolaborasi secara konstruktif.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
              <span>Ready for high-impact projects</span>
              <span className="text-emerald-400 font-bold">2026 Edition</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
