"use client";

import { useState } from "react";
import {
  ArrowUpRight,
  Heart,
  ScanLine,
  FileCheck2,
  TrendingUp,
  Code2,
} from "lucide-react";
import { PROJECTS, CATEGORY_LABELS, Project } from "@/data/portfolioData";
import ProjectModal from "./ProjectModal";

const FILTER_TABS = [
  { id: "all", label: "Semua" },
  { id: "web", label: "Aplikasi Web" },
  { id: "mobile", label: "Aplikasi Mobile" },
  { id: "data", label: "Data & Analitik" },
];

/** Pratinjau ringkas untuk tiap jenis proyek. */
function ProjectPreview({ project }: { project: Project }) {
  const previews = {
    orbit: {
      icon: ScanLine,
      caption: "Kasir & manajemen stok",
      lines: ["Pemindaian barcode", "Laporan penjualan"],
    },
    mobile: {
      icon: FileCheck2,
      caption: "Arsip dokumen digital",
      lines: ["Verifikasi berkas", "Lini masa persetujuan"],
    },
    analytics: {
      icon: TrendingUp,
      caption: "Dasbor analitik",
      lines: ["Visualisasi tren", "Peramalan time-series"],
    },
    code: {
      icon: Code2,
      caption: "Situs profil",
      lines: ["Next.js App Router", "Sistem token desain"],
    },
  } as const;

  const preview = previews[project.visualType];
  const Icon = preview.icon;

  return (
    <div className="h-44 rounded-lg border border-line bg-surface-subtle p-5 flex flex-col justify-between">
      <div className="flex items-start justify-between gap-3">
        <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-brand-soft border border-brand-line text-brand shrink-0">
          <Icon className="w-5 h-5" aria-hidden="true" />
        </span>
        <span className="text-xs font-medium text-ink-muted text-right">
          {project.year} · {CATEGORY_LABELS[project.category]}
        </span>
      </div>

      <div>
        <p className="text-sm font-semibold text-ink">{preview.caption}</p>
        <ul className="mt-1.5 space-y-0.5">
          {preview.lines.map((line) => (
            <li key={line} className="text-sm text-ink-muted">
              {line}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [likedProjects, setLikedProjects] = useState<Record<string, boolean>>(
    {}
  );

  const filteredProjects =
    selectedCategory === "all"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === selectedCategory);

  const toggleLike = (projectId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedProjects((prev) => ({ ...prev, [projectId]: !prev[projectId] }));
  };

  return (
    <section id="work" className="scroll-mt-24 py-20 border-t border-line">
      <div className="max-w-5xl mx-auto px-5 sm:px-6">
        {/* Judul bagian */}
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-brand">Portofolio</p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-ink">
            Proyek terpilih
          </h2>
          <p className="mt-4 text-base sm:text-lg text-ink-soft leading-relaxed">
            Kumpulan pekerjaan yang mencakup perancangan aplikasi web, aplikasi
            mobile terintegrasi, dan analitik data.
          </p>
        </div>

        {/* Filter kategori */}
        <div
          role="tablist"
          aria-label="Filter kategori proyek"
          className="mt-8 flex flex-wrap gap-2"
        >
          {FILTER_TABS.map((tab) => {
            const isActive = selectedCategory === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                  isActive
                    ? "bg-brand border-brand text-white"
                    : "bg-surface border-line text-ink-soft hover:bg-surface-sunken hover:text-ink"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Daftar proyek */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className="group relative rounded-xl border border-line bg-surface p-5 hover:border-line-strong hover:shadow-md transition-all flex flex-col"
            >
              <div className="relative">
                <ProjectPreview project={project} />

                <button
                  type="button"
                  onClick={(e) => toggleLike(project.id, e)}
                  aria-pressed={Boolean(likedProjects[project.id])}
                  aria-label={`Tandai ${project.title} sebagai disukai`}
                  className={`absolute top-3 right-3 p-2 rounded-lg border transition-colors ${
                    likedProjects[project.id]
                      ? "bg-brand border-brand text-white"
                      : "bg-surface border-line text-ink-muted hover:text-brand hover:border-brand-line"
                  }`}
                >
                  <Heart
                    className={`w-4 h-4 ${
                      likedProjects[project.id] ? "fill-current" : ""
                    }`}
                    aria-hidden="true"
                  />
                </button>
              </div>

              <h3 className="mt-5 text-xl font-semibold text-ink">
                {/* Seluruh kartu dapat diklik lewat tautan yang membentang */}
                <button
                  type="button"
                  onClick={() => setActiveProject(project)}
                  className="text-left after:absolute after:inset-0 after:rounded-xl after:content-[''] group-hover:text-brand transition-colors"
                >
                  {project.title}
                </button>
              </h3>

              <p className="mt-2 text-base text-ink-soft leading-relaxed flex-1">
                {project.description}
              </p>

              <div className="mt-5 pt-4 border-t border-line flex flex-wrap items-center justify-between gap-3">
                <ul className="flex flex-wrap gap-1.5">
                  {project.tags.slice(0, 3).map((tag) => (
                    <li
                      key={tag}
                      className="px-2.5 py-1 rounded-md text-xs font-medium bg-surface-sunken text-ink-soft"
                    >
                      {tag}
                    </li>
                  ))}
                  {project.tags.length > 3 && (
                    <li className="px-2.5 py-1 rounded-md text-xs font-medium text-ink-muted">
                      +{project.tags.length - 3} lainnya
                    </li>
                  )}
                </ul>

                <span className="inline-flex items-center gap-1 text-sm font-medium text-brand">
                  Detail
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </span>
              </div>

              {project.metrics && (
                <p className="mt-3 text-sm font-medium text-positive">
                  {project.metrics}
                </p>
              )}
            </article>
          ))}
        </div>
      </div>

      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </section>
  );
}
