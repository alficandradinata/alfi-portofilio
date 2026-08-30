"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import SpiderWebCanvas from "@/components/SpiderWebCanvas";
import { CornerSpiderWeb, SpiderSenseHud } from "@/components/SpiderDecorations";
import { THEMES } from "@/data/portfolioData";
import { sound } from "@/lib/soundEffects";

export default function Home() {
  const [currentThemeId, setCurrentThemeId] = useState<string>("loki");
  const [soundActive, setSoundActive] = useState<boolean>(false);

  React.useEffect(() => {
    const cursor = document.createElement("div");
    cursor.className = "magic-cursor";
    document.body.appendChild(cursor);

    const moveCursor = (event: MouseEvent) => {
      cursor.style.left = `${event.clientX}px`;
      cursor.style.top = `${event.clientY}px`;
      cursor.classList.remove("is-hidden");
    };

    const handleMouseDown = () => cursor.classList.add("is-clicking");
    const handleMouseUp = () => cursor.classList.remove("is-clicking");
    const handleMouseLeave = () => cursor.classList.add("is-hidden");
    const handleMouseEnter = () => cursor.classList.remove("is-hidden");

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mouseenter", handleMouseEnter);
      cursor.remove();
    };
  }, []);

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
      {/* Interactive Spider-Web Click & Constellation Canvas */}
      <SpiderWebCanvas
        accentColor={activeTheme.accent}
        secondaryColor={activeTheme.secondary}
      />

      {/* Corner Spider Web Graphic Accents */}
      <CornerSpiderWeb position="top-left" color={activeTheme.accent} />
      <CornerSpiderWeb position="top-right" color={activeTheme.secondary} />

      {/* Spider-Verse Matrix Grid Pattern Overlay */}
      <div
        className="fixed inset-0 spider-grid-pattern pointer-events-none opacity-40 z-0"
        aria-hidden="true"
      />

      {/* Floating Spider-Sense Web Shooter HUD */}
      <SpiderSenseHud />

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