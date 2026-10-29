"use client";

import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";
import { Clock, Banknote, TrendingDown, Compass } from "lucide-react";

export function Problem() {
  return (
    <section id="problem" className="py-24 sm:py-32 px-6 max-w-[1200px] mx-auto">
      <Reveal>
        <SectionHeading
          eyebrow="The Problem"
          title="Finding a drug is slow, costly and mostly fails"
          subtitle="Traditional pharmaceutical research relies on testing pre-existing libraries against biological targets. The search space is virtually infinite, but human screening capacity is strictly constrained."
        />
      </Reveal>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <Reveal delay={0.1}>
          <div className="glass p-8 rounded-2xl flex flex-col justify-between h-full group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform">
                <Clock size={24} />
              </div>
              <div className="text-4xl sm:text-5xl font-heading font-bold text-text mb-2">
                10–15 <span className="text-accent text-2xl font-sans font-medium">years</span>
              </div>
              <h3 className="text-xl font-heading font-semibold text-text mb-3">
                Decade-Long Pipeline
              </h3>
              <p className="text-text-muted text-base leading-relaxed">
                From initial target identification and lead optimization to Phase III human clinical trials, developing a single new medicine spans over a decade.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-border text-xs font-mono text-text-dim">
              Source: FDA & Nature Reviews Drug Discovery
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="glass p-8 rounded-2xl flex flex-col justify-between h-full group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-accent-2/10 border border-accent-2/20 flex items-center justify-center text-accent-2 mb-6 group-hover:scale-110 transition-transform">
                <Banknote size={24} />
              </div>
              <div className="text-4xl sm:text-5xl font-heading font-bold text-text mb-2">
                $2.6 <span className="text-accent-2 text-2xl font-sans font-medium">Billion</span>
              </div>
              <h3 className="text-xl font-heading font-semibold text-text mb-3">
                Astronomical Capital
              </h3>
              <p className="text-text-muted text-base leading-relaxed">
                The capitalized R&D cost to discover and gain approval for one new chemical entity averages $2.6B, with failed preclinical attempts driving up total expenditure.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-border text-xs font-mono text-text-dim">
              Source: Tufts Center for the Study of Drug Development
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="glass p-8 rounded-2xl flex flex-col justify-between h-full group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-bad/10 border border-bad/20 flex items-center justify-center text-bad mb-6 group-hover:scale-110 transition-transform">
                <TrendingDown size={24} />
              </div>
              <div className="text-4xl sm:text-5xl font-heading font-bold text-text mb-2">
                90%+ <span className="text-bad text-2xl font-sans font-medium">fail</span>
              </div>
              <h3 className="text-xl font-heading font-semibold text-text mb-3">
                Catastrophic Attrition
              </h3>
              <p className="text-text-muted text-base leading-relaxed">
                Over nine out of ten clinical drug candidates fail in clinical trials due to poor pharmacokinetics, unexpected toxicity, or lack of in-vivo efficacy.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-border text-xs font-mono text-text-dim">
              Source: Nature Biotechnology Analysis
            </div>
          </div>
        </Reveal>
      </div>

      {/* Highlighted Statement Card */}
      <Reveal delay={0.4}>
        <div className="mt-12 p-8 sm:p-10 rounded-2xl relative overflow-hidden bg-gradient-to-r from-surface to-surface-strong border border-border-strong shadow-2xl">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent via-accent-2 to-violet" />
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center text-accent shrink-0">
                <Compass size={26} />
              </div>
              <div>
                <p className="text-xl sm:text-2xl text-text font-heading leading-snug">
                  Drug-like chemical space contains roughly{" "}
                  <span className="font-mono text-accent font-bold">10⁶⁰</span> molecules.
                  Physical labs can test at most{" "}
                  <span className="font-mono text-accent-2 font-bold">10⁷</span>.
                </p>
                <p className="mt-2 text-text-muted text-base sm:text-lg">
                  Testing blind permutations in physical dishes will never scale.{" "}
                  <strong className="text-text font-semibold">
                    Generative AI learns the underlying manifold to navigate directly toward optimal candidates.
                  </strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
