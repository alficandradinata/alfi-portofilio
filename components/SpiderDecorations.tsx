"use client";

import React, { useState } from "react";
import { Sparkles, HelpCircle } from "lucide-react";
import { sound } from "@/lib/soundEffects";

export function CornerSpiderWeb({
  position = "top-left",
  color = "#ff3366",
}: {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  color?: string;
}) {
  const getTransform = () => {
    switch (position) {
      case "top-right":
        return "scale-x-[-1]";
      case "bottom-left":
        return "scale-y-[-1]";
      case "bottom-right":
        return "scale-[-1]";
      default:
        return "";
    }
  };

  const getPositionClass = () => {
    switch (position) {
      case "top-right":
        return "top-0 right-0";
      case "bottom-left":
        return "bottom-0 left-0";
      case "bottom-right":
        return "bottom-0 right-0";
      default:
        return "top-0 left-0";
    }
  };

  return (
    <div
      className={`absolute ${getPositionClass()} ${getTransform()} pointer-events-none z-10 opacity-35 overflow-hidden w-28 h-28 sm:w-44 sm:h-44 transition-opacity duration-700`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 160 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Radial Spokes */}
        <line x1="0" y1="0" x2="160" y2="0" stroke={color} strokeWidth="1" strokeOpacity="0.8" />
        <line x1="0" y1="0" x2="150" y2="40" stroke={color} strokeWidth="1" strokeOpacity="0.7" />
        <line x1="0" y1="0" x2="130" y2="80" stroke={color} strokeWidth="1" strokeOpacity="0.7" />
        <line x1="0" y1="0" x2="100" y2="120" stroke={color} strokeWidth="1" strokeOpacity="0.7" />
        <line x1="0" y1="0" x2="60" y2="145" stroke={color} strokeWidth="1" strokeOpacity="0.7" />
        <line x1="0" y1="0" x2="0" y2="160" stroke={color} strokeWidth="1" strokeOpacity="0.8" />

        {/* Concentric Curves */}
        <path
          d="M30 0 Q25 15 20 20 Q15 25 0 30"
          stroke={color}
          strokeWidth="0.8"
          strokeOpacity="0.6"
        />
        <path
          d="M60 0 Q50 30 40 40 Q30 50 0 60"
          stroke={color}
          strokeWidth="0.8"
          strokeOpacity="0.6"
        />
        <path
          d="M95 0 Q80 45 65 65 Q45 80 0 95"
          stroke={color}
          strokeWidth="0.8"
          strokeOpacity="0.6"
        />
        <path
          d="M130 0 Q110 60 90 90 Q60 110 0 130"
          stroke={color}
          strokeWidth="0.8"
          strokeOpacity="0.6"
        />
        <path
          d="M160 0 Q140 75 115 115 Q75 140 0 160"
          stroke={color}
          strokeWidth="0.8"
          strokeOpacity="0.6"
        />
      </svg>
    </div>
  );
}
