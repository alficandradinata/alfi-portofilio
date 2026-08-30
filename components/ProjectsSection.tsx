"use client";

import React, { useState } from "react";
import {
  ArrowUpRight,
  Sparkles,
  ExternalLink,
  Smartphone,
  Globe,
  BarChart3,
  Layers,
  Heart,
  QrCode,
  FileCheck,
  TrendingUp,
  Cpu,
} from "lucide-react";
import { GithubIcon } from "@/components/Icons";
import confetti from "canvas-confetti";
import { PROJECTS, Project } from "@/data/portfolioData";
import { sound } from "@/lib/soundEffects";
import ProjectModal from "./ProjectModal";

export default function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);
  const [likedProjects, setLikedProjects] = useState<Record<string, boolean>>({});

  const filterTabs = [
    { id: "all", label: "Semua Karya" },
    { id: "web", label: "Web Applications" },
    { id: "mobile", label: "Mobile Apps" },
    { id: "data", label: "Data Science & Dashboards" },
  ];

  const filteredProjects =
    selectedCategory === "all"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === selectedCategory);

  const toggleLike = (projectId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playSuccess();
    setLikedProjects((prev) => ({
      ...prev,
      [projectId]: !prev[projectId],
    }));

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ["#ff3366", "#ec4899", "#fbbf24"],
    });
  };

  const renderProjectVisual = (project: Project) => {
    switch (project.visualType) {
      case "orbit":
        return (
          <div className="relative w-full h-56 sm:h-64 rounded-2xl bg-gradient-to-br from-slate-900 via-rose-950/40 to-slate-950 flex items-center justify-center overflow-hidden border border-white/10 group-hover:border-rose-500/40 transition-colors">
            {/* Barcode scanner laser visual */}
            <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-rose-500 to-transparent top-1/2 -translate-y-1/2 animate-pulse shadow-[0_0_15px_#ff3366]" />
            <div className="absolute inset-0 bg-[radial-gradient(#ff3366_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />
            
            {/* Orbiting Elements */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-rose-600 to-amber-500 p-[1.5px] shadow-2xl shadow-rose-600/40 transform group-hover:rotate-6 transition-transform">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex flex-col items-center justify-center p-2 text-center">
                  <QrCode className="w-8 h-8 text-rose-400 mb-1 animate-bounce" />
                  <span className="text-[10px] font-mono text-amber-300 font-bold">SCANNER</span>
                </div>
              </div>
              <span className="mt-3 text-xs font-mono text-slate-400 bg-black/60 px-3 py-1 rounded-full border border-slate-800 backdrop-blur-md">
                POS & Inventory Engine
              </span>
            </div>
          </div>
        );

      case "mobile":
        return (
          <div className="relative w-full h-56 sm:h-64 rounded-2xl bg-gradient-to-br from-slate-900 via-blue-950/40 to-slate-950 flex items-center justify-center overflow-hidden border border-white/10 group-hover:border-cyan-500/40 transition-colors">
            {/* Mobile App mockup card */}
            <div className="relative z-10 w-44 rounded-2xl bg-slate-950 border-2 border-slate-700/80 p-3 shadow-2xl shadow-blue-950/60 transform group-hover:-translate-y-1 transition-transform">
              <div className="w-12 h-1.5 bg-slate-800 rounded-full mx-auto mb-2" />
              <div className="space-y-2">
                <div className="p-2 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                  <div className="text-[9px] font-mono leading-tight">
                    <p className="text-white font-bold">PLN_ARSIP_2025.PDF</p>
                    <p className="text-emerald-400">Verified & Approved</p>
                  </div>
                </div>
                <div className="h-1.5 bg-slate-800 rounded-full w-3/4" />
                <div className="h-1.5 bg-slate-800 rounded-full w-1/2" />
              </div>
            </div>
          </div>
        );

      case "analytics":
        return (
          <div className="relative w-full h-56 sm:h-64 rounded-2xl bg-gradient-to-br from-slate-900 via-teal-950/40 to-slate-950 flex items-center justify-center overflow-hidden border border-white/10 group-hover:border-teal-500/40 transition-colors">
            {/* Signal Graph Analytics visualization */}
            <div className="relative z-10 w-4/5 p-4 rounded-2xl bg-slate-950/90 border border-slate-800 backdrop-blur-md shadow-2xl">
              <div className="flex items-center justify-between mb-3 text-[11px] font-mono text-slate-400">
                <span className="flex items-center gap-1 text-cyan-400">
                  <TrendingUp className="w-3.5 h-3.5" /> Trend Forecast
                </span>
                <span className="text-emerald-400 font-bold">+28.4%</span>
              </div>
              <div className="flex items-end gap-2 h-16 pt-2">
                <div className="flex-1 bg-cyan-500/20 rounded-t h-[40%] hover:h-[60%] transition-all" />
                <div className="flex-1 bg-cyan-500/40 rounded-t h-[65%] hover:h-[80%] transition-all" />
                <div className="flex-1 bg-cyan-500/60 rounded-t h-[50%] hover:h-[70%] transition-all" />
                <div className="flex-1 bg-cyan-400 rounded-t h-[90%] hover:h-[100%] transition-all shadow-[0_0_10px_#00f0ff]" />
                <div className="flex-1 bg-cyan-500/50 rounded-t h-[75%] hover:h-[85%] transition-all" />
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="relative w-full h-56 sm:h-64 rounded-2xl bg-gradient-to-br from-slate-900 via-amber-950/30 to-slate-950 flex items-center justify-center overflow-hidden border border-white/10 group-hover:border-amber-500/40 transition-colors">
            <div className="relative z-10 text-center font-mono space-y-2">
              <Cpu className="w-10 h-10 text-emerald-400 mx-auto animate-pulse" />
              <p className="text-xs text-slate-300 font-bold">&lt;LokiSigilEngine /&gt;</p>
              <p className="text-[10px] text-slate-500">Fast • Responsive • Next.js</p>
            </div>
          </div>
        );
    }
  };

  return (
    <section id="work" className="py-24 relative overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-rose-600/10 blur-[140px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-cyan-600/10 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> Proven Track Record
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Featured Works & <br />
              <span className="bg-gradient-to-r from-emerald-400 via-lime-300 to-cyan-400 bg-clip-text text-transparent">
                Digital Solutions.
              </span>
            </h2>
          </div>
          <p className="text-slate-400 text-sm max-w-md font-mono">
            Koleksi proyek pilihan yang menunjukkan kompetensi dalam perancangan web enterprise, aplikasi mobile terintegrasi, dan analitik data cerdas.
          </p>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setSelectedCategory(tab.id);
                sound.playClick();
              }}
              onMouseEnter={() => sound.playHover()}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all whitespace-nowrap active:scale-95 ${
                selectedCategory === tab.id
                  ? "bg-gradient-to-r from-rose-600 to-red-500 text-white shadow-lg shadow-rose-600/30 border border-rose-400/40"
                  : "bg-slate-900/60 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              onClick={() => {
                sound.playClick();
                setActiveModalProject(project);
              }}
              onMouseEnter={() => sound.playHover()}
              className="group relative rounded-3xl bg-slate-950/80 border border-slate-800/80 hover:border-rose-500/50 backdrop-blur-xl p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-rose-950/30 cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Visual Preview Container */}
                <div className="relative mb-6 overflow-hidden rounded-2xl">
                  {renderProjectVisual(project)}
                  
                  {/* Floating Action Buttons */}
                  <div className="absolute top-3 right-3 z-20 flex items-center gap-2">
                    <button
                      onClick={(e) => toggleLike(project.id, e)}
                      className={`p-2.5 rounded-full backdrop-blur-md border transition-all ${
                        likedProjects[project.id]
                          ? "bg-rose-500 text-white border-rose-400 scale-110 shadow-lg shadow-rose-500/40"
                          : "bg-slate-950/70 text-slate-300 hover:text-rose-400 border-white/15"
                      }`}
                      title="Sukai Proyek Ini"
                      aria-label="Like project"
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          likedProjects[project.id] ? "fill-white" : ""
                        }`}
                      />
                    </button>
                  </div>

                  {/* Year & Category Label */}
                  <div className="absolute bottom-3 left-3 z-20">
                    <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-slate-950/80 text-slate-200 border border-white/10 backdrop-blur-md">
                      {project.year} • {project.category.toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Project Metadata */}
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-rose-400 transition-colors">
                      {project.title}
                    </h3>
                    <div className="p-2 rounded-full bg-slate-900 border border-slate-800 text-slate-400 group-hover:text-white group-hover:bg-rose-600 transition-all shrink-0">
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>

                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </div>

              {/* Bottom Tags & Metrics */}
              <div className="mt-6 pt-5 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-slate-900 text-slate-300 border border-slate-800"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-slate-900 text-slate-500">
                      +{project.tags.length - 3}
                    </span>
                  )}
                </div>

                {project.metrics && (
                  <span className="text-xs font-mono font-semibold text-emerald-400">
                    {project.metrics}
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>

      </div>

      {/* Detail Project Modal */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
}
