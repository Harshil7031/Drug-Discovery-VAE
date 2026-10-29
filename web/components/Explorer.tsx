"use client";

import { useState, useMemo } from "react";
import { Molecule } from "@/lib/types";
import { getQedBadgeClass, getSasBadgeClass, getLogPBadgeClass } from "@/lib/utils";
import { MoleculeModal } from "./MoleculeModal";
import { Search, ArrowUpDown, ChevronLeft, ChevronRight, Sparkles, Filter } from "lucide-react";

interface ExplorerProps {
  molecules: Molecule[];
}

type SortField = "id" | "qed" | "logP" | "sas";
type SortDirection = "asc" | "desc";

export function Explorer({ molecules }: ExplorerProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<SortField>("qed");
  const [sortDir, setSortDir] = useState<SortDirection>("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMolecule, setSelectedMolecule] = useState<Molecule | null>(null);

  const pageSize = 10;

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDir("desc");
    }
    setCurrentPage(1);
  };

  const filteredAndSorted = useMemo(() => {
    let result = [...molecules];

    // Filter by SMILES
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (m) => m.smiles.toLowerCase().includes(term) || String(m.id).includes(term)
      );
    }

    // Sort
    result.sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];
      if (valA < valB) return sortDir === "asc" ? -1 : 1;
      if (valA > valB) return sortDir === "asc" ? 1 : -1;
      return 0;
    });

    return result;
  }, [molecules, searchTerm, sortField, sortDir]);

  const totalPages = Math.ceil(filteredAndSorted.length / pageSize) || 1;
  const paginatedMolecules = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredAndSorted.slice(start, start + pageSize);
  }, [filteredAndSorted, currentPage]);

  const handleTop12 = () => {
    setSearchTerm("");
    setSortField("qed");
    setSortDir("desc");
    setCurrentPage(1);
  };

  return (
    <div className="glass p-6 sm:p-8 rounded-3xl mt-12">
      {/* Explorer Top Controls */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pb-6 border-b border-border mb-6">
        <div>
          <h3 className="text-xl sm:text-2xl font-heading font-bold text-text">
            Molecule Explorer
          </h3>
          <p className="text-xs sm:text-sm text-text-muted mt-0.5">
            Search, sort, and inspect the 1,000 showcase molecular structures
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Search Box */}
          <div className="relative flex-1 sm:w-64">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-dim" />
            <input
              type="text"
              placeholder="Search SMILES or ID..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-bg border border-border rounded-xl pl-9 pr-3 py-2 text-xs font-mono text-text placeholder:text-text-dim focus:outline-none focus:border-accent transition-colors"
            />
          </div>

          {/* Quick Top 12 Button */}
          <button
            onClick={handleTop12}
            className="btn-ghost !py-2 !px-3 text-xs shrink-0 flex items-center gap-1.5"
          >
            <Sparkles size={14} className="text-accent" />
            <span>Top 12 by QED</span>
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto rounded-2xl border border-border">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-[#0A1020] text-text-dim uppercase tracking-wider border-b border-border sticky top-0 z-10">
            <tr>
              <th
                onClick={() => handleSort("id")}
                className="py-3 px-4 cursor-pointer hover:text-text transition-colors"
              >
                <div className="flex items-center gap-1">
                  <span>#</span>
                  <ArrowUpDown size={12} />
                </div>
              </th>
              <th className="py-3 px-4">Structure</th>
              <th className="py-3 px-4">SMILES Sequence</th>
              <th
                onClick={() => handleSort("qed")}
                className="py-3 px-4 cursor-pointer hover:text-accent transition-colors"
              >
                <div className="flex items-center gap-1">
                  <span>QED</span>
                  <ArrowUpDown size={12} />
                </div>
              </th>
              <th
                onClick={() => handleSort("logP")}
                className="py-3 px-4 cursor-pointer hover:text-accent-2 transition-colors"
              >
                <div className="flex items-center gap-1">
                  <span>logP</span>
                  <ArrowUpDown size={12} />
                </div>
              </th>
              <th
                onClick={() => handleSort("sas")}
                className="py-3 px-4 cursor-pointer hover:text-violet transition-colors"
              >
                <div className="flex items-center gap-1">
                  <span>SAS</span>
                  <ArrowUpDown size={12} />
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60 bg-surface/30">
            {paginatedMolecules.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-text-muted">
                  No molecules matched your search query.
                </td>
              </tr>
            ) : (
              paginatedMolecules.map((m) => (
                <tr
                  key={m.id}
                  onClick={() => setSelectedMolecule(m)}
                  className="hover:bg-surface-strong/80 cursor-pointer transition-colors group"
                >
                  <td className="py-2.5 px-4 font-bold text-accent">
                    #{String(m.id).padStart(4, "0")}
                  </td>
                  <td className="py-2 px-4">
                    <div className="w-12 h-10 rounded-lg bg-[#060913] border border-border p-1 flex items-center justify-center overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={m.svg}
                        alt={m.smiles}
                        className="max-h-full max-w-full object-contain"
                        loading="lazy"
                      />
                    </div>
                  </td>
                  <td className="py-2.5 px-4 max-w-xs truncate text-text-muted group-hover:text-text transition-colors">
                    {m.smiles}
                  </td>
                  <td className="py-2.5 px-4">
                    <span className={`badge ${getQedBadgeClass(m.qed)} !text-xs !py-0.5 !px-2`}>
                      {m.qed.toFixed(3)}
                    </span>
                  </td>
                  <td className="py-2.5 px-4">
                    <span className={`badge ${getLogPBadgeClass(m.logP)} !text-xs !py-0.5 !px-2`}>
                      {m.logP.toFixed(2)}
                    </span>
                  </td>
                  <td className="py-2.5 px-4">
                    <span className={`badge ${getSasBadgeClass(m.sas)} !text-xs !py-0.5 !px-2`}>
                      {m.sas.toFixed(2)}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 mt-4 text-xs font-mono text-text-dim">
        <span>
          Showing {(currentPage - 1) * pageSize + 1} to{" "}
          {Math.min(currentPage * pageSize, filteredAndSorted.length)} of{" "}
          {filteredAndSorted.length} candidate molecules
        </span>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-lg bg-surface border border-border text-text-muted hover:text-text disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="px-3 py-1 rounded-lg bg-bg border border-border text-text font-bold">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg bg-surface border border-border text-text-muted hover:text-text disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <MoleculeModal
        molecule={selectedMolecule}
        onClose={() => setSelectedMolecule(null)}
      />
    </div>
  );
}
