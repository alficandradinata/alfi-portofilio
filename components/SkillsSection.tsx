"use client";

import React, { useState } from "react";
import {
  Code2,
  Terminal,
  Palette,
  Smartphone,
  Server,
  Database,
  BarChart3,
  GitBranch,
  Cpu,
  Layers,
  CheckCircle2,
  Sparkles,
  Zap,
} from "lucide-react";
import { SKILLS, Skill } from "@/data/portfolioData";
import { sound } from "@/lib/soundEffects";

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "Semua Stack" },
    { id: "frontend", label: "Frontend & UI" },
    { id: "backend", label: "Backend & DB" },
    { id: "mobile", label: "Mobile Apps" },
    { id: "data", label: "Data & Analytics" },
    { id: "tools", label: "Workflow & Tools" },
  ];

  const filteredSkills =
    activeCategory === "all"
      ? SKILLS
      : SKILLS.filter((s) => s.category === activeCategory);

  const getSkillIcon = (iconName: string) => {
    switch (iconName) {
      case "Code2":
        return <Code2 className="w-5 h-5" />;
      case "Terminal":
        return <Terminal className="w-5 h-5" />;
      case "Palette":
        return <Palette className="w-5 h-5" />;
      case "Smartphone":
        return <Smartphone className="w-5 h-5" />;
      case "Server":
        return <Server className="w-5 h-5" />;
      case "Database":
        return <Database className="w-5 h-5" />;
      case "BarChart3":
        return <BarChart3 className="w-5 h-5" />;
      case "GitBranch":
        return <GitBranch className="w-5 h-5" />;
      default:
        return <Cpu className="w-5 h-5" />;
    }
  };

  const tickerItems = [
    "NEXT.JS 16",
    "REACT.JS",
    "REACT NATIVE",
    "PYTHON",
    "FASTAPI",
    "TAILWIND CSS",
    "TYPESCRIPT",
    "MONGODB",
    "POSTGRESQL",
    "STREAMLIT",
    "PANDAS",
    "GIT & GITHUB",
    "RESTFUL APIS",
    "BARCODE SCANNER",
  ];

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      
      {/* Infinite Ticker Bar */}
      <div className="w-full py-4 mb-20 bg-gradient-to-r from-rose-950/60 via-slate-900/90 to-blue-950/60 border-y border-rose-500/20 backdrop-blur-md overflow-hidden select-none">
        <div className="flex w-max animate-ticker gap-8 items-center text-xs font-black tracking-widest text-slate-200">
          {[...tickerItems, ...tickerItems].map((item, idx) => (
            <div key={idx} className="flex items-center gap-6">
              <span className="hover:text-rose-400 transition-colors flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-rose-500" />
                {item}
              </span>
              <span className="text-cyan-400/80 font-mono font-bold text-sm">+</span>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono font-bold uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5" /> Capabilities & Mastery
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Tech Stack & <br />
              <span className="bg-gradient-to-r from-cyan-400 via-rose-500 to-amber-400 bg-clip-text text-transparent">
                Technical Expertise.
              </span>
            </h2>
          </div>
          <p className="text-slate-400 text-sm max-w-md font-mono">
            Kombinasi teknologi modern yang digunakan untuk merancang solusi web, mobile, dan data pipelines yang scalable dan responsif.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                sound.playClick();
              }}
              onMouseEnter={() => sound.playHover()}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all whitespace-nowrap active:scale-95 ${
                activeCategory === cat.id
                  ? "bg-gradient-to-r from-rose-600 to-red-500 text-white shadow-lg shadow-rose-600/30 border border-rose-400/40"
                  : "bg-slate-900/60 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill) => (
            <div
              key={skill.name}
              onMouseEnter={() => sound.playHover()}
              className="group relative p-6 rounded-2xl bg-slate-950/70 border border-slate-800/80 hover:border-rose-500/50 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-rose-950/20"
            >
              {/* Subtle accent corner glow */}
              <div
                className="absolute top-0 right-0 w-24 h-24 blur-2xl rounded-full opacity-10 group-hover:opacity-30 transition-opacity"
                style={{ backgroundColor: skill.color }}
              />

              <div className="flex items-start justify-between mb-4">
                <div
                  className="p-3 rounded-xl border flex items-center justify-center transition-transform group-hover:scale-110"
                  style={{
                    backgroundColor: `${skill.color}15`,
                    borderColor: `${skill.color}40`,
                    color: skill.color,
                  }}
                >
                  {getSkillIcon(skill.icon)}
                </div>

                <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-400">
                  {skill.experience}
                </span>
              </div>

              <h3 className="text-base font-bold text-white mb-1.5 flex items-center justify-between">
                <span>{skill.name}</span>
                <span className="text-xs font-mono font-normal text-slate-400">
                  {skill.level}%
                </span>
              </h3>

              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                {skill.description}
              </p>

              {/* Progress Level Bar */}
              <div className="w-full h-1.5 rounded-full bg-slate-900 overflow-hidden border border-slate-800">
                <div
                  className="h-full rounded-full transition-all duration-700 ease-out"
                  style={{
                    width: `${skill.level}%`,
                    backgroundColor: skill.color,
                    boxShadow: `0 0 10px ${skill.color}`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Highlight Architecture Pill Cards */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-900/40 border border-white/5 flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span className="text-xs text-slate-300 font-medium">Clean Code & Type Safety</span>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/40 border border-white/5 flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0" />
            <span className="text-xs text-slate-300 font-medium">Ultra-Fast Responsive UI</span>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/40 border border-white/5 flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-rose-400 shrink-0" />
            <span className="text-xs text-slate-300 font-medium">Scalable REST API Services</span>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/40 border border-white/5 flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
            <span className="text-xs text-slate-300 font-medium">Data-Driven Insights & Viz</span>
          </div>
        </div>

      </div>
    </section>
  );
}
