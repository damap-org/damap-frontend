import { Funding } from './funding';

export interface Project {
  readonly id: number;
  readonly universityId: number;
  readonly title: string;
  readonly description: string;
  readonly funding: Funding;
  readonly start: Date;
  readonly end: Date;
  readonly dmpExists: boolean;
  readonly funderSupported: boolean;
  readonly acronym: string;
}
