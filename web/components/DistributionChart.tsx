"use client";

import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceArea,
  Legend,
} from "recharts";
import { MetricHistogramPoint } from "@/lib/types";

interface DistributionChartProps {
  qedData: MetricHistogramPoint[];
  logPData: MetricHistogramPoint[];
  sasData: MetricHistogramPoint[];
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  label?: number;
  unit?: string;
}

function CustomTooltip({ active, payload, label, unit = "" }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0A1020]/95 border border-border-strong p-3 rounded-xl shadow-2xl backdrop-blur-md text-xs font-mono">
        <p className="text-text font-semibold mb-1">
          Value: {label} {unit}
        </p>
        {payload.map((entry, index) => (
          <div key={`item-${index}`} className="flex items-center gap-2 my-0.5">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-text-muted capitalize">{entry.name}:</span>
            <span className="text-text font-bold">{entry.value.toFixed(4)}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
}

export function DistributionChart({ qedData, logPData, sasData }: DistributionChartProps) {
  const [selectedChart, setSelectedChart] = useState<"qed" | "logP" | "sas">("qed");

  return (
    <div className="glass p-6 sm:p-8 rounded-3xl w-full">
      {/* Chart Selector Tabs */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-border mb-6">
        <div>
          <h3 className="text-xl sm:text-2xl font-heading font-bold text-text">
            Physicochemical Distribution Benchmarking
          </h3>
          <p className="text-xs sm:text-sm text-text-muted mt-0.5">
            Normalized density overlays comparing real ZINC corpus against AI-generated molecules
          </p>
        </div>

        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-bg border border-border text-xs font-mono">
          <button
            onClick={() => setSelectedChart("qed")}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              selectedChart === "qed"
                ? "bg-accent text-[#04131A] font-bold shadow-[0_0_10px_var(--accent)]"
                : "text-text-muted hover:text-text"
            }`}
          >
            QED (Drug-likeness)
          </button>

          <button
            onClick={() => setSelectedChart("logP")}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              selectedChart === "logP"
                ? "bg-accent text-[#04131A] font-bold shadow-[0_0_10px_var(--accent)]"
                : "text-text-muted hover:text-text"
            }`}
          >
            logP (Lipophilicity)
          </button>

          <button
            onClick={() => setSelectedChart("sas")}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              selectedChart === "sas"
                ? "bg-accent text-[#04131A] font-bold shadow-[0_0_10px_var(--accent)]"
                : "text-text-muted hover:text-text"
            }`}
          >
            SAS (Synthesis)
          </button>
        </div>
      </div>

      {/* Chart Container */}
      <div className="w-full h-[320px] sm:h-[380px]">
        <ResponsiveContainer width="100%" height="100%">
          {selectedChart === "qed" ? (
            <AreaChart data={qedData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="genGradQed" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2DD4BF" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#2DD4BF" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="x" stroke="#5E6A82" tick={{ fill: "#94A0B8", fontSize: 11 }} />
              <YAxis stroke="#5E6A82" tick={{ fill: "#94A0B8", fontSize: 11 }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                verticalAlign="top"
                height={36}
                wrapperStyle={{ color: "#EAF0FA", fontSize: 12, fontFamily: "monospace" }}
              />
              <Area
                type="monotone"
                dataKey="zinc"
                name="ZINC Baseline"
                stroke="#94A0B8"
                strokeWidth={1.8}
                strokeDasharray="4 4"
                fill="transparent"
              />
              <Area
                type="monotone"
                dataKey="generated"
                name="Generated Molecules"
                stroke="#2DD4BF"
                strokeWidth={2.5}
                fill="url(#genGradQed)"
              />
            </AreaChart>
          ) : selectedChart === "logP" ? (
            <AreaChart data={logPData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="genGradLogP" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22D3EE" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#22D3EE" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="x" stroke="#5E6A82" tick={{ fill: "#94A0B8", fontSize: 11 }} />
              <YAxis stroke="#5E6A82" tick={{ fill: "#94A0B8", fontSize: 11 }} />
              {/* Shaded vertical reference band for Lipinski range (-0.4 to 5.0) */}
              <ReferenceArea
                x1={-0.4}
                x2={5.0}
                strokeOpacity={0.3}
                fill="rgba(52, 211, 153, 0.08)"
                stroke="#34D399"
                strokeDasharray="3 3"
                label={{
                  value: "Lipinski Rule (-0.4 to 5.0)",
                  fill: "#34D399",
                  fontSize: 10,
                  position: "insideTopLeft",
                }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                verticalAlign="top"
                height={36}
                wrapperStyle={{ color: "#EAF0FA", fontSize: 12, fontFamily: "monospace" }}
              />
              <Area
                type="monotone"
                dataKey="zinc"
                name="ZINC Baseline"
                stroke="#94A0B8"
                strokeWidth={1.8}
                strokeDasharray="4 4"
                fill="transparent"
              />
              <Area
                type="monotone"
                dataKey="generated"
                name="Generated Molecules"
                stroke="#22D3EE"
                strokeWidth={2.5}
                fill="url(#genGradLogP)"
              />
            </AreaChart>
          ) : (
            <AreaChart data={sasData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="genGradSas" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B7CFF" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#8B7CFF" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="x" stroke="#5E6A82" tick={{ fill: "#94A0B8", fontSize: 11 }} />
              <YAxis stroke="#5E6A82" tick={{ fill: "#94A0B8", fontSize: 11 }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                verticalAlign="top"
                height={36}
                wrapperStyle={{ color: "#EAF0FA", fontSize: 12, fontFamily: "monospace" }}
              />
              <Area
                type="monotone"
                dataKey="zinc"
                name="ZINC Baseline"
                stroke="#94A0B8"
                strokeWidth={1.8}
                strokeDasharray="4 4"
                fill="transparent"
              />
              <Area
                type="monotone"
                dataKey="generated"
                name="Generated Molecules"
                stroke="#8B7CFF"
                strokeWidth={2.5}
                fill="url(#genGradSas)"
              />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Under Chart: 3 Statistical Summary Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 mt-6 border-t border-border">
        <div className="p-3.5 rounded-xl bg-surface border border-border text-xs font-mono">
          <span className="text-text-dim block mb-1">High QED Share</span>
          <span className="text-accent text-sm font-bold">48.7%</span>
          <span className="text-text-muted block mt-0.5">have QED &gt; 0.75</span>
        </div>
        <div className="p-3.5 rounded-xl bg-surface border border-border text-xs font-mono">
          <span className="text-text-dim block mb-1">Lipinski Rule Compliant</span>
          <span className="text-accent-2 text-sm font-bold">90.5%</span>
          <span className="text-text-muted block mt-0.5">within logP -0.4 to 5.0</span>
        </div>
        <div className="p-3.5 rounded-xl bg-surface border border-border text-xs font-mono">
          <span className="text-text-dim block mb-1">High Synthesizability</span>
          <span className="text-good text-sm font-bold">82.1%</span>
          <span className="text-text-muted block mt-0.5">with SAS &le; 4.0</span>
        </div>
      </div>
    </div>
  );
}
