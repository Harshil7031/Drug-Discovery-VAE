import React from "react";

interface SectionHeadingProps {
  eyebrow: string;
  title: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  centered?: boolean;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  centered = false,
  className = "",
}: SectionHeadingProps) {
  return (
    <div
      className={`mb-12 ${
        centered ? "text-center mx-auto max-w-3xl" : "max-w-3xl"
      } ${className}`}
    >
      <span className="eyebrow mb-3 block">{eyebrow}</span>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-text tracking-tight leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-text-muted text-lg sm:text-xl font-normal leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
