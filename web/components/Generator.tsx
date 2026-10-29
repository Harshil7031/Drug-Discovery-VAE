"use client";

import { useState, useEffect, useCallback } from "react";
import { Molecule, FilterOptions } from "@/lib/types";
import { downloadMoleculesAsCsv, shuffleArray } from "@/lib/utils";
import { MoleculeCard } from "./MoleculeCard";
import { MoleculeModal } from "./MoleculeModal";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";
import { Sparkles, Download, RotateCcw, Filter, Info, Dna, Loader2, FileSpreadsheet, FileText } from "lucide-react";

interface GeneratorProps {
  initialPool: Molecule[];
}

export function Generator({ initialPool }: GeneratorProps) {
  const [count, setCount] = useState<number>(12);
  const [filters, setFilters] = useState<FilterOptions>({
    qed80: false,
    sas3: false,
    lipinski: false,
  });

  const [displayedMolecules, setDisplayedMolecules] = useState<Molecule[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Sampling latent vectors...");
  const [hasGenerated, setHasGenerated] = useState(false);
  const [selectedMolecule, setSelectedMolecule] = useState<Molecule | null>(null);

  const handleGenerate = useCallback(() => {
    if (!initialPool || initialPool.length === 0) return;
    setLoading(true);

    const stages = [
      "Sampling z ~ N(0, I) from 64-D latent space...",
      "Autoregressive GRU sequence decoding...",
      "Validating valences with RDKit...",
    ];

    let stageIdx = 0;
    setLoadingText(stages[0]);
    const stageInterval = setInterval(() => {
      stageIdx++;
      if (stageIdx < stages.length) {
        setLoadingText(stages[stageIdx]);
      }
    }, 220);

    setTimeout(() => {
      clearInterval(stageInterval);

      // Apply active filters
      let filtered = [...initialPool];
      if (filters.qed80) {
        filtered = filtered.filter((m) => m.qed >= 0.8);
      }
      if (filters.sas3) {
        filtered = filtered.filter((m) => m.sas <= 3.0);
      }
      if (filters.lipinski) {
        filtered = filtered.filter((m) => m.logP >= -0.4 && m.logP <= 5.0);
      }

      const shuffled = shuffleArray(filtered);
      const selected = shuffled.slice(0, count);

      setDisplayedMolecules(selected);
      setLoading(false);
      setHasGenerated(true);
    }, 700);
  }, [initialPool, count, filters]);

  // Global keyboard shortcut 'G' triggers generation when active
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.key === "g" || e.key === "G") {
        handleGenerate();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleGenerate]);

  const handleReset = () => {
    setCount(12);
    setFilters({ qed80: false, sas3: false, lipinski: false });
    setDisplayedMolecules([]);
    setHasGenerated(false);
  };

  return (
    <section id="generator" className="py-24 sm:py-32 px-6 max-w-[1200px] mx-auto">
      <Reveal>
        <div className="flex flex-col items-start">
          <SectionHeading
            eyebrow="Live Demo"
            title="Generate new drug-like molecules"
            subtitle="Explore de novo candidate structures produced by sampling random vectors from the trained 64-dimensional latent manifold."
          />

          {/* Honesty Pill required by Section 2 & 5 */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/10 border border-accent/25 text-accent text-xs font-mono mb-8">
            <Info size={14} className="shrink-0" />
            <span>
              Sampled from pre-generated molecules (100,000 latent samples, 81,267 valid and novel)
            </span>
          </div>
        </div>
      </Reveal>

      {/* Control Panel Glass Card */}
      <Reveal delay={0.1}>
        <div className="glass p-5 sm:p-7 rounded-3xl border-border-strong mb-12 overflow-hidden">
          <div className="flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-5">
            {/* Slider: Number of molecules */}
            <div className="flex flex-col gap-2 min-w-[200px]">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-text-muted">Batch Size:</span>
                <span className="text-accent font-bold bg-accent/15 px-2.5 py-0.5 rounded-full border border-accent/30">
                  {count} Molecules
                </span>
              </div>
              <div className="flex items-center gap-2">
                {[6, 12, 24].map((step) => (
                  <button
                    key={step}
                    onClick={() => setCount(step)}
                    className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-mono font-medium transition-all ${
                      count === step
                        ? "bg-accent text-[#04131A] font-bold shadow-[0_0_12px_var(--accent)]"
                        : "bg-surface border border-border text-text-muted hover:text-text hover:border-accent/40"
                    }`}
                  >
                    {step}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter Chips */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono text-text-dim flex items-center gap-1 mr-1">
                <Filter size={13} /> Filters:
              </span>

              <button
                onClick={() => setFilters((f) => ({ ...f, qed80: !f.qed80 }))}
                className={`badge cursor-pointer transition-all ${
                  filters.qed80
                    ? "badge-good border-good shadow-[0_0_8px_rgba(52,211,153,0.3)]"
                    : "bg-surface border-border text-text-muted hover:border-accent/40"
                }`}
              >
                QED &gt; 0.80
              </button>

              <button
                onClick={() => setFilters((f) => ({ ...f, sas3: !f.sas3 }))}
                className={`badge cursor-pointer transition-all ${
                  filters.sas3
                    ? "badge-good border-good shadow-[0_0_8px_rgba(52,211,153,0.3)]"
                    : "bg-surface border-border text-text-muted hover:border-accent/40"
                }`}
              >
                SAS &lt; 3.0 (Synthesizable)
              </button>

              <button
                onClick={() => setFilters((f) => ({ ...f, lipinski: !f.lipinski }))}
                className={`badge cursor-pointer transition-all ${
                  filters.lipinski
                    ? "badge-good border-good shadow-[0_0_8px_rgba(52,211,153,0.3)]"
                    : "bg-surface border-border text-text-muted hover:border-accent/40"
                }`}
              >
                Lipinski logP (-0.4..5.0)
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button
                onClick={handleGenerate}
                disabled={loading}
                className="btn-primary text-sm sm:text-base !py-2.5 !px-5"
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Sampling...</span>
                  </>
                ) : (
                  <>
                    <Sparkles size={16} />
                    <span>Generate Batch</span>
                  </>
                )}
              </button>

              {hasGenerated && (
                <>
                  <a
                    href={`/api/download?type=batch&ids=${displayedMolecules.map((m) => m.id).join(",")}`}
                    download="generated_drugs_batch.csv"
                    className="btn-ghost text-xs !py-2 !px-3 flex items-center gap-1.5 text-accent hover:border-accent"
                    title="Download currently displayed molecules as an Excel spreadsheet (CSV)"
                  >
                    <FileSpreadsheet size={15} />
                    <span>Excel (CSV)</span>
                  </a>

                  <a
                    href="/api/download?type=pdf"
                    download="1000_new_drugs_catalog.pdf"
                    className="btn-ghost text-xs !py-2 !px-3 flex items-center gap-1.5 text-accent-2 hover:border-accent-2"
                    title="Download 1,000 molecule visual 2D structures PDF catalog"
                  >
                    <FileText size={15} />
                    <span>PDF Book</span>
                  </a>

                  <button
                    onClick={handleReset}
                    className="btn-ghost !p-2 text-text-muted hover:text-bad"
                    title="Reset generator"
                  >
                    <RotateCcw size={15} />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </Reveal>

      {/* Loading Skeleton State */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-16 h-16 rounded-2xl bg-surface border border-accent/40 flex items-center justify-center text-accent mb-4 animate-bounce">
            <Sparkles size={28} className="animate-spin" />
          </div>
          <p className="font-heading font-semibold text-xl text-text animate-pulse">
            {loadingText}
          </p>
          <p className="text-xs font-mono text-text-dim mt-2">
            Multinomial temperature sampling (T=1.0)
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full mt-10">
            {Array.from({ length: Math.min(count, 6) }).map((_, i) => (
              <div
                key={i}
                className="glass p-5 rounded-2xl h-80 animate-pulse bg-surface/30"
              />
            ))}
          </div>
        </div>
      )}

      {/* Empty State before first click */}
      {!loading && !hasGenerated && (
        <div className="border-2 border-dashed border-border-strong rounded-3xl p-16 sm:p-24 text-center flex flex-col items-center justify-center bg-surface/20">
          <div className="w-16 h-16 rounded-2xl bg-surface border border-border flex items-center justify-center text-text-dim mb-4">
            <Dna size={32} />
          </div>
          <h3 className="text-xl sm:text-2xl font-heading font-semibold text-text">
            Ready to sample the chemical latent space
          </h3>
          <p className="mt-2 text-text-muted text-base max-w-md">
            Click <strong className="text-accent font-semibold">Generate Batch</strong> above or press the <kbd className="px-2 py-0.5 rounded bg-surface border border-border font-mono text-xs text-accent">G</kbd> key to generate drug molecules.
          </p>
        </div>
      )}

      {/* Generated Molecules Grid */}
      {!loading && hasGenerated && (
        <div>
          {displayedMolecules.length === 0 ? (
            <div className="glass p-12 text-center rounded-2xl">
              <p className="text-lg text-warn font-heading">
                No molecules matched all active filters.
              </p>
              <p className="text-sm text-text-muted mt-2">
                Try unchecking some filter chips above to broaden the candidate search criteria.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedMolecules.map((molecule, idx) => (
                <MoleculeCard
                  key={molecule.id}
                  molecule={molecule}
                  onClick={(m) => setSelectedMolecule(m)}
                  index={idx}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Molecule Details Modal */}
      <MoleculeModal
        molecule={selectedMolecule}
        onClose={() => setSelectedMolecule(null)}
      />
    </section>
  );
}
