export interface Molecule {
  id: number;
  smiles: string;
  qed: number;
  logP: number;
  sas: number;
  svg: string;
}

export interface MetricHistogramPoint {
  x: number;
  zinc: number;
  generated: number;
}

export interface MetricsData {
  totals: {
    sampled: number;
    valid: number;
    unique: number;
    novel: number;
    zincSize: number;
  };
  percentages: {
    validity: number;
    uniqueness: number;
    novelty: number;
  };
  comparison: {
    generated: {
      meanQed: number;
      meanLogP: number;
      meanSas: number;
    };
    zinc: {
      meanQed: number;
      meanLogP: number;
      meanSas: number;
    };
  };
  shares: {
    lipinskiLogPShare: number;
    qedAbove075Share: number;
    sasBelow4Share: number;
  };
  histograms: {
    qed: MetricHistogramPoint[];
    logP: MetricHistogramPoint[];
    sas: MetricHistogramPoint[];
  };
}

export interface FilterOptions {
  qed80: boolean;
  sas3: boolean;
  lipinski: boolean;
}
