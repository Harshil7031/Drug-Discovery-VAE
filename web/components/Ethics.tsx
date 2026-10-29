"use client";

import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";
import { AlertTriangle, ShieldCheck, ArrowRight, Dna, Compass, Filter, Zap } from "lucide-react";

export function Ethics() {
  return (
    <section id="ethics" className="py-24 sm:py-32 px-6 max-w-[1200px] mx-auto">
      <Reveal>
        <SectionHeading
          eyebrow="Responsible AI"
          title="What this model cannot do"
          subtitle="Honest scientific appraisal of algorithmic limitations, safety guardrails, and ethical responsibilities in biomedical generative intelligence."
        />
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        {/* Column 1: Limitations (Amber Accent) */}
        <Reveal delay={0.1}>
          <div className="glass p-8 sm:p-10 rounded-3xl border-warn/30 h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 text-warn mb-6">
                <div className="w-12 h-12 rounded-xl bg-warn/15 border border-warn/30 flex items-center justify-center">
                  <AlertTriangle size={24} />
                </div>
                <div>
                  <span className="text-xs font-mono text-warn/80 uppercase tracking-widest block font-semibold">
                    Technical Bounds
                  </span>
                  <h3 className="text-2xl font-heading font-bold text-text">
                    Current Limitations
                  </h3>
                </div>
              </div>

              <ul className="space-y-4 text-sm sm:text-base text-text-muted">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-warn shrink-0 mt-2.5" />
                  <span>
                    <strong className="text-text">18.69% Chemical Invalides:</strong> While the model achieves 81.31% validity, nearly one in five generated strings violates octet valences or ring closures and must be caught by post-hoc RDKit filtering.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-warn shrink-0 mt-2.5" />
                  <span>
                    <strong className="text-text">Non-Unique String Reconstruction:</strong> SMILES depth-first traversals are non-unique; slight character variances can alter strings while preserving the underlying graph, making character token reconstruction near 0%.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-warn shrink-0 mt-2.5" />
                  <span>
                    <strong className="text-text">Absence of Wet-Lab Validation:</strong> All generated candidate scores (logP, QED, SAS) are computed in-silico heuristics and require physical chemical synthesis and biological binding assays to confirm true efficacy.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-warn shrink-0 mt-2.5" />
                  <span>
                    <strong className="text-text">Training Corpus Bias:</strong> The model is constrained to the chemical subspace represented in the ZINC 250k commercial dataset, with limited coverage of rare macrocycles or peptide hybrids.
                  </span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-border text-xs font-mono text-text-dim">
              Empirically observed in Phase 7 Deep Evaluation
            </div>
          </div>
        </Reveal>

        {/* Column 2: Ethics & Dual-Use Risk (Teal Accent) */}
        <Reveal delay={0.2}>
          <div className="glass p-8 sm:p-10 rounded-3xl border-accent/30 h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 text-accent mb-6">
                <div className="w-12 h-12 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <span className="text-xs font-mono text-accent/80 uppercase tracking-widest block font-semibold">
                    Governance & Safety
                  </span>
                  <h3 className="text-2xl font-heading font-bold text-text">
                    Ethical Safeguards
                  </h3>
                </div>
              </div>

              <ul className="space-y-4 text-sm sm:text-base text-text-muted">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-2.5" />
                  <span>
                    <strong className="text-text">Dual-Use & Misuse Prevention:</strong> Molecular generative algorithms could theoretically be inverted to design potent neurotoxins or dangerous controlled agents. Strict screening protocols must govern synthesis orders.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-2.5" />
                  <span>
                    <strong className="text-text">Research Candidate Disclaimer:</strong> Generated structures are computational hypotheses intended strictly for academic exploration. They do not constitute approved pharmaceuticals or clinical medical advice.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-2.5" />
                  <span>
                    <strong className="text-text">Bias in Chemical Design:</strong> AI systems mirror systemic imbalances in public bioactivity repositories. Responsible deployment demands diversifying training sources across neglected diseases.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-2.5" />
                  <span>
                    <strong className="text-text">Responsible AI Standards:</strong> Compliance with international life-sciences oversight, open-source model reporting, and transparent metric evaluation before candidate progression.
                  </span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-border text-xs font-mono text-text-dim">
              Aligned with WHO & Asilomar AI Principles
            </div>
          </div>
        </Reveal>
      </div>

      {/* Future Work Chips */}
      <Reveal delay={0.3} className="mt-12">
        <div className="glass p-6 sm:p-8 rounded-2xl border-border">
          <div className="flex items-center gap-2 text-text font-heading font-semibold text-lg mb-4">
            <Zap size={20} className="text-accent" />
            <span>Future Architectural Roadmap</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            <div className="p-4 rounded-xl bg-bg/50 border border-border flex items-center gap-3">
              <Dna size={18} className="text-accent shrink-0" />
              <div>
                <span className="text-sm font-heading font-bold text-text block">
                  Junction Tree VAE (JT-VAE)
                </span>
                <span className="text-xs text-text-dim">Graph-level valid subgraphs</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-bg/50 border border-border flex items-center gap-3">
              <Compass size={18} className="text-accent-2 shrink-0" />
              <div>
                <span className="text-sm font-heading font-bold text-text block">
                  Property Optimization
                </span>
                <span className="text-xs text-text-dim">Bayesian latent optimization</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-bg/50 border border-border flex items-center gap-3">
              <Filter size={18} className="text-violet shrink-0" />
              <div>
                <span className="text-sm font-heading font-bold text-text block">
                  Docking & ADMET Filters
                </span>
                <span className="text-xs text-text-dim">In-silico protein target binding</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-bg/50 border border-border flex items-center gap-3">
              <Zap size={18} className="text-good shrink-0" />
              <div>
                <span className="text-sm font-heading font-bold text-text block">
                  FastAPI Model Serving
                </span>
                <span className="text-xs text-text-dim">GPU microservice inference</span>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
