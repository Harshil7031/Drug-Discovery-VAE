"use client";

import { useEffect, useState } from "react";
import { site } from "@/config/site";
import { Menu, X, Sparkles, Command } from "lucide-react";

const NAV_LINKS = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "Problem" },
  { id: "pipeline", label: "Pipeline" },
  { id: "model", label: "Model" },
  { id: "generator", label: "Generator" },
  { id: "results", label: "Results" },
  { id: "latent", label: "Latent Space" },
  { id: "ethics", label: "Ethics" },
];

export function Navbar() {
  const [activeSection, setActiveSection] = useState("overview");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 20);

      // Scroll progress
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((scrollY / totalHeight) * 100);
      }

      // Scroll-spy
      const sections = NAV_LINKS.map((link) => document.getElementById(link.id));
      const scrollPosition = scrollY + 250;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(NAV_LINKS[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top scroll progress indicator */}
      <div
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-accent via-accent-2 to-violet z-50 transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
      />

      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "h-[64px] bg-[#060913]/85 backdrop-blur-md border-b border-border shadow-lg"
            : "h-[76px] bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-[1240px] h-full mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#overview"
            className="flex items-center gap-3 text-text hover:text-accent transition-colors group"
          >
            <div className="w-9 h-9 rounded-xl bg-surface border border-border-strong flex items-center justify-center group-hover:border-accent transition-colors">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2l8.66 5v10L12 22l-8.66-5V7L12 2z" />
                <circle cx="12" cy="12" r="2.5" fill="var(--accent)" />
              </svg>
            </div>
            <span className="font-heading font-bold text-lg tracking-tight">
              {site.name}
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "text-accent"
                      : "text-text-muted hover:text-text"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-accent rounded-full shadow-[0_0_8px_var(--accent)]" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* CTA & Shortcut Hint */}
          <div className="hidden lg:flex items-center gap-3">
            <div
              className="flex items-center gap-1 text-[11px] font-mono text-text-dim px-2.5 py-1 rounded-md border border-border bg-surface"
              title="Keyboard shortcut: Press 1-8 to navigate sections, G for generator"
            >
              <Command size={12} />
              <span>Keys 1-8</span>
            </div>
            <a
              href="#generator"
              className="btn-primary text-xs !py-2.5 !px-4"
            >
              <Sparkles size={14} />
              <span>Generate</span>
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="lg:hidden p-2 text-text-muted hover:text-text rounded-lg border border-border bg-surface"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Slide-down Panel */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0A1020]/95 backdrop-blur-xl border-b border-border-strong px-6 py-6 animate-in slide-in-from-top duration-200">
            <div className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`py-2 text-base font-medium transition-colors ${
                    activeSection === link.id
                      ? "text-accent font-semibold"
                      : "text-text-muted hover:text-text"
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-3 border-t border-border flex justify-between items-center">
                <span className="text-xs text-text-dim font-mono">Press 1-8 to jump</span>
                <a
                  href="#generator"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn-primary text-xs !py-2.5 !px-4"
                >
                  <Sparkles size={14} />
                  <span>Try Generator</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
