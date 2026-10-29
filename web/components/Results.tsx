"use client";

import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";
import { RingMetric } from "./RingMetric";
import { DistributionChart } from "./DistributionChart";
import { Explorer } from "./Explorer";
import { MetricsData, Molecule } from "@/lib/types";
import { CheckCircle2, Trophy, BarChart2, Download, FileSpreadsheet, FileText } from "lucide-react";

interface ResultsProps {
  metrics: MetricsData;
  molecules: Molecule[];
}

export function Results({ metrics, molecules }: ResultsProps) {
  return (
    <section id="results" className="py-24 sm:py-32 px-6 max-w-[1200px] mx-auto">
      <Reveal>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6">
          <SectionHeading
            eyebrow="Results"
            title="Measured on 100,000 generated samples"
            subtitle="Large-scale statistical evaluation confirming that our VAE has internalized chemical grammar without mode collapse or memorization."
            className="!mb-0"
          />

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="/api/download?type=81k"
              download="all_generated_drugs_81k.csv"
              className="btn-ghost text-xs !py-2.5 !px-4 flex items-center gap-2 border-accent/40 text-accent hover:bg-accent/10"
              title="Download entire verified 81,000+ molecule dataset"
            >
              <FileSpreadsheet size={15} />
              <span>Full 81k Dataset (CSV)</span>
            </a>

            <a
              href="/api/download?type=pdf"
              download="1000_new_drugs_catalog.pdf"
              className="btn-ghost text-xs !py-2.5 !px-4 flex items-center gap-2 border-accent-2/40 text-accent-2 hover:bg-accent-2/10"
              title="Download 84-page visual molecular catalog PDF"
            >
              <FileText size={15} />
              <span>1,000 Drugs Catalog (PDF)</span>
            </a>
          </div>
        </div>
      </Reveal>

      {/* 3 Large Circular Progress Ring Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <Reveal delay={0.1}>
          <RingMetric
            label="Chemical Validity"
            percentage={metrics.percentages.validity}
            numerator="81,308"
            denominator="100,000"
            subtext="Molecules pass strict RDKit physical valence rules"
            color="#2DD4BF"
          />
        </Reveal>

        <Reveal delay={0.2}>
          <RingMetric
            label="Structural Uniqueness"
            percentage={metrics.percentages.uniqueness}
            numerator="81,267"
            denominator="81,308"
            subtext="Distinct scaffolds; confirms zero mode collapse"
            color="#22D3EE"
          />
        </Reveal>

        <Reveal delay={0.3}>
          <RingMetric
            label="De Novo Novelty"
            percentage={metrics.percentages.novelty}
            numerator="81,267"
            denominator="81,267"
            subtext="Completely absent from the 250k ZINC training set"
            color="#8B7CFF"
          />
        </Reveal>
      </div>

      {/* Target vs Achieved Table */}
      <Reveal delay={0.2} className="mt-12">
        <div className="glass p-6 sm:p-8 rounded-3xl border-border-strong">
          <div className="flex items-center gap-2 text-text font-heading font-semibold text-lg mb-6">
            <Trophy size={20} className="text-accent" />
            <span>Target Benchmark vs. Empirical Performance</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Metric 1 */}
            <div className="p-4 rounded-2xl bg-surface border border-good/30 flex items-start gap-3">
              <CheckCircle2 size={20} className="text-good shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-mono text-text-dim block">Validity Target &gt; 70%</span>
                <span className="text-2xl font-heading font-bold text-good">
                  {metrics.percentages.validity}%
                </span>
                <span className="text-xs text-text-muted block mt-0.5">+11.31% over benchmark</span>
              </div>
            </div>

            {/* Metric 2 */}
            <div className="p-4 rounded-2xl bg-surface border border-good/30 flex items-start gap-3">
              <CheckCircle2 size={20} className="text-good shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-mono text-text-dim block">Uniqueness Target &gt; 95%</span>
                <span className="text-2xl font-heading font-bold text-good">
                  {metrics.percentages.uniqueness}%
                </span>
                <span className="text-xs text-text-muted block mt-0.5">+4.95% over benchmark</span>
              </div>
            </div>

            {/* Metric 3 */}
            <div className="p-4 rounded-2xl bg-surface border border-good/30 flex items-start gap-3">
              <CheckCircle2 size={20} className="text-good shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-mono text-text-dim block">Novelty Target &gt; 90%</span>
                <span className="text-2xl font-heading font-bold text-good">
                  {metrics.percentages.novelty}%
                </span>
                <span className="text-xs text-text-muted block mt-0.5">+10.00% over benchmark</span>
              </div>
            </div>

            {/* Metric 4 */}
            <div className="p-4 rounded-2xl bg-surface border border-good/30 flex items-start gap-3">
              <CheckCircle2 size={20} className="text-good shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-mono text-text-dim block">Average QED &gt; 0.65</span>
                <span className="text-2xl font-heading font-bold text-good">
                  {metrics.comparison.generated.meanQed.toFixed(2)}
                </span>
                <span className="text-xs text-text-muted block mt-0.5">Matches real ZINC dataset</span>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Distribution Charts */}
      <Reveal delay={0.3} className="mt-12">
        <DistributionChart
          qedData={metrics.histograms.qed}
          logPData={metrics.histograms.logP}
          sasData={metrics.histograms.sas}
        />
      </Reveal>

      {/* Molecule Explorer Sub-section */}
      <Reveal delay={0.4}>
        <Explorer molecules={molecules} />
      </Reveal>
    </section>
  );
}
