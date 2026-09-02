"use client";

import React, { useEffect, useRef } from "react";
import { X, Check, ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/Icons";
import { Project, CATEGORY_LABELS } from "@/data/portfolioData";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Latar belakang */}
      <div
        className="fixed inset-0 bg-ink/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        className="relative z-10 w-full max-w-2xl my-8 rounded-xl bg-surface border border-line shadow-xl"
      >
        {/* Kepala */}
        <div className="flex items-start justify-between gap-4 p-6 border-b border-line">
          <div>
            <p className="flex flex-wrap items-center gap-2 text-sm">
              <span className="px-2.5 py-1 rounded-md bg-brand-soft border border-brand-line text-brand font-medium">
                {CATEGORY_LABELS[project.category]}
              </span>
              <span className="text-ink-muted">{project.year}</span>
            </p>

            <h3
              id="project-modal-title"
              className="mt-3 text-2xl font-bold text-ink"
            >
              {project.title}
            </h3>

            <p className="mt-2 text-base text-ink-soft">{project.tagline}</p>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Tutup detail proyek"
            className="p-2 rounded-lg border border-line text-ink-muted hover:text-ink hover:bg-surface-sunken transition-colors shrink-0"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Isi */}
        <div className="p-6 space-y-6">
          {project.metrics && (
            <p className="inline-block px-3 py-1.5 rounded-lg bg-positive-soft border border-positive-line text-sm font-medium text-positive">
              {project.metrics}
            </p>
          )}

          <section>
            <h4 className="text-sm font-semibold text-ink-muted uppercase tracking-wide">
              Ringkasan
            </h4>
            <p className="mt-2 text-base text-ink-soft leading-relaxed">
              {project.longDescription}
            </p>
          </section>

          <section>
            <h4 className="text-sm font-semibold text-ink-muted uppercase tracking-wide">
              Fitur utama
            </h4>
            <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex items-start gap-2.5 p-3 rounded-lg bg-surface-subtle border border-line"
                >
                  <Check
                    className="w-4 h-4 text-positive shrink-0 mt-1"
                    aria-hidden="true"
                  />
                  <span className="text-sm text-ink-soft">{highlight}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h4 className="text-sm font-semibold text-ink-muted uppercase tracking-wide">
              Teknologi
            </h4>
            <ul className="mt-3 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <li
                  key={tag}
                  className="px-3 py-1.5 rounded-md text-sm font-medium bg-surface-sunken text-ink-soft"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Kaki */}
        <div className="p-6 border-t border-line flex flex-wrap items-center gap-3">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-line-strong bg-surface hover:bg-surface-sunken text-ink text-sm font-semibold transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
              Kode sumber
            </a>
          )}

          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-brand hover:bg-brand-strong text-white text-sm font-semibold transition-colors"
            >
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
              Lihat demo
            </a>
          )}

          <button
            type="button"
            onClick={onClose}
            className="ml-auto px-4 py-2.5 rounded-lg text-sm font-semibold text-ink-soft hover:bg-surface-sunken transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
