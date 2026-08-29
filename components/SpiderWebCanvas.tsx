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
  accentColor = "#ff3366",
  secondaryColor = "#00f0ff",
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
    const particleCount = isMobile ? 35 : 75;
    const connectionDist = isMobile ? 95 : 140;
    const mouseConnectionDist = isMobile ? 120 : 180;

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
      const spokeCount = Math.floor(Math.random() * 4) + 8; // 8 to 11 spokes
      const ringCount = Math.floor(Math.random() * 2) + 4; // 4 to 5 concentric web rings
      const maxRadius = isMobile
        ? Math.random() * 30 + 80
        : Math.random() * 40 + 110;

      const spokes: WebSpoke[] = [];
      for (let i = 0; i < spokeCount; i++) {
        const baseAngle = ((Math.PI * 2) / spokeCount) * i;
        spokes.push({
          angle: baseAngle + (Math.random() - 0.5) * 0.15,
          lengthMultiplier: 0.85 + Math.random() * 0.3,
        });
      }

      // Sparkle silk droplets
      const sparks: SparkParticle[] = [];
      const sparkCount = isMobile ? 12 : 22;
      for (let i = 0; i < sparkCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 3.5 + 1.2;
        sparks.push({
          x: clickX,
          y: clickY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.5,
          size: Math.random() * 2 + 1,
          alpha: 1,
          decay: Math.random() * 0.025 + 0.015,
          color: Math.random() > 0.4 ? accentColor : secondaryColor,
        });
      }

      burstsRef.current.push({
        id: Date.now() + Math.random(),
        x: clickX,
        y: clickY,
        radius: 4,
        maxRadius,
        spokeCount,
        ringCount,
        spokes,
        sparks,
        alpha: 1,
        fadeSpeed: 0.014,
        color: accentColor,
        secondaryColor: secondaryColor,
        rotation: Math.random() * Math.PI,
      });

      // Sound trigger
      sound.playWebShoot();
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

      // 1. Draw Ambient Floating Constellation Web
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        // Bounce on edges
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Draw particle dot
        const currentAlpha = p.alpha + Math.sin(step * p.pulseSpeed) * 0.15;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = i % 2 === 0 ? accentColor : secondaryColor;
        ctx.globalAlpha = Math.max(0.1, Math.min(0.8, currentAlpha));
        ctx.fill();

        // Connect nearby particles (web strands)
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDist) {
            const lineAlpha = (1 - dist / connectionDist) * 0.22;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = i % 3 === 0 ? accentColor : secondaryColor;
            ctx.globalAlpha = lineAlpha;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }

        // Connect to mouse cursor
        const mdx = p.x - mouse.x;
        const mdy = p.y - mouse.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);

        if (mDist < mouseConnectionDist) {
          const mAlpha = (1 - mDist / mouseConnectionDist) * 0.55;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = accentColor;
          ctx.globalAlpha = mAlpha;
          ctx.lineWidth = 1.1;
          ctx.stroke();

          // Gentle gravity pull toward mouse
          p.x -= (mdx / mDist) * 0.35;
          p.y -= (mdy / mDist) * 0.35;
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

        // Draw Radial Spokes
        ctx.lineWidth = 1.2;
        ctx.strokeStyle = burst.color;
        ctx.shadowColor = burst.color;
        ctx.shadowBlur = 8;

        const spokeEndpoints: { x: number; y: number }[][] = [];
        for (let r = 0; r < burst.ringCount; r++) {
          spokeEndpoints.push([]);
        }

        burst.spokes.forEach((spoke) => {
          const currentSpokeLen = burst.radius * spoke.lengthMultiplier;
          const endX = burst.x + Math.cos(spoke.angle + burst.rotation) * currentSpokeLen;
          const endY = burst.y + Math.sin(spoke.angle + burst.rotation) * currentSpokeLen;

          ctx.beginPath();
          ctx.moveTo(burst.x, burst.y);
          ctx.lineTo(endX, endY);
          ctx.stroke();

          // Store ring node positions
          for (let r = 0; r < burst.ringCount; r++) {
            const ringDist = (currentSpokeLen * (r + 1)) / burst.ringCount;
            const rx = burst.x + Math.cos(spoke.angle + burst.rotation) * ringDist;
            const ry = burst.y + Math.sin(spoke.angle + burst.rotation) * ringDist;
            spokeEndpoints[r].push({ x: rx, y: ry });
          }
        });

        // Draw Concentric Spiral/Polygon Web Rings
        ctx.lineWidth = 1.0;
        ctx.strokeStyle = burst.secondaryColor;
        ctx.shadowColor = burst.secondaryColor;
        ctx.shadowBlur = 6;

        for (let r = 0; r < burst.ringCount; r++) {
          const ringNodes = spokeEndpoints[r];
          if (ringNodes.length > 2) {
            ctx.beginPath();
            ctx.moveTo(ringNodes[0].x, ringNodes[0].y);

            for (let k = 1; k < ringNodes.length; k++) {
              // Add slight curve between web nodes
              const prev = ringNodes[k - 1];
              const curr = ringNodes[k];
              const midX = (prev.x + curr.x) / 2;
              const midY = (prev.y + curr.y) / 2;
              const inwardSag = 0.94; // slight web sag towards center
              const sagX = burst.x + (midX - burst.x) * inwardSag;
              const sagY = burst.y + (midY - burst.y) * inwardSag;

              ctx.quadraticCurveTo(sagX, sagY, curr.x, curr.y);
            }

            // Close the loop back to first node
            const last = ringNodes[ringNodes.length - 1];
            const first = ringNodes[0];
            const midX = (last.x + first.x) / 2;
            const midY = (last.y + first.y) / 2;
            const sagX = burst.x + (midX - burst.x) * 0.94;
            const sagY = burst.y + (midY - burst.y) * 0.94;
            ctx.quadraticCurveTo(sagX, sagY, first.x, first.y);

            ctx.stroke();
          }
        }

        // Draw Web Center Spider Core Dot
        ctx.shadowBlur = 12;
        ctx.shadowColor = "#ffffff";
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(burst.x, burst.y, 2.5, 0, Math.PI * 2);
        ctx.fill();

        // Animate & Draw Spark Silk Droplets
        ctx.shadowBlur = 4;
        for (let sIdx = 0; sIdx < burst.sparks.length; sIdx++) {
          const sp = burst.sparks[sIdx];
          sp.x += sp.vx;
          sp.y += sp.vy;
          sp.vy += 0.04; // subtle gravity
          sp.alpha -= sp.decay;

          if (sp.alpha > 0) {
            ctx.fillStyle = sp.color;
            ctx.globalAlpha = Math.max(0, sp.alpha * burst.alpha);
            ctx.beginPath();
            ctx.arc(sp.x, sp.y, sp.size, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        // Reset shadow
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
