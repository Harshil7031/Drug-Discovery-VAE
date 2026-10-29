"use client";

import { useEffect, useState } from "react";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { CountUp } from "./ui/CountUp";

interface RingMetricProps {
  label: string;
  percentage: number;
  numerator: string;
  denominator: string;
  subtext: string;
  color?: string;
}

export function RingMetric({
  label,
  percentage,
  numerator,
  denominator,
  subtext,
  color = "#2DD4BF",
}: RingMetricProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [animatedPercent, setAnimatedPercent] = useState(0);

  const radius = 54;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    if (isInView) {
      setAnimatedPercent(percentage);
    }
  }, [isInView, percentage]);

  const strokeDashoffset = circumference - (animatedPercent / 100) * circumference;

  return (
    <div
      ref={ref}
      className="glass p-7 rounded-3xl flex flex-col items-center text-center relative overflow-hidden group"
    >
      {/* Background glow */}
      <div
        className="absolute w-32 h-32 rounded-full blur-3xl opacity-15 pointer-events-none -top-10 -right-10"
        style={{ backgroundColor: color }}
      />

      <span className="eyebrow !text-xs mb-4">{label}</span>

      {/* SVG Animated Circular Progress Ring */}
      <div className="relative w-36 h-36 flex items-center justify-center my-2">
        <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 130 130">
          {/* Background circle */}
          <circle
            cx="65"
            cy="65"
            r={radius}
            className="stroke-surface-strong"
            strokeWidth="9"
            fill="transparent"
          />
          {/* Progress bar */}
          <circle
            cx="65"
            cy="65"
            r={radius}
            stroke={color}
            strokeWidth="9"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            style={{
              transition: "stroke-dashoffset 1.6s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />
        </svg>

        {/* Center Number */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-3xl font-heading font-extrabold text-text">
            <CountUp value={percentage} decimals={percentage % 1 !== 0 ? 2 : 0} suffix="%" />
          </div>
        </div>
      </div>

      <div className="mt-3 text-sm font-mono text-text font-semibold">
        {numerator} <span className="text-text-dim">/ {denominator}</span>
      </div>

      <p className="mt-1 text-xs text-text-muted font-normal">
        {subtext}
      </p>
    </div>
  );
}
