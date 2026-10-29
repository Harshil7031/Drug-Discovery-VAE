import fs from "fs";
import path from "path";
import { Molecule, MetricsData } from "@/lib/types";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Problem } from "@/components/Problem";
import { Pipeline } from "@/components/Pipeline";
import { ModelArchitecture } from "@/components/ModelArchitecture";
import { Generator } from "@/components/Generator";
import { Results } from "@/components/Results";
import { LatentSpace } from "@/components/LatentSpace";
import { Ethics } from "@/components/Ethics";
import { Team } from "@/components/Team";
import { Footer } from "@/components/Footer";
import { KeyboardNav } from "@/components/KeyboardNav";

function loadData(): { molecules: Molecule[]; metrics: MetricsData } {
  const dataDir = path.join(process.cwd(), "public", "data");
  const molsRaw = fs.readFileSync(path.join(dataDir, "molecules.json"), "utf-8");
  const metricsRaw = fs.readFileSync(path.join(dataDir, "metrics.json"), "utf-8");

  return {
    molecules: JSON.parse(molsRaw) as Molecule[],
    metrics: JSON.parse(metricsRaw) as MetricsData,
  };
}

export default function Home() {
  const { molecules, metrics } = loadData();

  return (
    <main className="min-h-screen flex flex-col">
      <KeyboardNav />
      <Navbar />

      <Hero />
      <Problem />
      <Pipeline />
      <ModelArchitecture />
      <Generator initialPool={molecules} />
      <Results metrics={metrics} molecules={molecules} />
      <LatentSpace />
      <Ethics />
      <Team />

      <Footer />
    </main>
  );
}
