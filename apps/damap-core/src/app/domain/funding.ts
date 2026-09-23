import { Identifier } from './identifier';
import { FundingState } from './enum/funding-state.enum';

export interface Funding {
  readonly id: number;
  fundingName: string;
  fundingProgram: string;
  funderId: Identifier;
  grantId: Identifier;
  fundingStatus: FundingState;
}
