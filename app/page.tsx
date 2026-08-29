"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import SpiderWebCanvas from "@/components/SpiderWebCanvas";
import { THEMES } from "@/data/portfolioData";
import { sound } from "@/lib/soundEffects";

export default function Home() {
  const [currentThemeId, setCurrentThemeId] = useState<string>("miles");
  const [soundActive, setSoundActive] = useState<boolean>(false);

  const activeTheme = THEMES.find((t) => t.id === currentThemeId) || THEMES[0];

  const handleToggleSound = () => {
    const nextState = !soundActive;
    setSoundActive(nextState);
    sound.setEnabled(nextState);
  };

  const handleSelectTheme = (themeId: string) => {
    setCurrentThemeId(themeId);
  };

  return (
    <div
      className={`min-h-screen relative flex flex-col justify-between transition-colors duration-700 ${activeTheme.class}`}
      style={{
        backgroundColor: "#030712",
      }}
    >
      {/* Interactive Spider-Web Particle Canvas */}
      <SpiderWebCanvas
        accentColor={activeTheme.accent}
        secondaryColor={activeTheme.secondary}
      />

      {/* Spider-Verse Matrix Grid Pattern Overlay */}
      <div
        className="fixed inset-0 spider-grid-pattern pointer-events-none opacity-40 z-0"
        aria-hidden="true"
      />

      {/* Header Navigation */}
      <Navbar
        currentTheme={currentThemeId}
        onSelectTheme={handleSelectTheme}
        soundActive={soundActive}
        onToggleSound={handleToggleSound}
      />

      {/* Main Content Flow */}
      <main className="relative z-10 flex-1">
        <Hero soundActive={soundActive} onToggleSound={handleToggleSound} />
        <ProjectsSection />
        <SkillsSection />
        <AboutSection />
        <ExperienceSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}