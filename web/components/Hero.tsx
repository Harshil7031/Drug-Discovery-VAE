"use client";

import { MoleculeCanvas } from "./MoleculeCanvas";
import { CountUp } from "./ui/CountUp";
import { Reveal } from "./ui/Reveal";
import { Sparkles, BarChart3, ChevronDown, Database, Cpu, Dna, ShieldCheck } from "lucide-react";

export function Hero() {
  return (
    <section
      id="overview"
      className="relative min-h-[92vh] pt-32 pb-20 flex flex-col justify-center items-center overflow-hidden px-6"
    >
      <MoleculeCanvas />

      <div className="relative z-10 max-w-[1200px] w-full mx-auto text-center flex flex-col items-center">
        {/* Eyebrow badge */}
        <Reveal delay={0.1}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-accent/30 bg-surface/80 backdrop-blur-md mb-6">
            <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
            <span className="eyebrow !text-xs !tracking-widest">
              GENERATIVE AI · SEMESTER VII · HEALTHCARE
            </span>
          </div>
        </Reveal>

        {/* H1 Title */}
        <Reveal delay={0.2}>
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-extrabold tracking-tight text-text leading-[1.08] max-w-5xl">
            Drug Discovery{" "}
            <span className="text-gradient">Using VAEs</span>
          </h1>
        </Reveal>

        {/* Subtitle */}
        <Reveal delay={0.3}>
          <p className="mt-6 text-lg sm:text-xl md:text-2xl text-text-muted max-w-3xl leading-relaxed font-normal">
            A Variational Autoencoder that learns the language of drug-like molecules,
            then invents brand-new ones.
          </p>
        </Reveal>

        {/* Action Buttons */}
        <Reveal delay={0.4}>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <a href="#generator" className="btn-primary text-base">
              <Sparkles size={18} />
              <span>Try the Generator</span>
            </a>
            <a href="#results" className="btn-ghost text-base">
              <BarChart3 size={18} />
              <span>View Results</span>
            </a>
          </div>
        </Reveal>

        {/* 4 Stat Cards */}
        <Reveal delay={0.5} className="w-full mt-16 lg:mt-24">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full text-left">
            {/* Stat 1 */}
            <div className="glass p-5 sm:p-6 rounded-2xl relative overflow-hidden group">
              <div className="flex items-center justify-between text-text-muted mb-2">
                <span className="text-xs sm:text-sm font-medium tracking-wide">Training Corpus</span>
                <Database size={16} className="text-accent/70" />
              </div>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-gradient">
                <CountUp value={249455} />
              </div>
              <p className="mt-1 text-xs sm:text-sm text-text-muted font-normal">
                ZINC 250k drug molecules
              </p>
            </div>

            {/* Stat 2 */}
            <div className="glass p-5 sm:p-6 rounded-2xl relative overflow-hidden group">
              <div className="flex items-center justify-between text-text-muted mb-2">
                <span className="text-xs sm:text-sm font-medium tracking-wide">Chemical Manifold</span>
                <Cpu size={16} className="text-accent/70" />
              </div>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-gradient">
                <span>64-D</span>
              </div>
              <p className="mt-1 text-xs sm:text-sm text-text-muted font-normal">
                Continuous latent space
              </p>
            </div>

            {/* Stat 3 */}
            <div className="glass p-5 sm:p-6 rounded-2xl relative overflow-hidden group">
              <div className="flex items-center justify-between text-text-muted mb-2">
                <span className="text-xs sm:text-sm font-medium tracking-wide">Novel Compounds</span>
                <Dna size={16} className="text-accent/70" />
              </div>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-gradient">
                <CountUp value={81267} />
              </div>
              <p className="mt-1 text-xs sm:text-sm text-text-muted font-normal">
                Valid, unique, de novo
              </p>
            </div>

            {/* Stat 4 */}
            <div className="glass p-5 sm:p-6 rounded-2xl relative overflow-hidden group">
              <div className="flex items-center justify-between text-text-muted mb-2">
                <span className="text-xs sm:text-sm font-medium tracking-wide">Drug-likeness</span>
                <ShieldCheck size={16} className="text-accent/70" />
              </div>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-gradient">
                <CountUp value={0.72} decimals={2} />
              </div>
              <p className="mt-1 text-xs sm:text-sm text-text-muted font-normal">
                Average QED score
              </p>
            </div>
          </div>
        </Reveal>

        {/* Scroll indicator */}
        <div className="mt-12 text-text-dim flex flex-col items-center gap-1 animate-bounce">
          <span className="text-xs font-mono tracking-widest uppercase">Scroll Down</span>
          <ChevronDown size={18} />
        </div>
      </div>
    </section>
  );
}
