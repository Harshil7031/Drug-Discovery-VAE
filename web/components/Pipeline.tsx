"use client";

import { useState, useEffect } from "react";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";
import { Database, Scissors, Cpu, Network, RotateCcw, Filter, Sparkles, CheckCircle2 } from "lucide-react";

interface Step {
  id: number;
  name: string;
  short: string;
  icon: React.ElementType;
  bullets: string[];
}

const STEPS: Step[] = [
  {
    id: 1,
    name: "Raw Chemical Data",
    short: "ZINC 250k",
    icon: Database,
    bullets: [
      "249,455 drug-like commercially available small molecules from ZINC database.",
      "4 primary columns: SMILES sequence, logP, QED, and Synthetic Accessibility (SAS).",
      "Average SMILES length: 45.31 characters (maximum sequence length: 110).",
    ],
  },
  {
    id: 2,
    name: "Clean & Tokenize",
    short: "Sequence Prep",
    icon: Scissors,
    bullets: [
      "Strips trailing newlines, filters out outlier strings longer than 120 chars.",
      "Constructs compact 38-token character-level vocabulary (35 chemical chars + PAD, SOS, EOS).",
      "Pads sequences to uniform length 122; splits into 90% train (224,509) and 10% test (24,946).",
    ],
  },
  {
    id: 3,
    name: "GRU Encoder",
    short: "Encoder",
    icon: Cpu,
    bullets: [
      "Token Embedding maps 38 discrete characters to 128-dimensional dense vectors.",
      "Single-layer GRU (hidden dimension: 256) processes sequential molecular grammar.",
      "Two linear heads project final recurrent hidden state into mean (μ) and log-variance (log σ²).",
    ],
  },
  {
    id: 4,
    name: "Latent Space (64-D)",
    short: "Manifold",
    icon: Network,
    bullets: [
      "Reparameterization Trick: z = μ + σ ⊙ ε where ε ~ N(0, I) enables differentiable sampling.",
      "Regularized by KL Divergence (β = 0.05) to ensure a smooth, dense, continuous geometry.",
      "Transforms discrete combinatorial graphs into a continuous 64-dimensional space.",
    ],
  },
  {
    id: 5,
    name: "GRU Decoder",
    short: "Decoder",
    icon: RotateCcw,
    bullets: [
      "Latent vector z initializes hidden state (64 -> 256 Linear projection).",
      "Autoregressive generation reconstructs SMILES character-by-character from <SOS>.",
      "Trained with Teacher Forcing; inferred with multinomial softmax sampling at temperature 1.0.",
    ],
  },
  {
    id: 6,
    name: "RDKit Verification",
    short: "Chemical Filter",
    icon: Filter,
    bullets: [
      "Parses generated SMILES via Chem.MolFromSmiles to enforce physical chemical valence rules.",
      "Achieves 81.31% chemical validity (81,308 / 100,000 samples pass all checks).",
      "Checks 99.95% uniqueness and 100.00% novelty against all 250k training compounds.",
    ],
  },
  {
    id: 7,
    name: "De Novo Molecules",
    short: "Candidate Export",
    icon: Sparkles,
    bullets: [
      "Computes Crippen logP (solubility), QED (drug-likeness), and Ertl SAS (synthesizability).",
      "Exports 81,000+ candidates to structured spreadsheets (CSV) for computational screening.",
      "Generates 84-page high-resolution vector PDF visual catalog (12 molecules per page).",
    ],
  },
];

export function Pipeline() {
  const [activeStep, setActiveStep] = useState(1);
  const [userInteracted, setUserInteracted] = useState(false);

  useEffect(() => {
    if (userInteracted) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev % STEPS.length) + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, [userInteracted]);

  const current = STEPS.find((s) => s.id === activeStep) || STEPS[0];
  const Icon = current.icon;

  return (
    <section id="pipeline" className="py-24 sm:py-32 px-6 max-w-[1200px] mx-auto">
      <Reveal>
        <SectionHeading
          eyebrow="How It Works"
          title="From 250,000 molecules to brand-new ones"
          subtitle="The end-to-end architecture bridges chemical informatics and deep variational inference across seven sequential stages."
        />
      </Reveal>

      {/* Stepper Navigation */}
      <Reveal delay={0.2} className="mt-12">
        <div className="relative">
          {/* Connector Line behind nodes (Desktop) */}
          <div className="hidden lg:block absolute top-[28px] left-[4%] right-[4%] h-[2px] bg-border-strong -z-0">
            {/* Animated flowing dots */}
            <div className="w-full h-full bg-gradient-to-r from-accent via-accent-2 to-violet opacity-60 animate-pulse-glow" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4 relative z-10">
            {STEPS.map((step) => {
              const StepIcon = step.icon;
              const isActive = activeStep === step.id;

              return (
                <button
                  key={step.id}
                  onClick={() => {
                    setActiveStep(step.id);
                    setUserInteracted(true);
                  }}
                  className={`flex flex-col items-center text-center p-3 rounded-2xl transition-all duration-300 group cursor-pointer ${
                    isActive
                      ? "bg-surface-strong border border-accent shadow-[0_0_24px_rgba(45,212,191,0.25)] scale-105"
                      : "bg-surface/50 border border-border hover:border-accent/40 hover:bg-surface"
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                      isActive
                        ? "bg-accent text-[#04131A] shadow-[0_0_15px_var(--accent)]"
                        : "bg-surface border border-border-strong text-text-muted group-hover:text-accent group-hover:border-accent/50"
                    }`}
                  >
                    <StepIcon size={22} />
                  </div>
                  <span className="mt-3 text-[11px] font-mono text-accent uppercase tracking-widest font-semibold">
                    Step {step.id}
                  </span>
                  <span
                    className={`text-xs sm:text-sm font-heading font-medium mt-1 line-clamp-1 ${
                      isActive ? "text-text font-bold" : "text-text-muted"
                    }`}
                  >
                    {step.short}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </Reveal>

      {/* Detail Card for Active Step */}
      <Reveal delay={0.3} className="mt-8">
        <div className="glass p-8 sm:p-10 rounded-2xl relative overflow-hidden border-accent/30 bg-gradient-to-br from-surface to-surface-strong">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-border">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent/20 border border-accent/40 flex items-center justify-center text-accent">
                <Icon size={26} />
              </div>
              <div>
                <span className="eyebrow !text-xs">Pipeline Stage 0{current.id}</span>
                <h3 className="text-2xl sm:text-3xl font-heading font-bold text-text">
                  {current.name}
                </h3>
              </div>
            </div>
            <div className="text-xs font-mono text-text-dim px-3 py-1.5 rounded-full border border-border bg-bg/50">
              Auto-advancing · Click node to inspect
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {current.bullets.map((bullet, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-4 rounded-xl bg-bg/30 border border-border/70"
              >
                <CheckCircle2 size={18} className="text-accent shrink-0 mt-0.5" />
                <p className="text-sm sm:text-base text-text-muted leading-relaxed">
                  {bullet}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
