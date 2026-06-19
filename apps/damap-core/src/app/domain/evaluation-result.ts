// Note: 'INDERTERMINATED' matches the upstream API literal (typo in the API)
export type EvaluationValue = 'PASS' | 'FAIL' | 'ERROR' | 'INDERTERMINATED' | 'NOT_APPLICABLE';

export interface EvaluationGuidanceIssue {
  dataset: string;
  reason: string;
}

export interface EvaluationGuidance {
  summary?: string;
  issues?: EvaluationGuidanceIssue[];
}

export interface EvaluationResult {
  identifier: string;
  title: string;
  description: string;
  value: EvaluationValue;
  generatedAtTime: string;
  reportId?: string;
  log: string;
  affectedElements?: string[];
  completion: number;
  assessmentTarget?: string;
  wasGeneratedBy?: string;
  outputFromTest?: string;
  guidance?: EvaluationGuidance;
}
