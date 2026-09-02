"use client";

import { useState } from "react";
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
  Check,
} from "lucide-react";
import { SKILLS } from "@/data/portfolioData";

const CATEGORIES = [
  { id: "all", label: "Semua" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend & Basis Data" },
  { id: "mobile", label: "Mobile" },
  { id: "data", label: "Data" },
  { id: "tools", label: "Tools" },
];

const SKILL_ICONS = {
  Code2,
  Terminal,
  Palette,
  Smartphone,
  Server,
  Database,
  BarChart3,
  GitBranch,
  Cpu,
} as const;

const PRINCIPLES = [
  "Kode bersih dan type-safe",
  "Antarmuka responsif dan cepat",
  "Layanan REST API yang terukur",
  "Keputusan berbasis data",
];

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredSkills =
    activeCategory === "all"
      ? SKILLS
      : SKILLS.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="scroll-mt-24 py-20 border-t border-line">
      <div className="max-w-5xl mx-auto px-5 sm:px-6">
        {/* Judul bagian */}
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-brand">Keahlian</p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-ink">
            Kemampuan teknis
          </h2>
          <p className="mt-4 text-base sm:text-lg text-ink-soft leading-relaxed">
            Teknologi yang digunakan sehari-hari untuk membangun solusi web,
            mobile, dan pengolahan data.
          </p>
        </div>

        {/* Filter kategori */}
        <div
          role="tablist"
          aria-label="Filter kategori keahlian"
          className="mt-8 flex flex-wrap gap-2"
        >
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                  isActive
                    ? "bg-brand border-brand text-white"
                    : "bg-surface border-line text-ink-soft hover:bg-surface-sunken hover:text-ink"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Daftar keahlian */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSkills.map((skill) => {
            const Icon =
              SKILL_ICONS[skill.icon as keyof typeof SKILL_ICONS] ?? Cpu;

            return (
              <article
                key={skill.name}
                className="p-5 rounded-xl border border-line bg-surface hover:border-line-strong transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-brand-soft border border-brand-line text-brand shrink-0">
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </span>
                  <span className="text-xs font-medium text-ink-muted">
                    {skill.experience}
                  </span>
                </div>

                <h3 className="mt-4 text-base font-semibold text-ink">
                  {skill.name}
                </h3>

                <p className="mt-1.5 text-sm text-ink-soft leading-relaxed">
                  {skill.description}
                </p>

                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs font-medium text-ink-muted">
                    <span>Tingkat penguasaan</span>
                    <span>{skill.level}%</span>
                  </div>
                  <div
                    role="progressbar"
                    aria-valuenow={skill.level}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`Tingkat penguasaan ${skill.name}`}
                    className="mt-1.5 h-2 rounded-full bg-surface-sunken overflow-hidden"
                  >
                    <div
                      className="h-full rounded-full bg-brand"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Prinsip kerja */}
        <ul className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {PRINCIPLES.map((principle) => (
            <li
              key={principle}
              className="flex items-start gap-2.5 p-4 rounded-lg bg-surface-subtle border border-line"
            >
              <Check
                className="w-4 h-4 text-positive shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <span className="text-sm text-ink-soft">{principle}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
