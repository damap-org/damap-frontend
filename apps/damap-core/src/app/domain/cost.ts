import { CostType } from './enum/cost-type.enum';

export interface Cost {
  readonly id: number;
  title: string;
  value: number;
  currencyCode: string; // controlled vocabulary: ISO 4217
  description: string;
  type: CostType;
  customType: string;
}
