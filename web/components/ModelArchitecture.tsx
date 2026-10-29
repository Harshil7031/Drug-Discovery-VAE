"use client";

import { useState } from "react";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";
import { Lightbox } from "./ui/Lightbox";
import { Term } from "./ui/Term";
import { ArrowDown, Cpu, Sliders, LineChart, Layers, Info } from "lucide-react";

export function ModelArchitecture() {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  return (
    <section id="model" className="py-24 sm:py-32 px-6 max-w-[1200px] mx-auto">
      <Reveal>
        <SectionHeading
          eyebrow="The Model"
          title="A 64-dimensional map of chemistry"
          subtitle="A custom Recurrent Variational Autoencoder parameterized by Gated Recurrent Units (GRUs) that compresses 1D discrete SMILES sequences into a continuous Gaussian manifold."
        />
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-12">
        {/* Left Column: Interactive Neural Architecture Diagram (HTML/SVG) */}
        <Reveal delay={0.1} className="lg:col-span-6 w-full">
          <div className="glass p-6 sm:p-8 rounded-2xl border-border-strong relative">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-border">
              <div className="flex items-center gap-2 text-text font-heading font-semibold text-lg">
                <Layers size={20} className="text-accent" />
                <span>Molecular VAE Tensor Flow</span>
              </div>
              <span className="text-xs font-mono text-accent bg-accent/10 px-2.5 py-1 rounded-full border border-accent/20">
                PyTorch Module
              </span>
            </div>

            <div className="flex flex-col items-center gap-3 text-center">
              {/* 1. Input */}
              <div className="w-full max-w-sm p-3 rounded-xl bg-surface-strong border border-border text-xs font-mono text-text-muted">
                <span className="text-text font-semibold">Input Sequence:</span> (Batch, 122) tokens
              </div>

              <ArrowDown size={18} className="text-border-strong" />

              {/* 2. Embedding */}
              <div className="w-full max-w-sm p-3.5 rounded-xl bg-accent/10 border border-accent/30 text-xs font-mono text-text">
                <span className="text-accent font-semibold">Token Embedding:</span> 38 vocab → 128-D dense
              </div>

              <ArrowDown size={18} className="text-accent/60" />

              {/* 3. Encoder GRU */}
              <div className="w-full max-w-sm p-4 rounded-xl bg-accent/15 border border-accent/40 shadow-lg text-text">
                <div className="text-xs font-mono text-accent font-bold mb-1">ENCODER</div>
                <div className="text-sm font-heading font-bold">GRU (128 → 256 hidden)</div>
                <div className="text-[11px] text-text-muted font-mono mt-0.5">Captures forward sequence syntax</div>
              </div>

              <ArrowDown size={18} className="text-accent/60" />

              {/* 4. Dual Heads (Mu and LogVar) */}
              <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
                <div className="p-3 rounded-xl bg-surface border border-accent/30 text-xs font-mono">
                  <span className="text-accent block font-bold">Linear fc_mu</span>
                  <span className="text-text-muted">256 → 64-D (μ)</span>
                </div>
                <div className="p-3 rounded-xl bg-surface border border-accent/30 text-xs font-mono">
                  <span className="text-accent block font-bold">Linear fc_var</span>
                  <span className="text-text-muted">256 → 64-D (log σ²)</span>
                </div>
              </div>

              <ArrowDown size={18} className="text-violet/60" />

              {/* 5. Latent Space (Violet Glowing Core) */}
              <div className="w-full max-w-sm p-5 rounded-xl bg-violet/20 border-2 border-violet/50 shadow-[0_0_30px_rgba(139,124,255,0.3)] text-text relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-violet/20 via-accent/20 to-violet/20 opacity-30 animate-pulse-glow" />
                <div className="relative z-10">
                  <span className="text-xs font-mono text-violet font-bold uppercase tracking-widest block mb-1">
                    Latent Bottleneck (64-D)
                  </span>
                  <div className="text-base font-heading font-extrabold text-text">
                    z = μ + σ ⊙ ε
                  </div>
                  <div className="text-xs text-text-muted font-mono mt-1">
                    <Term term="Reparameterization">Reparameterization Trick</Term> (ε ~ N(0, I))
                  </div>
                </div>
              </div>

              <ArrowDown size={18} className="text-accent-2/60" />

              {/* 6. Linear z to hidden */}
              <div className="w-full max-w-sm p-3 rounded-xl bg-surface border border-accent-2/30 text-xs font-mono">
                <span className="text-accent-2 block font-bold">Linear fc_z_to_hidden</span>
                <span className="text-text-muted">64-D → 256 decoder initial state h₀</span>
              </div>

              <ArrowDown size={18} className="text-accent-2/60" />

              {/* 7. Decoder GRU */}
              <div className="w-full max-w-sm p-4 rounded-xl bg-accent-2/15 border border-accent-2/40 shadow-lg text-text">
                <div className="text-xs font-mono text-accent-2 font-bold mb-1">DECODER</div>
                <div className="text-sm font-heading font-bold">GRU (128 → 256 hidden)</div>
                <div className="text-[11px] text-text-muted font-mono mt-0.5">Autoregressive sequence decoder</div>
              </div>

              <ArrowDown size={18} className="text-accent-2/60" />

              {/* 8. Output Logits */}
              <div className="w-full max-w-sm p-3.5 rounded-xl bg-accent-2/10 border border-accent-2/30 text-xs font-mono text-text">
                <span className="text-accent-2 font-semibold">Linear fc_out:</span> 256 hidden → 38 character logits
              </div>
            </div>
          </div>
        </Reveal>

        {/* Right Column: Stacked Cards (Loss, Training Specs, Loss Curve) */}
        <div className="lg:col-span-6 flex flex-col gap-6 w-full">
          {/* Card 1: Loss Function */}
          <Reveal delay={0.2}>
            <div className="glass p-6 sm:p-7 rounded-2xl">
              <div className="flex items-center gap-2 text-text font-heading font-semibold text-lg mb-3">
                <Sliders size={20} className="text-accent" />
                <span>Loss Function Formulation</span>
              </div>

              <div className="p-4 rounded-xl bg-[#060913] border border-border font-mono text-sm sm:text-base text-accent mb-3 overflow-x-auto">
                Loss = CrossEntropy + 0.05 × <Term term="KL">KL_Divergence</Term>
              </div>

              <p className="text-sm text-text-muted leading-relaxed">
                We formulate training as a <strong className="text-text">β-VAE</strong>. Setting{" "}
                <code className="text-accent font-mono text-xs bg-accent/10 px-1.5 py-0.5 rounded">β = 0.05</code>{" "}
                prevents posterior collapse (where latent vectors ignore inputs) while strictly enforcing a continuous, smooth Gaussian geometry.
              </p>
            </div>
          </Reveal>

          {/* Card 2: Training Specifications Table */}
          <Reveal delay={0.3}>
            <div className="glass p-6 sm:p-7 rounded-2xl">
              <div className="flex items-center gap-2 text-text font-heading font-semibold text-lg mb-4">
                <Cpu size={20} className="text-accent-2" />
                <span>Training Specifications</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-mono">
                <div className="p-3 rounded-xl bg-bg/50 border border-border">
                  <span className="text-text-dim block mb-0.5">Optimizer</span>
                  <span className="text-text font-bold text-sm">Adam</span>
                </div>
                <div className="p-3 rounded-xl bg-bg/50 border border-border">
                  <span className="text-text-dim block mb-0.5">Learning Rate</span>
                  <span className="text-text font-bold text-sm">0.001</span>
                </div>
                <div className="p-3 rounded-xl bg-bg/50 border border-border">
                  <span className="text-text-dim block mb-0.5">Batch Size</span>
                  <span className="text-text font-bold text-sm">128</span>
                </div>
                <div className="p-3 rounded-xl bg-bg/50 border border-border">
                  <span className="text-text-dim block mb-0.5">Gradient Clip</span>
                  <span className="text-text font-bold text-sm">5.0 (norm)</span>
                </div>
                <div className="p-3 rounded-xl bg-bg/50 border border-border">
                  <span className="text-text-dim block mb-0.5">Vocabulary</span>
                  <span className="text-text font-bold text-sm">38 Tokens</span>
                </div>
                <div className="p-3 rounded-xl bg-bg/50 border border-border">
                  <span className="text-text-dim block mb-0.5">Final Weights</span>
                  <span className="text-text font-bold text-sm">2.63 MB</span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Card 3: Training Loss Curve with Paper Frame */}
          <Reveal delay={0.4}>
            <div className="glass p-6 sm:p-7 rounded-2xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-text font-heading font-semibold text-lg">
                  <LineChart size={20} className="text-accent" />
                  <span>Empirical Training Loss Trajectory</span>
                </div>
                <span className="text-xs font-mono text-text-dim">10 Epochs</span>
              </div>

              {/* Light paper frame per design system */}
              <div
                className="paper-frame group relative"
                onClick={() => setLightboxSrc("/plots/loss_curve.png")}
                title="Click to expand full loss curve"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/plots/loss_curve.png"
                  alt="Training Loss curve over 10 epochs"
                  className="w-full h-auto rounded-lg object-cover"
                />
                <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity flex items-center justify-center">
                  <span className="btn-primary !py-2 !px-4 text-xs">Click to Zoom</span>
                </div>
              </div>

              <div className="mt-3 flex items-start gap-2 text-xs text-text-muted">
                <Info size={14} className="text-accent shrink-0 mt-0.5" />
                <span>
                  Loss steadily descends from 1.43 to 0.31 across 10 epochs, demonstrating rapid learning of SMILES grammar followed by structural refinement.
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <Lightbox
        src={lightboxSrc}
        alt="Training Loss Curve over 10 Epochs"
        onClose={() => setLightboxSrc(null)}
      />
    </section>
  );
}
