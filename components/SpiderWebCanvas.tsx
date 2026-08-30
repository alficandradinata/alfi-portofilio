"use client";

import React, { useEffect, useRef } from "react";
import { sound } from "@/lib/soundEffects";

interface SpiderWebCanvasProps {
  accentColor?: string;
  secondaryColor?: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  pulseSpeed: number;
}

interface WebSpoke {
  angle: number;
  lengthMultiplier: number;
}

interface SparkParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  decay: number;
  color: string;
}

interface WebBurst {
  id: number;
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  spokeCount: number;
  ringCount: number;
  spokes: WebSpoke[];
  sparks: SparkParticle[];
  alpha: number;
  fadeSpeed: number;
  color: string;
  secondaryColor: string;
  rotation: number;
}

export default function SpiderWebCanvas({
  accentColor = "#4ade80",
  secondaryColor = "#d1fae5",
}: SpiderWebCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const burstsRef = useRef<WebBurst[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const isMobile = width < 768;
    const particleCount = isMobile ? 18 : 34;
    const connectionDist = isMobile ? 80 : 110;
    const mouseConnectionDist = isMobile ? 110 : 150;

    const mouse = {
      x: -1000,
      y: -1000,
      radius: mouseConnectionDist,
    };

    // Ambient floating background particles
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 1.6 + 0.8,
        alpha: Math.random() * 0.6 + 0.2,
        pulseSpeed: 0.02 + Math.random() * 0.02,
      });
    }

    const createWebBurst = (clickX: number, clickY: number) => {
      const maxRadius = isMobile ? 70 : 110;
      const smokeCount = isMobile ? 26 : 42;

      const sparks: SparkParticle[] = [];
      for (let i = 0; i < smokeCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 2.8 + 0.8;
        sparks.push({
          x: clickX,
          y: clickY,
          vx: Math.cos(angle) * speed * 0.8,
          vy: Math.sin(angle) * speed * 0.7 - 0.4,
          size: Math.random() * 14 + 10,
          alpha: 0.9,
          decay: Math.random() * 0.018 + 0.01,
          color: Math.random() > 0.5 ? "#bbf7d0" : "#4ade80",
        });
      }

      burstsRef.current.push({
        id: Date.now() + Math.random(),
        x: clickX,
        y: clickY,
        radius: 8,
        maxRadius,
        spokeCount: 0,
        ringCount: 0,
        spokes: [],
        sparks,
        alpha: 1,
        fadeSpeed: 0.02,
        color: "#bbf7d0",
        secondaryColor: "#4ade80",
        rotation: Math.random() * Math.PI,
      });
    };

    const handlePointerDown = (e: PointerEvent) => {
      createWebBurst(e.clientX, e.clientY);
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
      }
    };

    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    let step = 0;

    const render = () => {
      step += 1;
      ctx.clearRect(0, 0, width, height);

      // 1. Draw ambient Loki-esque magical constellation
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        const currentAlpha = p.alpha + Math.sin(step * p.pulseSpeed) * 0.12;

        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 5.5);
        glow.addColorStop(0, `${accentColor}cc`);
        glow.addColorStop(0.25, `${secondaryColor}55`);
        glow.addColorStop(1, "transparent");
        ctx.fillStyle = glow;
        ctx.globalAlpha = Math.max(0.12, Math.min(0.45, currentAlpha));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 5.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = i % 2 === 0 ? accentColor : secondaryColor;
        ctx.globalAlpha = Math.max(0.15, Math.min(0.75, currentAlpha));
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDist) {
            const lineAlpha = (1 - dist / connectionDist) * 0.12;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = i % 3 === 0 ? accentColor : secondaryColor;
            ctx.globalAlpha = lineAlpha;
            ctx.lineWidth = 0.55;
            ctx.stroke();
          }
        }

        const mdx = p.x - mouse.x;
        const mdy = p.y - mouse.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);

        if (mDist < mouseConnectionDist) {
          const mAlpha = (1 - mDist / mouseConnectionDist) * 0.26;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = accentColor;
          ctx.globalAlpha = mAlpha;
          ctx.lineWidth = 0.75;
          ctx.stroke();

          p.x -= (mdx / mDist) * 0.12;
          p.y -= (mdy / mDist) * 0.12;
        }
      }

      // 2. Draw Interactive Spider-Web Click Bursts
      for (let bIdx = burstsRef.current.length - 1; bIdx >= 0; bIdx--) {
        const burst = burstsRef.current[bIdx];

        // Animate radius expansion with easing
        burst.radius += (burst.maxRadius - burst.radius) * 0.18;
        burst.alpha -= burst.fadeSpeed;

        if (burst.alpha <= 0) {
          burstsRef.current.splice(bIdx, 1);
          continue;
        }

        const centerGlow = ctx.createRadialGradient(
          burst.x,
          burst.y,
          0,
          burst.x,
          burst.y,
          burst.radius * 1.2
        );
        centerGlow.addColorStop(0, `${burst.color}40`);
        centerGlow.addColorStop(0.6, `${burst.secondaryColor}15`);
        centerGlow.addColorStop(1, "transparent");

        ctx.fillStyle = centerGlow;
        ctx.globalAlpha = burst.alpha;
        ctx.beginPath();
        ctx.arc(burst.x, burst.y, burst.radius * 1.1, 0, Math.PI * 2);
        ctx.fill();

        // Draw Loki-style green smoke magic burst
        ctx.shadowBlur = 18;
        ctx.shadowColor = burst.secondaryColor;

        for (let sIdx = 0; sIdx < burst.sparks.length; sIdx++) {
          const sp = burst.sparks[sIdx];
          sp.x += sp.vx;
          sp.y += sp.vy;
          sp.vx *= 0.985;
          sp.vy = sp.vy * 0.99 - 0.02;
          sp.alpha -= sp.decay;

          if (sp.alpha > 0) {
            const smokeGradient = ctx.createRadialGradient(
              sp.x,
              sp.y,
              0,
              sp.x,
              sp.y,
              sp.size * 1.8
            );
            smokeGradient.addColorStop(0, `${sp.color}ee`);
            smokeGradient.addColorStop(0.35, `${burst.secondaryColor}cc`);
            smokeGradient.addColorStop(0.7, `${burst.color}55`);
            smokeGradient.addColorStop(1, "transparent");

            ctx.fillStyle = smokeGradient;
            ctx.globalAlpha = Math.max(0, sp.alpha * burst.alpha);
            ctx.beginPath();
            ctx.arc(sp.x, sp.y, sp.size * 1.8, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        // Soft magical glow at the source
        const magicGlow = ctx.createRadialGradient(
          burst.x,
          burst.y,
          0,
          burst.x,
          burst.y,
          burst.radius * 2.2
        );
        magicGlow.addColorStop(0, "rgba(187, 247, 208, 0.9)");
        magicGlow.addColorStop(0.3, "rgba(74, 222, 128, 0.55)");
        magicGlow.addColorStop(1, "transparent");

        ctx.fillStyle = magicGlow;
        ctx.globalAlpha = burst.alpha * 0.9;
        ctx.beginPath();
        ctx.arc(burst.x, burst.y, burst.radius * 2.2, 0, Math.PI * 2);
        ctx.fill();

        ctx.shadowBlur = 0;
      }

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [accentColor, secondaryColor]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-30 opacity-90 transition-opacity duration-500"
    />
  );
}
