"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Volume2, VolumeX, Menu, X, ArrowUpRight, Palette, Code, Check } from "lucide-react";
import { PERSONAL_INFO, THEMES } from "@/data/portfolioData";
import { sound } from "@/lib/soundEffects";

interface NavbarProps {
  currentTheme: string;
  onSelectTheme: (themeId: string) => void;
  soundActive: boolean;
  onToggleSound: () => void;
}

export default function Navbar({
  currentTheme,
  onSelectTheme,
  soundActive,
  onToggleSound,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#top" },
    { name: "Projects", href: "#work" },
    { name: "Skills", href: "#skills" },
    { name: "About", href: "#about" },
    { name: "Journey", href: "#journey" },
    { name: "Contact", href: "#contact" },
  ];

  const handleThemeChange = (id: string) => {
    onSelectTheme(id);
    setThemeDropdownOpen(false);
    sound.playWebShoot();
  };

  const activeThemeObj = THEMES.find((t) => t.id === currentTheme) || THEMES[0];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-slate-950/80 backdrop-blur-xl border-b border-emerald-500/15 shadow-lg shadow-emerald-950/20 py-3.5"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#top"
          onClick={() => sound.playClick()}
          className="group flex items-center gap-2.5 text-white font-bold tracking-wider"
          aria-label="Alfi Candra Homepage"
        >
          <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 via-green-400 to-lime-400 p-[1.5px] shadow-lg shadow-emerald-500/20 group-hover:shadow-emerald-500/35 transition-all group-hover:scale-105">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <span className="font-mono text-sm font-bold bg-gradient-to-r from-emerald-300 to-lime-300 bg-clip-text text-transparent">
                AC
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-black text-sm tracking-tight text-white group-hover:text-emerald-400 transition-colors flex items-center gap-1">
              ALFI CANDRA <span className="text-emerald-500 font-mono">/</span>
            </span>
            <span className="text-[10px] font-mono text-slate-400 tracking-widest uppercase">
              loki.magic
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full shadow-inner">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => sound.playClick()}
              onMouseEnter={() => sound.playHover()}
              className="px-3.5 py-1.5 rounded-full text-xs font-medium text-slate-300 hover:text-white hover:bg-white/10 transition-all duration-200"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right Controls (Theme, Sound, Status & Mobile Toggle) */}
        <div className="flex items-center gap-2.5">
          {/* Multiverse Theme Switcher Button */}
          <div className="relative">
            <button
              onClick={() => {
                setThemeDropdownOpen(!themeDropdownOpen);
                sound.playClick();
              }}
              onMouseEnter={() => sound.playHover()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/80 border border-white/15 text-xs font-mono text-slate-200 hover:border-emerald-500/50 hover:bg-slate-800/80 transition-all"
              title="Ganti Tema"
            >
              <Palette className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline-block text-[11px]">Tema: {activeThemeObj.name.split(" ")[0]}</span>
            </button>

            {themeDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setThemeDropdownOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-slate-950/95 backdrop-blur-xl border border-white/15 shadow-2xl p-2 z-50 space-y-1 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-1.5 text-[11px] font-mono text-slate-400 uppercase tracking-wider border-b border-slate-800/80 mb-1">
                    ✨ Loki Magic Themes
                  </div>
                  {THEMES.map((theme) => (
                    <button
                      key={theme.id}
                      onClick={() => handleThemeChange(theme.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all text-left ${
                        currentTheme === theme.id
                          ? "bg-rose-500/20 text-white border border-rose-500/30"
                          : "text-slate-300 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-sm"
                          style={{ backgroundColor: theme.accent }}
                        />
                        <div>
                          <p className="font-semibold text-xs">{theme.name}</p>
                          <p className="text-[10px] text-slate-400 font-mono">{theme.tag}</p>
                        </div>
                      </div>
                      {currentTheme === theme.id && (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      )}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Sound Synthesizer Toggle */}
          <button
            onClick={onToggleSound}
            className={`p-2 rounded-full border transition-all ${
              soundActive
                ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-300 shadow-sm shadow-emerald-500/20"
                : "bg-slate-900/60 border-white/10 text-slate-400 hover:text-slate-200"
            }`}
            title={soundActive ? "Mute Suara Interaktif" : "Nyalakan Suara Sihir Loki"}
            aria-label="Audio effect toggle"
          >
            {soundActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* CTA Button */}
          <a
            href="#contact"
            onClick={() => sound.playClick()}
            className="hidden lg:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-500 hover:to-green-400 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-emerald-600/30 hover:shadow-emerald-500/50 transition-all hover:scale-105 active:scale-95"
          >
            <span>Let&apos;s Connect</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => {
              setMobileMenuOpen(!mobileMenuOpen);
              sound.playClick();
            }}
            className="p-2 rounded-xl bg-slate-900/80 border border-white/10 text-slate-300 hover:text-white md:hidden"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[65px] bg-slate-950/95 backdrop-blur-2xl border-b border-white/15 px-6 py-6 space-y-4 shadow-2xl animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => {
                  setMobileMenuOpen(false);
                  sound.playClick();
                }}
                className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-200 hover:bg-white/10 hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-800 flex flex-col gap-3">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
              <span>Status:</span>
              <span className="text-emerald-400 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Available for Work
              </span>
            </div>

            <a
              href="#contact"
              onClick={() => {
                setMobileMenuOpen(false);
                sound.playClick();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-rose-600 to-red-500 text-white font-bold text-sm shadow-lg shadow-rose-600/30"
            >
              <span>Hubungi Saya</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
