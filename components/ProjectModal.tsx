"use client";

import React, { useEffect } from "react";
import { X, ExternalLink, Sparkles, CheckCircle2, Layers, Calendar, BarChart2 } from "lucide-react";
import { GithubIcon } from "@/components/Icons";
import confetti from "canvas-confetti";
import { Project } from "@/data/portfolioData";
import { sound } from "@/lib/soundEffects";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const triggerConfetti = () => {
    sound.playSuccess();
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.5 },
      colors: ["#ff3366", "#00f0ff", "#fbbf24"],
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/85 backdrop-blur-xl transition-opacity"
        onClick={() => {
          sound.playClick();
          onClose();
        }}
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-3xl rounded-3xl bg-slate-950 border border-slate-700/80 shadow-2xl shadow-rose-950/40 p-6 sm:p-8 z-10 overflow-hidden my-8">
        
        {/* Top Glow Accent Bar */}
        <div
          className={`absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r ${project.colorScheme.gradient}`}
        />

        {/* Close Button */}
        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-700/80 transition-all hover:scale-105 cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-3 pr-10">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider border ${project.colorScheme.badge}`}
            >
              {project.category.toUpperCase()} • {project.year}
            </span>
            {project.metrics && (
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                <BarChart2 className="w-3.5 h-3.5" />
                {project.metrics}
              </span>
            )}
          </div>

          <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {project.title}
          </h3>

          <p className="text-sm font-mono text-cyan-300">
            {project.tagline}
          </p>
        </div>

        {/* Modal Body */}
        <div className="mt-6 space-y-6 text-sm text-slate-300 leading-relaxed border-t border-slate-800/80 pt-6">
          
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-2">
              Deskripsi Proyek & Solusi
            </h4>
            <p className="text-slate-300 text-sm leading-relaxed">
              {project.longDescription}
            </p>
          </div>

          {/* Key Highlights / Features */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-3 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-rose-400" />
              Fitur Utama & Keunggulan
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.highlights.map((highlight, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-start gap-2.5"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-200">{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack Pills */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-2.5 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              Teknologi Yang Digunakan
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-lg text-xs font-mono font-medium bg-slate-900 text-slate-200 border border-slate-800"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer / Action CTA */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => sound.playClick()}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-mono font-bold border border-slate-700 hover:border-slate-500 transition-colors cursor-pointer"
              >
                <GithubIcon className="w-4 h-4" />
                <span>Source Code</span>
              </a>
            )}

            <button
              onClick={triggerConfetti}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 text-xs font-mono font-bold border border-rose-500/30 transition-colors cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-rose-400" />
              <span>Apresiasi Proyek 🎉</span>
            </button>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold uppercase tracking-wider transition-colors ml-auto cursor-pointer"
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
}
