"use client";

import React from "react";
import { Briefcase, GraduationCap, Calendar, MapPin, CheckCircle, Award, Sparkles } from "lucide-react";
import { TIMELINE, TimelineItem } from "@/data/portfolioData";
import { sound } from "@/lib/soundEffects";

export default function ExperienceSection() {
  return (
    <section id="journey" className="py-24 relative overflow-hidden">
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" /> Career & Education
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Journey & <br />
              <span className="bg-gradient-to-r from-amber-400 via-rose-500 to-cyan-400 bg-clip-text text-transparent">
                Milestone Experience.
              </span>
            </h2>
          </div>
          <p className="text-slate-400 text-sm max-w-md font-mono">
            Jejak langkah pembelajaran akademis, proyek profesional di instansi, dan dedikasi berkelanjutan dalam rekayasa perangkat lunak.
          </p>
        </div>

        {/* Timeline Flow */}
        <div className="relative border-l-2 border-slate-800 ml-4 sm:ml-8 space-y-12 pl-6 sm:pl-10">
          
          {TIMELINE.map((item, idx) => (
            <div
              key={idx}
              onMouseEnter={() => sound.playHover()}
              className="relative group"
            >
              {/* Timeline Node Point */}
              <div className="absolute -left-[35px] sm:-left-[51px] top-1.5 flex items-center justify-center w-8 h-8 rounded-full bg-slate-950 border-2 border-rose-500 shadow-lg shadow-rose-500/40 group-hover:scale-125 transition-transform">
                {item.type === "work" ? (
                  <Briefcase className="w-3.5 h-3.5 text-rose-400" />
                ) : (
                  <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
                )}
              </div>

              {/* Content Card */}
              <div className="p-6 sm:p-7 rounded-3xl bg-slate-950/80 border border-slate-800/80 group-hover:border-rose-500/40 backdrop-blur-xl transition-all duration-300 hover:shadow-2xl hover:shadow-rose-950/20">
                
                {/* Period & Location Badge */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-rose-500/15 text-rose-300 border border-rose-500/30 flex items-center gap-1.5">
                    <Calendar className="w-3 h-3" />
                    {item.period}
                  </span>
                  
                  <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                    {item.location}
                  </span>
                </div>

                {/* Role & Company */}
                <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-rose-400 transition-colors">
                  {item.role}
                </h3>
                <p className="text-sm font-mono text-cyan-300 font-semibold mb-3">
                  {item.company}
                </p>

                <p className="text-sm text-slate-300 leading-relaxed mb-4">
                  {item.description}
                </p>

                {/* Achievements List */}
                <div className="space-y-2 mb-5">
                  {item.achievements.map((ach, aIdx) => (
                    <div key={aIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{ach}</span>
                    </div>
                  ))}
                </div>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-800/80">
                  {item.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-slate-900 text-slate-300 border border-slate-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}
