"use client";

import { useState } from "react";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";
import { Lightbox } from "./ui/Lightbox";
import { Term } from "./ui/Term";
import { CheckCircle2, Eye, Compass, Sparkles } from "lucide-react";

export function LatentSpace() {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [lightboxAlt, setLightboxAlt] = useState("");

  const openLightbox = (src: string, alt: string) => {
    setLightboxSrc(src);
    setLightboxAlt(alt);
  };

  return (
    <section id="latent" className="py-24 sm:py-32 px-6 max-w-[1200px] mx-auto">
      <Reveal>
        <SectionHeading
          eyebrow="Latent Space"
          title="Similar molecules live close together"
          subtitle="By compressing 38-character sequences into 64 continuous latent dimensions, the VAE organizes chemical properties into a differentiable geometric manifold."
        />
      </Reveal>

      {/* Latent Space 2D Projections (PCA & t-SNE) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-12">
        {/* Left: Image in Paper Frame */}
        <Reveal delay={0.1} className="lg:col-span-7">
          <div className="glass p-5 sm:p-6 rounded-3xl">
            <div className="flex items-center justify-between mb-3 text-xs font-mono text-text-dim">
              <span className="flex items-center gap-1.5 text-accent">
                <Compass size={14} /> 2D Dimensionality Reduction
              </span>
              <span>1,000 Extracted Samples</span>
            </div>

            <div
              className="paper-frame group relative"
              onClick={() =>
                openLightbox(
                  "/plots/latent_space_visualization.png",
                  "PCA and t-SNE 2D Latent Space Manifold Projections"
                )
              }
              title="Click to view full resolution"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/plots/latent_space_visualization.png"
                alt="PCA and t-SNE visualization of the VAE latent space"
                className="w-full h-auto rounded-lg object-contain"
              />
              <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity flex items-center justify-center">
                <span className="btn-primary !py-2 !px-4 text-xs flex items-center gap-1.5">
                  <Eye size={14} />
                  <span>Expand Visualizer</span>
                </span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Right: Caption Bullets */}
        <Reveal delay={0.2} className="lg:col-span-5 flex flex-col gap-4">
          <div className="glass p-6 rounded-2xl flex items-start gap-3.5">
            <CheckCircle2 size={20} className="text-accent shrink-0 mt-0.5" />
            <div>
              <h4 className="text-base font-heading font-semibold text-text mb-1">
                PCA Preserves Global Variance
              </h4>
              <p className="text-sm text-text-muted leading-relaxed">
                Principal Component Analysis captures broad molecular geometry and length variance across orthogonal linear axes.
              </p>
            </div>
          </div>

          <div className="glass p-6 rounded-2xl flex items-start gap-3.5">
            <CheckCircle2 size={20} className="text-accent-2 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-base font-heading font-semibold text-text mb-1">
                t-SNE Groups Local Neighborhoods
              </h4>
              <p className="text-sm text-text-muted leading-relaxed">
                Non-linear manifold embedding groups functionally similar scaffolds, aromatic rings, and functional groups into distinct topological clusters.
              </p>
            </div>
          </div>

          <div className="glass p-6 rounded-2xl flex items-start gap-3.5">
            <CheckCircle2 size={20} className="text-violet shrink-0 mt-0.5" />
            <div>
              <h4 className="text-base font-heading font-semibold text-text mb-1">
                Continuous Vector Interpolation
              </h4>
              <p className="text-sm text-text-muted leading-relaxed">
                Because the manifold is regularized with <Term term="KL">KL divergence</Term>, researchers can walk smoothly between any two chemical endpoints to discover hybrid molecules.
              </p>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Second Image: Top Generated Molecules Grid */}
      <Reveal delay={0.3} className="mt-16">
        <div className="glass p-6 sm:p-8 rounded-3xl border-border-strong">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-4 mb-6 border-b border-border">
            <div className="flex items-center gap-2">
              <Sparkles size={20} className="text-accent" />
              <h3 className="text-xl sm:text-2xl font-heading font-bold text-text">
                Top Generated Candidates by QED
              </h3>
            </div>
            <span className="text-xs font-mono text-text-dim">
              High-Affinity Lead Compounds
            </span>
          </div>

          <div
            className="paper-frame group relative"
            onClick={() =>
              openLightbox(
                "/plots/top_generated_molecules.png",
                "High-Resolution Grid of Top Generated Drug Molecules by QED"
              )
            }
            title="Click to view full resolution"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/plots/top_generated_molecules.png"
              alt="High-resolution grid of top generated molecules by QED"
              className="w-full h-auto rounded-lg object-contain"
            />
            <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity flex items-center justify-center">
              <span className="btn-primary !py-2 !px-4 text-xs flex items-center gap-1.5">
                <Eye size={14} />
                <span>Expand Full Catalog</span>
              </span>
            </div>
          </div>
          <p className="mt-3 text-xs text-text-muted font-mono text-center">
            Top 12 de novo generated molecules achieving drug-likeness scores (QED) exceeding 0.850.
          </p>
        </div>
      </Reveal>

      <Lightbox
        src={lightboxSrc}
        alt={lightboxAlt}
        onClose={() => setLightboxSrc(null)}
      />
    </section>
  );
}
