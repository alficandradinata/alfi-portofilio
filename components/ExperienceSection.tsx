import { Briefcase, GraduationCap, MapPin, Check } from "lucide-react";
import { TIMELINE } from "@/data/portfolioData";

export default function ExperienceSection() {
  return (
    <section id="journey" className="scroll-mt-24 py-20 border-t border-line">
      <div className="max-w-5xl mx-auto px-5 sm:px-6">
        {/* Judul bagian */}
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-brand">Perjalanan</p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-ink">
            Pengalaman dan pendidikan
          </h2>
          <p className="mt-4 text-base sm:text-lg text-ink-soft leading-relaxed">
            Rangkuman pembelajaran akademis, proyek profesional, dan
            pengembangan diri di bidang rekayasa perangkat lunak.
          </p>
        </div>

        {/* Lini masa */}
        <ol className="mt-10 space-y-6">
          {TIMELINE.map((item) => {
            const Icon = item.type === "education" ? GraduationCap : Briefcase;

            return (
              <li
                key={`${item.period}-${item.role}`}
                className="relative pl-12 sm:pl-14"
              >
                {/* Penanda lini masa */}
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-6 flex items-center justify-center w-9 h-9 rounded-lg bg-brand-soft border border-brand-line text-brand"
                >
                  <Icon className="w-4 h-4" />
                </span>
                <span
                  aria-hidden="true"
                  className="absolute left-[17px] top-[60px] bottom-0 w-px bg-line last:hidden"
                />

                <article className="p-6 rounded-xl border border-line bg-surface hover:border-line-strong transition-colors">
                  <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                    <p className="text-sm font-semibold text-brand">
                      {item.period}
                    </p>
                    <p className="flex items-center gap-1.5 text-sm text-ink-muted">
                      <MapPin className="w-4 h-4 shrink-0" aria-hidden="true" />
                      {item.location}
                    </p>
                  </div>

                  <h3 className="mt-3 text-xl font-semibold text-ink">
                    {item.role}
                  </h3>
                  <p className="mt-1 text-base text-ink-soft">{item.company}</p>

                  <p className="mt-3 text-base text-ink-soft leading-relaxed">
                    {item.description}
                  </p>

                  <ul className="mt-4 space-y-2">
                    {item.achievements.map((achievement) => (
                      <li
                        key={achievement}
                        className="flex items-start gap-2.5 text-sm text-ink-soft"
                      >
                        <Check
                          className="w-4 h-4 text-positive shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>

                  <ul className="mt-5 pt-4 border-t border-line flex flex-wrap gap-1.5">
                    {item.skills.map((skill) => (
                      <li
                        key={skill}
                        className="px-2.5 py-1 rounded-md text-xs font-medium bg-surface-sunken text-ink-soft"
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                </article>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
