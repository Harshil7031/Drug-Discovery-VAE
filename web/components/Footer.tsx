"use client";

import { site } from "@/config/site";
import { Github, Command, ExternalLink, ShieldAlert } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#04060E] border-t border-border pt-16 pb-12 px-6">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-border/60">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg bg-surface border border-accent/40 flex items-center justify-center">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2l8.66 5v10L12 22l-8.66-5V7L12 2z" />
                  <circle cx="12" cy="12" r="2" fill="var(--accent)" />
                </svg>
              </div>
              <span className="font-heading font-bold text-lg text-text">
                {site.name}
              </span>
            </div>
            <p className="text-sm text-text-muted max-w-md">
              {site.tagline}
            </p>
            <p className="text-xs text-text-dim mt-2 font-mono">
              {site.course} · {site.university}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost !py-2.5 !px-4 text-xs flex items-center gap-2"
            >
              <Github size={16} />
              <span>GitHub Repository</span>
              <ExternalLink size={12} className="text-text-dim" />
            </a>

            <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-surface border border-border text-xs font-mono text-text-dim">
              <Command size={14} className="text-accent" />
              <span>Keys 1-8 navigate · G generates</span>
            </div>
          </div>
        </div>

        {/* Tech Stack Chips */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-text-dim">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-text-muted">Tech Stack:</span>
            {["PyTorch", "RDKit", "Next.js", "TypeScript", "Tailwind CSS", "Recharts", "Framer Motion"].map(
              (tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-md bg-surface border border-border text-text-muted"
                >
                  {tech}
                </span>
              )
            )}
          </div>
          <div>Unit 5: Healthcare & Drug Discovery</div>
        </div>

        {/* Disclaimer */}
        <div className="pt-4 border-t border-border/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-text-dim">
          <div className="flex items-center gap-2">
            <ShieldAlert size={14} className="text-warn shrink-0" />
            <span>
              Research and educational use only. Computational predictions do not constitute medical advice or approved therapeutics.
            </span>
          </div>
          <div>© 2026 {site.university} · School of Technology</div>
        </div>
      </div>
    </footer>
  );
}
