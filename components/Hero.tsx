"use client";

import React, { useState, useEffect } from "react";
import {
  ArrowUpRight,
  Code2,
  Sparkles,
  Mail,
  FileText,
  Layers,
  Flame,
  Zap,
} from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "@/components/Icons";
import confetti from "canvas-confetti";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { sound } from "@/lib/soundEffects";
import Terminal from "./Terminal";

interface HeroProps {
  soundActive: boolean;
  onToggleSound: () => void;
}

export default function Hero({ soundActive, onToggleSound }: HeroProps) {
  const roles = [
    "Full-Stack Web Architect",
    "React Native Mobile Engineer",
    "Python & Data Science Explorer",
    "Creative Tech Craftsman",
  ];

  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect
  useEffect(() => {
    const fullText = roles[currentRoleIndex];
    let typingSpeed = isDeleting ? 40 : 80;

    if (!isDeleting && displayText === fullText) {
      typingSpeed = 2200; // Pause at end of text
      const timeout = setTimeout(() => setIsDeleting(true), typingSpeed);
      return () => clearTimeout(timeout);
    } else if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
      return;
    }

    const timer = setTimeout(() => {
      setDisplayText(
        isDeleting
          ? fullText.substring(0, displayText.length - 1)
          : fullText.substring(0, displayText.length + 1)
      );
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentRoleIndex]);

  const triggerCelebrate = () => {
    sound.playSuccess();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#ff3366", "#00f0ff", "#fbbf24", "#3b82f6", "#ffffff"],
    });
  };

  return (
    <section
      id="top"
      className="relative min-h-[90vh] pt-32 pb-20 flex flex-col justify-center overflow-hidden"
    >
      {/* Spider Glow Radial Background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-600/15 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Hero Intro */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-rose-500/30 backdrop-blur-md shadow-lg shadow-rose-950/20">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="text-xs font-mono text-slate-300 font-medium tracking-tight">
                {PERSONAL_INFO.status}
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <p className="text-xs font-mono text-rose-400 font-bold uppercase tracking-[0.2em] flex items-center gap-2">
                <span className="w-6 h-[2px] bg-rose-500 inline-block" />
                PORTFOLIO • ALFI CANDRA DINATA
              </p>
              
              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-black text-white tracking-tight leading-[1.05]">
                I Build Next-Gen <br />
                <span className="bg-gradient-to-r from-rose-500 via-red-500 to-amber-400 bg-clip-text text-transparent italic">
                  Digital Worlds.
                </span>
              </h1>

              {/* Animated Rotating Subtitle */}
              <div className="h-8 flex items-center gap-2 font-mono text-sm sm:text-lg text-cyan-300">
                <span className="text-rose-400 font-bold">&gt;</span>
                <span className="font-semibold">{displayText}</span>
                <span className="w-2.5 h-5 bg-amber-400 animate-pulse inline-block" />
              </div>
            </div>

            {/* Bio Paragraph */}
            <p className="text-slate-300/90 text-sm sm:text-base leading-relaxed max-w-xl">
              Halo! Saya <span className="text-white font-semibold">{PERSONAL_INFO.name}</span>. Software engineer berbasis di Medan & Pekanbaru yang bersemangat menggabungkan arsitektur kode mutakhir, kecerdasan data, dan antarmuka web & mobile interaktif bergaya modern.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#work"
                onClick={triggerCelebrate}
                onMouseEnter={() => sound.playHover()}
                className="group relative inline-flex items-center gap-3 px-6 py-3.5 rounded-xl bg-gradient-to-r from-rose-600 via-red-500 to-rose-700 text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-xl shadow-rose-600/30 hover:shadow-rose-600/50 hover:scale-[1.03] active:scale-95 transition-all overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-300" />
                  Lihat Karya Unggulan
                </span>
                <ArrowUpRight className="relative w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a
                href="#contact"
                onClick={() => sound.playClick()}
                onMouseEnter={() => sound.playHover()}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800/90 text-slate-200 hover:text-white font-medium text-xs sm:text-sm border border-slate-700/80 hover:border-cyan-500/50 transition-all active:scale-95 shadow-md"
              >
                <Mail className="w-4 h-4 text-cyan-400" />
                <span>Konsultasi Proyek</span>
              </a>

              <a
                href={PERSONAL_INFO.socials.github}
                target="_blank"
                rel="noreferrer"
                onClick={() => sound.playClick()}
                onMouseEnter={() => sound.playHover()}
                className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl bg-slate-950/60 hover:bg-slate-900 text-slate-400 hover:text-slate-200 text-xs font-mono border border-slate-800 hover:border-slate-600 transition-colors"
                title="Buka Profil GitHub"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub</span>
              </a>
            </div>

            {/* Social Links & Quick Contact */}
            <div className="flex items-center gap-3 pt-4 border-t border-slate-800/80">
              <span className="text-xs font-mono text-slate-400">Socials:</span>
              <div className="flex items-center gap-2">
                <a
                  href={PERSONAL_INFO.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg bg-slate-900/80 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 border border-slate-800 hover:border-rose-500/40 transition-colors"
                  aria-label="GitHub"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
                <a
                  href={PERSONAL_INFO.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg bg-slate-900/80 hover:bg-cyan-500/20 text-slate-400 hover:text-cyan-400 border border-slate-800 hover:border-cyan-500/40 transition-colors"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
                <a
                  href={PERSONAL_INFO.socials.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg bg-slate-900/80 hover:bg-pink-500/20 text-slate-400 hover:text-pink-400 border border-slate-800 hover:border-pink-500/40 transition-colors"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="p-2 rounded-lg bg-slate-900/80 hover:bg-amber-500/20 text-slate-400 hover:text-amber-400 border border-slate-800 hover:border-amber-500/40 transition-colors"
                  aria-label="Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>

              <span className="text-slate-600 text-xs">|</span>
              <span className="text-xs font-mono text-slate-400 hidden sm:inline-block">
                📍 {PERSONAL_INFO.location}
              </span>
            </div>

          </div>

          {/* Right Column: Interactive Spidey Terminal */}
          <div className="lg:col-span-5 w-full flex justify-center">
            <Terminal soundActive={soundActive} onToggleSound={onToggleSound} />
          </div>

        </div>

        {/* Hero Bottom Stats Matrix */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16 pt-8 border-t border-slate-800/80">
          {PERSONAL_INFO.stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-slate-900/40 border border-white/5 backdrop-blur-sm hover:border-rose-500/30 transition-all group"
            >
              <div className="flex items-baseline gap-1">
                <span className="text-2xl sm:text-3xl font-black text-white group-hover:text-rose-400 transition-colors">
                  {stat.value}
                </span>
                {stat.suffix && (
                  <span className="text-xs font-mono text-slate-500">{stat.suffix}</span>
                )}
              </div>
              <p className="text-xs font-mono text-slate-400 mt-1 uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
