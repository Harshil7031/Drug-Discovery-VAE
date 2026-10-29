"use client";

import { useEffect, useState } from "react";
import { Molecule } from "@/lib/types";
import { getQedBadgeClass, getSasBadgeClass, getLogPBadgeClass } from "@/lib/utils";
import { X, Copy, Check, Dna, Activity, Beaker, CheckCircle2 } from "lucide-react";

interface MoleculeModalProps {
  molecule: Molecule | null;
  onClose: () => void;
  zincAvg?: { qed: number; logP: number; sas: number };
}

export function MoleculeModal({
  molecule,
  onClose,
  zincAvg = { qed: 0.728, logP: 2.457, sas: 3.053 },
}: MoleculeModalProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!molecule) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [molecule, onClose]);

  if (!molecule) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(molecule.smiles);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const idFormatted = String(molecule.id).padStart(4, "0");

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="relative max-w-2xl w-full bg-[#0A1020] border border-border-strong rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden animate-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <div className="flex items-center gap-3">
            <span className="text-accent font-mono text-sm font-bold bg-accent/15 px-3 py-1 rounded-full border border-accent/30">
              Candidate #{idFormatted}
            </span>
            <span className="text-xs text-text-dim font-mono">De Novo VAE Sample</span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-2 rounded-full text-text-muted hover:text-text hover:bg-surface transition-colors border border-border"
          >
            <X size={18} />
          </button>
        </div>

        {/* Big Drawing */}
        <div className="mt-6 aspect-[16/9] w-full rounded-2xl bg-[#060913] border border-border p-4 flex items-center justify-center overflow-hidden relative shadow-inner">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={molecule.svg}
            alt={molecule.smiles}
            className="max-h-full max-w-full object-contain drop-shadow-[0_0_12px_rgba(230,237,247,0.2)]"
          />
        </div>

        {/* SMILES Section */}
        <div className="mt-6 p-3.5 rounded-xl bg-bg border border-border font-mono text-xs text-text-muted flex items-center justify-between gap-3">
          <div className="truncate select-all">
            <span className="text-text-dim block text-[10px] uppercase tracking-wider mb-0.5">
              SMILES Sequence
            </span>
            <span className="text-text font-mono text-sm">{molecule.smiles}</span>
          </div>
          <button
            onClick={handleCopy}
            className="btn-ghost !py-1.5 !px-3 text-xs shrink-0 flex items-center gap-1.5"
            title="Copy SMILES to clipboard"
          >
            {copied ? (
              <>
                <Check size={14} className="text-good" />
                <span className="text-good font-semibold">Copied</span>
              </>
            ) : (
              <>
                <Copy size={14} />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Chemical Metrics Cards with Explanations */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mt-6">
          {/* QED */}
          <div className="p-4 rounded-2xl bg-surface border border-border">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-mono text-text-muted flex items-center gap-1">
                <Dna size={14} className="text-accent" />
                <span>QED Score</span>
              </span>
              <span className={`badge ${getQedBadgeClass(molecule.qed)} !text-xs !py-0.5 !px-2`}>
                {molecule.qed >= 0.75 ? "Optimal" : molecule.qed >= 0.6 ? "Good" : "Suboptimal"}
              </span>
            </div>
            <div className="text-2xl font-heading font-bold text-text">
              {molecule.qed.toFixed(3)}
            </div>
            <p className="text-[11px] text-text-dim mt-1">Drug-likeness (0 to 1)</p>
            <div className="mt-2 pt-2 border-t border-border/50 text-[11px] font-mono text-accent">
              vs ZINC avg: {zincAvg.qed.toFixed(3)}
            </div>
          </div>

          {/* logP */}
          <div className="p-4 rounded-2xl bg-surface border border-border">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-mono text-text-muted flex items-center gap-1">
                <Activity size={14} className="text-accent-2" />
                <span>Wildman logP</span>
              </span>
              <span className={`badge ${getLogPBadgeClass(molecule.logP)} !text-xs !py-0.5 !px-2`}>
                {molecule.logP >= -0.4 && molecule.logP <= 5.0 ? "Lipinski" : "Outside"}
              </span>
            </div>
            <div className="text-2xl font-heading font-bold text-text">
              {molecule.logP.toFixed(3)}
            </div>
            <p className="text-[11px] text-text-dim mt-1">Solubility / Lipophilicity</p>
            <div className="mt-2 pt-2 border-t border-border/50 text-[11px] font-mono text-accent-2">
              vs ZINC avg: {zincAvg.logP.toFixed(3)}
            </div>
          </div>

          {/* SAS */}
          <div className="p-4 rounded-2xl bg-surface border border-border">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-mono text-text-muted flex items-center gap-1">
                <Beaker size={14} className="text-violet" />
                <span>SAS Score</span>
              </span>
              <span className={`badge ${getSasBadgeClass(molecule.sas)} !text-xs !py-0.5 !px-2`}>
                {molecule.sas <= 3.0 ? "Easy" : molecule.sas <= 4.0 ? "Moderate" : "Hard"}
              </span>
            </div>
            <div className="text-2xl font-heading font-bold text-text">
              {molecule.sas.toFixed(3)}
            </div>
            <p className="text-[11px] text-text-dim mt-1">Synthesis Difficulty (1-10)</p>
            <div className="mt-2 pt-2 border-t border-border/50 text-[11px] font-mono text-violet">
              vs ZINC avg: {zincAvg.sas.toFixed(3)}
            </div>
          </div>
        </div>

        {/* Footer note */}
        <div className="mt-6 flex items-center gap-2 text-xs text-text-dim">
          <CheckCircle2 size={14} className="text-good shrink-0" />
          <span>Candidate is physically valid, unique, and absent from the training corpus.</span>
        </div>
      </div>
    </div>
  );
}
