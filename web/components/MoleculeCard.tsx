"use client";

import { useState } from "react";
import { Molecule } from "@/lib/types";
import { getQedBadgeClass, getSasBadgeClass, getLogPBadgeClass } from "@/lib/utils";
import { Copy, Check, ExternalLink } from "lucide-react";

interface MoleculeCardProps {
  molecule: Molecule;
  onClick: (molecule: Molecule) => void;
  index?: number;
}

export function MoleculeCard({ molecule, onClick, index }: MoleculeCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(molecule.smiles);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const idFormatted = String(molecule.id).padStart(4, "0");

  return (
    <div
      onClick={() => onClick(molecule)}
      className="glass p-5 rounded-2xl flex flex-col justify-between cursor-pointer group relative overflow-hidden"
    >
      {/* Top Bar with ID */}
      <div className="flex items-center justify-between mb-3 text-xs font-mono">
        <span className="text-accent font-semibold bg-accent/10 px-2 py-0.5 rounded-md border border-accent/20">
          #{idFormatted}
        </span>
        <div className="text-text-dim group-hover:text-accent transition-colors flex items-center gap-1">
          <span className="text-[11px]">Inspect</span>
          <ExternalLink size={12} />
        </div>
      </div>

      {/* SVG Drawing Panel with subtle radial glow */}
      <div className="relative aspect-[4/3] w-full rounded-xl bg-[#060913]/90 border border-border p-2 flex items-center justify-center overflow-hidden mb-4 group-hover:border-accent/40 transition-colors">
        <div className="absolute inset-0 bg-radial-gradient from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={molecule.svg}
          alt={`Molecular structure ${molecule.smiles}`}
          className="w-full h-full object-contain drop-shadow-[0_0_8px_rgba(230,237,247,0.15)] group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>

      {/* Middle: SMILES with Copy Button */}
      <div className="flex items-center justify-between gap-2 p-2 rounded-lg bg-bg/50 border border-border text-xs font-mono mb-4">
        <span
          className="truncate text-text-muted hover:text-text transition-colors select-all"
          title={molecule.smiles}
        >
          {molecule.smiles}
        </span>
        <button
          onClick={handleCopy}
          aria-label="Copy SMILES string"
          className="p-1.5 rounded-md text-text-dim hover:text-accent hover:bg-surface transition-colors shrink-0"
          title="Copy SMILES"
        >
          {copied ? <Check size={14} className="text-good" /> : <Copy size={14} />}
        </button>
      </div>

      {/* Bottom: 3 Property Badges */}
      <div className="grid grid-cols-3 gap-1.5 text-center pt-2 border-t border-border/60">
        <div className={`badge ${getQedBadgeClass(molecule.qed)} justify-center !text-xs !px-1.5`}>
          <span>QED {molecule.qed.toFixed(2)}</span>
        </div>
        <div className={`badge ${getLogPBadgeClass(molecule.logP)} justify-center !text-xs !px-1.5`}>
          <span>logP {molecule.logP.toFixed(2)}</span>
        </div>
        <div className={`badge ${getSasBadgeClass(molecule.sas)} justify-center !text-xs !px-1.5`}>
          <span>SAS {molecule.sas.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
