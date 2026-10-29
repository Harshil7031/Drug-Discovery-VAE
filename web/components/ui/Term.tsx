"use client";

import { useState } from "react";

const DEFINITIONS: Record<string, string> = {
  QED: "Quantitative Estimate of Drug-likeness (0-1): Composite score of molecular weight, polar surface area, and drug feasibility.",
  SAS: "Synthetic Accessibility Score (1-10): Ease of chemical synthesis in a wet lab. Lower is easier (<4.0 is synthesizable).",
  logP: "Octanol-Water Partition Coefficient: Measures lipophilicity/solubility. Lipinski target range is -0.4 to 5.0.",
  SMILES: "Simplified Molecular Input Line Entry System: 1D ASCII character sequence encoding chemical 2D molecular graphs.",
  VAE: "Variational Autoencoder: Deep generative model encoding inputs to continuous Gaussian latent distributions for de novo sampling.",
  "KL divergence": "Kullback-Leibler Divergence: Mathematical regularization term ensuring the latent space stays smooth and continuous.",
  KL: "Kullback-Leibler Divergence: Regularizes latent distributions toward a standard normal Gaussian prior N(0, I).",
  Reparameterization: "Mathematical trick (z = μ + σ ⊙ ε) isolating randomness so neural gradients can backpropagate through sampling.",
  ELBO: "Evidence Lower Bound: Objective function balancing reconstruction fidelity against latent distribution regularity.",
};

interface TermProps {
  term: keyof typeof DEFINITIONS | string;
  customDef?: string;
  children?: React.ReactNode;
}

export function Term({ term, customDef, children }: TermProps) {
  const [open, setOpen] = useState(false);
  const definition = customDef || DEFINITIONS[term] || "Scientific domain concept.";

  return (
    <span
      className="relative inline-block"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      <span className="border-b border-dotted border-accent/60 cursor-help text-accent hover:text-accent-2 transition-colors">
        {children || term}
      </span>
      {open && (
        <span
          role="tooltip"
          className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 p-3 text-xs rounded-xl bg-[#0A1020]/95 border border-accent/40 text-text shadow-2xl backdrop-blur-md pointer-events-none transition-all duration-200 animate-in fade-in zoom-in-95"
        >
          <strong className="block text-accent font-semibold mb-1">{term}</strong>
          <span className="text-text-muted leading-relaxed">{definition}</span>
        </span>
      )}
    </span>
  );
}
