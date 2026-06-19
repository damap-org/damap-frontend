export interface Benchmark {
  identifier: string;
  title: string;
  description: string;
  version: string;
  hasAssociatedMetric?: string[];
  scoringFunction?: string[];
  keyword?: string;
  abbreviation?: string;
  landingPage?: string;
  theme?: string;
  status?: string;
  creator: string[];
  license?: string;
}
